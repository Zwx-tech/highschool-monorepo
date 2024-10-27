<script setup>
    import TestComponent from "@components/Lesson1/TestComponent.vue"
</script>
<template>
    <div class="p-8 border-4 border-dashed border-red-500">
        <h4 class="text-xl text-red-500">to jest component</h4>
        <div class="flex gap-4 mt-4">
            <TestComponent />
            <TestComponent />
            <TestComponent />
        </div>
    </div>
</template>
<style lang="tailwind/css">
    
</style>