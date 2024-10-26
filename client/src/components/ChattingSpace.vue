<script setup>
import { ref } from "vue";

const webSocket = new WebSocket(`ws://localhost:5005/`);

const inputText = ref("");

const texts = ref([]);

const SendMessage = () => {
  if (inputText.value === "") {
  } else {
    webSocket.send(`${inputText.value}`);
    console.log(`Sent ${inputText.value}`);
  }
};

webSocket.onmessage = (event) => {
  texts.value.push(event.data);
};
</script>
<template>
  <div
    class="flex h-full w-full flex-col justify-between border-2 border-CLACCPrimary bg-CLBGSecondary shadow-inner shadow-black lg:w-5/6 dark:border-CDACCPrimary dark:bg-CDBGSecondary"
  >
    <section
      class="my-2 flex max-h-full w-full flex-col gap-1 overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <h1
        class="mx-2 w-1/2 text-wrap bg-CLACCSecondary p-4 text-white dark:bg-CDACCSecondary"
        v-for="text in texts"
      >
        {{ text }}
      </h1>
    </section>
    <section class="my-5 flex w-full items-center justify-center">
      <div class="w-full px-10">
        <input
          @keypress.enter="SendMessage(inputText)"
          @keyup.enter="inputText = ''"
          v-model="inputText"
          autofocus
          type="text"
          class="w-full rounded-lg bg-transparent p-4 text-black outline-none outline-CLACCPrimary focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-2xl focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
        />
      </div>
      <div>
        <button
          @click="SendMessage"
          class="mr-10 size-10 cursor-pointer rounded-full text-2xl font-extrabold text-CLACCPrimary shadow-black ring-2 ring-CLACCPrimary transition-all hover:text-CLACCSecondary hover:shadow-2xl hover:ring-CLACCSecondary focus:outline-none focus:ring-CLACCSecondary active:text-CLACCSecondary dark:text-CDACCPrimary dark:ring-CDACCPrimary hover:dark:text-CDACCSecondary hover:dark:ring-CDACCSecondary focus:dark:ring-CDACCSecondary active:dark:text-CDACCSecondary"
        >
          >
        </button>
      </div>
    </section>
  </div>
</template>
