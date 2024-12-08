<script setup lang="ts">
import LoginForm from "@/components/Home/LoginForm.vue";
import RegisterForm from "@/components/Home/RegisterForm.vue";
import { ref } from "vue";

const formState = ref(true);
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-5 bg-CLBGSecondary transition-colors dark:bg-CDBGSecondary"
  >
    <h1
      class="text-center text-5xl font-bold text-CLACCPrimary dark:text-CDACCPrimary"
    >
      Welcome to
      <span class="text-CLACCSecondary dark:text-CDACCSecondary">Yapper </span>!
    </h1>

    <label class="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        class="peer sr-only"
        @click="formState = !formState"
      />
      <div
        class="peer relative h-6 w-11 rounded-full bg-CLACCSecondary after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-CLACCPrimary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-CDACCPrimary dark:peer-checked:bg-CDACCSecondary dark:peer-focus:ring-blue-800"
      ></div>
    </label>
    <LoginForm v-if="formState" />
    <RegisterForm v-else />
  </div>
</template>
