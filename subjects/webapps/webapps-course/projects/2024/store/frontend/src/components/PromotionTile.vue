<script setup lang="ts">

const { promotion } = defineProps<{ promotion: Promotion }>();

</script>


<template>
    <article
        class="relative aspect-[16/4] flex flex-col items-start justify-end p-4 isolate mx-4 mt-4 gradient-overlay">
        <h2 class="z-10 text-white text-4xl mb-1 font-bold"> {{ promotion.header }}</h2>
        <h4 class="z-10 text-white text-xl"> {{ promotion.description }}</h4>
        <img :src="promotion.image" alt="Promotion Image" class="absolute top-0 left-0 w-full h-full object-cover z-0">
    </article>
</template>