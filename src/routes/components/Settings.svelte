<script lang="ts">
    import { NativeSelect, Text, Textarea, Button, Checkbox, TextInput, Title } from '@svelteuidev/core';
    import { invoke } from '@tauri-apps/api';
    import './modal.css';
  
    let themes: Array<string> = ["dark", "light", "pastel"];
    let languages: Array<string> = ["English", "Português", "Français", "日本語"];
  
    let auto_save: boolean = true;
    let theme: string = 'pastel';
    let language: string = "English";
    let save_path: string = "C:\\Novelty\\Projects";
    let auto_update: boolean;
    export let onClose: any;
  
    function save() {
      // Save logic here
    }
  </script>
  
  <div class="modal">
    <div class="title-bar">
      <h1>Settings</h1>
      <button on:click={onClose}>&times;</button>
    </div>
    <div class="content">
        
       
        <TextInput
        label="Default path for projects"
        
        placeholder="Pick one"
        bind:value={save_path}
      />
      <NativeSelect
        label="Language"
        data={languages}
        placeholder="Pick one"
        bind:value={language}
      />
      <NativeSelect
        label="Studio Theme"
        data={themes}
        placeholder="Pick one"
        bind:value={theme}
      />
      <p></p>
      <Checkbox
        bind:checked={auto_save}
        label="Enable Auto-Save"
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
  