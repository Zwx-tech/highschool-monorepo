<script setup lang="ts">
import { defineProps } from 'vue';

const { placeholder, type } = defineProps<{
  placeholder: string;
  modelValue: string;
  type: "text" | "email" | "password";
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();


const serializedName = placeholder.toLocaleLowerCase().replace(/ /g, "-");
const inputId = `${serializedName}-input`;
</script>

<template>
    <label :for="inputId" class="relative">
      <input
        :type="type"
        :id="inputId"
        :name="serializedName"
        :value="modelValue"
        @input="(e) => emit('update:modelValue', (e.target as HTMLInputElement).value)"
        placeholder=""
        class="peer mt-4 w-full border border-gray-300 sm:text-sm p-3 outline-none"
      />
    
      <span
        class="absolute text-gray-500 inset-y-0 start-3 -translate-y-5 bg-transparent px-0.5 text-sm font-medium transition-transform peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-6 peer-focus:bg-white"
      >
        {{ placeholder }}
      </span>
    </label>
  </template>