package com.project.ReadStory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "DocTruyen")
public class ReadStory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maDoc")
    private Long maDoc;

    @Column(name = "thoiGianDoc")
    private LocalDateTime thoiGianDoc;

   // Các quan hệ
    @ManyToOne
    @JoinColumn(name = "maNguoiDung")
    private User nguoiDung;

    @ManyToOne
    @JoinColumn(name = "maTruyen")
    private Story truyen;

    @PrePersist
    protected void onCreate() {
        this.thoiGianDoc = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.thoiGianDoc = LocalDateTime.now();
    }
}
