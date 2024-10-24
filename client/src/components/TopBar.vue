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
  <div
    class="h-24 w-full bg-ChatLightBGPrimary antialiased dark:bg-ChatDarkBGPrimary"
  >
    <div class="flex h-full w-full items-center justify-between px-10">
      <section>
        <RouterLink
          :to="{ name: 'Home' }"
          class="text-2xl font-bold text-ChatLightAccentPrimary drop-shadow-sm hover:text-ChatLightAccentSecondary focus:underline focus:outline-none md:ml-12 dark:text-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary"
        >
          Yapper
        </RouterLink>
      </section>
      <section class="flex items-center justify-center gap-4">
        <button
          class="text-ChatLightAccentPrimary hover:text-ChatLightAccentSecondary focus:underline focus:outline-none dark:text-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary"
          @click="switchTheme"
        >
          Switch Mode
        </button>
        <RouterLink
          :to="{ name: 'Profile' }"
          class="flex size-10 cursor-pointer items-center justify-center rounded-full text-ChatLightAccentPrimary shadow-black ring-2 ring-ChatLightAccentPrimary transition-all hover:size-11 hover:text-ChatLightAccentSecondary hover:shadow-2xl hover:ring-ChatLightAccentSecondary focus:outline-none focus:ring-ChatLightAccentSecondary active:text-ChatLightAccentSecondary dark:text-ChatDarkAccentPrimary dark:ring-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary hover:dark:ring-ChatDarkAccentSecondary focus:dark:ring-ChatDarkAccentSecondary active:dark:text-ChatDarkAccentSecondary"
          >P</RouterLink
        >
      </section>
    </div>
  </div>
</template>
