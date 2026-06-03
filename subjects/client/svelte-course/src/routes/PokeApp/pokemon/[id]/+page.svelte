
<script>
    import { page } from "$app/stores";
    import { currentPokemonId, currentPokemon } from "../../strore";
    let { id } = $page.params;
    currentPokemonId.set(parseInt(id));
    console.log($currentPokemon)
</script>

{#await $currentPokemon}
    <p>loadind...</p>
{:then pokeData} 
    <div class="m-auto w-fit">
        <h1 class="text-3xl">Name: {pokeData.name}</h1>
        <h2 class="text-3xl">Waga: {pokeData.weight}</h2>
        <h2 class="text-3xl">Doświdczenie: {pokeData.base_experience}</h2>
        <img src={pokeData.sprites.other.dream_world.front_default} alt={pokeData.name}>
        <h2 class="text-3xl">Moves:</h2>
        <ul>
            {#each pokeData.moves as move}
                <li>{move.move.name}</li>
            {/each}
        </ul>
    </div>
{/await}