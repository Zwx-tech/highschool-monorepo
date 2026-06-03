<script>
    let rows = 2;
    let cols = 2;
</script>

<section class="">
    <h2 class="text-center text-3xl">Lekcja 1</h2>
    <div class="flex flex-wrap m-[3rem]">
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="name" class="leading-7 text-sm text-gray-600"
                    >Rows</label
                >
                <input
                    type="number"
                    id="name"
                    name="name"
                    bind:value={rows}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
            </div>
        </div>
        <div class="p-2 w-1/2">
            <div class="relative">
                <label for="email" class="leading-7 text-sm text-gray-600"
                    >Cols</label
                >
                <input
                    type="number"
                    id="email"
                    name="email"
                    bind:value={cols}
                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
        </div>
    </div>
    <div class="m-[3rem] flex flex-col gap-4 mx-auto mt-8">
        {#each Array(rows) as i}
            <div class="flex gap-4">
                {#each Array(cols) as j}
                    {#key i * cols + j}
                        <div class="aspect-square w-[4rem] bg-blue-300"></div>  
                    {/key}
                {/each}
            </div>
        {/each}
    </div>
</section>
