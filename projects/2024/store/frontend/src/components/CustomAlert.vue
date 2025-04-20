<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

defineProps({
  title: {
    type: String,
    default: 'Alert',
  },
  message: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['close']);

const visible = ref(true);

function closeAlert() {
  visible.value = false;
  emit('close');
}
</script>

<template>
  <div v-if="visible" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div class="bg-white p-6 w-[90%] max-w-md border-gray-600">
      <h3 class="text-lg font-bold mb-4">{{ title }}</h3>
      <p class="mb-4">{{ message }}</p>
      <button @click="closeAlert" class="bg-legoPrimary text-white px-4 py-2 hover:bg-legoPrimary-dark">
        Close
      </button>
    </div>
  </div>
</template>