<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <RouterLink
    :to="{ name: 'Home' }"
    class="text-2xl font-bold text-CLACCPrimary drop-shadow-sm hover:text-CLACCSecondary focus:underline focus:outline-none md:ml-12 dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
  >
    Yapper
  </RouterLink>
</template>
