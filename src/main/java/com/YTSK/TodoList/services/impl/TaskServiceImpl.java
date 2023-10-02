package com.YTSK.TodoList.services.impl;

import com.YTSK.TodoList.domain.Task;
import com.YTSK.TodoList.services.api.TaskService;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Service;
import com.YTSK.TodoList.mapper.TaskRowMapper;

import java.sql.*;
import java.time.Instant;
import java.util.List;

//Class responsible for communication with database and implementing CRUD operations for backend
@Service
public class TaskServiceImpl implements TaskService {

    private final JdbcTemplate jdbcTemplate;
    private final TaskRowMapper taskRowMapper = new TaskRowMapper();

    public TaskServiceImpl(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Task> getTasks() {
        final String sql = "select * from task";
        return jdbcTemplate.query(sql, taskRowMapper);
    }

    @Override
    public Task get(Integer id) {
        final String sql = "select * from task where task.id = " + id;
        try {
            return jdbcTemplate.queryForObject(sql, taskRowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;
        }
    }

    @Override
    public List<Task> getTaskByUserId(Integer userId) {
        final String sql = "select * from task where task.userId =" + userId;
        try {
            return jdbcTemplate.query(sql, taskRowMapper);
        } catch (EmptyResultDataAccessException e) {
            return null;

        }
    }

    @Override
    public Integer add(Task task) {
        final String sql = "insert into task(userId, name, status, category, description, createdAt) values (?,?,?,?,?,?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement preparedStatement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
                preparedStatement.setInt(1, task.getUserId());
                preparedStatement.setString(2, task.getName());
                preparedStatement.setInt(3, task.getStatus());
                preparedStatement.setString(4, task.getCategory());
                preparedStatement.setString(5, task.getDescription());
                preparedStatement.setTimestamp(6, Timestamp.from(Instant.now()));
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
        final String sql = "delete from task where id = ?";
        jdbcTemplate.update(sql, id);

    }

    @Override
    public void update(Integer id, Task task) {
        final String sql = "update task set name = ?, status = ?, category =?, description = ? where id = ?";
        jdbcTemplate.update(sql, task.getName(), task.getStatus(), task.getCategory(), task.getDescription(), id);

    }
}
