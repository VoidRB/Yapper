<script setup>
import { RouterLink } from "vue-router";
</script>
<template>
  <RouterLink
    :to="{ name: 'Profile' }"
    class="flex size-10 cursor-pointer items-center justify-center rounded-full capitalize text-CLACCPrimary shadow-black ring-2 ring-CLACCPrimary transition-all hover:size-11 hover:text-CLACCSecondary hover:shadow-2xl hover:ring-CLACCSecondary focus:outline-none focus:ring-CLACCSecondary active:text-CLACCSecondary dark:text-CDACCPrimary dark:ring-CDACCPrimary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary focus:dark:ring-CDACCSecondary active:dark:text-CDACCSecondary"
    ><i class="pi pi-user text-2xl"></i
  ></RouterLink>
</template>
