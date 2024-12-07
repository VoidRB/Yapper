<script setup>
//TODO fix the front-end and its navigation
import { Socket } from "socket.io-client";
import { ref } from "vue";
import Messages from "./Messages.vue";

const userId = ref("");
const inputText = ref("");
const texts = ref([]);
const props = defineProps({
  socket: Socket,
});

props.socket.on("sendallMSG", (msg) => {
  texts.value.push(msg);
});

props.socket.on("userConnId", (msg) => {
  userId.value = msg.id;
});

const SendMessage = () => {
  if (inputText.value.trim(" ")) {
    props.socket.emit("newMessage", inputText.value);
    console.log(`Sent ${inputText.value}`);
  }
};
</script>
<template>
  <div
    class="flex size-full flex-col justify-between border-2 border-CLACCPrimary bg-CLBGSecondary shadow-inner shadow-black lg:w-5/6 dark:border-CDACCPrimary dark:bg-CDBGSecondary"
  >
    <Messages :texts="texts" :userId="userId" />
    <section class="my-5 flex w-full items-center justify-end">
      <div class="w-2/3 px-10 md:w-5/6 lg:w-full">
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
          @click="(SendMessage(inputText), (inputText = ''))"
          class="mr-10 flex size-12 items-center justify-center rounded-full border-b-2 border-CLACCPrimary text-CLACCPrimary shadow-2xl ring-2 ring-CLACCPrimary hover:bg-white hover:bg-opacity-20 hover:shadow-black focus:text-CLACCSecondary focus:outline-none active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:focus:text-CDACCSecondary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
        >
          <i class="pi pi-send mr-0.5 mt-1 text-2xl"></i>
        </button>
      </div>
    </section>
  </div>
</template>
