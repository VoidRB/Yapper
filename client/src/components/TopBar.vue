<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const theme = ref(Boolean);

const switchTheme = () => {
  let themeState = JSON.parse(localStorage.getItem("theme"));
  if (themeState === true) {
    document.body.classList.add("dark");
    theme.value = !theme.value;
    JSON.stringify(localStorage.setItem("theme", theme.value));
    console.log("To DarkMode");
  } else {
    document.body.classList.remove("dark");
    theme.value = !theme.value;
    JSON.stringify(localStorage.setItem("theme", theme.value));
    console.log("To LightMode");
  }
};
</script>

<template>
  <div class="dark:bg-CDBGPrimary bg-CLBGPrimary h-24 w-full antialiased">
    <div class="flex h-full w-full items-center justify-between px-10">
      <section>
        <RouterLink
          :to="{ name: 'Home' }"
          class="dark:text-CDACCPrimary hover:dark:text-CDACCSecondary text-CLACCPrimary hover:text-CLACCSecondary text-2xl font-bold drop-shadow-sm focus:outline-none active:underline md:ml-12"
        >
          Yapper
        </RouterLink>
      </section>
      <section class="flex items-center justify-center gap-4">
        <button
          class="dark:text-CDACCPrimary hover:dark:text-CDACCSecondary text-CLACCPrimary hover:text-CLACCSecondary focus:outline-none active:underline"
          @click="switchTheme"
        >
          Switch Mode
        </button>
        <RouterLink
          :to="{ name: 'Profile' }"
          class="dark:text-CDACCPrimary dark:ring-CDACCPrimary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary focus:dark:ring-CDACCSecondary active:dark:text-CDACCSecondary text-CLACCPrimary ring-CLACCPrimary hover:text-CLACCSecondary hover:ring-CLACCSecondary focus:ring-CLACCSecondary active:text-CLACCSecondary flex size-10 cursor-pointer items-center justify-center rounded-full shadow-black ring-2 transition-all hover:size-11 hover:shadow-2xl focus:outline-none"
          >P</RouterLink
        >
      </section>
    </div>
  </div>
</template>
