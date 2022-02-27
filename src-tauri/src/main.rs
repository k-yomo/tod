#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod cmd;
mod app_data;

fn main() {
  tauri::Builder::default()
      .invoke_handler(tauri::generate_handler![
      cmd::get_markdown,
      cmd::save_markdown,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
