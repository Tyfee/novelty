<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, Title, TextInput, CheckboxGroup } from '@svelteuidev/core';
        import { writeTextFile } from "@tauri-apps/api/fs";
        import './modal.css';
    import { Label } from '@smui/common';
      
        let value: any;
        let text: string = '';
        let action_type: any = "Dialogue";
        export let onClose: any;
        export let onConfirm: any;
      
        // Function to handle the creation of a new project
        function createNewProject() {
          onConfirm(text);
        }
      </script>
      
      <div class="modal">
        <div class="title-bar">
          <h1>Create New Project</h1>
          <button on:click={onClose}>&times;</button>
        </div>
        <div class="content">
<strong>Template</strong>
<div style="width: 100%;gap: 20px ;display: flex;">
        <div class="template_block">
                <div class="template"></div>
                Blank
        </div>
        <div class="template_block">
                <div class="template"></div>
                Complete Game
        </div>
</div>
<p style="margin-top: 40px !important;"></p>
<div style="width: 10vw; display: flex;">
        <img class="project_icon" src=""/>
          <TextInput
           style="width: 40vw;"
            placeholder="What will you name your new project?"
            label="Project name"
            bind:value={text}
          />
        </div>
         

          <p>
<CheckboxGroup
label="Targeted Platforms"
items={[{label: "Windows", value: "win"}, {label: "Linux", value: "gnu"},{label: "MacOS", value: "mac"},{label: "Mobile", value: "app"}, {label: "Browser", value: "wasm"}]}

/>
            </p>
        </div>
        <div class="footer">
          <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
            Discard 
          </Button>
          <Button on:click={createNewProject} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
            Create New Project
          </Button>
        </div>
      </div>
      
      <style>
        .template{
                border: 2px solid black;
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