<script lang="ts">
    import { enhance } from "$app/forms";
    import type { ActionData } from "../$types";
    import type { SubmitFunction } from "@sveltejs/kit";

    interface Props {
        form: ActionData
    }

    let { form }: Props = $props()

    let loading = $state(false)

    const handleSubmit: SubmitFunction = () => {
        loading = true
        return async ({ update }) => {
            update()
            loading = false
        }
    }
</script>

<svelte:head>
    <title>Geo Map</title>
</svelte:head>

<div class="w-full h-screen flex flex-col items-center justify-center mx-auto">
    <h1 class="text-2xl font-bold mb-4">Register Account</h1>
    <form method="POST" use:enhance={handleSubmit}>
        {#if form?.message !== undefined}
            <div class="success {form?.success ? '' : 'fail'}">
                {form?.message}
            </div>
        {/if}
        <div class="relative max-w-xs mb-4">
            <svg class="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <input
                id="email"
                name="email"
                type="email"
                value={form?.email ?? ''}
                placeholder="Enter your email"
                class="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
            />
        </div>

        <div class="relative max-w-xs mb-4">
            <svg class="w-6 h-6 text-gray-400 absolute left-3 inset-y-0 my-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0 160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17l0 80c0 13.3 10.7 24 24 24l80 0c13.3 0 24-10.7 24-24l0-40 40 0c13.3 0 24-10.7 24-24l0-40 40 0c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"
            /></svg>
            <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                class="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                required
            />
        </div>
        <button
            class="px-3 py-1.5 text-sm text-white duration-150 bg-green-600 rounded-full hover:bg-green-500 active:bg-green-700"
        >
            Register
        </button>
    </form>
</div>