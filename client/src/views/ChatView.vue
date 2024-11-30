<script setup>
import ChatsSideBar from "@/components/chats/ChatsSideBar.vue";
import ChattingSpace from "@/components/chats/ChattingSpace.vue";
import { ref } from "vue";
import { io } from "socket.io-client";

const user = ref({});

user.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    sessionStorage.getItem("Register-user-data"),
);

const socket = io("http://localhost:5005", {
  path: "/chat/",
  extraHeaders: {
    Authorization: `Bearer ${user.value.token}`,
  },
});
</script>

<template>
  <div class="flex h-screen w-full transition-all">
    <ChatsSideBar />
    <ChattingSpace :socket="socket" />
  </div>
</template>
