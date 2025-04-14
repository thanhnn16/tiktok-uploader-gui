use std::{fs, env}; // Import the standard fs and env modules
use log::info; // Import log macro

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// New command to list directory items
#[tauri::command]
async fn list_dir_items(_app_handle: tauri::AppHandle, path: String) -> Result<Vec<String>, String> {
    // Get the current working directory
    let current_dir = env::current_dir()
        .map_err(|e| format!("Failed to get current working directory: {}", e))?;

    // Join the current directory with the provided path
    let resolved_path = current_dir.join(&path);

    info!("Attempting to read directory: {}", resolved_path.display()); // Log the path

    // Read the directory using standard Rust fs
    match fs::read_dir(&resolved_path) {
        Ok(entries) => {
            let item_names: Result<Vec<String>, _> = entries
                .map(|entry_result| {
                    entry_result
                        .map(|entry| entry.file_name().to_string_lossy().into_owned())
                        .map_err(|e| format!("Failed to process directory entry: {}", e)) // Map IO error
                })
                .collect(); // Collect results, handling potential errors in entry reading

            item_names // Return the Result<Vec<String>, String>
        }
        Err(e) => Err(format!(
            "Failed to read directory '{}': {}",
            resolved_path.display(),
            e
        )),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .plugin(tauri_plugin_fs::init()) // Register the FS plugin
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![greet, list_dir_items])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
