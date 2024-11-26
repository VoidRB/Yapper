<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const theme = ref(Boolean);

const activeLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

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
  <div
    class="h-24 w-full bg-CLBGPrimary antialiased transition-colors dark:bg-CDBGPrimary"
  >
    <div class="flex h-full w-full items-center justify-between px-10">
      <section>
        <RouterLink
          :to="{ name: 'Home' }"
          class="text-2xl font-bold text-CLACCPrimary drop-shadow-sm hover:text-CLACCSecondary focus:underline focus:outline-none md:ml-12 dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
        >
          Yapper
        </RouterLink>
      </section>
      <section class="flex items-center justify-center gap-4">
        <button
          class="text-CLACCPrimary hover:text-CLACCSecondary focus:underline focus:outline-none dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
          @click="switchTheme"
        >
          Switch Mode
        </button>
        <RouterLink
          :to="{ name: 'Profile' }"
          :class="[
            activeLink('/') ? 'hidden' : 'visible',
            'flex',
            'size-10',
            'cursor-pointer',
            'items-center',
            'justify-center',
            'rounded-full',
            'text-CLACCPrimary',
            'shadow-black',
            'ring-2',
            'ring-CLACCPrimary',
            'transition-all',
            'hover:size-11',
            'hover:text-CLACCSecondary',
            'hover:shadow-2xl',
            'hover:ring-CLACCSecondary',
            'focus:outline-none',
            'focus:ring-CLACCSecondary',
            'active:text-CLACCSecondary',
            'dark:text-CDACCPrimary',
            'dark:ring-CDACCPrimary',
            'hover:dark:text-CDACCSecondary',
            'hover:dark:ring-CDACCSecondary',
            'focus:dark:ring-CDACCSecondary',
            'active:dark:text-CDACCSecondary',
          ]"
          >P</RouterLink
        >
      </section>
    </div>
  </div>
</template>
