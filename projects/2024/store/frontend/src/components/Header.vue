<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();

const isAuthenticated = computed(() => {
    return store.getters.isAuthenticated;
})

const userData = computed(() => {
    return store.getters.getUser;
})

const userEmail = computed(() => {
    return userData.value?.email || '';
})  

onMounted(() => {
    if(!store.getters.isAuthenticated)
    store.dispatch('autoAuth');
})
</script>

<template>
    <header>
        <nav class="px-4">
            <ul class="flex gap-4 mt-6 items-center text-lg">
                <li class="text-2xl font-bold pb-1">
                    <RouterLink to="/" exact>Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/products" exact>Search</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about" exact>About</RouterLink>
                </li>
                <li>
                    <RouterLink to="/not-found" exact>Not found</RouterLink>
                </li>

                <li class="ml-auto" v-if="!isAuthenticated">
                    <RouterLink to="/login" exact>Login</RouterLink>
                </li>
                <li v-if="!isAuthenticated">
                    <RouterLink to="/register" exact>Register</RouterLink>
                </li>
                <li class="ml-auto text-gray-600" v-if="isAuthenticated">
                    <span> {{ userEmail }}</span>
                </li>
                <li v-if="isAuthenticated">
                    <button @click="store.dispatch('logout')">Logout</button>
                </li>
            </ul>
            <hr class="border-black mt-5">
        </nav>
    </header>
</template>