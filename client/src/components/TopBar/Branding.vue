<script setup>
import axios from "axios";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { decode } from "@zaubrik/djwt";

const user = ref({});

const logout = async () => {
  user.value = JSON.parse(sessionStorage.getItem("Login-user-data"));
  const [header, payload, signature] = await decode(user.value.token);
  console.log(payload);
  try {
    const response = await axios.post(`/api/logout`, {
      userId: payload.payload.userId,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
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
