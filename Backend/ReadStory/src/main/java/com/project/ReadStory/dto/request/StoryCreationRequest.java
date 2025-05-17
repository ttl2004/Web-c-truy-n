package com.project.ReadStory.dto.request;

import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class StoryCreationRequest {

    @Size(min = 3, message = "STORY_NAME_INVALID")
    private String tenTruyen;

    private String moTa;

    private String loaiTruyen;

    private String tinhTrang;

    private String trangThai;

    private String tenTacGia;

    private String anhDaiDien;
}
