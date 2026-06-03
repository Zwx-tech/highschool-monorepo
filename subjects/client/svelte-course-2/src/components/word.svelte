<script lang="ts">
    import Letter from "./letter.svelte";
    export let currentLetters: string[];
    export let rowIndex=0;
    import { currentWord, currentGuess, type ILetterDict } from "../stores/store";
    let result = Array($currentWord.length).fill(0);
    currentGuess.subscribe(v => {
        if($currentGuess<=rowIndex) {
            return;
        }
        const correctLetters = [...$currentWord.toLowerCase()];
        const word = currentLetters.join('');
        result = Array($currentWord.length).fill(1);
        Array.from(word).forEach((letter, i) => {
            if(correctLetters[i] === letter) {
                result[i] = 3;
                correctLetters[i] = '###';
            }
        });

        Array.from(word).forEach((letter, i) => {
            if(correctLetters.some(l => l===letter)){
                correctLetters.some((l, j) => {
                    if(l===letter && result[i] !== 3){
                        result[i] = 2;
                        correctLetters[j] = '/*/';
                        return true;
                    }
                    return false
                }) 
            }
        });
    });
</script>
{#if $currentGuess <= rowIndex}
    <div class="flex items-center justify-center gap-2">
        {#each currentLetters as _ , colIndex}
            <Letter bind:value={currentLetters[colIndex]} isEditable={true} bind:colorID={result[colIndex]}/>
        {/each}
    </div>
    {:else}
    <div class="flex items-center justify-center gap-2">
        {#each currentLetters as _ , colIndex}
            <Letter bind:value={currentLetters[colIndex]} isEditable={false} bind:colorID={result[colIndex]}/>
        {/each}
    </div>

{/if}