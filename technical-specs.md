# 🔧 TIKTOK UPLOADER GUI - TECHNICAL SPECIFICATIONS

## 🖥️ Technology Stack

### Frontend
- **Framework**: Next.js 15.x App Router
- **UI Library**: NextUI (Built on React Aria & Tailwind CSS)
- **Language**: TypeScript

### Backend
- **Framework**: Tauri 2.x
- **Language**: Rust
- **Python Integration**: Python 3.9+

### Storage
- **Local Storage**: SQLite
- **File System**: Local file system for videos and cookies

## 📦 Dependencies
- **Package Management**: bun

### Rust Dependencies
```toml
[dependencies]
tauri = { version = "2.0", features = [] }
tauri-plugin-dialog = "2.0"
tauri-plugin-fs = "2.0"
tauri-plugin-shell = "2.0"
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }
serde = { version = "1.0", features = ["derive"] }
serde_json = "1.0"
rusqlite = { version = "0.29", features = ["bundled"] }
chrono = "0.4"
```

### JavaScript Dependencies
```json
{
  "dependencies": {
    "@nextui-org/react": "^2.x.x",
    "framer-motion": "^11.x.x",
    "@tauri-apps/api": "^2.0.0",
    "date-fns": "^2.30.0",
    "chart.js": "^4.0.0",
    "xlsx": "^0.18.0",
    "papaparse": "^5.4.0"
  }
}
```

### Python Dependencies
```
tiktok-uploader>=1.0.0
selenium>=4.10.0
webdriver-manager>=4.0.0
pandas>=2.0.0
openpyxl>=3.1.0
```

## 🏗️ Architecture

### Component Architecture
```
+--------------------+        +--------------------+
|  Next.js + NextUI  |<------>|  Tauri (Rust)      |
|    Frontend        |        |                    |
+--------------------+        +--------------------+
         |                            |
         |                            |
+--------------------+        +--------------------+
|  User Interface    |        |  Python Scripts    |
+--------------------+        +--------------------+
         |                            |
         v                            v
+--------------------+        +--------------------+
|  Local Storage     |        |  TikTok API        |
+--------------------+        +--------------------+
```

### Data Flow
1. User interacts with Next.js + NextUI components
2. UI calls Tauri commands (Rust)
3. Rust executes Python scripts with tiktok-uploader
4. Results are returned back through Rust to UI
5. UI updates with status and feedback

## 📝 API Specifications

### Tauri Commands

#### Authentication Commands
```rust
#[tauri::command]
async fn validate_cookies(cookie_path: String) -> Result<bool, String>;

#[tauri::command]
async fn list_accounts() -> Result<Vec<Account>, String>;

#[tauri::command]
async fn add_account(name: String, cookie_path: String) -> Result<(), String>;

#[tauri::command]
async fn remove_account(name: String) -> Result<(), String>;
```

#### Upload Commands
```rust
#[tauri::command]
async fn upload_video(
    video_path: String,
    description: String,
    account: String,
    browser: Option<String>,
    headless: Option<bool>,
    privacy: Option<String>
) -> Result<UploadResult, String>;

#[tauri::command]
async fn upload_multiple_videos(
    videos: Vec<VideoDetails>,
    account: String,
    browser: Option<String>,
    headless: Option<bool>
) -> Result<Vec<UploadResult>, String>;

#[tauri::command]
async fn schedule_upload(
    video_details: VideoDetails,
    account: String,
    schedule_time: String
) -> Result<(), String>;
```

#### Queue Management Commands
```rust
#[tauri::command]
async fn get_queue() -> Result<Vec<QueueItem>, String>;

#[tauri::command]
async fn add_to_queue(item: QueueItem) -> Result<(), String>;

#[tauri::command]
async fn remove_from_queue(id: i64) -> Result<(), String>;

#[tauri::command]
async fn reorder_queue(from_index: usize, to_index: usize) -> Result<(), String>;
```

### Data Models

#### Account Model
```typescript
interface Account {
  id: number;
  name: string;
  cookiePath: string;
  createdAt: string;
  lastUsed: string | null;
}
```

#### Video Details Model
```typescript
interface VideoDetails {
  id?: number;
  videoPath: string;
  description: string;
  privacy?: 'public' | 'friends' | 'private';
  tags?: string[];
}
```

#### Upload Result Model
```typescript
interface UploadResult {
  success: boolean;
  videoPath: string;
  message: string;
  timestamp: string;
  accountName: string;
}
```

#### Queue Item Model
```typescript
interface QueueItem {
  id?: number;
  videoDetails: VideoDetails;
  accountName: string;
  scheduledFor: string | null;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}
```

## 🔐 Security Considerations

### Cookie Handling
- Store cookies in user's home directory with appropriate permissions
- Do not transmit cookies over the network
- Use platform-specific secure storage where available

### File Access
- Limit file access to specified directories
- Validate file types before processing
- Handle user data with appropriate permissions

### Python Integration
- Sanitize all inputs to Python scripts
- Handle Python script execution in isolated processes
- Capture and properly handle all Python errors

## 🧪 Testing Requirements

### Unit Tests
- Test all Rust commands in isolation
- Test UI components with React Testing Library/Vitest
- Test Python scripts with pytest

### Integration Tests
- Test Rust-to-Python communication
- Test UI-to-Rust communication
- Test end-to-end upload flow

### Performance Tests
- Test large batch uploads
- Test scheduling system with multiple scheduled uploads
- Test application with large history database

## 📱 Responsive Design

### Breakpoints
- **Small**: 0-640px
- **Medium**: 641-768px
- **Large**: 769-1024px
- **Extra Large**: 1025px+

### Layout Strategy
- Utilize NextUI layout components (e.g., Card, Grid, Spacer)
- Single column layout on mobile
- Responsive grid/flex layouts for larger screens
- Sidebar navigation using NextUI components
- Use NextUI Modals for interactions

## 🌐 Internationalization

### Supported Languages
- English (default)
- Vietnamese

### Localization Strategy
- Use JSON files for translations
- Support date/time format localization
- Support number formatting
- Right-to-left language support

## 🚀 Performance Targets

- Initial load time: < 2 seconds
- Time to interact: < 1 second
- Upload initiation: < 500ms
- Maximum memory usage: < 500MB
- CPU usage during upload: < 50% of a single core 