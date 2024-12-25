<script setup>
import axios from "axios";
import { RouterLink } from "vue-router";
import { decode } from "@zaubrik/djwt";

const logout = async () => {
  const { token } = JSON.parse(
    sessionStorage.getItem("Login-user-data") ||
      localStorage.getItem("Register-user-data"),
  );
  const [_header, { payload }] = await decode(token);
  try {
    await axios.post(`/api/logout`, {
      userId: payload.userId,
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
    class="py-6 text-2xl font-bold text-CLACCPrimary drop-shadow-sm hover:text-CLACCSecondary focus:underline focus:outline-none md:ml-12 dark:text-CDACCPrimary hover:dark:text-CDACCSecondary"
  >
    Yapper
  </RouterLink>
</template>
