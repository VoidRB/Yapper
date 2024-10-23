<script setup>
import { RouterLink } from 'vue-router';
</script>
<template>
  <div
    class="flex-col gap-10 size-full flex items-center justify-center dark:bg-ChatDarkBGSecondary bg-ChatLightBGSecondary"
  >
    <h1
      class="text-5xl font-bold dark:text-ChatDarkAccentPrimary text-ChatLightAccentPrimary"
    >
      Welcome to
      <span
        class="dark:text-ChatDarkAccentSecondary text-ChatLightAccentSecondary"
        >Yapper </span
      >!
    </h1>
    <RouterLink
      :to="{ name: 'Chats' }"
      class="dark:text-ChatDarkAccentSecondary text-ChatLightAccentSecondary"
      >Chats</RouterLink
    >
  </div>
</template>
