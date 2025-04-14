package com.project.ReadStory.service;
import com.project.ReadStory.Mapper.UserMapper;
import com.project.ReadStory.dto.request.UserCreationRequest;
import com.project.ReadStory.dto.request.UserUpdateRequest;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.User;
import com.project.ReadStory.responsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

    public User createUser(UserCreationRequest request) {
        if((userRepository.existsByTenNguoiDung(request.getTenNguoiDung()))){
            throw new RuntimeException("Tên người dùng đã tồn tại");
        }
        if((userRepository.existsByTenDangNhap(request.getTenDangNhap()))){
            throw new RuntimeException("Tên đăng nhập đã tồn tại");
        }
        if((userRepository.existsByEmail(request.getEmail()))){
            throw new RuntimeException("Email đã tồn tại");
        }

        User user = userMapper.toUser(request);

        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public UserResponse getUserById(Long userId) {
        return userMapper.toUserResponse(userRepository.findByMaNguoiDung(userId).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại")));
    }

    public UserResponse updateUser(Long userId, UserUpdateRequest request) {
        User user = userRepository.findByMaNguoiDung(userId).orElseThrow(() -> new RuntimeException("Người dùng không tồn tại"));

        userMapper.updateUser(user, request);
        return userMapper.toUserResponse(userRepository.save(user));
    }
}
