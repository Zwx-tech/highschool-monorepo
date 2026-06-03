<script>
    import PokeCard from "./PokeCard.svelte";
    import { apiData, pokemonAmount, pokemonList, pokemonName, pokemonPage } from "./strore";
    import { onMount } from "svelte";

    console.log($pokemonList)
</script>

<main class="flex flex-col items-center items-start gap-8">
    <div class="flex gap-4 w-1/2">
        <div class="w-1/3">
            <label for="pokemon-name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pokemon name</label>
            <input bind:value={$pokemonName} name="pokemon-name" id="pokemon-name" type="text" placeholder="search pokemon..." class="block mb-2 w-full px-3 py-3 rounded-md text-sm font-medium text-gray-900 dark:text-white border">
        </div>
        <div class="w-1/3">
            <label for="pokemon-amount" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Liczba</label>
            <input bind:value={$pokemonAmount} name="pokemon-amount" id="pokemon-amount" type="number" class="block mb-2 w-full px-3 py-3 rounded-md text-sm font-medium text-gray-900 dark:text-white border">
        </div>
        <div class="w-1/3">
            <label for="pokemon-page" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Strona</label>
            <input bind:value={$pokemonPage} name="pokemon-page" id="pokemon-page" type="number" class="block mb-2 w-full px-3 py-3 rounded-md text-sm font-medium text-gray-900 dark:text-white border">
        </div>
    </div>
    <div class="grid grid-cols-3 gap-8">
        {#each $pokemonList as pokemon}
        <PokeCard pokemon={pokemon}></PokeCard>
        {/each}
    </div>
</main>
