<script setup lang="ts">
import FormInput from '@/components/FormInput.vue';
import { computed, ref } from 'vue';

const email = ref('');
const password = ref('');
const repeatPassword = ref('');


const emailValid = computed(() => {
    return email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
})

const formValid = computed(() => {
    return password.value === repeatPassword.value && password.value.length > 4 && emailValid.value;
});

function handleFormSubmit(event: Event) {
    event.preventDefault();
    if (formValid.value) {
        // Handle form submission logic here
        console.log('Form submitted:', { email: email.value, password: password.value });
    } else {
        console.error('Form is invalid');
    }
}

</script>

<template>
    <main class="min-h-[calc(92vh-4rem)] relative flex flex-col items-center ">
        <img src="/assets/lego.png" alt="LEGO" class="w-[10rem] mt-16 lg:mt-[10rem] mb-4">
        <form class="box-border relative min-w-[20rem] w-[50vw] max-w-[40rem] border border-gray-600  p-4 bg-white " @submit="handleFormSubmit">
            <h2 class="text-xl tracking-wide border-gray-700 mb-2">register</h2>
            <FormInput v-model="email" placeholder="email" type="email" />
            <FormInput v-model="password" placeholder="password" type="password" />
            <FormInput v-model="repeatPassword" placeholder="repeat password" type="password" />
            <button :disabled="!formValid" class="bg-legoPrimary w-full mt-8 p-3 text-white text-sm disabled:bg-gray-300 transition-colors">submit</button>
        </form>
    </main>
</template>
