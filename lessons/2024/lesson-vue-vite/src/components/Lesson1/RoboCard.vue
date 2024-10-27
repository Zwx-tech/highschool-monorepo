<template>
    <div class="rounded-lg bg-gray-200  flex flex-col border-8 w-[16rem]" :style="{ borderColor: car.hex_color }">
        <div :style="{ background: car.hex_color }">
            <p class=" w-full py-2 text-center text-gray-200 hover:mix-blend-exclusion">{{
                car.hex_color
                }}</p>
        </div>

        <p :style="{ backgroundColor: car.damaged ? '#a6634c' : `#4ca664` }" class="w-full py-2 text-center"> {{
            car.damaged ?
                "Uszkodzony"
                : "Nieuszkodzony"
        }}</p>

        <img :src="car.image" :alt="car.car_name" class="w-3/4 aspect-[2/3] object-cover mx-auto">
        <div class="p-4 text-lg">
            <p>id: {{ car.id }}</p>
            <p>name: {{ car.car_name }}</p>
            <button class="bg-gray-700 text-white rounded-lg mt-2 text-sm font-bold px-6 py-2"
                @click="showCarInfo">INFO</button>
        </div>
    </div>
</template>
<script setup>
const { car, showInfo } = defineProps({
    car: Object,
    showInfo: Boolean
});

function showCarInfo() {
    alert(JSON.stringify(car, null, 5))
}
</script>
<style></style>