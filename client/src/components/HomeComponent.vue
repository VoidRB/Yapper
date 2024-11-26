<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "./loginForm.vue";
import RegisterForm from "./registerForm.vue";

const formState = ref(true);
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-10 bg-CLBGSecondary transition-colors dark:bg-CDBGSecondary"
  >
    <h1
      class="text-center text-5xl font-bold text-CLACCPrimary dark:text-CDACCPrimary"
    >
      Welcome to
      <span class="text-CLACCSecondary dark:text-CDACCSecondary">Yapper </span>!
    </h1>
    <button
      @click="formState = !formState"
      class="text-CLACCPrimary focus:underline focus:outline-none active:text-CLACCSecondary dark:text-CDACCPrimary dark:active:text-CDACCSecondary"
    >
      Switch
    </button>
    <LoginForm v-if="formState" />
    <RegisterForm v-else />
  </div>
</template>
