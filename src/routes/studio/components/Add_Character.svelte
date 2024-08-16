<script lang="ts">
    import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';

export let onAddPose;
export let poses;
let value: any;
let text: string = '';
export let onClose: any;
export let onConfirm: any;
let selected = 0;
</script>


<div>
<div class="modal">
<TextInput
placeholder="Something like John, Itoshiki Nozomu or R2-D2;"
label="Character Name"
bind:value={text}
/>
<h5>Poses (Maximum of 5 .png** files)</h5>
{#each poses as bg, index}
<div style="display: flex; width: 60vw !important;">
<img style="cursor: pointer; border: {index == selected? "2px solid green" : "none"}" on:click={() => selected = index} width="160px" alt="Background Image" src={bg}/>
<TextInput
placeholder="Something like 'Neutral', Angry or Sad;"
label="Pose title"
/>
</div>
{/each}
<button on:click={onAddPose}  style="width: 16%; height: 20%;margin-left: 2vw;">+</button>
   
<p>


</p>

<p></p>
<div style="width: 100%; display: flex;">
<Button on:click={onClose} style="width: 50%;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
Discard 
</Button>
<Button  on:click={onConfirm(text, available_bg[selected])} style="width: 50%;" variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
Add New Scene
</Button>
</div>
</div>
</div>


