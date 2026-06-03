<script lang="ts">
    import { fade,  } from "svelte/transition";
  import { currentGuess } from "../stores/store";
   
    export let value = '';
    export let isEditable=false;
    export let colorID=0;
    const colors = ['null', 'none', 'some', 'match']
    let color = colors[colorID];
    // currentGuess.subscribe(v => {
    //     color = colors[colorID];
    // });
</script>

{#if isEditable}
  <input
    bind:value
    class="dark:bg-gray-700 dark:border-gray-600 dark:text-white lowercase w-[4.7rem] h-[4.7rem] text-center text-2xl rounded-lg bg-gray-100 border-gray-200 border-2"
    maxlength="1"
    type="text"
    readonly
  />
{:else}
  <input
    bind:value
    class={`${color} lowercase w-[4.7rem] h-[4.7rem] text-center text-2xl rounded-lg border-2`}
    maxlength="1"
    type="text"
    in:fade={{ duration: 100 }}
    readonly
  />
{/if}
