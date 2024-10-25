<script setup>
import { ref } from "vue";

const inputText = ref("");
</script>
<template>
  <div
    class="dark:bg-CDBGSecondary dark:border-CDACCPrimary bg-CLBGSecondary border-CLACCPrimary flex h-full w-full flex-col justify-between border-2 shadow-inner shadow-black lg:w-5/6"
  >
    <section class="h-full w-full"></section>
    <section class="my-5 flex w-full items-center justify-center">
      <div class="w-full px-10">
        <input
          v-model="inputText"
          autofocus
          type="text"
          class="dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary outline-CLACCPrimary focus:outline-CLACCSecondary w-full rounded-lg bg-transparent p-4 text-black outline-none focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl dark:text-white"
        />
      </div>
      <div>
        <button
          class="dark:text-CDACCPrimary dark:ring-CDACCPrimary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary focus:dark:ring-CDACCSecondary active:dark:text-CDACCSecondary text-CLACCPrimary ring-CLACCPrimary hover:text-CLACCSecondary hover:ring-CLACCSecondary focus:ring-CLACCSecondary active:text-CLACCSecondary mr-10 size-10 cursor-pointer rounded-full text-2xl font-extrabold shadow-black ring-2 transition-all hover:shadow-2xl focus:outline-none"
        >
          >
        </button>
      </div>
    </section>
  </div>
</template>
