<script setup>
// TODO make this easier and more clearer to use for the user

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const chatUsername = ref("");
const chatPassword = ref("");
const userError = ref(Boolean);

const router = useRouter();

const register = async () => {
  if (chatUsername.value.length > 0 && chatPassword.value.length > 0) {
    try {
      const response = await axios.post(`/api/register`, {
        username: chatUsername.value,
        password: chatPassword.value,
      });
      localStorage.setItem("Register-user-data", JSON.stringify(response.data));
      router.push({ name: "Chats" });
    } catch (error) {
      throw error;
    }
  } else {
    userError.value = false;
  }
};
</script>
<template>
  <h1 v-if="!userError" class="text-red-500">
    Username and password must be longer than 6 characters each
  </h1>
  <h1 v-else>&nbsp;</h1>
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
      class="rounded-full border-b-2 border-CLACCPrimary p-2 px-3 text-CLACCPrimary shadow-lg ring-2 ring-CLACCPrimary transition-all hover:bg-white hover:bg-opacity-20 focus:bg-white focus:bg-opacity-20 focus:outline-none active:scale-95 active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
    >
      Register
    </button>
  </form>
</template>
