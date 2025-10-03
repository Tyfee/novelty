<script lang="ts">
    export let prop1: string;
    export let prop2: string;
    export let prop3: string;
    export let prop4: Array<any>;
 export let y: any;
 export let x: any;
 export let onRemove: any;
 export let onEdit: any;
 import test from '../../../assets/audio/test.wav'
 export let onNodeClick: any; 

import WaveSurfer from 'wavesurfer.js'
    import { onMount } from 'svelte';
let waveform:  HTMLDivElement;
onMount(() => {


    const options = {
  /** HTML element or CSS selector (required) */
  container: waveform,
  /** The height of the waveform in pixels */
  height: 50,
  /** The width of the waveform in pixels or any CSS value; defaults to 100% */
  width: 135,
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
  mediaControls: false,
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
</script>

<style>
   .node-container {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    z-index: 0;
}

.my-component {
    font-weight: bolder;
    color: white;
    width: 140px !important;
    cursor: pointer;
    height: auto;
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    flex-shrink: 0;
    z-index: 5 !important;
    box-shadow: 1px 1px 2px 2px black;
}

.my-component:hover {
    box-shadow: inset 600px 600px rgba(255, 255, 255, 0.226);
    transform: scale(1.1);
}

.actions {
    position: relative;
}

.connector {
    position: absolute;
    top: 50%;
    left: 100%;
    width: 150px; /* Adjust length as needed */
    height: 2px;
    background-color: black; /* Color of the connecting line */
    border: 1px solid white;
    transform: translateY(-50%);
}
.route{
    background-color: yellow;
    color: black;
    width: 50px;
    border-radius: 50%;
    height: 50px;
    border: 2px solid black;
    position: absolute;
    left: 130%;
    transform: translateY(-140%) !important;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-align: center;
    align-content: center;
}
.route:hover{
    width: 60px;
    height: 60px;
    box-shadow: inset 500px 500px rgba(255, 255, 255, 0.856);
}

  
</style>
<div on:click={onNodeClick} class="node-container">
  
    <div class="connector"></div>

    {#if  prop3 == 'choice'}
    {#each prop4 as route, index}
    <div 
      style={`top: ${index * 100}%; 
              margin-left: -13.5%; 
              transform: rotate(${-50 + (index * 820)}deg);`} 
      class="connector">
    </div>

    <div 
    style={`top: ${index * 170}%; 
            margin-left: 0; 
            transform: rotate(${-50 + (index * 820)}deg);`} 
    class="route">
    
    <strong style="font-size: 1.6em;color: black;">  {route}</strong>
  </div>
  {/each}
{/if}
    <div 
        tabindex="0" 
        role="button" 
        style="margin-left: {x}vw; top: {y}vh; background-color: {prop3 == 'dialogue' ? 'purple' : prop3 == 'choice' ? 'green' : prop3 == 'action' ? 'red' : prop3 == 'route'? 'cyan' : 'gray'}" 
        class="my-component"
    >
        <div class="actions">
            <button on:click={onEdit}>✏️</button>
            <button on:click={onRemove}>🗑️</button>
            <button on:click={onRemove}>⬅️</button>
            <button on:click={onRemove}>➡️</button>
        </div>
        <p>{prop2}: {prop1}</p>
        <div style="border-top: 2px solid white;">
        <div bind:this={waveform}></div>
        <div class="actions">
            <button on:click={onEdit}>▶️</button>
            <button on:click={onRemove}>🗑️</button>
            <button on:click={onRemove}>⬅⏺️</button>
        </div>
    </div>
    </div>
  
</div>


