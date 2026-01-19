<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import "../app.css"
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	import { navigating } from '$app/state';

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
	{#if navigating.to}
		<div class="absolute z-10 w-full h-screen flex flex-col items-center justify-center mx-auto bg-slate-300">
			<div class="inline-flex items-center gap-3">
				<svg class="size-6 animate-spin text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
	
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
	
				<p class="font-medium text-gray-700">Please wait...</p>
			</div>
		</div>
	{/if}
	{@render children()}
</div>
