

  <script lang="ts">
import { onMount } from 'svelte';
	import toast, { Toaster } from 'svelte-french-toast';

	onMount(() => {
		toast.success("It works!");
	})
  </script>