<script lang="ts">
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "@sveltejs/kit"; 

    let loading = $state(false)
    
    const submitLogout: SubmitFunction = async ({ cancel }) => {
        loading = true

        return async ({ update }) => {
            loading = false
            update()
        }
    }
</script>

<h1>Welcome to Home Page</h1>
<div>
    <form method="POST" action="?/logout" use:enhance={submitLogout}>
        <button
            class="px-3 py-1.5 text-sm text-white duration-150 bg-blue-600 rounded-full hover:bg-blue-500 active:bg-blue-700"
        >Logout</button>
    </form>
</div>