package com.YTSK.TodoList.restControllers;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

//when error occurs, simple message is returned
@RestController
public class CustomErrorController implements ErrorController {

    @RequestMapping("/error")
    public String handleError() {
        // Handle the error and return a meaningful response
        return "An error occurred. Please check your request.";
    }


}