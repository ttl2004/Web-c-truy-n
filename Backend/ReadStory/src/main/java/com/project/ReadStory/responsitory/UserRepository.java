package com.project.ReadStory.responsitory;

import com.project.ReadStory.entity.User;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    boolean existsByTenNguoiDung(String tenNguoiDung);
    boolean existsByTenDangNhap(String tenDangNhap);
    boolean existsByEmail(String email);

    boolean existsByMaNguoiDung(Long maNguoiDung);

    Optional<User> findByMaNguoiDung(Long maNguoiDung);
    Optional<User> findByTenDangNhap(String tenDangNhap);


    List<User> findByTenNguoiDungContainingIgnoreCase(String keyword);
}
