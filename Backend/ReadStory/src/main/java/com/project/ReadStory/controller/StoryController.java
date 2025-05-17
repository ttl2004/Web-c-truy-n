package com.project.ReadStory.controller;

import com.project.ReadStory.dto.request.ApiResponse;
import com.project.ReadStory.dto.request.StoryCreationRequest;

import com.project.ReadStory.dto.request.StoryUpdateRequest;
import com.project.ReadStory.dto.request.UserUpdateRequest;
import com.project.ReadStory.dto.response.PagedResponse;
import com.project.ReadStory.dto.response.StoryResponse;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.Story;

import com.project.ReadStory.entity.User;
import com.project.ReadStory.service.StoryService;
import io.micrometer.common.lang.NonNull;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/storys")
public class StoryController {

    @Autowired
    private StoryService storyService;

    //Tạo hoặc thêm truyện mới
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<Story>> createStory(
            @RequestPart("info") @Valid @NonNull StoryCreationRequest request,
            @RequestPart("image") @NonNull MultipartFile imageFile) {

        System.out.println("Request: " + request);
        Story createdStory = storyService.createStory(request, imageFile);
        System.out.println("Created Story: " + createdStory);
        ApiResponse<Story> response = new ApiResponse<>();
        response.setResult(createdStory);

        return ResponseEntity.ok(response);
    }

    //Xoá truyện
    @DeleteMapping("/{storyId}")
    void deleteStory(@PathVariable Long storyId) {
        storyService.deleteStory(storyId);
    }

    //Lấy tất cả truyện
    @GetMapping
    public ResponseEntity<PagedResponse<Story>> getAllStorys(Pageable pageable) {
        return ResponseEntity.ok(storyService.getAllStorys(pageable));
    }

    //Lấy truyện theo id
    @GetMapping("/{storyId}")
    StoryResponse getUserById(@PathVariable Long storyId) {
        return storyService.getStoryById(storyId);
    }

    //Cập nhật truyện
    @PutMapping(value = "/{storyId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public StoryResponse updateStory(
            @PathVariable Long storyId,
            @RequestPart("info") @Valid StoryUpdateRequest request,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) {
        return storyService.updateStory(storyId, request, imageFile);
    }

    //Tìm kiếm truyện theo tên
    @GetMapping("/search")
    public List<Map<String, Object>> searchStory(@RequestParam String keyword) {
        List<Object[]> rows = storyService.searchByTenTruyen(keyword);
        List<Map<String, Object>> result = new ArrayList<>();

        for (Object[] row : rows) {
            Map<String, Object> map = new HashMap<>();
            map.put("tenTruyen", row[0]);
            map.put("moTa", row[1]);
            map.put("trangThai", row[2]);
            map.put("tinhTrang", row[3]);
            map.put("ngayThem", row[4]);
            map.put("ngayCapNhat", row[5]);
            result.add(map);
        }

        return result;
    }
}
