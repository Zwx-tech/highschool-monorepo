<script lang="ts">
    export let pokemon: {name: string, url: string, img: string, id: number};
</script>

<div class="flex w-96 flex-col justify-between rounded-xl bg-white bg-clip-border text-gray-700 border">
    <div class="max-w-sm h-full rounded overflow-hidden flex flex-col justify-between">
        <img class="w-full" src={pokemon.img} alt="Sunset in the mountains">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2 mt-auto">{pokemon.name}</div>
          <p class="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
          </p>
          <a href={`/PokeApp/pokemon/${pokemon.id}`}>See more...</a>
        </div>
      </div>
</div>