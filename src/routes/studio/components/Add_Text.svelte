<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';

export let onClose: any;
export let onConfirm: any;
let selected = 0;
let value: string;
let colors = ['black', 'white', 'yellow']
let color: string = colors[0];
let fs = 10;
</script>


<div>
<div class="modal">
  <TextInput
  placeholder="Really cool text."
  label="Value: "
  bind:value={value}
/>

<p></p>

<NativeSelect
data={colors}
label="Text Color: "
bind:value={color}
/>
<div class="slider-container">
  <p>Font Size: </p>
  <input type="range" id="slider" min="0" max="100" step="1" bind:value={fs}>
  <span id="slider-value">{fs}</span>
</div>
  
<p>Preview: </p>

<strong  style="top: 10%; font-size: {fs * 3.3}px;color: {color}">{value}</strong>
 

<p></p>
<div class="footer">
  <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
    Discard 
  </Button>
  <Button on:click={() => onConfirm(value, color, fs)} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
   Add to Scene
  </Button>



</div>
</div>
</div>


