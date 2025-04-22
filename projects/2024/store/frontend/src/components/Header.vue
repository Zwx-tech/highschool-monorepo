<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => {
    return store.getters.isAuthenticated;
})

const isAuthLoading = computed(() => {
    return store.getters.getLoading;
})

const userData = computed(() => {
    return store.getters.getUser;
})

const userEmail = computed(() => {
    return userData.value?.email || '';
})  

//* Check authentication status on page load and after each route change
onMounted(() => {
    if(!store.getters.isAuthenticated)
    store.dispatch('autoAuth');
});

router.afterEach(() => {
    if(!store.getters.isAuthenticated)
    store.dispatch('autoAuth');
});


const textColor = computed(() => {
    return isAuthLoading.value ? 'text-gray-400' : 'text-black';
});


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

                <li :class="`ml-auto ${textColor}`" v-if="!isAuthenticated">
                    <RouterLink to="/login" exact>Login</RouterLink>
                </li>
                <li :class="textColor" v-if="!isAuthenticated">
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