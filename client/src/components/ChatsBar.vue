<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const usersList = ref([]);

//TODO add the list of users the user is familiar with here
// onMounted(async () => {
//   try {
//     const response = await axios.get("/api/login/all");
//     usersList.value = response.data.users;
//   } catch (error) {}
// });
// usersList[0].username;
</script>
<template>
  <section
    class="hidden h-full w-1/6 flex-col items-center bg-CLBGPrimary lg:flex dark:bg-CDBGPrimary"
  >
    <div v-for="user in usersList" class="mb-5 text-white">
      <button
        class="size-5 select-none rounded-full text-CLACCPrimary ring-2 ring-CLACCPrimary focus:text-CLACCSecondary focus:outline-none active:text-CLACCSecondary active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:focus:text-CDACCSecondary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
      >
        T
      </button>
      {{ user.username }}
    </div>
  </section>
</template>
