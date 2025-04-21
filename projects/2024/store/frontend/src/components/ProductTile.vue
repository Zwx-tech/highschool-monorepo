<script setup lang="ts">
import { computed } from 'vue';


const { product } = defineProps<{ product: Product }>();

const productImage = computed(() => {
    return `/assets/${product.image}`
});
</script>


<template>
    <div class=" p-4 border border-gray-300 [&:not(:last-child)]:border-r-transparent">
        <img :src="productImage"
            :alt="product.name" class="p-8 border-b border-gray-300 aspect-[4/3] object-cover w-full h-[20rem]">
        <div class="flex mt-3 items-center">
            <img src="/assets/birthday-cake.svg" alt="Recomended age: " class="w-5 h-5">
            <div class="ml-1 text-sm">18+</div>
            <img src="/assets/brick.svg" alt="Recomended age: " class="w-5 h-5 ml-4">
            <div class="ml-1 text-sm">749</div>
        </div>

        <div class="mt-3 font-semibold text-gray-700">
            {{ product.name }} {{ product.category }}       
        </div>
        <p class="font-bold text-lg mt-2 text-gray-900">{{ product.price }} zł</p>
        <button class="flex gap-3 py-2 px-4 mt-3 bg-orange-400 rounded-[2rem]"><img src="/assets/shopping-bag.svg"
                alt="" class="w-5 h-5">Dodaj do
            koszyka</button>
    </div>
</template>