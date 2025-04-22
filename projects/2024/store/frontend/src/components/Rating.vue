<script setup lang="ts">
import { defineProps } from 'vue';

const { rating, maxRating, productRatings } = defineProps<{ rating: number; maxRating?: number; productRatings?:number }>();

// Default max rating is 5 if not provided
const stars = Array.from({ length: maxRating || 5 }, (_, i) => i + 1);
</script>

<template>
  <div class="flex items-center">
    <img
      v-for="star in stars"
      :key="star"
      :src="`/assets/starsvg${star > rating ? '' : '-fill'}.svg`"
      alt="Star"
      class="w-5 h-5"

    />
    <span>( {{ productRatings ? productRatings : "?" }})</span>
  </div>
</template>
