<script lang="ts">
        import { NativeSelect, Text, Textarea, Button, TextInput } from '@svelteuidev/core';
    import { Toaster } from 'svelte-french-toast';
    import { invoke } from '@tauri-apps/api';
    import micIcon from './icons/mic.svg'
    
 import test from '../../../assets/audio/test.wav'
     import add from './icons/file-plus.svg'
export let onClose: any;
export let onConfirm: any;
export let theme: string;

import WaveSurfer from 'wavesurfer.js'
    import { onMount } from 'svelte';
let waveform:  HTMLDivElement;
onMount(() => {


    const options = {
  /** HTML element or CSS selector (required) */
  container: waveform,
  /** The height of the waveform in pixels */
  height: 150,
  /** The width of the waveform in pixels or any CSS value; defaults to 100% */
  width: "100%",
  /** Render each audio channel as a separate waveform */
  splitChannels: false,
  /** Stretch the waveform to the full height */
  normalize: false,
  /** The color of the waveform */
  waveColor: '#ff4e00',
  /** The color of the progress mask */
  progressColor: '#dd5e98',
  /** The color of the playpack cursor */
  cursorColor: '#ddd5e900',
  /** The cursor width */
  cursorWidth: 2,
  /** Render the waveform with bars like this: ▁ ▂ ▇ ▃ ▅ ▂ */
  barWidth: NaN,
  /** Spacing between bars in pixels */
  barGap: NaN,
  /** Rounded borders for bars */
  barRadius: NaN,
  /** A vertical scaling factor for the waveform */
  barHeight: NaN,
  /** Vertical bar alignment **/
  barAlign: '',
  /** Minimum pixels per second of audio (i.e. zoom level) */
  minPxPerSec: 1,
  /** Stretch the waveform to fill the container, true by default */
  fillParent: true,
  /** Audio URL */
  url: test,
  /** Whether to show default audio element controls */
  mediaControls: true,
  /** Play the audio on load */
  autoplay: false,
  /** Pass false to disable clicks on the waveform */
  interact: true,
  /** Allow to drag the cursor to seek to a new position */
  dragToSeek: false,
  /** Hide the scrollbar */
  hideScrollbar: false,
  /** Audio rate */
  audioRate: 1,
  /** Automatically scroll the container to keep the current position in viewport */
  autoScroll: true,
  /** If autoScroll is enabled, keep the cursor in the center of the waveform during playback */
  autoCenter: true,
  /** Decoding sample rate. Doesn't affect the playback. Defaults to 8000 */
  sampleRate: 8000,
}


    const wavesurfer = WaveSurfer.create(options)

wavesurfer.on('interaction', () => {
  wavesurfer.play()
})
})
let imported_audio = "";
let filename = "";


async function importFile() {
  try {
    const file_path = await invoke("open_project", {});
    if (!file_path) return;

    const relativePath = await invoke("copy_to_temp", { file: file_path });
    imported_audio = file_path
    filename = imported_audio.split("\\").pop();

    console.log(imported_audio)
  }catch(e) {
    console.error(e);
    
}
}
</script>


<div>

<p>
  

</p>
<p></p>
<div style="width: 100%">
    <Toaster/>
<div class="modal" style="height: 40%;">
    <div style="padding: 0%">
    <Button size="xs" style="margin: 10px">
  <img src={micIcon} alt="icon" width="25" height="25"/>
    </Button>
    <div style="display: flex; align-items: center; gap: 8px; padding: 10px;">
    <Button on:click={importFile} size="xs" style="margin: 10px">

  <img src={add}  alt="icon" width="25" height="25"/>

    </Button>
    {#if imported_audio != "" }
          <Text>{imported_audio}</Text>
    {/if}
</div>
<div style="visibility: {imported_audio == "" ? "hidden": "visible"};" bind:this={waveform}></div>


<div class="footer">

  <Button on:click={onClose} style="margin-right: 0.5rem;" variant='gradient' gradient={{from: 'red', to: 'orange', deg: 60}}>
    Discard 
  </Button>
  <Button on:click={() => onConfirm(imported_audio, "test", filename)} variant='gradient' gradient={{from: 'teal', to: 'blue', deg: 60}}>
    Add new Audio
  </Button>
</div>
</div>

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