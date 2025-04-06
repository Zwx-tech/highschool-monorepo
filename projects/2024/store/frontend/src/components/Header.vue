<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <header>
        <nav class="px-4">
            <ul class="flex gap-4 mt-6 items-center text-lg">
                <li class="text-2xl font-bold pb-1">
                    <RouterLink to="/" exact>Home</RouterLink>
                </li>
                <li>
                    <RouterLink to="/about" exact>About</RouterLink>
                </li>
                <li>
                    <RouterLink to="/not-found" exact>Not found</RouterLink>
                </li>
                <li class="ml-auto">
                    <RouterLink to="/not-found" exact>Login</RouterLink>
                </li>
                <li>
                    <RouterLink to="/not-found" exact>Register</RouterLink>
                </li>

            </ul>
            <hr class="border-black mt-5">
        </nav>
    </header>
</template>