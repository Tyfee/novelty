<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, Title, TextInput, CheckboxGroup } from '@svelteuidev/core';
        import { writeTextFile } from "@tauri-apps/plugin-fs";
        import './modal.css';
        import '../../themes.css'
        import logo from '../../assets/novelty_logo.png'
    import { Label } from '@smui/common';
    let current_template = 0;
    let current_logo = logo;
    export let current_language;


    $: l = current_language[0]
    let targeted = ['win']
        let value: any;
        let text: string = '';
        let desc: string = '';
        export let theme: string;
        let action_type: any = "Dialogue";
        export let onClose: any;
        export let onConfirm: any;
      
        // Function to handle the creation of a new project
        function createNewProject() {
          if(text.length > 1){
          onConfirm(text, desc);

          }
        }
      </script>
      
      <div style="overflow-x: hidden;" class="modal">
        <div class="title-bar {theme}">
          <h1>{l.cnp}</h1>
          <button on:click={onClose}>&times;</button>
        </div>
        <div class="content">
<strong style="color: black">Template</strong>
<div style="width: 100%;gap: 20px ;display: flex;">
        <div class="template_block">
                <div style={`
                border: 2px solid ${current_template == 0? 'teal' : 'black'};`} on:click={() => current_template = 0} class="template"></div>
              <strong style="color: black"> {l.bla}</strong>
        </div>
        <div class="template_block">
          <div style={`
                border: 2px solid ${current_template == 1? 'teal' : 'black'};`} on:click={() => current_template = 1} class="template"></div>
             <strong style="color: black">  {l.cg}</strong>
        </div>
</div>
<p style="margin-top: 40px !important;"></p>
<div style="gap: 30px;width: 10vw; display: flex;">
        <img class="project_icon" src={current_logo}/>
          <TextInput
           style="width: 40vw;"
            placeholder={l.pn_ph}
            label={l.pn}
            bind:value={text}
          />
        </div>
        <p></p>
        <TextInput
        style="width: 100%;"
         placeholder={l.pd_ph}
         label={l.pd}
         bind:value={desc}
       />

         

          <p>
<CheckboxGroup
label="Targeted Platforms"
items={[{label: "Windows", value: "win"}, {label: "Linux", value: "gnu"},{label: "MacOS", value: "mac"},{label: "Mobile", value: "app"}, {label: "Browser", value: "wasm"}]}
bind:value={targeted}
/>
            </p>
        </div>
        <div class="footer">
          <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
            {l.dis}
          </Button>
          <Button on:click={createNewProject} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
            Create New Project
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