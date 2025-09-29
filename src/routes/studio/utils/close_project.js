import { goto } from "$app/navigation";
import { appWindow } from "@tauri-apps/api/window";

export default async function closeProject(){
    
    const newTitle = `Novelty`;
    await appWindow.setTitle(newTitle);
    goto("/")

}