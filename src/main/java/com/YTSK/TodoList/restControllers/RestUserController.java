package com.YTSK.TodoList.restControllers;


import com.YTSK.TodoList.domain.User;
import com.YTSK.TodoList.services.api.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//creating web service, handling HTTP requests through @Mapping annotations and implementing CRUD methods for frontend

@RestController
@RequestMapping("/restuser")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:8080"})
public class RestUserController {
    private final UserService userService;

    public RestUserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity add(@RequestBody User user) {
        Integer id = userService.add(user);

        if (id != null) {
            return new ResponseEntity<>(id, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("{id}")
    public ResponseEntity get(@PathVariable("id") int id) {
        User user = userService.get(id);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(user, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity getAll() {
        List<User> users = userService.getUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteUserWithId (@PathVariable("id") int id) {
        if (userService.get(id) != null) {
            userService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("User with id: " + id + " does not exist");
        }


    }

    @PatchMapping("{id}")
    public ResponseEntity updateUser(@PathVariable("id") int id, @RequestBody User user) {

        if (userService.get(id) != null) {
            user.setId(id);
            userService.update(id, user);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("User with id: " + id + " does not exist");
        }

    }

}
