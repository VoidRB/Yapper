<script setup></script>
<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-10 text-5xl"
  >
    <h1 class="dark:text-CDACCPrimary text-CLACCPrimary">
      <span class="dark:text-CDACCSecondary text-CLACCSecondary">404</span>
      | Not Found
    </h1>
    <RouterLink
      :to="{ name: 'Home' }"
      class="dark:text-CDACCPrimary hover:dark:text-CDACCSecondary text-CLACCPrimary hover:text-CLACCSecondary text-2xl font-bold drop-shadow-sm focus:underline focus:outline-none md:ml-12"
    >
      Home
    </RouterLink>
  </div>
</template>
