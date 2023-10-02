package com.YTSK.TodoList.services.api;

import com.YTSK.TodoList.domain.User;

import java.util.List;


//CRUD interface for database communication
public interface UserService {

    List<User> getUser();
    User get(Integer id);
    Integer add(User user);
    void delete(Integer id);
    void update(Integer id, User user);

}
