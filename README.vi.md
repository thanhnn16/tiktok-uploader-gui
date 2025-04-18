# TikTok Uploader GUI

<div align="center">
  <img src="app-icon.png" alt="App Icon" width="128"/>
</div>

Một giao diện người dùng đồ họa (GUI) để tương tác với công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader). Dự án này được xây dựng bằng Next.js, NextUI và đóng gói thành ứng dụng desktop sử dụng [Tauri](https://tauri.app/).

[English (Tiếng Anh)](README.md)

## Mục lục

*   [<g-emoji class="g-emoji" alias="wave" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png">👋</g-emoji> Giới thiệu](#giới-thiệu)
*   [<g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙️</g-emoji> Cách thức hoạt động](#cách-thức-hoạt-động)
*   [🗺️ Lộ trình / TODO](#️-lộ-trình--todo)
    *   [✨ Chức năng Cốt lõi](#-chức-năng-cốt-lõi)
    *   [⚙️ Cài đặt & Cấu hình](#️-cài-đặt--cấu-hình)
    *   [🖥️ Trải nghiệm Người dùng & Ứng dụng Desktop](#️-trải-nghiệm-người-dùng--ứng-dụng-desktop)
    *   [💻 Mã nguồn & Dự án](#-mã-nguồn--dự-án)
*   [🔧 Công cụ CLI gốc](#công-cụ-cli-gốc)
*   [🙏 Lời cảm ơn](#lời-cảm-ơn)
*   [💾 Cài đặt](#cài-đặt)
*   [🚀 Sử dụng](#sử-dụng)
    *   [🌐 Ứng dụng Web (Next.js)](#ứng-dụng-web-nextjs)
    *   [💻 Ứng dụng Desktop (Tauri)](#ứng-dụng-desktop-tauri)
*   [🤝 Đóng góp](#đóng-góp)
*   [📜 Giấy phép](#giấy-phép)

## <g-emoji class="g-emoji" alias="wave" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png">👋</g-emoji> Giới thiệu

Ứng dụng này cung cấp một cách trực quan để tải video lên TikTok, sử dụng sức mạnh của `tiktok-uploader` CLI ở phía sau. Thay vì sử dụng dòng lệnh, bạn có thể quản lý các lần tải lên của mình thông qua giao diện thân thiện với người dùng.

## 🗺️ Lộ trình / TODO

Dự án này hiện đang trong giai đoạn phát triển tích cực. Giao diện người dùng phần lớn đã được xây dựng, nhưng việc tích hợp backend vẫn đang chờ xử lý.

**Chú thích:**
-   [ ] ⏳ Cần làm
-   [~] 🏗️ Đang thực hiện / Đã triển khai một phần (Chỉ UI)
-   [x] ✅ Đã xong

### ✨ Chức năng Cốt lõi
- [ ] 🏗️ 📹 **Chọn Video:** Chọn một hoặc nhiều video qua hộp thoại tệp hoặc kéo thả (UI Đã xong).
- [ ] ⏳ 📁 **Xử lý Tệp:** Xử lý và lưu trữ tạm thời đường dẫn tệp video đã chọn để tải lên.
- [ ] ⏳ 🐍 **Tích hợp `tiktok-uploader`:**
    - [ ] ⏳ 🦀 Tạo các lệnh Tauri (Rust) để gọi script/CLI Python `tiktok-uploader`.
    - [ ] ⏳ ➡️ Truyền đường dẫn video, mô tả, hashtag, lượt nhắc, cài đặt riêng tư, v.v., từ UI đến lệnh backend.
    - [ ] ⏳ 📊 Xử lý output/tiến trình/lỗi từ script Python và hiển thị chúng trong UI.
- [ ] 🏗️ 📝 **Nhập Metadata Video:** Nhập Tiêu đề/Chú thích, Hashtag, Lượt nhắc (UI Đã xong).
- [ ] 🏗️ 🔒 **Cài đặt Quyền riêng tư:** Cấu hình 'Cho phép Bình luận', 'Cho phép Duet', 'Cho phép Stitch' (UI Đã xong).
- [ ] ⏳ 👥 **Kiểm soát Đối tượng:** Chọn 'Công khai', 'Bạn bè', 'Riêng tư' (UI có thể cần điều chỉnh dựa trên khả năng của CLI).
- [ ] 🏗️ 📅 **Lên lịch:** Chọn ngày và giờ để lên lịch tải lên (UI Đã xong, cần logic backend).
- [ ] 🏗️ 📚 **Tải lên Hàng loạt:** UI để quản lý nhiều video với cài đặt riêng lẻ hoặc chung (UI Đã xong, cần logic backend).
- [ ] ⏳ 🛒 **TikTok Shop / Liên kết Affiliate:** Tích hợp nhập Product ID với tùy chọn CLI (nếu được hỗ trợ).

### ⚙️ Cài đặt & Cấu hình
- [ ] ⏳ 🔑 **Xác thực:**
    - [ ] ⏳ 📄 UI để chọn đường dẫn tệp `cookies.txt`.
    - [ ] ⏳ 💾 Lưu trữ và tải đường dẫn cookie một cách an toàn.
    - [ ] ⏳ ➡️ Truyền đường dẫn/nội dung cookie đến lệnh `tiktok-uploader`.
    - [ ] ⏳ ✅ Hiển thị trạng thái xác thực (ví dụ: "Đã tải Cookie" / "Thiếu Cookie").
- [ ] ⏳ 🌐 **Chọn Trình duyệt:** Cho phép người dùng chọn trình duyệt cho Selenium (Chrome, Firefox, v.v.) nếu cần.
- [ ] ⏳ 🔗 **Cấu hình Proxy:** UI và logic backend để đặt chi tiết proxy (Host, Port, User, Pass).
- [ ] ⏳ 👻 **Chế độ Headless:** Tùy chọn chạy trình duyệt không giao diện.

### 🖥️ Trải nghiệm Người dùng & Ứng dụng Desktop
- [ ] ⏳ 🛠️ **Thiết lập Môi trường:**
    - [ ] ⏳ <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" width="16" height="16"> Kiểm tra cài đặt Python khi khởi động.
    - [ ] ⏳ <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/115px-Python-logo-notext.svg.png" alt="Pip" width="16" height="16"> Kiểm tra/Cài đặt gói Python `tiktok-uploader`.
    - [ ] ⏳ 📦 Cân nhắc đóng gói Python/dependencies hoặc cung cấp script cài đặt bằng một cú nhấp chuột.
- [ ] 🏗️ 🔄 **Tiến trình Tải lên:** Hiển thị tiến trình thời gian thực trong quá trình tải lên (Yêu cầu phản hồi từ script Python).
- [ ] ⏳ 📈 **Lịch sử Tải lên:** Lưu trữ liên tục và hiển thị lịch sử các lần tải lên thành công, thất bại và đã lên lịch.
- [ ] ⏳ 🐛 **Xử lý Lỗi:** Cung cấp phản hồi rõ ràng cho các lỗi phổ biến (cookie không hợp lệ, sự cố mạng, TikTok chặn, định dạng video không hợp lệ, v.v.).
- [ ] ⏳ 🌍 **Quốc tế hóa (i18n):** Dịch đầy đủ các yếu tố UI dựa trên lựa chọn ngôn ngữ (Hiện tại là các tệp README riêng biệt).

### 💻 Mã nguồn & Dự án
- [x] ✅ **Cấu trúc UI Cơ bản:** Frontend Next.js với các thành phần shadcn/ui.
- [x] ✅ **Tích hợp Tauri:** Cài đặt cơ bản để đóng gói thành ứng dụng desktop.
- [ ] ⏳ 🗃️ **Tinh chỉnh Quản lý Trạng thái:** Vượt ra ngoài `useState` cục bộ cho dữ liệu liên tục (lịch sử, cài đặt).
- [ ] ⏳ 🧪 **Kiểm thử:** Thêm các bài kiểm tra đơn vị/tích hợp.

## <g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙️</g-emoji> Cách thức hoạt động

Ứng dụng này sử dụng thư viện `tiktok-uploader`, vốn dùng Selenium để tự động hóa quá trình tải lên trong trình duyệt web. Nó yêu cầu cookie phiên TikTok của bạn để xác thực.

*   **Xác thực:** Bạn cần xuất cookie từ TikTok.com bằng tiện ích mở rộng trình duyệt (ví dụ: "Get cookies.txt") và tải tệp `cookies.txt` lên trong phần cài đặt của ứng dụng.
*   **Trình duyệt được hỗ trợ:** Chrome (Khuyến nghị), Firefox, Edge, Safari, Chromium.
*   **Proxy:** Hỗ trợ cấu hình proxy (chủ yếu qua Chrome) để giúp tránh giới hạn tốc độ.
*   **Sự cố tiềm ẩn:** Việc tải lên có thể thất bại do các phương pháp phát hiện của TikTok, cookie hết hạn, sự cố mạng hoặc tải lên quá thường xuyên. <g-emoji class="g-emoji" alias="warning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/26a0.png">⚠️</g-emoji>

## 🔧 Công cụ CLI gốc

Giao diện này hoạt động dựa trên công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) của [wkaisertexas](https://github.com/wkaisertexas). Vui lòng tham khảo tài liệu gốc để biết chi tiết về các tính năng và tùy chọn của CLI.

## 🙏 Lời cảm ơn

*   Xin chân thành cảm ơn **[wkaisertexas](https://github.com/wkaisertexas)** đã tạo ra công cụ CLI [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) gốc, nền tảng cho dự án này.
*   Cấu trúc frontend ban đầu được tạo bằng [v0.dev](https://v0.dev) của Vercel.
*   Biểu tượng ứng dụng (`app-icon.svg`) được tạo bởi ChatGPT.
*   Dự án này được phát triển với sự hỗ trợ của [Cursor](https://cursor.sh/) và Gemini 2.5 Pro. <g-emoji class="g-emoji" alias="sparkles" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2728.png">✨</g-emoji>

## 💾 Cài đặt

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

## 🚀 Sử dụng

### 🌐 Ứng dụng Web (Next.js)

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

### 💻 Ứng dụng Desktop (Tauri)

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

## 🤝 Đóng góp

Đóng góp luôn được chào đón! Vui lòng mở một issue hoặc pull request nếu bạn có đề xuất hoặc sửa lỗi. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji>

## 📜 Giấy phép

Dự án này được cấp phép theo [Giấy phép MIT](LICENSE).