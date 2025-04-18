# TikTok Uploader GUI

<div align="center">
  <img src="app-icon.png" alt="App Icon" width="128"/>
</div>

A graphical user interface (GUI) to interact with the [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) CLI tool. This project is built with Next.js, NextUI, and packaged as a desktop application using [Tauri](https://tauri.app/).

[Tiếng Việt (Vietnamese)](README.vi.md)

## Table of Contents

*   [<g-emoji class="g-emoji" alias="wave" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png">👋</g-emoji> Introduction](#introduction)
*   [<g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙️</g-emoji> How it Works](#how-it-works)
*   [🗺️ Roadmap / TODO](#️-roadmap--todo)
    *   [✨ Core Functionality](#-core-functionality)
    *   [⚙️ Settings & Configuration](#️-settings--configuration)
    *   [🖥️ User Experience & Desktop App](#️-user-experience--desktop-app)
    *   [💻 Code & Project](#-code--project)
*   [🔧 Original CLI Tool](#original-cli-tool)
*   [🙏 Acknowledgements](#acknowledgements)
*   [💾 Installation](#installation)
*   [🚀 Usage](#usage)
    *   [🌐 Web Application (Next.js)](#web-application-nextjs)
    *   [💻 Desktop Application (Tauri)](#desktop-application-tauri)
*   [🤝 Contributing](#contributing)
*   [📜 License](#license)

## <g-emoji class="g-emoji" alias="wave" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f44b.png">👋</g-emoji> Introduction

This application provides a visual way to upload videos to TikTok, leveraging the power of the `tiktok-uploader` CLI in the background. Instead of using the command line, you can manage your uploads through a user-friendly interface.

## 🗺️ Roadmap / TODO

This project is currently under active development. The UI is mostly built, but backend integration is pending.

**Legend:**
*   [ ] ⏳ TODO
*   [~] 🏗️ In Progress / Partially Implemented (UI Only)
*   [x] ✅ Done

### ✨ Core Functionality
- [ ] 🏗️ 📹 **Video Selection:** Select single or multiple videos via file dialog or drag-and-drop (UI Done).
- [ ] ⏳ 📁 **File Handling:** Process and temporarily store selected video file paths for upload.
- [ ] ⏳ 🐍 **`tiktok-uploader` Integration:**
    - [ ] ⏳ 🦀 Create Tauri commands (Rust) to invoke the `tiktok-uploader` Python script/CLI.
    - [ ] ⏳ ➡️ Pass video path, description, hashtags, mentions, privacy settings, etc., from the UI to the backend command.
    - [ ] ⏳ 📊 Handle output/progress/errors from the Python script and display them in the UI.
- [ ] 🏗️ 📝 **Video Metadata Input:** Enter Title/Caption, Hashtags, Mentions (UI Done).
- [ ] 🏗️ 🔒 **Privacy Settings:** Configure 'Allow Comments', 'Allow Duets', 'Allow Stitches' (UI Done).
- [ ] ⏳ 👥 **Audience Control:** Select 'Public', 'Friends', 'Private' (UI might need adjustment based on CLI capabilities).
- [ ] 🏗️ 📅 **Scheduling:** Select date and time for scheduled uploads (UI Done, backend logic needed).
- [ ] 🏗️ 📚 **Batch Upload:** UI for managing multiple videos with individual or common settings (UI Done, backend logic needed).
- [ ] ⏳ 🛒 **TikTok Shop / Affiliate Links:** Integrate Product ID input with CLI option (if supported).

### ⚙️ Settings & Configuration
- [ ] ⏳ 🔑 **Authentication:**
    - [ ] ⏳ 📄 UI for selecting `cookies.txt` file path.
    - [ ] ⏳ 💾 Securely store and load the cookies path.
    - [ ] ⏳ ➡️ Pass cookies path/content to the `tiktok-uploader` command.
    - [ ] ⏳ ✅ Display authentication status (e.g., "Cookies Loaded" / "Cookies Missing").
- [ ] ⏳ 🌐 **Browser Selection:** Allow users to choose the browser for Selenium (Chrome, Firefox, etc.) if needed.
- [ ] ⏳ 🔗 **Proxy Configuration:** UI and backend logic for setting proxy details (Host, Port, User, Pass).
- [ ] ⏳ 👻 **Headless Mode:** Option to run the browser headlessly.

### 🖥️ User Experience & Desktop App
- [ ] ⏳ 🛠️ **Environment Setup:**
    - [ ] ⏳ <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" width="16" height="16"> Check for Python installation on startup.
    - [ ] ⏳ <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/115px-Python-logo-notext.svg.png" alt="Pip" width="16" height="16"> Check/Install `tiktok-uploader` Python package.
    - [ ] ⏳ 📦 Consider bundling Python/dependencies or providing a one-click setup script.
- [ ] 🏗️ 🔄 **Upload Progress:** Display real-time progress during upload (Requires feedback from Python script).
- [ ] ⏳ 📈 **Upload History:** Persistently store and display a history of successful, failed, and scheduled uploads.
- [ ] ⏳ 🐛 **Error Handling:** Provide clear feedback for common errors (invalid cookies, network issues, TikTok blocks, invalid video format, etc.).
- [ ] ⏳ 🌍 **Internationalization (i18n):** Fully translate UI elements based on language selection (Currently separate READMEs).

### 💻 Code & Project
- [x] ✅ **Basic UI Structure:** Next.js frontend with shadcn/ui components.
- [x] ✅ **Tauri Integration:** Basic setup for packaging as a desktop app.
- [ ] ⏳ 🗃️ **Refine State Management:** Move beyond local `useState` for persistent data (history, settings).
- [ ] ⏳ 🧪 **Testing:** Add unit/integration tests.

## <g-emoji class="g-emoji" alias="gear" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2699.png">⚙️</g-emoji> How it Works

This application uses the `tiktok-uploader` library, which employs Selenium to automate the upload process in a web browser. It requires your TikTok session cookies to authenticate.

*   **Authentication:** You'll need to export your cookies from TikTok.com using a browser extension (like "Get cookies.txt") and upload the `cookies.txt` file in the application's settings.
*   **Supported Browsers:** Chrome (Recommended), Firefox, Edge, Safari, Chromium.
*   **Proxies:** Proxy configuration is supported (primarily via Chrome) to help avoid rate limits.
*   **Potential Issues:** Uploads might fail due to TikTok's detection methods, expired cookies, network issues, or uploading too frequently. <g-emoji class="g-emoji" alias="warning" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/26a0.png">⚠️</g-emoji>

## 🔧 Original CLI Tool

This interface relies on the [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) CLI tool by [wkaisertexas](https://github.com/wkaisertexas). Please refer to the original documentation for details on the CLI's features and options.

## 🙏 Acknowledgements

*   Huge thanks to **[wkaisertexas](https://github.com/wkaisertexas)** for creating the original [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) CLI tool, which this project builds upon.
*   The initial frontend structure was generated using [v0.dev](https://v0.dev) by Vercel.
*   The application icon (`app-icon.svg`) was generated by ChatGPT.
*   This project was developed with the assistance of [Cursor](https://cursor.sh/) and Gemini 2.5 Pro. <g-emoji class="g-emoji" alias="sparkles" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/2728.png">✨</g-emoji>

## 💾 Installation

To run this project locally, follow these steps:

1.  **Clone repository (If needed):**
    ```bash
    git clone https://github.com/thanhnn16/tiktok-uploader-gui.git
    cd tiktok-uploader-gui
    ```
2.  **Install dependencies:**
    This project uses `bun` as the package manager.
    ```bash
    bun install
    ```
    *Note: Tauri dependencies (Rust, etc.) are also required. See the [Tauri prerequisites guide](https://tauri.app/v1/guides/getting-started/prerequisites).*

## 🚀 Usage

### 🌐 Web Application (Next.js)

1.  **Run development server:**
    ```bash
    bun run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

2.  **Build the application for production:**
    ```bash
    bun run build
    ```

3.  **Run production server:**
    ```bash
    bun run start
    ```

### 💻 Desktop Application (Tauri)

The Next.js application is wrapped using Tauri to create a cross-platform desktop app. The Tauri-specific code resides in the `src-tauri` directory.

1.  **Run Tauri development mode:**
    This will build the frontend and launch the desktop application with hot-reloading.
    ```bash
    bun run tauri dev
    ```

2.  **Build Tauri application:**
    This will bundle the frontend and the Rust backend into a distributable desktop application for your platform.
    ```bash
    bun run tauri build
    ```
    The output can be found in `src-tauri/target/release/bundle/`.

## 🤝 Contributing

Contributions are welcome! Please open an issue or pull request if you have suggestions or bug fixes. <g-emoji class="g-emoji" alias="raised_hands" fallback-src="https://github.githubassets.com/images/icons/emoji/unicode/1f64c.png">🙌</g-emoji>

## 📜 License

This project is licensed under the [MIT License](LICENSE).