<script>
    // @ts-nocheck
    import "/node_modules/flag-icons/css/flag-icons.min.css";
    import data from './data/countries.json';
    let selected;
    const url = 'https://flagicons.lipis.dev/flags/4x3/'
</script>

<main class="flex justify-center items-start gap-8"> 
    <select bind:value={selected} name="countries" id="countries">
        {#each data as option}
            <option value={`${option.code.toLocaleLowerCase()}`}>{option.name}</option>
        {/each}
    </select>
    <img class="w-1/3 border" src={`${url}${selected}.svg`} alt={selected}>
</main>