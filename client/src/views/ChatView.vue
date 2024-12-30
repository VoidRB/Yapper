<script setup>
import ChatsSideBar from "@/components/chats/ChatsSideBar.vue";
import ChattingSpace from "@/components/chats/ChattingSpace.vue";
import { io } from "socket.io-client";
import { decode } from "@zaubrik/djwt";
import { onBeforeRouteLeave } from "vue-router";
import { useMessageStore } from "@/stores/messagesStore";

const messagesStore = useMessageStore();

const { token } = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    localStorage.getItem("Register-user-data"),
);
const [_header, { payload }] = await decode(token);
const socket = io("http://localhost:5005", {
  path: "/chat/",
  extraHeaders: {
    Authorization: `Bearer ${token}`,
  },
  auth: {
    name: payload.username,
    userId: payload.userId,
  },
});

socket.on("message:all", ({ recievedMessages, sentMessages }) => {
  messagesStore.setRecievedMessages(recievedMessages);
  messagesStore.setSentMessages(sentMessages);
});

onBeforeRouteLeave(() => {
  socket.disconnect();
});
</script>

<template>
  <div class="flex flex-1 justify-normal transition-all">
    <ChatsSideBar :socket="socket" />
    <ChattingSpace :socket="socket" />
  </div>
</template>
