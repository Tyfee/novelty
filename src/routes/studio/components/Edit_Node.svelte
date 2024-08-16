<script lang="ts">
    import { NativeSelect, Text, Textarea, Button } from '@svelteuidev/core';
export let current_node: any;
let thisText = current_node.text;
export let onSaveNode: any;
export let onClose: any;
export let available_characters;

let action_type: any = "Dialogue";
export let text: string = thisText;

export let text2: any;


let character_map = available_characters.map((i: any) => i.id);
let selected: any;

console.log(current_node)
</script>


<div>
<div class="modal">
<NativeSelect
data={character_map}
bind:value={selected}
label="Character"
/>
<p>
<NativeSelect
data={["Dialogue", "Multiple Choice", "Action"]}
bind:value={action_type}
label="Node Type"
/>

</p>
{#if action_type == "Dialogue"}
<p></p>
<Textarea

placeholder="Hello"
label="What are they saying? (Max. 255 characters!)"
bind:value={text}

/>
{/if}

{#if action_type == "Multiple Choice"}

<Textarea
placeholder="Answer 1"
label="Possible Answers"
bind:value={text2}
/>
{/if}


{#if action_type == "Action"}
<p></p>
<NativeSelect
data={["JumpToNext()", "FreezeControls()", "Leave()", "Play()"]}
label="Node Type"
bind:value={text}/>
{/if}
<p></p>
<div style="width: 100%; display: flex;">
<Button on:click={onClose} style="width: 50%;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
Discard 
</Button>
<Button  on:click={onSaveNode(selected, action_type,text)} style="width: 50%;" variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
Save Node
</Button>
</div>
</div>
</div>


