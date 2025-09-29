<script lang="ts">
        import { NativeSelect, Text, Textarea, Button } from '@svelteuidev/core';
export let available_characters: any
let value: any;
let text: string = '';
let text2: string = '';
let action_type: any = "Dialogue";
let poses: { file: string; name: string }[] = [];
$: pose = "";
export let onClose: any;
export let onConfirm: any;


let character_map = available_characters.map((i: any) => i.name);
let selected = character_map[0];

function handleChange() {
  const thisCharacter = available_characters.find(c => c.name === selected);
  poses = thisCharacter?.poses ?? [];

  if (poses.length > 0) {
    pose = poses[0].file;
  } else {
    pose = "";
  }
}


</script>


<div>
<div class="modal">
<NativeSelect
on:focus={() => console.log(poses)}
on:change={handleChange}
    data={character_map}
    bind:value={selected}
    label="Character"
/>
<p>
</p>
<div style="display: flex; width: 100%;">
{#if pose}
  <img width="140px" src={pose} alt="pose"/>
{/if}
<NativeSelect
  data={poses.map(p => ({ label: p.name, value: p.file }))}  
  bind:value={pose}
  label="Pose"
/>
</div>

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


<p></p>
<Textarea
  placeholder="Hello"
  label="What are they asking? (Max. 50 characters!)"
  bind:value={text}
/>

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
<Button  
  on:click={() => {
   const poseObj = poses.find(p => p.file === pose);
onConfirm(selected, action_type, text, poseObj?.name, poseObj?.file);
  }} 
  style="width: 50%;" 
  variant='gradient' 
  gradient={{from: 'teal', to: 'blue', deg: 60}}
>
  Add New Node
</Button>

</div>
</div>
</div>


