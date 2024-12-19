<script setup>
import { Socket } from "socket.io-client";
import { ref } from "vue";
import Messages from "./Messages.vue";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const user = ref({});
const inputText = ref("");
const texts = ref([]);
const props = defineProps({
  socket: Socket,
});

props.socket.on("message:global", (message) => {
  console.log(message);
  if (userStore.getUserLength() > 0) {
    console.log(`User Exists`);
  } else {
    console.log(`No User`);
    texts.value.push(message);
  }
});

props.socket.on("message:private", (message) => {
  user.value = userStore.getUser();
  if (userStore.getUserLength() > 0) {
    if (user.value.userId == message.fromUserId) {
      console.log(`User Exists`);
      texts.value.push(message);
    }
  } else {
    console.log(`No User`);
  }
});

const sendMessage = () => {
  const message = {
    content: inputText.value,
    toSocketId: userStore.user.socketId,
    toUserId: userStore.user.userId,
  };

  if (inputText.value.trim(" ")) {
    if (userStore.getUserLength() === 0) {
      props.socket.emit("message:global", message);
    } else {
      props.socket.emit("message:private", message);
      texts.value.push({
        content: inputText.value,
        toSocketId: userStore.user.socketId,
        toUserId: userStore.user.userId,
        fromUserId: props.socket.auth.userId,
        fromUsername: props.socket.auth.username,
      });
    }
  }
};
props.socket.on("message:set", (fullConvo) => {
  fullConvo.forEach((message) => {
    texts.value.push(message);
  });
});
</script>
<template>
  <div
    class="flex h-[91%] w-full flex-col-reverse justify-between border-2 border-CLACCPrimary bg-CLBGSecondary shadow-inner shadow-black lg:w-5/6 dark:border-CDACCPrimary dark:bg-CDBGSecondary"
  >
    <section class="my-6 flex h-16 w-full items-center justify-end">
      <div class="w-2/3 px-6 sm:w-4/5 md:w-5/6 lg:w-full">
        <input
          @keypress.enter="sendMessage()"
          @keyup.enter="inputText = ''"
          v-model="inputText"
          autofocus
          type="text"
          class="w-full rounded-lg bg-transparent p-4 text-black shadow-2xl outline-none outline-CLACCPrimary transition-shadow focus:bg-slate-50 focus:bg-opacity-20 focus:shadow-black focus:outline-CLACCSecondary dark:text-white dark:outline-CDACCPrimary focus:dark:outline-CDACCSecondary"
        />
      </div>
      <div>
        <button
          @click="(sendMessage(), (inputText = ''))"
          class="mr-5 size-12 items-center justify-center rounded-full border-b-2 border-CLACCPrimary text-CLACCPrimary shadow-2xl ring-2 ring-CLACCPrimary hover:bg-white hover:bg-opacity-20 hover:shadow-black focus:text-CLACCSecondary focus:outline-none active:border-b-0 active:border-t-2 active:border-CLACCSecondary active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:focus:text-CDACCSecondary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
        >
          <i class="pi pi-send mr-0.5 mt-1 text-2xl"></i>
        </button>
      </div>
    </section>
    <Messages :texts="texts" :socket="props.socket" />
  </div>
</template>
