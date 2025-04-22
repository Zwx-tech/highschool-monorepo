<script setup lang="ts">
import { computed, ref } from 'vue';
import Rating from '@/components/Rating.vue';

const { product } = defineProps<{ product: Product }>();

const productImage = computed(() => {
  return `/assets/${product.image}`;
});

// Modal state
const isModalOpen = ref(false);

// Function to toggle modal visibility
function toggleModal() {
  isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
  <!-- Product Tile -->
  <div class="p-4 border border-gray-300 [&:not(:last-child)]:border-r-transparent" @click="toggleModal">
    <img
      :src="productImage"
      :alt="product.name"
      class="p-8 border-b border-gray-300 aspect-[4/3] object-cover w-full h-[20rem]"
    />
    <div class="flex mt-3 items-center">
      <img src="/assets/birthday-cake.svg" alt="Recommended age: " class="w-5 h-5" />
      <div class="ml-1 text-sm">18+</div>
      <img src="/assets/brick.svg" alt="Brick count: " class="w-5 h-5 ml-4" />
      <div class="ml-1 text-sm">749</div>
    </div>

    <div class="mt-3 font-semibold text-gray-700">
      {{ product.name }} {{ product.category }}
    </div>
    <Rating :rating="product.rate" :productRatings="product.ratesNumber" />
    <p class="font-bold text-lg mt-2 text-gray-900">{{ product.price }} zł</p>
    <button class="flex gap-3 py-2 px-4 mt-3 bg-orange-400 rounded-[2rem]">
      <img src="/assets/shopping-bag.svg" alt="" class="w-5 h-5" />
      Dodaj do koszyka
    </button>
  </div>

  <!-- Modal -->
  <div
    v-if="isModalOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click.self="toggleModal"
  >
    <div class="bg-white p-6 shadow-lg max-w-4xl w-full flex flex-col lg:flex-row">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-800" @click="toggleModal">
        ✕
      </button>

      <!-- Product Image -->
      <div class="flex-shrink-0 w-full lg:w-1/2 h-full">
        <img
          :src="productImage"
          :alt="product.name"
          class="w-full h-[20rem] object-cover rounded-lg mb-4 lg:mb-0"
        />
      </div>

      <!-- Product Details -->
      <div class="flex-grow lg:pl-6">
        <h2 class="text-2xl font-bold mb-2">{{ product.name }}</h2>
        <Rating :rating="product.rate" :productRatings="product.ratesNumber" />
        <p class="text-gray-700 mb-4">{{ product.description }}</p>
        <div class="flex items-center mb-4">
          <img src="/assets/birthday-cake.svg" alt="Recommended age: " class="w-5 h-5" />
          <div class="ml-1 text-sm">Recommended Age: 18+</div>
          <img src="/assets/brick.svg" alt="Brick count: " class="w-5 h-5 ml-4" />
          <div class="ml-1 text-sm">Brick Count: 845</div>
        </div>
        <p class="font-bold text-lg text-gray-900 mb-4">Price: {{ product.price }} zł</p>
        <p class="text-gray-600 mb-4">Category: {{ product.category }}</p>
        <button class="flex gap-3 py-2 px-4 bg-orange-400 rounded-[2rem] w-full">
          <img src="/assets/shopping-bag.svg" alt="" class="w-5 h-5" />
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles for responsiveness or layout */
</style>