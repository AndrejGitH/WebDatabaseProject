package com.YTSK.TodoList.mapper;

import com.YTSK.TodoList.domain.Task;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

//processing database query (rows from database) into java Task object
public class TaskRowMapper implements RowMapper<Task> {

    @Override
    public Task mapRow(ResultSet rs, int i) throws SQLException {
        Task task = new Task();
        task.setId(rs.getInt("id"));
        task.setUserId(rs.getInt("userId"));
        task.setCategory(rs.getString("category"));
        task.setName(rs.getString("name"));
        task.setStatus(rs.getInt("status"));
        task.setDescription(rs.getString("description"));
        task.setCreatedAt(rs.getTimestamp("createdAt"));
        return task;

    }

}
