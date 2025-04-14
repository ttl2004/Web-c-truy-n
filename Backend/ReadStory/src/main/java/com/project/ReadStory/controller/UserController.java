package com.project.ReadStory.controller;
import com.project.ReadStory.dto.request.UserCreationRequest;
import com.project.ReadStory.dto.request.UserUpdateRequest;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.User;
import com.project.ReadStory.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping
    User createUser(@RequestBody @Valid UserCreationRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    UserResponse getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PutMapping("/{userId}")
    UserResponse updateUser(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
          return userService.updateUser(userId, request);
    }

}
