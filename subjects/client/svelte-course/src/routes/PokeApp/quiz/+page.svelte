<script >
        // @ts-nocheck
    
        import { writable, derived} from "svelte/store";
        import { unfiltredPokemonList, getPokemons } from "../strore";
        import { onMount } from "svelte";
        let points = 0;
        let allQuestions = writable([]);
        let currentQuestionIndex = writable(0);
        let currentQuestion = createDerivedStore();
        console.log($allQuestions);
        function createDerivedStore() {
            const { subscribe } = derived([allQuestions, currentQuestionIndex], ([$allQuestions, $currentQuestionIndex]) => $allQuestions.at($currentQuestionIndex));
            return {
                subscribe
            }
        }
        
        function handleAnserwClick(e, i) {
            const color = i==$currentQuestion.correctAnserw ? 'green' : 'red';
            points += i==$currentQuestion.correctAnserw ? 1 : 0;    
            e.target.setAttribute('style', `background-color: ${color};`);
            document.querySelector("img").setAttribute('style', ``);
            setTimeout(() => {
                currentQuestionIndex.update(n => ++n)
                e.target.setAttribute('style', ``);
                document.querySelector("img").setAttribute('style', `filter: brightness(0%);`);
            }, 1000)
        }
    
        function restartQuiz() {
            $allQuestions.sort(() => .5 - Math.random());
            currentQuestionIndex.set(0);
            points = 0;
        }
        
        // On comonenet mount do all the logick
        onMount(async () => {
            await getPokemons();
            for(let i=0; i<10; i++) {
                const pokemonIndex = Math.floor(Math.random()*$unfiltredPokemonList?.length);                
                const pokemon = $unfiltredPokemonList[pokemonIndex];
                const anserws = [pokemon.name, ...new Array(3).fill(null).map(() => {
                    return $unfiltredPokemonList[Math.floor(Math.random()*$unfiltredPokemonList?.length)].name;
                })]
                anserws.sort(() => .5 - Math.random());
                allQuestions.update(l => [...l, {pokemon: pokemon, anserws: anserws, correctAnserw: pokemon.name}]);
            }
            $allQuestions.sort(() => .5 - Math.random());
            console.log($allQuestions);
        })
    </script>
    
    <main class="flex p-8 flex-col gap-8 items-center"> 
        {#if $currentQuestionIndex >= $allQuestions.length}
            <h2 class="text-3xl">Koniec quizu!!!</h2>
            <p class="text-2xl">{points}/10</p>
            <button on:click={() => restartQuiz()} class="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-lg mt-4 md:mt-0" >Spróbuj jeszcze raz</button>
        {:else}
        <div class="w-1/3 min-w-[400px] px-8 py-6 bg-blue-100 text-2xl rounded-xl">
            <div class="">
                <h1 class="text-center w-full mb-4">{$currentQuestionIndex}. Co to za pokemon?</h1>
                <img style="filter: brightness(0%);" class="mx-auto h-[250px] mb-10" src={$currentQuestion.pokemon.img} alt={$currentQuestion.pokemon.name}>
            </div>
            <div class="pl-4 flex flex-col items-start gap-1">
                {#each $currentQuestion.anserws as anserw, i}
                    <button class="w-full mb-1 text-lg bg-blue-50 hover:bg-blue-200 duration-150 ease-in-out w-1/2 text-left p-2 px-3 rounded-lg" on:click={(e) => handleAnserwClick(e, anserw)}>{anserw}</button>
                {/each}
            </div>
        </div>
        {/if}
    
    </main>