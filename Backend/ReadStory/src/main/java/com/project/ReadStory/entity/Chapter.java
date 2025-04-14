package com.project.ReadStory.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
@Table(name = "Chuong")
public class Chapter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maChuong")
    private Integer maChuong;

    @Column(name = "tenChuong", length = 255)
    private String tenChuong;

    @Column(name = "noiDung", columnDefinition = "TEXT")
    private String noiDung;

    @Column(name = "ngayThem")
    private LocalDateTime ngayThem;

    @PrePersist
    protected void onCreate() {
        this.ngayThem = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "maTruyen")
    private Story truyen;
}
