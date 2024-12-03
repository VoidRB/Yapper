<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import ProfileButton from "./TopBar/ProfileButton.vue";
import Branding from "./TopBar/Branding.vue";
const theme = ref(Boolean);
const user = ref("");

const activeLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

user.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    sessionStorage.getItem("Register-user-data"),
);

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
  <div class="h-24 w-full bg-CLBGPrimary transition-colors dark:bg-CDBGPrimary">
    <div class="flex h-full w-full items-center justify-between px-10">
      <Branding />
      <section class="flex items-center justify-center gap-4">
        <button
          class="text-CLACCPrimary hover:text-CLACCSecondary focus:underline focus:outline-none dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
          @click="switchTheme"
        >
          Switch Mode
        </button>
        <ProfileButton v-show="!activeLink('/')" />
      </section>
    </div>
  </div>
</template>
