<script setup></script>
<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-10 text-5xl"
  >
    <h1 class="text-ChatLightAccentPrimary dark:text-ChatDarkAccentPrimary">
      <span
        class="text-ChatLightAccentSecondary dark:text-ChatDarkAccentSecondary"
        >404</span
      >
      | Not Found
    </h1>
    <RouterLink
      :to="{ name: 'Home' }"
      class="text-2xl font-bold text-ChatLightAccentPrimary drop-shadow-sm hover:text-ChatLightAccentSecondary focus:underline focus:outline-none md:ml-12 dark:text-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary"
    >
      Home
    </RouterLink>
  </div>
</template>
