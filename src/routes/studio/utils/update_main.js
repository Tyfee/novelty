import { invoke } from "@tauri-apps/api/tauri";
import transpileToRust from "./rustTranspiler";
export default async function updateMain(name, rust_code){

 
    const projectPath = `C:\\Novelty\\Projects\\${name}\\src\\main.rs`;
 
    
    console.log("setting " + rust_code + "to " + projectPath)
    const result = await invoke('write_file', {
      path: projectPath,
      contents: rust_code,
    });
    console.log(result)
}