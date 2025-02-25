# Client - Nhóm 14

Ứng dụng client được xây dựng bằng React theo mô hình MVC.

## Cài đặt

1. Clone repo về máy:
```
git clone <repository_url>
```

2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
```
2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
2. Di chuyển vào thư mục client:
```
cd KienTrucPhanMem_Nhom14/Client
```

3. Cài đặt các dependency:
npm install
```

## Chạy ứng dụng

```
npm start
```

Ứng dụng sẽ chạy ở [http://localhost:5000](http://localhost:5000)

## Cấu trúc thư mục MVC

- **Models**: Chứa các class đối tượng dữ liệu
- **Views**: Chứa các component UI
- **Controllers**: Chứa các class xử lý logic
- **Services**: Chứa các class giao tiếp với API

## Quy trình đăng ký và đăng nhập

### Đăng ký tài khoản
1. Người dùng nhập thông tin đăng ký (họ tên, email, mật khẩu)
2. Hệ thống gửi mã OTP đến email đăng ký
3. Người dùng nhập mã OTP để xác thực
4. Nếu xác thực thành công, tài khoản được tạo và người dùng được chuyển đến trang đăng nhập

### Đăng nhập
1. Người dùng nhập email và mật khẩu
2. Hệ thống kiểm tra thông tin và cấp JWT token
3. Người dùng được chuyển đến trang Profile

## Các tính năng hiện có

1. Đăng nhập
2. Đăng ký có xác thực OTP
3. Xem thông tin cá nhân

## Công nghệ sử dụng

- React
- React Router
- Axios
- Formik & Yup
- Bootstrap
- React Toastify 