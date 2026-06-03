<script>
    export let color=0;
    export const colorName="";
</script>

<div class="flex flex-col w-[20rem]">
    <label for="red">blue {color}</label> 
    <input type="range" bind:value={color} id="red" name="red" min="0" max="255">
</div>