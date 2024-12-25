<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ProfileButton from "./TopBar/ProfileButton.vue";
import Branding from "./TopBar/Branding.vue";
const theme = ref(Boolean);

const activeLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

const switchTheme = () => {
  const themeState = JSON.parse(localStorage.getItem("theme"));
  const newThemeState = !themeState;

  document.body.classList.toggle("dark", newThemeState);
  localStorage.setItem("theme", JSON.stringify(newThemeState));
  theme.value = newThemeState;

  console.log(newThemeState ? "To DarkMode" : "To LightMode");
};
</script>

<template>
  <div
    class="flex h-24 w-full items-center justify-between bg-CLBGPrimary px-10 transition-colors dark:bg-CDBGPrimary"
  >
    <Branding />
    <section class="flex items-center justify-center gap-4">
      <button
        class="text-CLACCPrimary hover:text-CLACCSecondary focus:underline focus:outline-none dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
        @click="switchTheme"
      >
        Switch Mode
      </button>
      <Suspense>
        <ProfileButton v-show="!activeLink('/')" />
        <template #fallback><i class="pi pi-user"></i></template>
      </Suspense>
    </section>
  </div>
</template>
