<script setup>
import { useUserStore } from "@/stores/userStore";
import { Socket } from "socket.io-client";
import { ref } from "vue";
import { decode } from "@zaubrik/djwt";
const userStore = useUserStore();
const user = ref({});

const token = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    localStorage.getItem("Register-user-data"),
);

const [_header, payload] = decode(token.token);

user.value = userStore.getUser();
const props = defineProps({
  texts: Array,
  socket: Socket,
});

console.log();
</script>
<template>
  <section
    class="my-2 flex h-96 w-full flex-col overflow-y-scroll p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div v-for="text in texts" class="mb-1 w-full">
      <div
        v-if="text.fromUserId === payload.payload.userId"
        class="mb-1 w-1/2 place-self-start text-wrap rounded-bl-xl rounded-tr-xl bg-CLBGPrimary text-white shadow-xl ring-2 ring-CLACCPrimary dark:bg-CDBGPrimary dark:ring-CDACCPrimary"
      >
        <p class="ml-2 break-words p-2">
          {{ text.content }}
        </p>
      </div>

      <div
        v-else
        class="mb-1 w-1/2 place-self-end text-wrap rounded-bl-xl rounded-tr-xl bg-CLACCSecondary text-white shadow-xl ring-2 ring-CLACCPrimary dark:bg-CDACCSecondary dark:ring-CDACCPrimary"
      >
        <h1 class="ml-2 break-words pt-2 text-sm">PLACEHOLDER</h1>
        <p class="ml-2 break-words p-2">{{ text.content }}</p>
      </div>
    </div>
  </section>
</template>
