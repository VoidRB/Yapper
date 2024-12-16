<script setup>
import { useMessageStore } from "@/stores/messagesStore";
import { useUserStore } from "@/stores/userStore";
import { Socket } from "socket.io-client";
import { ref } from "vue";
const messageStore = useMessageStore();
const userStore = useUserStore();
const user = ref({});

user.value = userStore.getUser();
const props = defineProps({
  texts: Array,
  userSocketId: String,
  socket: Socket,
});

const texts2 = ref([]);
props.socket.on("message:set", () => {
  texts2.value = messageStore.getFullConversation();
  console.log(texts2.value);
  user.value = userStore.getUser();
});
</script>
<template>
  <section
    class="my-2 flex max-h-96 w-full flex-col gap-1 overflow-y-scroll p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div v-for="text in texts2" :key="text.id" class="h-full w-full">
      <div
        v-if="text.fromUserId !== user.userId"
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
        <h1 class="ml-2 break-words pt-2 text-sm">
          {{ user.username }}
        </h1>
        <p class="ml-2 break-words p-2">
          {{ text.content }}
        </p>
      </div>
    </div>
  </section>
</template>
