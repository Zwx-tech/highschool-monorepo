<script setup lang="ts">
import { loginUser } from '@/api';
import CustomAlert from '@/components/CustomAlert.vue';
import FormInput from '@/components/FormInput.vue';
import Loader from '@/components/Loader.vue';
import router from '@/router';
import type { AxiosError } from 'axios';
import { computed, ref } from 'vue';

const email = ref('');
const password = ref('');
const showAlert = ref(false);
const alertMessage = ref('');
const alertTitle = ref('');
const serverError = ref('');
const isLoading = ref(false);

const emailValid = computed(() => {
    return email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null;
});

const formValid = computed(() => {
    return emailValid.value && password.value.length > 1;
});

const errorMessage = computed(() => {
    if (!email.value || !password.value) {
        return '';
    }
    if (!emailValid.value) {
        return 'Invalid email address';
    }

    if (serverError.value) {
        return serverError.value;
    }
    return '';
});

function showAlertMessage(title: string, message: string) {
    alertTitle.value = title;
    alertMessage.value = message;
    showAlert.value = true;
}

function closeAlert() {
    showAlert.value = false;
    //* Navigate to the home page after closing the alert
    router.push('/');
}

async function handleFormSubmit(event: Event) {
    event.preventDefault();
    if (!formValid.value) {
        return;
    }
    isLoading.value = true; 
    try {
        await loginUser({
            email: email.value,
            password: password.value,
        });
        showAlertMessage('Success', 'Login successful!');
    } catch (error) {
        const errorMessage =
            ((error as AxiosError<{ message: string }>).response?.data?.message) || 'An error occurred';
        serverError.value = errorMessage;
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <main class="min-h-[calc(92vh-4rem)] relative flex flex-col items-center">
        <img src="/assets/lego.png" alt="LEGO" class="w-[10rem] mt-16 lg:mt-[10rem] mb-4">
        <form
            class="box-border relative min-w-[20rem] w-[50vw] max-w-[40rem] border border-gray-600 p-4 bg-white"
            @submit="handleFormSubmit"
        >
            <h2 class="text-xl tracking-wide border-gray-700 mb-2">login</h2>
            <FormInput v-model="email" placeholder="email" type="email" />
            <FormInput v-model="password" placeholder="password" type="password" />
            <p class="text-red-700 italic mt-2 text-sm lowercase">{{ errorMessage }}</p>
            <button
                :disabled="!formValid || isLoading"
                class="bg-legoPrimary w-full mt-8 p-3 text-white text-sm disabled:bg-gray-300 transition-colors"
            >
                submit
            </button>
        </form>

        <!-- Loader -->
        <div v-if="isLoading" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loader />
        </div>

        <CustomAlert
            v-if="showAlert"
            :title="alertTitle"
            :message="alertMessage"
            @close="closeAlert"
        />
    </main>
</template>
