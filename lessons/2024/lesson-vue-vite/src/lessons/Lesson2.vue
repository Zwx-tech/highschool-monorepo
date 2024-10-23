<script setup>
import carData from "@data/cars.json"
import RoboCard from "@components/Lesson1/RoboCard.vue";
import { computed, reactive } from "vue";

const cars = reactive({ list: [...carData], count: 5 });

const carList = computed(() => {
    return cars.list.filter(c => c.id < cars.count)
});

function handlePagination() {
    cars.count = (cars.count + 5) % cars.list.length;
}

</script>
<template>
    <div class="p-8">
        <h2 class="text-2xl"> Text from json 3/4/5</h2>
        <div class="flex gap-4 mt-4 flex-wrap">
            <RoboCard v-for="car in carList" :car="car" :showInfo="false" />
        </div>
        <button class="bg-gray-700 text-white rounded-lg mt-2 text-sm font-bold px-6 py-2 uppercase"
            @click="handlePagination">Pokaż więcej</button>
    </div>
</template>
<style lang="tailwind/css">

</style>