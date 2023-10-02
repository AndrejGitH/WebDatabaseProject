package com.YTSK.TodoList.services.api;

import com.YTSK.TodoList.domain.Task;

import java.util.List;

//CRUD interface for database communication
public interface TaskService {
    List<Task> getTasks();
    Task get(Integer id);
    List<Task> getTaskByUserId(Integer userId);
    Integer add(Task task);
    void delete(Integer id);
    void update(Integer id, Task task);

}
