import { invoke } from "@tauri-apps/api";

export default async function run(name){
    const projectPath = `C:/Novelty/Projects/${name}`;

    // Command and arguments
    const command = 'cargo';
    const args = ['run'];

    // Call the Rust command
    const result = await invoke('call', {
      path: projectPath,
      command: command,
      args: args,
    });
}