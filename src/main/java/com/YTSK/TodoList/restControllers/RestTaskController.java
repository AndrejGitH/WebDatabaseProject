package com.YTSK.TodoList.restControllers;

import com.YTSK.TodoList.domain.Task;
import com.YTSK.TodoList.services.api.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//creating web service, handling HTTP requests through @Mapping annotations and implementing CRUD methods for frontend
@RestController
@RequestMapping("task")
@CrossOrigin(origins = "http://localhost:3000")
public class RestTaskController {
    private final TaskService taskService;

    public RestTaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity addTask(@RequestBody Task task) {
        Integer id = taskService.add(task);

        if (id != null) {
            return new ResponseEntity<>(id, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity getAll() {
        List<Task> tasks = taskService.getTasks();

        return new ResponseEntity<>(tasks, HttpStatus.OK);

    }

    @GetMapping("/usertask/{userId}")
    public ResponseEntity getAllTaskWithUserId(@PathVariable("userId") int userId) {
        List<Task> tasks = taskService.getTaskByUserId(userId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("{id}")
    public ResponseEntity getTask(@PathVariable("id") int id) {
        Task task = taskService.get(id);

        if (task != null) {
            return new ResponseEntity<>(task, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }


    }

    @DeleteMapping("{id}")
    public ResponseEntity deleteTask(@PathVariable("id") int id) {

        if (taskService.get(id) != null) {
            taskService.delete(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("Task with id : " + id + "does not exist");
        }
    }

    @PatchMapping("{id}")
    public ResponseEntity updateTask(@PathVariable("id") int id, @RequestBody Task task) {
        if (taskService.get(id) != null) {
            task.setId(id);
            taskService.update(id, task);
            return ResponseEntity.ok().build();

        } else {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("Task with id : " + id + "does not exist");
        }
    }


}
