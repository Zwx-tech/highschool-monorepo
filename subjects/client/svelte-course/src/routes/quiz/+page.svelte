<script >
// @ts-nocheck

    import { writable, derived} from "svelte/store";
    import data from "./data/questions.json";

    let points = 0;
    let allQuestions= writable(data);
    $allQuestions.sort(() => .5 - Math.random());
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
        setTimeout(() => {
            currentQuestionIndex.update(n => ++n)
            e.target.setAttribute('style', ``);
        }, 1000)
    }

    function restartQuiz() {
        $allQuestions.sort(() => .5 - Math.random());
        currentQuestionIndex.set(0);
        points = 0;
    }
</script>

<main class="flex p-8 flex-col gap-8 items-center"> 
    {#if $currentQuestionIndex >= $allQuestions.length}
        <p>Koniec quizu!!!</p>
        <button on:click={() => restartQuiz()}>spróbuj jeszcze raz</button>
    {:else}
    <div class="w-1/3 min-w-[400px] px-8 py-6 bg-blue-100 text-2xl rounded-xl">
        <div class="flex justify-between">
            <h1 class="font-bold mb-4">{$currentQuestion?.title}</h1>
            <p>Pytanie nr. { $currentQuestionIndex }</p>
            <p>{ points } / {$allQuestions.length}</p>
        </div>
        <div class="pl-4 flex flex-col items-start gap-1">
            {#each $currentQuestion.anserws as anserw, i}
            <button class="mb-1 text-lg bg-blue-50 hover:bg-blue-200 duration-150 ease-in-out w-1/2 text-left p-2 px-3 rounded-lg" on:click={(e) => handleAnserwClick(e, i)}>{anserw}</button>
            {/each}
        </div>
    </div>
    {/if}

</main>