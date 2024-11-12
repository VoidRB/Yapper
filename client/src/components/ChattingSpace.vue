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
          class="w-full rounded-lg bg-transparent p-4 text-black shadow-2xl outline-none outline-CLACCPrimary transition-shadow focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-black focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
        />
      </div>
      <div>
        <button
          @click="SendMessage, (inputText = '')"
          class="mr-10 size-10 rounded-full border-b-2 border-CLACCPrimary text-3xl font-extrabold text-CLACCPrimary shadow-2xl ring-2 ring-CLACCPrimary hover:shadow-black focus:outline-none active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
        >
          >
        </button>
      </div>
    </section>
  </div>
</template>
