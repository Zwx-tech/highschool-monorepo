<script lang="ts">
  import { allWords, currentWord, preferredColorScheme, prefersContrast, wordCheck, wordLength } from "../stores/store";

  let selectedFile: File | undefined;
  let checkWords: boolean = false;

  function handleFileInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      const reader = new FileReader();
      selectedFile = inputElement.files[0];
      // You can perform additional logic with the selected file if needed
      reader.onload = (event) => {
        if(typeof event.target?.result !== "string") {
            return;
        }
        const wordList = JSON.parse(event.target?.result)
        console.log(wordList);
        allWords.set(wordList);
      }
      reader.readAsText(selectedFile);
    }
  }

  function handleColorSchemeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    $preferredColorScheme = selectElement.value;
  }

  function handleCheckWordsChange() {
      $wordCheck = !$wordCheck;
    }
    function handleCheckContrastChange() {
      $prefersContrast = !$prefersContrast;
  }

  function getRandomElement<T>(array: T[]): T | undefined {
    if (array.length === 0) {
      return undefined;
    }

    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  }
  
  function handleRestart(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
    if(!allWords) {
        return;
    }
    
    currentWord.set(
      getRandomElement<string>($allWords.filter((w) => w.length === $wordLength)) || ""
    );
  }
</script>

<div class="flex flex-col">
  <label>
    File Input:
    <input type="file" accept=".json" on:change={handleFileInputChange} />
  </label>

  <label
    for="color-scheme"
    class="mt-3"
  >
    Color Scheme:
  </label>
  <select
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    id="color-scheme"
    bind:value={$preferredColorScheme}
    on:change={handleColorSchemeChange}
  >
    <option value="light">light</option>
    <option value="dark">dark</option>
  </select>

  <label class="mt-4">
    Contrast:
    <input
      type="checkbox"
      bind:checked={$prefersContrast}
    />
  </label>
  <label class="mt-4">
    Check Words:
    <input
      type="checkbox"
      bind:checked={checkWords}
      on:change={handleCheckWordsChange}
    />
  </label>
  <button class="mt-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-gray-100 border-gray-200 right-8 top-4 p-2 rounded-lg border-2 px-4"
  on:click={handleRestart}
  >
    restart
  </button>
</div>
