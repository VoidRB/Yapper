<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");

const usernameCheck = ref(Boolean);
const buttonState = ref(Boolean);
usernameCheck.value = false;

const buttonStateFunc = () => {
  if (username.value === "") {
    buttonState.value = true;
  } else if (username.value.split("").length > 3) {
    buttonState.value = false;
  } else {
    buttonState.value = true;
  }
};

const toChats = async () => {
  if (username.value === "") {
    buttonState.value = false;
  } else if (username.value.split("").length < 4) {
    usernameCheck.value = true;
  } else {
    usernameCheck.value = false;
    buttonState.value = false;

    router.push({
      name: "Chats",
      params: {
        username: username.value,
      },
    });
  }
};
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-10 bg-CLBGSecondary dark:bg-CDBGSecondary"
  >
    <h1
      class="text-center text-5xl font-bold text-CLACCPrimary dark:text-CDACCPrimary"
    >
      Welcome to
      <span class="text-CLACCSecondary dark:text-CDACCSecondary">Yapper </span>!
    </h1>

    <h1 v-if="buttonState" class="text-center text-red-500">
      Make sure your Username is more than 3 characters
    </h1>
    <input
      @input="buttonStateFunc"
      v-model="username"
      type="text"
      placeholder="Username"
      maxlength="10"
      class="rounded-lg bg-transparent p-2 text-center text-black outline-none outline-CLACCPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
    />

    <button
      :disabled="buttonState"
      @click="toChats()"
      class="disabled:hover: text-CLACCPrimary drop-shadow-sm hover:text-CLACCSecondary hover:underline focus:text-CLACCSecondary focus:outline-none disabled:text-black disabled:hover:text-black disabled:hover:no-underline dark:text-CDACCPrimary hover:dark:text-CDACCSecondary focus:dark:text-CDACCSecondary"
    >
      Now Chat!
    </button>
  </div>
</template>
