package com.project.ReadStory.responsitory;

import com.project.ReadStory.entity.Story;
import com.project.ReadStory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, String> {
    boolean existsByMaTruyen(Long maTruyen);
    Optional<Story> findByMaTruyen(Long maTruyen);
    List<Story> findByTenTruyenContainingIgnoreCase(String keyword);

    @Query(value = """
        SELECT ten_truyen, mo_ta, trang_thai, tinh_trang, ngay_them, ngay_cap_nhat
        FROM truyen
        WHERE LOWER(ten_truyen) LIKE LOWER(CONCAT('%', :keyword, '%'))
    """, nativeQuery = true)
    List<Object[]> searchStoryFields(@Param("keyword") String keyword);
}
