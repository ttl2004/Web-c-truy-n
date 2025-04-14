package com.project.ReadStory.entity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Truyen")
public class Story {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maTruyen")
    private Long maTruyen;

    @Column(name = "tenTruyen", length = 255)
    private String tenTruyen;

    @Column(name = "moTa", columnDefinition = "TEXT")
    private String moTa;

    @Column(name = "loaiTruyen", length = 50)
    private String loaiTruyen;

    @Column(name = "tinhTrang", length = 50)
    private String tinhTrang;

    @Column(name = "trangThai", length = 50)
    private String trangThai;

    @Column(name = "tenTacGia", length = 100)
    private String tenTacGia;

    @Column(name = "anhDaiDien", length = 255)
    private String anhDaiDien;

    @Column(name = "ngayThem")
    private LocalDateTime ngayThem;

    @Column(name = "ngayCapNhat")
    private LocalDateTime ngayCapNhat;

    @PrePersist
    protected void onCreate() {
        this.ngayThem = LocalDateTime.now();
        this.ngayCapNhat = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.ngayCapNhat = LocalDateTime.now();
    }

    // Các quan hệ
    @OneToMany(mappedBy = "truyen", cascade = CascadeType.ALL)
    private List<Chapter> chuongList;

    @OneToMany(mappedBy = "truyen", cascade = CascadeType.ALL)
    private List<Comment> binhLuanList;

    @OneToMany(mappedBy = "truyen", cascade = CascadeType.ALL)
    private List<BelongTo> thuocVeList;

    @OneToMany(mappedBy = "truyen", cascade = CascadeType.ALL)
    private List<Follow> theoDoiList;

    @OneToMany(mappedBy = "truyen", cascade = CascadeType.ALL)
    private List<ReadStory> docTruyenList;

}
