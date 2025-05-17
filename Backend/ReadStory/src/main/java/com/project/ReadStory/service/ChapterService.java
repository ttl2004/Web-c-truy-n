package com.project.ReadStory.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.project.ReadStory.Mapper.ChapterMapper;
import com.project.ReadStory.dto.request.ChapterCreationRequest;
import com.project.ReadStory.dto.request.ChapterUpdateRequest;
import com.project.ReadStory.dto.request.StoryCreationRequest;
import com.project.ReadStory.dto.request.StoryUpdateRequest;
import com.project.ReadStory.dto.response.ChapterResponse;
import com.project.ReadStory.dto.response.PagedResponse;
import com.project.ReadStory.dto.response.StoryResponse;
import com.project.ReadStory.dto.response.UserResponse;
import com.project.ReadStory.entity.Chapter;
import com.project.ReadStory.entity.Story;
import com.project.ReadStory.responsitory.ChapterRepository;
import com.project.ReadStory.responsitory.StoryRepository;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ChapterService {

    @Autowired
    private ChapterRepository chapterRepository;

@Autowired
    private StoryRepository storyRepository;
    @Autowired
    private ChapterMapper chapterMapper;

    @Autowired
    private Cloudinary cloudinary;

    // Create a new chapter
    public Chapter createChapter(ChapterCreationRequest request, MultipartFile imageFile) {
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

            Story story = storyRepository.findByMaTruyen(request.getMaTruyen())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy truyện với id: " + request.getMaTruyen()));

            // Tạo đối tượng Story
            Chapter chapter = chapterMapper.toChapter(request);
            chapter.setNoiDung(imageUrl);
            chapter.setTruyen(story);


            return chapterRepository.save(chapter);

        } catch (IOException e) {
            throw new RuntimeException("Lỗi khi upload ảnh lên Cloudinary", e);
        }
    }

    //Xoá chapter
    public void deleteChapter(Integer chapterId) {
        if(!chapterRepository.existsByMaChuong(chapterId)){
            throw new RuntimeException("Chương không tồn tại");
        }
        // Xóa ảnh cũ nếu có
        Chapter existingChapter = chapterRepository.findByMaChuong(chapterId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy chương với id: " + chapterId));
        String oldImageUrl = existingChapter.getNoiDung();
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
        chapterRepository.deleteById(chapterId.toString());
    }


    //Lấy tất cả chapter
    public PagedResponse<Chapter> getAllChapters(Pageable pageable) {
        Page<Chapter> page = chapterRepository.findAll(pageable);

        return new PagedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast()
        );
    }

    //Lấy chapter theo id
    public ChapterResponse getChapterById(Integer chapterId) {
        return chapterMapper.toChapterResponse(chapterRepository.findByMaChuong(chapterId).orElseThrow(() -> new RuntimeException("Chương không tồn tại")));
    }

    //Cập nhật chapter
    public ChapterResponse updateChapter(Integer chapterId, ChapterUpdateRequest request, MultipartFile newImageFile) {
        Chapter existingStory =  chapterRepository.findByMaChuong(chapterId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy truyện với id: " + chapterId));

        // Cập nhật thông tin từ request
        chapterMapper.updateChapter(existingStory, request);

        // Nếu có ảnh mới thì xử lý thay thế
        if (newImageFile != null && !newImageFile.isEmpty()) {
            String oldImageUrl = existingStory.getNoiDung();
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
                existingStory.setNoiDung(newImageUrl);
            } catch (IOException e) {
                throw new RuntimeException("Không thể upload ảnh mới lên Cloudinary", e);
            }
        }

        // Lưu và trả về response
        Chapter updatedChapter = chapterRepository.save(existingStory);
        return chapterMapper.toChapterResponse(updatedChapter);
    }
//    Tách id công khai từ URL
    private String extractPublicIdFromUrl(String url) {
        // VD: https://res.cloudinary.com/your_cloud/image/upload/v1234567890/abcxyz.jpg
        String[] parts = url.split("/");
        String filename = parts[parts.length - 1]; // abcxyz.jpg
        return filename.substring(0, filename.lastIndexOf(".")); // abcxyz
    }
}
