<script setup>
// TODO make this easier and more clearer to use for the user

import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const chatUsername = ref("");
const chatPassword = ref("");

const router = useRouter();

const register = async () => {
  try {
    const response = await axios.post(`/api/register`, {
      username: chatUsername.value,
      password: chatPassword.value,
    });
    sessionStorage.setItem("Register-user-data", JSON.stringify(response.data));
    console.log(response.data);
    if (response.data.success === true) {
      router.push({ name: "Chats" });
    } else {
    }
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <form class="flex flex-col items-center gap-5">
    <input
      v-model="chatUsername"
      type="text"
      placeholder="username"
      autocomplete="username"
      required
      class="rounded-lg bg-transparent p-2 text-black outline-none outline-CLACCPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
    />
    <input
      v-model="chatPassword"
      type="password"
      placeholder="password"
      autocomplete="current-password"
      required
      maxlength="8"
      class="rounded-lg bg-transparent p-2 text-black outline-none outline-CLACCPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
    />

    <button
      @click.prevent="register()"
      class="rounded-full border-b-2 border-CLACCPrimary p-2 px-3 text-CLACCPrimary shadow-lg ring-2 ring-CLACCPrimary focus:outline-none active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
    >
      register
    </button>
  </form>
</template>
