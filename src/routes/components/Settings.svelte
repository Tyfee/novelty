<script lang="ts">
    import { NativeSelect, Text, Textarea, Button, Checkbox, TextInput, Title } from '@svelteuidev/core';
import { invoke } from '@tauri-apps/api/tauri';
    import './modal.css';
    import '../../themes.css'
    import toast, { Toaster } from 'svelte-french-toast';
  
    let themes: Array<string> = ["theme-dark", "theme-light", "theme-pastel"];
    let languages: Array<string> = ["English", "Português", "Français", "日本語", "Espanõl"];
  
    $: auto_save = true;
   export let theme: string;
    $: language = "English";
    $: save_path = "C:\\Novelty\\Projects";
    $: auto_update = false;
    export let onClose: any;
    export let onChooseLanguage: (lang: string) => void;
    export let onSaveSettings: (new_settings: any[]) => void;
    export let onChooseTheme: (theme: string) => void;
    export let current_language: any;

    $: l = current_language[0];
    async function save() {

      toast.success("New settings saved!");

let saving_data = [{
  theme,
  language,
  save_path,
  auto_update,
  auto_save,
}]


await invoke("save_settings", {path: "C:\\Novelty\\",
theme: saving_data[0].theme,
  language: saving_data[0].language,
  savePath: saving_data[0].save_path,
  autoUpdate: saving_data[0].auto_update,
  autoSave: saving_data[0].auto_save,
})    

onSaveSettings(
[{  theme: saving_data[0].theme,
  language: saving_data[0].language,
  savePath: saving_data[0].save_path,
  autoUpdate: saving_data[0].auto_update,
  autoSave: saving_data[0].auto_save}]
)
    }
  </script>
  <Toaster/>
  <div class="modal {theme}">
    <div class="title-bar {theme}">
      <h1>{l.s}</h1>
      <button on:click={onClose}>&times;</button>
    </div>
    <div class="content {theme}">
        
       
        <TextInput
        label={`${l.dpfp}: `}
        
        placeholder="Pick one"
        bind:value={save_path}
      />
      <NativeSelect
      label={`${l.l}: `}
        data={languages}
        placeholder="Pick one"
        bind:value={language}
        on:change={() => onChooseLanguage(language)}
      />
      <NativeSelect
        label={l.t}
        data={themes}
        placeholder="Pick a theme"
        bind:value={theme}
        on:change={() => onChooseTheme(theme)}
      />
      <p></p>
      <Checkbox
        bind:checked={auto_save}
        label={l.as}
      />
      <p></p>
      <Checkbox
        bind:checked={auto_update}
        label="Allow Novelty to look for updates"
      />
    </div>
    <div class="footer">
      <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
        Discard 
      </Button>
      <Button on:click={save} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
        Save
      </Button>
    </div>
  </div>
  