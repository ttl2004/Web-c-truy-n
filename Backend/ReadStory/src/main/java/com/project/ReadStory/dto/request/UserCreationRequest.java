package com.project.ReadStory.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


public class UserCreationRequest {
    @Size(min = 6, message = "Tên tối thiểu 6 ký tự")
    private String tenNguoiDung;
    @Size(min = 3, message = "Tên đăng nhập tối thiểu 3 ký tự")
    private String tenDangNhap;

    @Size(min = 8, message = "Vui lòng nhập tối thiểu 8 ký tự cho mật khẩu")
    private String matKhau;

    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    private String email;

    public String getTenNguoiDung() {
        return tenNguoiDung;
    }

    public void setTenNguoiDung(String tenNguoiDung) {
        this.tenNguoiDung = tenNguoiDung;
    }

    public String getTenDangNhap() {
        return tenDangNhap;
    }

    public void setTenDangNhap(String tenDangNhap) {
        this.tenDangNhap = tenDangNhap;
    }

    public String getMatKhau() {
        return matKhau;
    }

    public void setMatKhau(String matKhau) {
        this.matKhau = matKhau;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
