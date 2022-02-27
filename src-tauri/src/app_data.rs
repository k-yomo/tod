use std::fs::OpenOptions;
use std::io::{self, Write};
use std::path::PathBuf;

pub struct AppData {
    app_dir: Option<PathBuf>,
}

impl AppData {
    pub fn new(app_dir: Option<PathBuf>) -> Self {
        Self { app_dir }
    }

    fn get_data_path(&self) -> String {
        let app_dir_path = self
            .app_dir
            .as_ref()
            .expect("Couldn't determine app directory");

        if !app_dir_path.exists() {
            std::fs::create_dir(&app_dir_path).expect("Couldn't create app directory");
        }

        let data_path = &app_dir_path.join("markdown.txt");
        let path = data_path.to_str().expect("Couldn't build app data file");

        path.to_string()
    }

    pub fn get_markdown(&self) -> io::Result<String> {
        std::fs::read_to_string(self.get_data_path())
    }

    pub fn save_markdown(&self, markdown: String) -> io::Result<()> {
        let mut file = OpenOptions::new()
            .write(true)
            .truncate(true)
            .create(true)
            .open(self.get_data_path())?;
        file.write_all(markdown.as_bytes())?;
        file.flush()?;
        Ok(())
    }
}
