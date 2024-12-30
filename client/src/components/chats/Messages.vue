<script setup>
import { useUserStore } from "@/stores/userStore";
import { Socket } from "socket.io-client";
import { onMounted, ref } from "vue";
import { decode } from "@zaubrik/djwt";
const userStore = useUserStore();
const user = ref({});

const { token } = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    localStorage.getItem("Register-user-data"),
);

const [_header, { payload }] = decode(token);
onMounted(() => {
  user.value = userStore.getUser();
});
const props = defineProps({
  texts: Array,
  socket: Socket,
});
</script>
<template>
  <div class="flex flex-col">
    <div v-for="text in texts" :key="text.id">
      <div
        v-if="text.fromUserId === payload.userId"
        class="my-1 w-1/2 place-self-start rounded-bl-xl rounded-tr-xl bg-CLBGPrimary text-white shadow-xl ring-2 ring-CLACCPrimary dark:bg-CDBGPrimary dark:ring-CDACCPrimary"
      >
        <p class="ml-2 break-words p-2">
          {{ text.content }}
        </p>
      </div>
      <div
        v-else
        class="my-1 w-1/2 place-self-end rounded-bl-xl rounded-tr-xl bg-CLACCSecondary text-white shadow-xl ring-2 ring-CLACCPrimary dark:bg-CDACCSecondary dark:ring-CDACCPrimary"
      >
        <h1 class="ml-2 break-words pt-2 text-sm">{{ text.fromUsername }}</h1>
        <p class="ml-2 break-words p-2">{{ text.content }}</p>
      </div>
    </div>
  </div>
</template>
