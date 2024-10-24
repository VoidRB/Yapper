<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const theme = ref(Boolean);

const switchTheme = () => {
  let themeState = JSON.parse(localStorage.getItem('theme'));
  if (themeState === true) {
    document.body.classList.add('dark');
    theme.value = !theme.value;
    JSON.stringify(localStorage.setItem('theme', theme.value));
    console.log('To DarkMode');
  } else {
    document.body.classList.remove('dark');
    theme.value = !theme.value;
    JSON.stringify(localStorage.setItem('theme', theme.value));
    console.log('To LightMode');
  }
};
</script>

<template>
  <div class="w-full h-24 dark:bg-ChatDarkBGPrimary bg-ChatLightBGPrimary">
    <div class="flex justify-between items-center h-full w-full px-10">
      <section>
        <RouterLink
          :to="{ name: 'Home' }"
          class="md:ml-12 font-bold text-2xl hover:dark:text-ChatDarkAccentSecondary hover:text-ChatLightAccentSecondary dark:text-ChatDarkAccentPrimary text-ChatLightAccentPrimary"
        >
          Yapper
        </RouterLink>
      </section>
      <section class="flex gap-4 justify-center items-center">
        <button
          class="hover:dark:text-ChatDarkAccentSecondary hover:text-ChatLightAccentSecondary dark:text-ChatDarkAccentPrimary text-ChatLightAccentPrimary"
          @click="switchTheme"
        >
          Switch Mode
        </button>
        <RouterLink
          :to="{ name: 'Profile' }"
          class="ring-2 hover:shadow-2xl shadow-black hover:size-11 transition-all rounded-full size-10 cursor-pointer hover:ring-ChatLightAccentSecondary dark:ring-ChatDarkAccentPrimary ring-ChatLightAccentPrimary hover:dark:ring-ChatDarkAccentSecondary"
        ></RouterLink>
      </section>
    </div>
  </div>
</template>
