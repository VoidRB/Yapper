<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { decode } from "@zaubrik/djwt";

const logout = async () => {
  const token = JSON.parse(
    sessionStorage.getItem("Login-user-data") ||
      localStorage.getItem("Register-user-data"),
  );
  const [_header, payload] = await decode(token.token);
  try {
    await axios.post(`/api/logout`, {
      userId: payload.payload.userId,
    });
  } catch (error) {
    throw error;
  }
};
</script>
<template>
  <RouterLink
    @click="logout"
    :to="{ name: 'Home' }"
    class="text-2xl font-bold text-CLACCPrimary drop-shadow-sm hover:text-CLACCSecondary focus:underline focus:outline-none md:ml-12 dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
  >
    Yapper
  </RouterLink>
</template>
