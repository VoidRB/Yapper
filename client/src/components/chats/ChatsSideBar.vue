<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const usersList = ref([]);

// TODO add the list of users the user is familiar with here
onMounted(async () => {
  try {
    const response = await axios.get("/api/login/all");
    usersList.value = response.data.users;
  } catch (error) {}
});
</script>
<template>
  <section
    class="hidden h-full w-1/6 flex-col bg-CLBGPrimary pt-10 lg:flex dark:bg-CDBGPrimary"
  >
    <div v-for="user in usersList">
      <button
        class="mb-2 w-full cursor-pointer justify-center p-2 text-CLACCPrimary shadow-black ring-1 ring-CLACCPrimary transition-all hover:bg-CLBGSecondary hover:p-3 hover:text-CLACCSecondary hover:shadow-2xl hover:ring-CLACCSecondary focus:outline-none dark:bg-CDBGPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:hover:bg-CDBGSecondary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary"
      >
        <h1 class="capitalize shadow-black drop-shadow-md">
          {{ user.username }}
        </h1>
      </button>
    </div>
  </section>
</template>
<!-- 
<button
        class="size-10 cursor-pointer items-center justify-center rounded-full bg-black capitalize text-CLACCPrimary shadow-black ring-2 ring-CLACCPrimary transition-all hover:size-11 hover:text-CLACCSecondary hover:shadow-2xl hover:ring-CLACCSecondary focus:outline-none focus:ring-CLACCSecondary active:text-CLACCSecondary dark:text-CDACCPrimary dark:ring-CDACCPrimary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary focus:dark:ring-CDACCSecondary active:dark:text-CDACCSecondary"
      >
        {{ user.username.split("")[0] }}
      </button>
      <h1>{{ user.username }}</h1> -->
