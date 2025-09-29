<script lang="ts">
    import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';
import neutral_pose from '../../../assets/chars/neutral00.png'
import { invoke } from '@tauri-apps/api/tauri';
$: poses = [];

let value: any;

    import toast, { Toaster } from "svelte-french-toast";
let name: string = '';
$: pose_name = '';
let id: string = '';
export let onClose: any;
export let onConfirm: any;
let selected = 0;

 async function discardAll() {
    for (const pose of poses) {
      await removePose(pose.file);
    }
    poses = [];
    name = '';
  }

async function removePose(file: string) {
  poses = poses.filter(i => i.file !== file);

  const fileName = file.split("/").pop();
  const absPath = `C:\\Users\\Thalison\\Documents\\novelty\\src\\assets\\temp_poses\\${fileName}`;

  try {
    await invoke("remove_temp_file", { file: absPath });
  } catch (e) {
    console.error("Failed to remove temp file:", e);
  }
}


async function importPose() {
  try {
    const file_path = await invoke("open_project", {});
    if (!file_path) return;

    const relativePath = await invoke("copy_to_temp", { file: file_path });

    const newPose = { file: relativePath, name: "" };  

    if (!poses.find(p => p.file === newPose.file)) {
      poses = [...poses, newPose];
    } else {
      toast.error("Pose already imported");
    }
  } catch (e) {
    console.error(e);
  }
}

</script>


<div style="width: 100%">
    <Toaster/>
<div class="modal">
<TextInput
placeholder="Something like John, Itoshiki Nozomu or R2-D2;"
label="Character Name"
bind:value={name}
/>
<h5>Poses (Maximum of 5 .png** files)</h5>
{#if poses.length < 1}
<h1>Nenhuma pose adicionada.</h1>
{/if}
{#each poses as bg, index (bg.file)}
  <div style="display: flex; align-items: center; gap: 1rem;">
    <img
      src={bg?.file}
      alt={bg.name}
      width="160px"
      style="cursor: pointer; border: {index === selected ? '2px solid green' : 'none'}"
      on:click={() => selected = index}
    />
    <TextInput
      placeholder="Something like 'Neutral', Angry or Sad;"
      label="Pose title"
      bind:value={bg.name}
    />
  </div>
{/each}
<button on:click={importPose}  style="width: 16%; height: 20%;margin-left: 2vw;">+</button>
   
<p>


</p>

<p></p>
<div style="width: 100%; display: flex;">
<Button on:click={() => {onClose(); discardAll()}} style="width: 50%;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
Discard 
</Button>
<Button  on:click={onConfirm(name, poses)} style="width: 50%;" variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
Add New Character
</Button>
</div>
</div>
</div>


