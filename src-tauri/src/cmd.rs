use crate::app_data::{AppData};
use tauri::{command, AppHandle};

#[command]
pub fn get_markdown(app: AppHandle) -> Result<String, String> {
    let markdown = AppData::new(app.path_resolver().app_dir()).get_markdown();
    Ok(markdown.unwrap_or_default())
}

#[command]
pub fn save_markdown(app: AppHandle, markdown: String) -> Result<String, String> {
    AppData::new(app.path_resolver().app_dir())
        .save_markdown(markdown)
        .expect("error while saving markdown");
    Ok("ok".to_string())
}
