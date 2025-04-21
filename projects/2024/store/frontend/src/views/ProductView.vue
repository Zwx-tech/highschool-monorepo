<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Loader from '@/components/Loader.vue';
import ProductTile from '@/components/ProductTile.vue';

const route = useRoute();
const store = useStore();
const searchQuery = ref('');
const categoryFilter = ref('');
const sortBy = ref('');
const sortOrder = ref('asc');

const loading = computed(() => store.getters['product/getLoading']);
const products = computed(() => store.getters['product/getProducts']);
const error = computed(() => store.getters['product/getError']);

const categories = ref<string[]>([]);

async function fetchProducts() {
  await store.dispatch('product/fetchProducts', {
    search: searchQuery.value,
    category: categoryFilter.value,
    _sort: sortBy.value,
    _order: sortOrder.value,
  });
}

//* I know this one should be in api but uhhh idc
async function fetchCategories() {
  try {
    const response = await fetch('http://localhost:3000/categories');
    categories.value = await response.json();
  } catch (err) {
    console.error('Failed to fetch categories:', err);
  }
}

//* uhhh this one is quite complex but twhat is does is debounces unnesesary calls of fetchProducts
//* it's used when user types so we don't call the API every time the user types a letter
//* we wait 2 seconds after the user stops typing to call the API
//* It's huge relife for out poor backend server that is not used to this kind of load
function debounce(func: Function, delay: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

//* Here we apply the debounce
const debouncedFetchProducts = debounce(fetchProducts, 500);

// useEffect type beat
watch(searchQuery, () => {
  debouncedFetchProducts();
});

onMounted(async () => {
    console.log("test mount test")
  await fetchCategories();
  await fetchProducts();
});
</script>

<template>
  <main class="min-h-[calc(92vh-4rem)] relative p-4">
    <!-- Loader -->
     <h1></h1>
    <div v-if="loading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader />
    </div>

    <!-- Filters -->
    <div class="mb-4 flex flex-col lg:flex-row gap-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search products..."
        class="border border-gray-300 rounded p-2 w-full lg:w-1/3"
      />

      <select v-model="categoryFilter" @change="fetchProducts" class="border border-gray-300 rounded p-2 w-full lg:w-1/4">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <select v-model="sortBy" @change="fetchProducts" class="border border-gray-300 rounded p-2 w-full lg:w-1/4">
        <option value="">Sort By</option>
        <option value="price">Price</option>
        <option value="name">Name</option>
      </select>

      <select v-model="sortOrder" @change="fetchProducts" class="border border-gray-300 rounded p-2 w-full lg:w-1/4">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>

    <!-- Product List -->
    <div v-if="!loading && products.length">
      <div v-for="(row, rowIndex) in Math.ceil(products.length / 4)" :key="rowIndex" class="flex mb-4">
          <ProductTile :product="product" v-for="product in products.slice(rowIndex * 4, rowIndex * 4 + 4)"
          :key="product.id" />
      </div>
    </div>

    <!-- No Products Found -->
    <div v-if="!loading && !products.length" class="text-center text-gray-500">
      No products found.
    </div>
  </main>
</template>
