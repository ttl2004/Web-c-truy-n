package com.project.ReadStory.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.ReadStory.Mapper.StoryMapper;
import com.project.ReadStory.dto.request.StoryCreationRequest;
import com.project.ReadStory.dto.request.StoryUpdateRequest;
import com.project.ReadStory.dto.response.PagedResponse;
import com.project.ReadStory.dto.response.StoryResponse;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.Story;
import com.project.ReadStory.entity.User;
import com.project.ReadStory.responsitory.StoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class StoryService {

    @Autowired
    private StoryRepository storyRepository;

    @Autowired
    private StoryMapper storyMapper;

    @Autowired
    private Cloudinary cloudinary;

    //Tạo hoặc thêm truyện mới
    public Story createStory(StoryCreationRequest request, MultipartFile imageFile) {
        try {
            // Kiểm tra tên file
            String fileName = imageFile.getOriginalFilename();
            if (fileName == null || (!fileName.toLowerCase().endsWith(".jpg")
                    && !fileName.toLowerCase().endsWith(".jpeg")
                    && !fileName.toLowerCase().endsWith(".png"))) {
                throw new RuntimeException("Chỉ hỗ trợ ảnh định dạng JPG, JPEG, PNG");
            }
            System.out.println("File name: " + fileName);
            // Upload lên Cloudinary
            Map<String, Object> uploadResult = cloudinary.uploader()
                    .upload(imageFile.getBytes(), ObjectUtils.emptyMap());

            System.out.println("Upload result: " + uploadResult);
            String imageUrl = (String) uploadResult.get("secure_url");

            // Tạo đối tượng Story
            Story story = storyMapper.toStory(request);
            story.setAnhDaiDien(imageUrl);

            return storyRepository.save(story);

        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi upload ảnh lên Cloudinary", e);
        }
    }

    //Xoá truyện
    public void deleteStory(Long storyId) {
        if(!storyRepository.existsByMaTruyen(storyId)){
            throw new RuntimeException("Truyện không tồn tại");
        }
        // Xóa ảnh cũ nếu có
        Story existingStory = storyRepository.findByMaTruyen(storyId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy truyện với id: " + storyId));
        String oldImageUrl = existingStory.getAnhDaiDien();
        if (oldImageUrl != null && !oldImageUrl.isBlank()) {
            try {
                String oldPublicId = extractPublicIdFromUrl(oldImageUrl);
                if (oldPublicId != null && !oldPublicId.isBlank()) {
                    cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
                }
            } catch (IOException e) {
                System.err.println("Lỗi khi xóa ảnh cũ: " + e.getMessage());
            }
        }
        storyRepository.deleteById(storyId.toString());
    }

    //Lấy tất cả truyện
    public PagedResponse<Story> getAllStorys(Pageable pageable) {
        Page<Story> page = storyRepository.findAll(pageable);

        return new PagedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    //Lấy truyện theo id
    public StoryResponse getStoryById(Long storyId) {
        return storyMapper.toStoryResponse(storyRepository.findByMaTruyen(storyId).orElseThrow(() -> new RuntimeException("Truyện không tồn tại")));
    }

    //Cập nhật truyện
    public StoryResponse updateStory(Long storyId, StoryUpdateRequest request, MultipartFile newImageFile) {
        Story existingStory = storyRepository.findByMaTruyen(storyId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy truyện với id: " + storyId));

        // Cập nhật thông tin từ request
        storyMapper.updateStory(existingStory, request);

        // Nếu có ảnh mới thì xử lý thay thế
        if (newImageFile != null && !newImageFile.isEmpty()) {
            String oldImageUrl = existingStory.getAnhDaiDien();
            if (oldImageUrl != null && !oldImageUrl.isBlank()) {
                try {
                    String oldPublicId = extractPublicIdFromUrl(oldImageUrl);
                    if (oldPublicId != null && !oldPublicId.isBlank()) {
                        cloudinary.uploader().destroy(oldPublicId, ObjectUtils.emptyMap());
                    }
                } catch (IOException e) {
                    System.err.println("Lỗi khi xóa ảnh cũ: " + e.getMessage());
                }
            }

            try {
                Map<String, Object> uploadResult = cloudinary.uploader()
                        .upload(newImageFile.getBytes(), ObjectUtils.emptyMap());
                String newImageUrl = (String) uploadResult.get("secure_url");
                existingStory.setAnhDaiDien(newImageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Không thể upload ảnh mới lên Cloudinary", e);
            }
        }

        // Lưu và trả về response
        Story updatedStory = storyRepository.save(existingStory);
        return storyMapper.toStoryResponse(updatedStory);
    }

    //Tách id công khai từ URL
    private String extractPublicIdFromUrl(String url) {
        // VD: https://res.cloudinary.com/your_cloud/image/upload/v1234567890/abcxyz.jpg
        String[] parts = url.split("/");
        String filename = parts[parts.length - 1]; // abcxyz.jpg
        return filename.substring(0, filename.lastIndexOf(".")); // abcxyz
    }

    //Tìm kiếm
    public List<Object[]> searchByTenTruyen(String keyword) {
        return storyRepository.searchStoryFields(keyword);
    }

}
