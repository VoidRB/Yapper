<script setup>
// TODO make this easier and more clearer to use for the user

import axios from "axios";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const chatUsername = ref("");
const chatPassword = ref("");
const apiError = ref({});
const apiResponse = ref({});

onMounted(() => {
  apiError.value = "";
});

const register = async () => {
  //FOR TESTING ONLY, RETURN TO 6 FOR PROD.
  if (chatUsername.value.length >= 0 && chatPassword.value.length >= 0) {
    try {
      const response = await axios.post(`/api/register`, {
        username: chatUsername.value,
        password: chatPassword.value,
      });
      apiResponse.value = response.data;
      localStorage.setItem("Register-user-data", JSON.stringify(response.data));
      router.push({ name: "Chats" });
    } catch (error) {
      apiError.value = error.response.data.error;
      throw error;
    }
  } else {
    apiError.value =
      "Password And username must be more than 6 characters each";
  }
};
</script>
<template>
  <h1 class="text-center text-red-500">{{ apiError }} &nbsp;</h1>
  <form class="flex flex-col items-center gap-5">
    <input
      v-model="chatUsername"
      type="text"
      placeholder="Username"
      autocomplete="username"
      maxlength="12"
      class="rounded-lg bg-transparent p-2 text-center text-black outline-none outline-CLACCPrimary transition-all focus:scale-105 focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
    />
    <input
      v-model="chatPassword"
      type="password"
      placeholder="Password"
      autocomplete="current-password"
      maxlength="10"
      class="rounded-lg bg-transparent p-2 text-center text-black outline-none outline-CLACCPrimary transition-all focus:scale-105 focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
    />

    <button
      @click.prevent="register()"
      class="rounded-full bg-CLACCSecondary p-2 px-3 text-white shadow-lg outline-none ring-2 ring-CLACCSecondary/50 transition-all focus:outline-4 focus:outline-white/40 active:scale-95 active:shadow-inner dark:bg-CDACCSecondary dark:ring-CDACCSecondary/50"
    >
      Register
    </button>
  </form>
</template>
