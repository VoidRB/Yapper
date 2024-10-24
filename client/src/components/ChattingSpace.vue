<script setup>
import { ref } from "vue";

const inputText = ref("");
</script>
<template>
  <div
    class="flex h-full w-full flex-col justify-between border-2 border-ChatLightAccentPrimary bg-ChatLightBGSecondary shadow-inner shadow-black lg:w-5/6 dark:border-ChatDarkAccentPrimary dark:bg-ChatDarkBGSecondary"
  >
    <section class="h-full w-full"></section>
    <section class="my-5 flex w-full items-center justify-center">
      <div class="w-full px-10">
        <input
          v-model="inputText"
          autofocus
          type="text"
          class="w-full rounded-lg bg-transparent p-4 text-black outline-none outline-ChatLightAccentPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-ChatLightAccentSecondary dark:text-white dark:outline-ChatDarkAccentPrimary focus:dark:outline-ChatDarkAccentSecondary"
        />
      </div>
      <div>
        <button
          class="mr-10 size-10 cursor-pointer rounded-full text-2xl font-extrabold text-ChatLightAccentPrimary shadow-black ring-2 ring-ChatLightAccentPrimary transition-all hover:text-ChatLightAccentSecondary hover:shadow-2xl hover:ring-ChatLightAccentSecondary focus:outline-none focus:ring-ChatLightAccentSecondary active:text-ChatLightAccentSecondary dark:text-ChatDarkAccentPrimary dark:ring-ChatDarkAccentPrimary hover:dark:text-ChatDarkAccentSecondary hover:dark:ring-ChatDarkAccentSecondary focus:dark:ring-ChatDarkAccentSecondary active:dark:text-ChatDarkAccentSecondary"
        >
          >
        </button>
      </div>
    </section>
  </div>
</template>
