<script lang="ts">
    import { NativeSelect, Text, Textarea, Button, Title, TextInput, CheckboxGroup } from '@svelteuidev/core';
    import { writeTextFile } from "@tauri-apps/plugin-fs";
    import './modal.css';
    import logo from '../../assets/novelty_logo.png'
import { Label } from '@smui/common';
let current_logo = logo;
    export let text: string = '';
    export let desc: string = '';
    export let onClose: any;
    export let onConfirm: any;
  
    // Function to handle the creation of a new project
    function save() {
      if(text.length > 1){
      onConfirm(text, desc);

      }
    }
  </script>
  
  <div style="overflow-x: hidden;" class="modal">
    <div class="title-bar">
      <h1>Edit {text}</h1>
      <button on:click={onClose}>&times;</button>
    </div>
    <div class="content">

<p style="margin-top: 40px !important;"></p>
<div style="gap: 30px;width: 10vw; display: flex;">
    <img class="project_icon" src={current_logo}/>
      <TextInput
       style="width: 40vw;"
        placeholder="New name."
        label="Project name"
        bind:value={text}
      />
    </div>
    <p></p>
    <TextInput
    style="width: 100%;"
     placeholder="New description."
     label="Project description"
     bind:value={desc}
   />

     
    </div>
    <div class="footer">
      <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
        Close
      </Button>
      <Button on:click={save} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
        Save Changes
      </Button>
    </div>
  </div>
  
  <style>
    .template{
    cursor: pointer;
            width: 100%;
            height: 100%;
    }
    .template_block{
            width: 50%;
            height: 10vh;
            align-items: center;
            text-align: center;
    }
    .project_icon{
            width: 10vw !important;
            height: 10vh;
            border-radius: 5px;
            border: 1px solid black;
    }
  </style>