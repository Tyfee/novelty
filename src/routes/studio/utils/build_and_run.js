import { invoke } from "@tauri-apps/api/tauri";
import updateMain from "./update_main";
import transpileToRust from "./rustTranspiler";

export default async function buildAndRun(name, rust_code, delight_code){

    updateMain(name ,rust_code);
    const projectPath = `C:\\Novelty\\Projects\\${name}`;
    const command = 'cargo';
    const args = ['run'];
    
    const result = await invoke('call', {
      path: projectPath,
      command: command,
      args: args,
    }).then(() => {
          invoke('save_dlt', {
      projectName: name, code: delight_code
    })
    });
    console.log(rust_code)
}