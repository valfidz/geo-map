<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css"
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();
	let { supabase, session } = $derived(data)

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth')
			}
		})

		return () => data.subscription.unsubscribe()
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Geo Map</title>
</svelte:head>

<div class="container">
	{@render children()}
</div>
