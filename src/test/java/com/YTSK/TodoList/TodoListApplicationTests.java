package com.YTSK.TodoList;

import com.YTSK.TodoList.domain.User;
import com.YTSK.TodoList.services.api.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class TodoListApplicationTests {

	@Autowired
	private UserService userService;

	@Test
	void contextLoads() {

		// Create a User object with data to insert
		User user = new User();
		user.setName("John");
		user.setSurname("Doe");
		user.setNickname("johndoe");
		user.setEmail("johndoe@example.com");
		user.setAge(30);
		user.setPassword("password123");

		// Insert the user into the database
		Integer userId = userService.add(user);

		// Assert that the user ID is not null, indicating a successful insert
		assertNotNull(userId);
	}

}
