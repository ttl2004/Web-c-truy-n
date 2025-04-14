package com.project.ReadStory.responsitory;

import com.project.ReadStory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByTenNguoiDung(String tenNguoiDung);
    boolean existsByTenDangNhap(String tenDangNhap);
    boolean existsByEmail(String email);

    boolean existsByMaNguoiDung(Long maNguoiDung);

    Optional<User> findByMaNguoiDung(Long maNguoiDung);
}
