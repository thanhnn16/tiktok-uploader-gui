# TikTok Uploader GUI

<div align="center">
  <img src="app-icon.png" alt="App Icon" width="128"/>
</div>

A graphical user interface (GUI) to interact with the [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) CLI tool. This project is built with Next.js, NextUI, and packaged as a desktop application using [Tauri](https://tauri.app/).

[Tiếng Việt (Vietnamese)](README.vi.md)

## Introduction

This application provides a visual way to upload videos to TikTok, leveraging the power of the `tiktok-uploader` CLI in the background. Instead of using the command line, you can manage your uploads through a user-friendly interface.

## Features (Planned)

*   Easily select videos via the graphical interface.
*   Enter title, description, and other options for the video.
*   Track upload progress.
*   Manage upload history (if available).
*   Schedule uploads.
*   Batch upload multiple videos.
*   Configure `tiktok-uploader` options, including browser selection and proxy settings.

## How it Works

This application uses the `tiktok-uploader` library, which employs Selenium to automate the upload process in a web browser. It requires your TikTok session cookies to authenticate.

*   **Authentication:** You'll need to export your cookies from TikTok.com using a browser extension (like "Get cookies.txt") and upload the `cookies.txt` file in the application's settings.
*   **Supported Browsers:** Chrome (Recommended), Firefox, Edge, Safari, Chromium.
*   **Proxies:** Proxy configuration is supported (primarily via Chrome) to help avoid rate limits.
*   **Potential Issues:** Uploads might fail due to TikTok's detection methods, expired cookies, network issues, or uploading too frequently.

## Original CLI Tool

This interface relies on the [tiktok-uploader](https://github.com/wkaisertexas/tiktok-uploader) CLI tool by [wkaisertexas](https://github.com/wkaisertexas). Please refer to the original documentation for details on the CLI's features and options.

## Installation

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

## Usage

### Web Application (Next.js)

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

### Desktop Application (Tauri)

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

## Contributing

Contributions are welcome! Please open an issue or pull request if you have suggestions or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).