<script lang="ts" setup>
//@ts-ignore
import { trio } from 'ldrs';
import { onMounted } from 'vue';

onMounted(() => {
    trio.register();
});
</script>

<template>
    <l-trio size="55" speed="0.9" color="#333"></l-trio>
</template>