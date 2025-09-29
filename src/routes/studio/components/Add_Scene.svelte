<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';
export let available_bg;
let value: any;
let text: string = '';
export let onClose: any;
export let onConfirm: any;
export let theme: string;
let selected = 0;
</script>


<div>
<div class="modal">
  <TextInput
  placeholder="Something like: MainRoom, Bedroom, Garden, Final;"
  label="Scene Name"
  bind:value={text}
/>
<h5 class="popup_title {theme}">Scene Background</h5>

<div style="overflow-x: scroll !important;border: 2px solid black;display: flex; width: 100%;">
{#each available_bg as bg, index}
<img 
style="cursor: pointer; border: {index == selected? "2px solid green" : "none"}" on:click={() => selected = index} width="160px" alt="Background Image" src={bg}/>
{/each}
<!-- on click on the add should add the uploaded image to the available_bg array-->
<div style="flex: 0 0 auto;" class="solid"></div>
<div style="flex: 0 0 auto;" class="add">+</div>
</div>
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


<style>
  .add{
    border: 2px solid black;
    width: 160px;
    text-align: center;
    align-items: center;
    align-content: center;
    font-size: 2vw;
    cursor: pointer;
  }

  .solid{
    width: 160px;
    cursor: pointer;
    background-color: black;
  }
</style>