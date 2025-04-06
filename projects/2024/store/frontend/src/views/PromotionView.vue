<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Loader from '@/components/Loader.vue';
import { useStore } from 'vuex';
import ProductTile from '@/components/ProductTile.vue';

const route = useRoute();
const store = useStore();

onMounted(() => {
    console.log(store);
    store.dispatch('fetchPromotion', route.params.id);
});

const promotion = computed<Promotion | null>(() => {
    if (!store.getters.getPromotionLoading)
        return store.getters.getPromotion;
    return null
});

</script>

<template>
    <main class="min-h-[calc(92vh-4rem)] relative">
        <div v-if="store.getters.getPromotionLoading === true"
            class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
        </div>
        <div class="flex px-4 mt-4" v-if="promotion">
            <ProductTile v-for="product in promotion.items" :key="product" :product="product" />
        </div>
        <div class="flex px-4 mt-4" v-if="promotion">
            <ProductTile v-for="product in promotion.items" :key="product" :product="product" />
        </div>
    </main>
</template>
