<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Rating from '@/components/Rating.vue';
import { getProduct } from '@/api';
import Loader from '@/components/Loader.vue';

const route = useRoute();
const product = ref<Product | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);

async function fetchProduct() {
  try {
    isLoading.value = true;
    const response = await getProduct(route.params.id as string) as Product;
    product.value = response;
  } catch (err) {
    error.value = 'Failed to load product details.';
  } finally {
    isLoading.value = false;
  }
}

onMounted(() => {
  fetchProduct();
});
</script>

<template>
  <main class="min-h-[calc(92vh-4rem)] relative flex flex-col items-center p-4 mt-8">
    <!-- Loader -->
    <div v-if="isLoading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Loader />
    </div>

    <!-- Error Message -->
    <div v-if="error" class="text-red-500 text-center">
      {{ error }}
    </div>

    <!-- Product Details -->
    <div v-if="!isLoading && product" class="bg-white p-6 border-gray-600 max-w-4xl w-full flex flex-col lg:flex-row">
      <!-- Product Image -->
      <div class="flex-shrink-0 w-full lg:w-1/2 h-full">
        <img
          :src="`/assets/${product.image}`"
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
          <div class="ml-1 text-sm">Brick Count: 289</div>
        </div>
        <p class="font-bold text-lg text-gray-900 mb-4">Price: {{ product.price }} zł</p>
        <p class="text-gray-600 mb-4">Category: {{ product.category }}</p>
        <button class="flex gap-3 py-2 px-4 bg-orange-400 rounded-[2rem] w-full">
          <img src="/assets/shopping-bag.svg" alt="" class="w-5 h-5" />
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </main>
</template>
