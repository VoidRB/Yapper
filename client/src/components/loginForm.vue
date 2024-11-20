<script setup>
import axios from "axios";
import { ref } from "vue";

const chatEmail = ref("");
const chatPassword = ref("");
const apiReponse = ref("");

const login = async () => {
  try {
    const response = await axios.post(
      `/api/login?email=${chatEmail.value}&password=${chatPassword.value}`,
    );
    sessionStorage.setItem("Login-user-data", JSON.stringify(response.data));
    apiReponse.value = response.data;
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <form class="flex flex-col items-center gap-5">
    <input
      v-model="chatEmail"
      type="email"
      placeholder="email"
      autocomplete="email"
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
      @click.prevent="login()"
      class="rounded-full border-b-2 border-CLACCPrimary p-2 px-3 text-CLACCPrimary shadow-lg ring-2 ring-CLACCPrimary transition-shadow focus:outline-none active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
    >
      login
    </button>
  </form>
</template>
