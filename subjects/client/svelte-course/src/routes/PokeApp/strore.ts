import { writable, derived } from 'svelte/store';

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/

interface IApiData {
    count: number;
    results: [{
        name: string;
        url: string
    }]
}

export const apiData = writable<IApiData>();
export const pokemonName = writable("");
export const pokemonAmount = writable(10);
export const pokemonPage = writable(1);

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const pokemonList = derived([apiData, pokemonName, pokemonAmount, pokemonPage], ([$apiData, $pokemonName, $pokemonAmount, $pokemonPage]) => {
    if ($apiData) {
        return $apiData.results
            .map((pokemon, i) => {return {name: pokemon.name, url: pokemon.url, id: i+1, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`}})
            .filter((pokemon, i) => pokemon.name.includes($pokemonName))
            .filter((pokemon, i) => i < $pokemonAmount * $pokemonPage && i>=$pokemonAmount * ($pokemonPage-1));
    }
    return [];
});

let apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=600&offset=0";
export async function getPokemons() {
    await fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            console.log(123)
            apiData.set(data);
        })
        .catch((error) => {
            console.log(error); 
            return [];
        });
}

getPokemons();

// Pokecard
export const currentPokemonId = writable(0);

export const currentPokemon = derived([apiData, currentPokemonId], async ([$apiData, $currentPokemonId]) => {
    if($apiData) {
        const pokeData = await fetch($apiData.results[$currentPokemonId].url)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
        return pokeData;
    }
})

export const unfiltredPokemonList = derived([apiData], ([$apiData]) => {
    if ($apiData) {
        return $apiData.results
            .map((pokemon, i) => {return {name: pokemon.name, url: pokemon.url, id: i+1, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`}})
    }
    return [];
});