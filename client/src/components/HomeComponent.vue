<script setup>
import { ref, resolveDirective } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const usernameCheck = ref(Boolean);

const toChats = () => {
  if (username.value === "") {
    usernameCheck.value = false;
    console.log(`No Username`);
  } else {
    usernameCheck.value = true;
    console.log(`Username : ${username.value}`);
    router.push({ name: "Chats", params: username.value });
  }
};
</script>

<template>
  <div
    class="flex size-full flex-col items-center justify-center gap-10 bg-ChatLightBGSecondary dark:bg-ChatDarkBGSecondary"
  >
    <h1
      class="text-center text-5xl font-bold text-ChatLightAccentPrimary dark:text-ChatDarkAccentPrimary"
    >
      Welcome to
      <span
        class="text-ChatLightAccentSecondary dark:text-ChatDarkAccentSecondary"
        >Yapper </span
      >!
    </h1>
    <h1 v-if="!usernameCheck" class="text-red-500">
      Please enter your Username!
    </h1>
    <input
      v-model="username"
      type="text"
      placeholder="Username"
      minlength="3"
      maxlength="10"
      class="rounded-lg bg-transparent p-2 text-center text-black outline-none outline-ChatLightAccentPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-ChatLightAccentSecondary dark:text-white dark:outline-ChatDarkAccentPrimary focus:dark:outline-ChatDarkAccentSecondary"
    />

    <button
      @click="toChats()"
      class="text-ChatLightAccentPrimary drop-shadow-sm hover:text-ChatLightAccentSecondary hover:underline focus:text-ChatLightAccentSecondary focus:outline-none dark:text-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary focus:dark:text-ChatDarkAccentSecondary"
    >
      Click here to Chat!
    </button>
  </div>
</template>
