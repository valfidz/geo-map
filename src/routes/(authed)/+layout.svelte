<script lang="ts">
    let { data, children } = $props();
</script>

{@render children()}

<!-- <div>
    <div class="py-2 px-2 bg-slate-100">
        <ul class="flex flex-row justify-end">
            <li class="mr-4">{ data.user?.email }</li>
            <li>
                <form method="POST" action="/home?/logout">
                    <button class="px-3 py-1 text-sm text-white duration-150 bg-blue-600 rounded-full hover:bg-blue-500 active:bg-blue-700">
                        Logout 
                    </button>
                </form>
            </li>
        </ul>
    </div>

    <div>
        {@render children()}
    </div>
</div> -->

