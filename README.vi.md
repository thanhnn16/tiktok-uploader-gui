# TikTok Uploader GUI

<div align="center">
  <img src="app-icon.png" alt="App Icon" width="128"/>
</div>

Một giao diện người dùng đồ họa (GUI) để tương tác với công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader). Dự án này được xây dựng bằng Next.js, NextUI và đóng gói thành ứng dụng desktop sử dụng [Tauri](https://tauri.app/).

[English (Tiếng Anh)](README.md)

## Giới thiệu

Ứng dụng này cung cấp một cách trực quan để tải video lên TikTok, sử dụng sức mạnh của `tiktok-uploader` CLI ở phía sau. Thay vì sử dụng dòng lệnh, bạn có thể quản lý các lần tải lên của mình thông qua giao diện thân thiện với người dùng.

## Tính năng (Dự kiến)

*   Chọn video dễ dàng qua giao diện đồ họa.
*   Nhập tiêu đề, mô tả và các tùy chọn khác cho video.
*   Theo dõi tiến trình tải lên.
*   Quản lý lịch sử tải lên (nếu có).
*   Lên lịch đăng tải.
*   Tải lên hàng loạt nhiều video.
*   Cấu hình các tùy chọn của `tiktok-uploader`, bao gồm chọn trình duyệt và cài đặt proxy.

## Cách thức hoạt động

Ứng dụng này sử dụng thư viện `tiktok-uploader`, vốn dùng Selenium để tự động hóa quá trình tải lên trong trình duyệt web. Nó yêu cầu cookie phiên TikTok của bạn để xác thực.

*   **Xác thực:** Bạn cần xuất cookie từ TikTok.com bằng tiện ích mở rộng trình duyệt (ví dụ: "Get cookies.txt") và tải tệp `cookies.txt` lên trong phần cài đặt của ứng dụng.
*   **Trình duyệt được hỗ trợ:** Chrome (Khuyến nghị), Firefox, Edge, Safari, Chromium.
*   **Proxy:** Hỗ trợ cấu hình proxy (chủ yếu qua Chrome) để giúp tránh giới hạn tốc độ.
*   **Sự cố tiềm ẩn:** Việc tải lên có thể thất bại do các phương pháp phát hiện của TikTok, cookie hết hạn, sự cố mạng hoặc tải lên quá thường xuyên.

## Công cụ CLI gốc

Giao diện này hoạt động dựa trên công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) của [wkaisertexas](https://github.com/wkaisertexas). Vui lòng tham khảo tài liệu gốc để biết chi tiết về các tính năng và tùy chọn của CLI.

## Lời cảm ơn

*   Xin chân thành cảm ơn **[wkaisertexas](https://github.com/wkaisertexas)** đã tạo ra công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) gốc, nền tảng cho dự án này.
*   Cấu trúc frontend ban đầu được tạo bằng [v0.dev](https://v0.dev) của Vercel.
*   Biểu tượng ứng dụng (`app-icon.svg`) được tạo bởi ChatGPT.
*   Dự án này được phát triển với sự hỗ trợ của [Cursor](https://cursor.sh/) và Gemini 2.5 Pro.

## Cài đặt

Để chạy dự án này cục bộ, hãy làm theo các bước sau:

1.  **Clone repository (Nếu cần):**
    ```bash
    git clone https://github.com/thanhnn16/tiktok-uploader-gui.git
    cd tiktok-uploader-gui
    ```
2.  **Cài đặt dependencies:**
    Dự án này sử dụng `bun` làm trình quản lý gói.
    ```bash
    bun install
    ```
    *Lưu ý: Cần cài đặt các dependencies của Tauri (Rust, v.v.). Xem [hướng dẫn điều kiện tiên quyết của Tauri](https://tauri.app/v1/guides/getting-started/prerequisites).* 

## Sử dụng

### Ứng dụng Web (Next.js)

1.  **Chạy development server:**
    ```bash
    bun run dev
    ```
    Mở [http://localhost:3000](http://localhost:3000) trong trình duyệt của bạn để xem ứng dụng.

2.  **Build ứng dụng cho production:**
    ```bash
    bun run build
    ```

3.  **Chạy production server:**
    ```bash
    bun run start
    ```

### Ứng dụng Desktop (Tauri)

Ứng dụng Next.js được đóng gói bằng Tauri để tạo ra một ứng dụng desktop đa nền tảng. Mã nguồn dành riêng cho Tauri nằm trong thư mục `src-tauri`.

1.  **Chạy chế độ development Tauri:**
    Lệnh này sẽ build frontend và khởi chạy ứng dụng desktop với tính năng hot-reloading.
    ```bash
    bun run tauri dev
    ```

2.  **Build ứng dụng Tauri:**
    Lệnh này sẽ đóng gói frontend và backend Rust thành một ứng dụng desktop có thể phân phối cho nền tảng của bạn.
    ```bash
    bun run tauri build
    ```
    Sản phẩm build nằm trong thư mục `src-tauri/target/release/bundle/`.

## Đóng góp

Đóng góp luôn được chào đón! Vui lòng mở một issue hoặc pull request nếu bạn có đề xuất hoặc sửa lỗi.

## Giấy phép

Dự án này được cấp phép theo [Giấy phép MIT](LICENSE).