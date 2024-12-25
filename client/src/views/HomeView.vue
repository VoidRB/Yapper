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
      class="mb-10 text-center text-5xl font-bold text-CLACCPrimary dark:text-CDACCPrimary"
    >
      Welcome to
      <span class="text-CLACCSecondary dark:text-CDACCSecondary">Yapper </span>!
    </h1>
    <label
      class="relative inline-flex cursor-pointer items-center transition-transform"
    >
      <input
        type="checkbox"
        @click="formState = !formState"
        class="peer sr-only"
      />
      <div
        class="after: peer flex h-8 items-center gap-4 rounded-full bg-CLACCPrimary px-3 text-sm text-white after:absolute after:left-1 after:h-6 after:w-16 after:rounded-full after:bg-white after:bg-opacity-45 after:transition-all after:content-[''] peer-checked:bg-CLACCSecondary peer-checked:after:translate-x-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-white/40 dark:border-slate-600 dark:bg-CDACCPrimary dark:peer-checked:bg-CDACCSecondary"
      >
        <span>&nbsp;&nbsp;Login</span>
        <span>Register</span>
      </div>
    </label>

    <LoginForm v-if="formState" />
    <RegisterForm v-else />
  </div>
</template>
