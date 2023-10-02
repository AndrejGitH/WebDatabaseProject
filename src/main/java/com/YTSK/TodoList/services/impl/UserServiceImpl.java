package com.YTSK.TodoList.services.impl;

import com.YTSK.TodoList.domain.User;
import com.YTSK.TodoList.mapper.UserRowMapper;
import com.YTSK.TodoList.services.api.UserService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Types;
import java.util.List;

//Class responsible for communication with database and implementing CRUD operations for backend
@Service
public class UserServiceImpl implements UserService {

    private final JdbcTemplate jdbcTemplate;
    private final UserRowMapper userRowMapper = new UserRowMapper();

    public UserServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<User> getUser() {
        final String sql = "select * from user";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    @Override
    public User get(Integer id) {
        final String sql = "select * from user where user.id =" + id;
        try {
            return jdbcTemplate.queryForObject(sql, userRowMapper);

        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public Integer add(User user) {
        final String sql = "insert into user(name, surname,nickname,email, age,password) values (?,?,?,?,?,?)";

        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement preparedStatement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
                preparedStatement.setString(1, user.getName());
                preparedStatement.setString(2, user.getSurname());
                preparedStatement.setString(3, user.getNickname());
                preparedStatement.setString(4, user.getEmail());

                if (user.getAge() != null) {
                    preparedStatement.setInt(5, user.getAge());
                } else {
                    preparedStatement.setNull(5, Types.INTEGER);
                }
                preparedStatement.setString(6, user.getPassword());
                return preparedStatement;
            }
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            return keyHolder.getKey().intValue();
        } else {
            return null;
        }
    }

    @Override
    public void delete(Integer id) {
        final String sql = "delete from user where id = ?";
        jdbcTemplate.update(sql, id);
    }

    @Override
    public void update(Integer id, User user) {
        final String sql = "update user set name = ?, surname = ?, nickname = ?, email = ?, age = ?, password = ? where id = ?";
        jdbcTemplate.update(sql, user.getName(), user.getSurname(), user.getNickname(), user.getEmail(), user.getAge(), user.getPassword(), id);
    }
}
