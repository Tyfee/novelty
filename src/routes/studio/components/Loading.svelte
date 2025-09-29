<script lang="ts">
    import '@smui/circular-progress/bare.css';
import '../../../themes.css'
 import CircularProgress from '@smui/circular-progress'
import './loading.css'
export let doing: string;
export let theme: string;
let status: string = "...";
import {listen} from '@tauri-apps/api/event'
    import { onMount } from 'svelte';


    onMount(async () => {
  const unlisten = await listen("create_progress", (event) => {
    // Always just treat it as a string
    status = typeof event.payload === "string"
      ? event.payload
      : event.payload.message ?? "...";
  });

  return () => {
    unlisten(); // cleanup
  };
});




</script>

<div class="loading_container {theme}">
 <h1>{doing}</h1>
    <div style="display: flex; justify-content: center">
        <CircularProgress style="height: 50px; width: 50px;" indeterminate />
      
      </div>
      <p class="progress {theme}">{status}</p>
</div>