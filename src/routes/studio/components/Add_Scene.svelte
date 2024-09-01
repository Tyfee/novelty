<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';
export let available_bg;
let value: any;
let text: string = '';
export let onClose: any;
export let onConfirm: any;
let selected = 0;
</script>


<div>
<div class="modal">
  <TextInput
  placeholder="Something like: MainRoom, Bedroom, Garden, Final;"
  label="Scene Name"
  bind:value={text}
/>
<h5>Scene Background</h5>
{#each available_bg as bg, index}
<img style="cursor: pointer; border: {index == selected? "2px solid green" : "none"}" on:click={() => selected = index} width="160px" alt="Background Image" src={bg}/>
{/each}
<p>
  

</p>
<p></p>
<div class="footer">
  <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
    Discard 
  </Button>
  <Button on:click={onConfirm(text, available_bg[selected])} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
    Add new Scene
  </Button>
</div>
</div>
</div>


