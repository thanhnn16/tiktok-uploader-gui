# Project Structure

This document outlines the intended directory structure for the TikTok Uploader GUI project.

```
.
├── .git/               # Git repository files
├── .next/              # Next.js build output
├── .vscode/            # VS Code settings (optional)
├── app/                # Next.js App Router directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Root page
│   └── providers.tsx   # UI providers (NextUI, Theme)
│   └── api/            # API routes (if needed later)
│   └── (routes)/       # Feature-based route groups
├── components/         # Shared React components
│   └── theme-switcher.tsx # Component to toggle theme
├── public/             # Static assets (images, fonts)
├── src-tauri/          # Tauri Rust backend source
│   ├── src/            # Rust source code
│   │   └── main.rs     # Main Rust entry point
│   │   └── commands.rs # Tauri command handlers
│   │   └── models.rs   # Data structures
│   │   └── db.rs       # Database interactions
│   │   └── python.rs   # Python script execution logic
│   ├── build.rs        # Tauri build script
│   └── tauri.conf.json # Tauri configuration
├── node_modules/       # Project dependencies
├── .env.example        # Example environment variables
├── .gitignore          # Files ignored by Git
├── bun.lockb           # Bun lockfile
├── next.config.mjs     # Next.js configuration
├── package.json        # Project metadata and dependencies
├── postcss.config.mjs  # PostCSS configuration
├── project-structure.md # This file
├── README.md           # Project overview
├── tasklist.md         # Project tasks and sprints
├── technical-specs.md  # Detailed technical specifications
└── tsconfig.json       # TypeScript configuration
```

## Key Directories

-   **`app/`**: Contains all Next.js frontend code, following the App Router conventions. UI components specific to a route might live within that route's folder, while shared components are in `components/`.
-   **`components/`**: Houses reusable React components shared across different parts of the application.
-   **`src-tauri/`**: Contains all the Rust code for the Tauri backend, including command handlers, application logic, and configuration.
-   **`public/`**: Stores static assets accessible directly via URL. 