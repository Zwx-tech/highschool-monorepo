<script setup lang="ts">
import { computed, onMounted } from 'vue';
import Loader from '@/components/Loader.vue';
import PromotionTile from '@/components/PromotionTile.vue';
import { useStore } from 'vuex';

const store = useStore();

onMounted(() => {
  store.dispatch('fetchPromotions');
});

const promotions = computed(() => !store.state.promotionsLoading ? store.getters.getPromotionList : []);

</script>

<template>
  <main class="min-h-[calc(92vh-4rem)] relative">
    <div v-if="store.state.promotionsLoading"
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader />
    </div>
    <RouterLink v-for="promotion in promotions" :to="`/promotion/${promotion.id}`" :key="promotion.id">
      <PromotionTile :promotion="promotion" />
    </RouterLink>
  </main>
</template>
