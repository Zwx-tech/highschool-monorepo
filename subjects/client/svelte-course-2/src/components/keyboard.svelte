<script lang="ts">
  import { letterStatus } from "../stores/store";
  import Key from "./key.svelte";
  
    const alphabet = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

  </script>
  
  <div class="flex flex-col justify-center gap-2 mx-auto mt-8">
      {#each alphabet as line, j }
      <div class="flex justify-center gap-2 bg">
          {#if j!=2}
            {#each line as letter, i}
              <Key key={letter.toLowerCase()}></Key>
            {/each}
            {:else}
            <Key key={'Backspace'}></Key>
            {#each line as letter, i}
            <Key key={letter.toLowerCase()}></Key>
            {/each}
            <Key key={'Enter'}></Key>
          {/if}
      </div>
    {/each}
  </div>
  