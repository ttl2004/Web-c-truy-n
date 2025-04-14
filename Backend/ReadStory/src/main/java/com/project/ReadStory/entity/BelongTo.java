package com.project.ReadStory.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "ThuocVe")
public class BelongTo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "maThuocVe")
    private Long maThuocVe;

//    Cac Quan he
    @ManyToOne
    @JoinColumn(name = "maTheLoai")
    private Category theLoai;

    @ManyToOne
    @JoinColumn(name = "maTruyen")
    private Story truyen;
}
