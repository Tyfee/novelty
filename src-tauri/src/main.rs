use std::fmt::format;
use std::process::Command;
use rfd::FileDialog;
use std::fs::{self, File};
use std::io::{self, Write};
use std::path::Path;
use tokio::fs::write;
use tokio::fs as tokio_fs;
use tokio::runtime::Runtime;
use std::path::PathBuf;
use chrono::prelude::*;
use serde::Serialize;


// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
async fn edit_project(path: String, name: String,new_name: String, new_description: String) -> Result<(), String>{
    let now: DateTime<Utc> = Utc::now();
    let dir = Path::new(&path).join(&name);
    let new_dir = Path::new(&path).join(&new_name);
   let file_path = Path::new(&path).join(&name).join("project.nvl");
   let file_content: String = format!(
    "name: {}
   \n description: {}
    \ndate: {}
    \nscenes:", new_name,new_description, now.format("%Y-%m-%d %H:%M:%S"));
write_file(file_path, &file_content)
.await
.map_err(|e| format!("Error editing the project {}", e))?;

tokio_fs::rename(dir, new_dir).
await
.map_err(|e| format!("Couldn't rename folder, please restart project {}", e))?;

Ok(())
}

#[tauri::command]
async fn delete_project(path: String, name: String) -> Result<(), String>{
let project_path = Path::new(&path).join(&name);

tokio_fs::remove_dir_all(&project_path)
.await
.map_err(|e| format!("Failed to delete project {}", e))?;
println!("Project {:?} has been deleted successfully", name);
Ok(())
}
//whole project initialization pipeline. it creates a folder in c:/projects then creates the assets and the cargo.toml and main.rs files.

#[tauri::command]
async fn fetch_settings(path: String) -> Result<String, String>{

let full_path = Path::new(&path).join("settings.json");
println!("Full path: {}", full_path.display());
let settings = tokio_fs::read_to_string(full_path)
.await
.map_err(|e| format!("Error fetching settings: {}", e))?;

Ok(settings)
}
#[tauri::command]
async fn load_nvl_file(path: String, name: String) -> Result<String, String>{
    let full_path = Path::new(&path).join(&name).join("project.nvl");
    println!("Full path: {}", full_path.display());
let data = tokio_fs::read_to_string(full_path)
.await
.map_err(|e| format!("Error fetching file data for {}, error: ", e))?;

Ok(data)
}

#[tauri::command]
async fn save_settings(path: String,
    theme: String,
    language: String,
    save_path: String,
    auto_update: bool,
    auto_save: bool) -> Result<(), String> {
    let project_path = Path::new(&path);

    if !project_path.exists(){
        tokio_fs::create_dir_all(project_path)
        .await
        .map_err(|e| format!("Failed to initialize folder! {}", e))?;
    }
    let source_path = project_path.join("settings.json");
    println!("Settings initialized at: {:?}", source_path);
     let settings_content: String = format!(r#"[
     {{ 
       "theme": "{}",
       "language": "{}",
       "save_path": "{}",
       "auto_update": {},
       "auto_save": {}
     }}
     ]"#, theme, language, save_path.replace("\\", "\\\\"), auto_update, auto_save);
    write_file(source_path, &settings_content).await
    .map_err(|e| format!("We couldn't save your setting files! {}", e))?;
    Ok(())
}

#[tauri::command]
async fn create_project(path: String, name: String, description: String) -> Result<(), String> {
    let project_path = Path::new(&path).join(&name);

    tokio_fs::create_dir_all(&project_path)
        .await
        .map_err(|e| format!("Failed to create directory: {}", e))?;
    println!("Created project directory at: {:?}", project_path);
    let file_path = project_path.join("project.nvl");
    let now: DateTime<Utc> = Utc::now();
    let file_content: String = format!(
        "name: {}
       \n description: {}
        \ndate: {}
        \nscenes:", name,description, now.format("%Y-%m-%d %H:%M:%S"));
    let cargo_toml = project_path.join("cargo.toml");
    let cargo_content = format!(
        r#"[package]
    name = "{}"
    version = "0.1.0"
    edition = "2021"
    
    [dependencies]
    macroquad = {{ version = "0.4", features = ["audio"] }}
    "#,
        name
    );
    let source_path = project_path.join("main.dlt");
    let source_code: String = "window_title \"idk\";

\nscene main_menu;
\nscene city;
\nbg '/src/assets/bg/4258797.jpg';
\nbg '/src/assets/bg/bg01.jpg';

\nchar me;
\nchar Dude;
\nchar Guy;

audio love;

// main_menu.play_bgm -> 'love'; 

main_menu.draw_background -> src: '/src/assets/bg/4258797.jpg'; 

city.draw_background -> src: '/src/assets/bg/bg01.jpg'; 

main_menu.write -> 'start', x: 0, y: 200, color: white, size: 30; ".to_string();
    let main_rs: PathBuf = project_path.join("src").join("main.rs");
    let default_code = format!(
        "use macroquad::prelude::*; \n\n#[macroquad::main(\"{}\")] \nasync fn main() {{ \nloop {{ \nclear_background(LIGHTGRAY); \nnext_frame().await \n}} \n}}",
        name 
    );
 
    write_file(file_path, &file_content).await;
    write_file(cargo_toml, &cargo_content).await;
    write_file(source_path, &source_code).await;
    tokio_fs::create_dir_all(&project_path.join("src"))
    .await
    .map_err(|e| format!("Failed to create directory: {}", e))?;

    tokio_fs::create_dir_all(&project_path.join("assets"))
    .await
    .map_err(|e| format!("Failed to create directory: {}", e))?;

    tokio_fs::create_dir_all(&project_path.join("assets").join("scenes"))
    .await
    .map_err(|e| format!("Failed to create directory: {}", e))?;

     
    tokio_fs::create_dir_all(&project_path.join("assets").join("images"))
    .await
    .map_err(|e| format!("Failed to create directory: {}", e))?;

     
    tokio_fs::create_dir_all(&project_path.join("assets").join("audio"))
    .await
    .map_err(|e| format!("Failed to create directory: {}", e))?;


write_file(main_rs, &default_code).await;


//CARGO COMMAND TO START PROJECT

let package= "cargo";
let mut arguments: Vec<String> = vec![
    "build".to_string()
];
let result = call(project_path, package.to_string(), arguments).await?;
println!("Cargo init result: {}", result);
    Ok(())
    
}
#[tauri::command]
async fn write_file(path: PathBuf, contents: &str) -> Result<(), String> {
    let mut file = File::create(&path)
        
        .map_err(|e| format!("Failed to init project: {}", e))?;
    file.write_all(contents.as_bytes())
        .map_err(|e| format!("Failed to save project info: {}", e))?;
    Ok(())
}

#[tauri::command]
async fn load_file(from: String, name: String, file_type: String, file_name: String) -> Result<(), String> {
    let mut to = PathBuf::from("C:\\Novelty\\Projects\\");
    to.push(name);
    to.push(file_type);
    to.push(file_name);

    fs::copy(from, &to)
    .map_err(|e| e.to_string())?;

Ok(())
}



#[tauri::command]
async fn call(path: PathBuf, command: String, args: Vec<String>) -> Result<String, String> {
    // Log the command details
    println!("Executing command: {:?}", command);
    println!("With arguments: {:?}", args);
    println!("In directory: {:?}", path);

    let result = Command::new(&command)
        .args(&args)
        .current_dir(&path)
        .output()
        .map_err(|e| format!("Failed to run command: {}", e))?;

    // Log the output and error
    println!("Command output: {:?}", String::from_utf8_lossy(&result.stdout));
    println!("Command error: {:?}", String::from_utf8_lossy(&result.stderr));

    if !result.status.success() {
        return Err(format!(
            "Command failed with exit code {}: {}",
            result.status.code().unwrap_or(-1),
            String::from_utf8_lossy(&result.stderr)
        ));
    }

    Ok(String::from_utf8_lossy(&result.stdout).to_string())
}

#[tauri::command] 
async fn fetch_project_info(){

}

#[tauri::command]
async fn open_project() -> Result<Option<String>, String> {
    // Open the file dialog and get the selected file path
    if let Some(path) = FileDialog::new().pick_file() {
        // Return the path as a string
        Ok(Some(path.to_str().unwrap_or("").to_string()))
    } else {
        Ok(None)  // No file selected
    }
}


#[tauri::command]
async fn fetch_projects() ->  Result<Vec<String>, String>{
let paths = fs::read_dir("C:\\Novelty\\Projects")
.map_err(|e| format!("Failed to read directory: {}", e))?;

let mut project_paths = Vec::new();

for entry in paths {
let entry = entry.map_err(|e| format!("Failed to read directory entry: {}", e))?;
let path = entry.path();
if let Some(path_str) = path.to_str() {
    project_paths.push(path_str.to_string());
}
}

Ok(project_paths)
}

fn main() {
    tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
        greet,
        edit_project,
         create_project, 
         fetch_settings, 
         save_settings,delete_project,
         write_file, call, 
         fetch_projects,
          open_project, 
          load_file,
          load_nvl_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
