<script lang="ts">
  import { onMount } from "svelte";
  import Word from "../components/word.svelte";
  import {
    currentWord,
    allWords,
    letterStatus,
    currentGuess,
    preferredColorScheme,
    prefersContrast,
    wordCheck,
    wordLength,
    alphabet,
    type ILetterDict,
    inputLetters,
    isHintActive,
    getRandomArbitrary,
  } from "../stores/store";
  import Modal from "../components/Modal.svelte";
  import Alert from "../components/alert.svelte";
  import Keyboard from "../components/keyboard.svelte";
  import Settings from "../components/settings.svelte";

  // setup
  let isGameOnGoing: boolean = true;
  $inputLetters = [...Array($wordLength+1)].map((_) =>
    [...Array($wordLength)].map((_) => "")
  );
  // hint reviles half or rest letters 
  function hint() {
    if($isHintActive) {
        return;
    }
    $isHintActive = true;
    const lettersToShow = [...alphabet].filter(l => $letterStatus[l]===0).sort(_ => .5 - Math.random());
    lettersToShow.slice(0, Math.floor(lettersToShow.length/2)).forEach(l => {
        $letterStatus[l] = $currentWord.toLowerCase().includes(l) ? 3 : 1;
    })
  }

  const restart = () => {
    $currentGuess = 0;
    $wordLength = getRandomArbitrary(5, 9);
    $inputLetters = [...Array($wordLength+1)].map((_) =>
        [...Array($wordLength)].map((_) => "")
    )
    const result: ILetterDict = {};
    [...alphabet].forEach(l => {
        result[l] = 0;
    });
    isGameOnGoing = true;
    letterStatus.set(result);
    isHintActive.set(false);
  }

  function getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }

  allWords.subscribe((v) => {
    currentWord.set(
      getRandomElement<string>(v.filter((w) => w.length === $wordLength)) || ""
    );
  });

  currentWord.subscribe((v) => {
    console.log(v)
    restart();
    });
  let alert = {
    isVisible: false,
    message: "fshhfshf",
    type: "info",
    hasTimeout: true,
  };

  function displayAlert(message: string, type?: string, hasTimeout?: boolean) {
    alert = {
      isVisible: true,
      message: message,
      type: type || "info",
      hasTimeout: hasTimeout || true,
    };
  }

  let showSettings = false;
  const handleToggleModal = () => {
    showSettings = !showSettings;
  };

  // handle keypress
  function handleKeypress(event?: KeyboardEvent, key = "") {
    // sfhshfhsfh
    if (!isGameOnGoing) {
      return;
    }
    if (event) key = event.key;
    // handle key press
    if (key == "Enter") {
      // check logic
      let word = $inputLetters[$currentGuess].join("");
      if (word.length < $wordLength) {
        return;
      }
      if (!$allWords) {
        return;
      }
      if (!$allWords.some((w) => w == word) && $wordCheck) {
        displayAlert("Invalid word");
        return;
      }
      if (checkWord(word.toLowerCase())) {
        isGameOnGoing = false;
        $currentGuess += 1;
        displayAlert("U win!!", "success", false);
        return;
      }

      $currentGuess += 1;

      if ($currentGuess >= $wordLength+1 || $isHintActive) {
        isGameOnGoing = false;
        displayAlert("U lose:(((", "error", false);
        return;
      }
    }
    // handle deleting last char
    if (key == "Backspace") {
      $inputLetters[$currentGuess]
        .slice()
        .reverse()
        .some((letter, i) => {
          if (!letter) {
            return false;
          }
          $inputLetters[$currentGuess][$wordLength - i - 1] = "";
          return true;
        });
    }
    if (key.length > 1 || key === " ") {
      return;
    }
    $inputLetters[$currentGuess].some((letter, i) => {
      if (letter) {
        return false;
      }
      $inputLetters[$currentGuess][i] = key;
      return true;
    });
    // handle key click
  }

  function checkWord(word: string): Boolean {
    const correctLetters = [...$currentWord.toLowerCase()];
    if (correctLetters.join("") === word) {
      return true;
    }
    Array.from(word).forEach((letter, i) => {
      $letterStatus[letter] = 1;
    });
    Array.from(word).forEach((letter, i) => {
      if (correctLetters[i] === letter) {
        $letterStatus[letter] = 3;
        correctLetters[i] = "###";
      }
    });

    Array.from(word).forEach((letter, i) => {
      if (correctLetters.some((l) => l === letter)) {
        correctLetters.some((l, j) => {
          if (l === letter && $letterStatus[l] != 3) {
            $letterStatus[letter] = 2;
            correctLetters[j] = "/*/";
            return true;
          }
          return false;
        });
      }
    });
    return false;
  }
</script>

<svelte:window on:keyup={(event) => handleKeypress(event)} />

<main
  class="min-h-screen"
  class:dark={$preferredColorScheme === "dark"}
  class:contrast={$prefersContrast}
>
  <Modal
    title="Settings"
    open={showSettings}
    on:close={() => handleToggleModal()}
  >
    <svelte:fragment slot="body">
      <Settings></Settings>
    </svelte:fragment>>
  </Modal>
  <button
    on:click={handleToggleModal}
    class="absolute dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100 border-gray-200 right-8 top-4 p-2 rounded-lg border-2 px-4"
  >
  Settings
</button>
  <button
    on:click={hint}
    class="absolute dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100 border-gray-200 left-8 top-4 p-2 rounded-lg border-2 px-4"
  >
    Hint
  </button>
  {#if $currentWord && $allWords.length > 0}
    <h1 class="text-center text-[2.4rem] font-semibold py-2">Wordle game</h1>
    <div class="flex flex-col items-center gap-2 mt-4">
      <Alert
        isVisible={alert.isVisible}
        message={alert.message}
        type={alert.type}
      />
      {#each $inputLetters as word, i}
        {#if !$isHintActive || ($isHintActive && $currentGuess >= i && isGameOnGoing) ||($isHintActive && $currentGuess > i && !isGameOnGoing)}
            <Word currentLetters={word} rowIndex={i} />
        {/if}
      {/each}
    </div>
    <Keyboard></Keyboard>
  {:else}
    <div class="text-center">Loading...</div>
  {/if}
</main>

<style>
</style>
