<script setup>
import ChatsSideBar from "@/components/chats/ChatsSideBar.vue";
import ChattingSpace from "@/components/chats/ChattingSpace.vue";
import { onMounted, ref } from "vue";
import { io } from "socket.io-client";
import { decode } from "@zaubrik/djwt";
import { onBeforeRouteLeave } from "vue-router";
import { useMessageStore } from "@/stores/messagesStore";

const user = ref({});
const store = useMessageStore();

user.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    localStorage.getItem("Register-user-data"),
);

const [_header, payload] = await decode(user.value.token);

const socket = io("http://localhost:5005", {
  path: "/chat/",
  extraHeaders: {
    Authorization: `Bearer ${user.value.token}`,
  },
  auth: {
    name: payload.payload.username,
    userId: payload.payload.userId,
  },
});

socket.on("message:all", ({ recievedMessages, sentMessages }) => {
  store.setRecievedMessages(recievedMessages);
  store.setSentMessages(sentMessages);
});

onBeforeRouteLeave(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="flex h-screen w-full justify-normal transition-all">
    <ChatsSideBar :socket="socket" />
    <ChattingSpace :socket="socket" />
  </div>
</template>
