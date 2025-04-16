
<script lang="ts">

import { Accordion, NativeSelect, Checkbox, CheckboxGroup, TextInput } from '@svelteuidev/core';
export let currently_inspecting
export let balloon_bg: any;
export let balloon_color: any;
export let balloon_border: any;
export let menu_buttons: any;
export let items;
export let menu_padding_top: any;
export let menu_padding_left: any;
export let menu_button_size: any;
export let menu_button_color: any;
export let images: Array<string>;
export let audio: Array<any>;
export let current_logo: string;
export let scenes: any;
export let seeing: any; 
export let logo_x: any;
export let logo_y: any;
export let current_bg: string;
export let onUpdateBg: any;
export let hasBgm: boolean;
let mapped_audio = audio.map((i) => i.file)
let inspectable = ["Game", "Dialog Box", "Menu Buttons", "Game Logo", "Scene"]
</script>
<div class="assets attributes theme-black">
    <strong>🛈 Inspecting: {inspectable[currently_inspecting]}</strong>
    {#if currently_inspecting == 0}

    {/if}
    <!--Game -->
    {#if currently_inspecting == 0}
    
    <!--Dialogue -->
    {:else if currently_inspecting == 1}
    <Accordion>
        <Accordion.Item value="typescript">
            <div slot="control">Color</div>
   
    <NativeSelect data={['pink', 'green', 'red', 'white', 'cyan']} 
      placeholder="Pick one"
      bind:value={balloon_bg}
      label="Background Color"
     /> 
     
     <NativeSelect data={['white', 'black']}
      placeholder="Pick one"
      bind:value={balloon_color}
        label="Text Color"
     />
     <NativeSelect data={['purple', 'darkGreen', 'brown', 'black', 'blue', 'white']} 
     placeholder="Pick one"
     bind:value={balloon_border}
     label="Border"
    />
    </Accordion.Item>

        <Accordion.Item value="animation">
            <div slot="control">Animation</div>
    <Checkbox color="black" label="Allow typewriter effect in my game "  />

    </Accordion.Item>
    </Accordion>
    {:else if currently_inspecting == 2}
    
    <Accordion>
        <Accordion.Item value="typescript">
            <div slot="control">⚌ Menu Items</div>
   
    <div class="attribute">
    </div>
    <CheckboxGroup bind:value={menu_buttons}  {items}  />
    
    </Accordion.Item>

    <Accordion.Item value="position">
        <div slot="control">⛚ Position</div>

        <div class="slider-container">
            <p>Padding Top</p>
            <input type="range" id="slider" min="0" max="1000" step="1" bind:value={menu_padding_top}>
            <span id="slider-value">{menu_padding_top}</span>
        </div>
        
        <div class="slider-container">
            <p>Padding Left</p>
            <input type="range" id="slider" min="0" max="1000" step="1" bind:value={menu_padding_left}>
            <span id="slider-value">{menu_padding_left}</span>
        </div>
        </Accordion.Item>

    <Accordion.Item value="text">
        <div slot="control">♥ Text Attributes</div>
        <div class="slider-container">
            <p>Font Size</p>
            <input type="range" id="slider" min="1" max="100" step="1" bind:value={menu_button_size}>
            <span id="slider-value">{menu_button_size}</span>
        </div>
        

        <NativeSelect data={['white', 'black', 'blue', 'pink', 'yellow']} 
          placeholder="Pick one"
          bind:value={menu_button_color}
          label="Text Color"
         />
        
        </Accordion.Item>
    </Accordion>
    
    
<!-- LOGO IN MENU-->
    {:else if currently_inspecting == 3}


    <NativeSelect data={images} 
    placeholder="Logo Image"
    bind:value={current_logo}
    label="Game Logo (.png)"

    
   />
<Accordion>

    <Accordion.Item value="position">
        <div slot="control">⛚ Position</div>

        <div class="slider-container">
            <p>X</p>
            <input type="range" id="slider" min="0" max="100" step="1" bind:value={logo_x}>
            <span id="slider-value">{logo_x}</span>
        </div>
        
        <div class="slider-container">
            <p>Y</p>
            <input type="range" id="slider" min="0" max="100" step="1" bind:value={logo_y}>
            <span id="slider-value">{logo_y}</span>
        </div>
        </Accordion.Item>
</Accordion>

  <!-- CURRENT SCENE BACKGROUND--> 

  {:else if currently_inspecting == 4}

  
<Accordion>

    <Accordion.Item value="general">
        <div slot="control">General Attributes</div>
<TextInput
value={scenes[seeing].title}
label="Scene Name"
placeholder="Something like 'garden', 'Outside' or 'MOON';"
/>
  <NativeSelect data={images} 
  placeholder="Logo Image"
  bind:value={current_bg}
  on:change={onUpdateBg(current_bg)}
  label="Scene Background"
 />

 <p></p>
 <Checkbox
  color="black"
   label="Background Music" 
   bind:checked={hasBgm}
   />

   <p></p>
   {#if hasBgm}
 <NativeSelect 
 data={mapped_audio}
bind:value={scenes[seeing].bgm}
 />

{/if}
 </Accordion.Item>

 </Accordion>
    {/if}
    </div>
    <style>

.assets{
    overflow-y: scroll;
    border: 2px solid black;
    width: 30vw;
    margin-left: 2vw;
height: 42vh;
}
    ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: transparent; /* Hide the track */
}

::-webkit-scrollbar-thumb {
    background-color: black; /* Black knob */
    border: 2px solid gray;
    border-radius: 10px; /* Optional: rounded corners for the knob */
}

.attributes{
            margin-top: 2vh;
            overflow-y: scroll;
        }
        .attribute{
            background-color: black;
            color: white;
        }


        
.slider-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Slider input styling */
input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: #ddd;
    outline: none;
    opacity: 0.7;
    transition: opacity .2s;
}
.theme-light {
color: black;
    background-color: #ffffff; /* Light theme text color */
  }

.theme-dark {
    background-color: #0000002c;
    color: white !important;
  }

input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: #00412b;
    cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: #4CAF50;
    cursor: pointer;
}

/* Slider value styling */
#slider-value {
    margin-left: 10px;
    font-size: 16px;
    color: #333;
}
   ::-webkit-scrollbar {
    width: 12px; /* Set the width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: transparent; /* Hide the track */
}

::-webkit-scrollbar-thumb {
    background-color: black; /* Black knob */
    border: 2px solid gray;
    border-radius: 10px; /* Optional: rounded corners for the knob */
}
    </style>