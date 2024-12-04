<script setup>
import { Socket } from "socket.io-client";
import { ref } from "vue";

const usersList = ref([]);
const savedUser = ref("");
const props = defineProps({
  socket: Socket,
});

savedUser.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    sessionStorage.getItem("Register-user-data"),
);

const chatWithPickedUser = (user) => {
  props.socket.emit("chatWith", user.id);
};

props.socket.on("users", (users) => {
  usersList.value = users;
});
</script>
<template>
  <section
    class="hidden h-full w-1/6 flex-col bg-CLBGPrimary lg:flex dark:bg-CDBGPrimary"
  >
    <h1
      class="mb-3 text-center text-xl font-bold text-CLACCSecondary dark:text-CDACCSecondary"
    >
      Online Users :
    </h1>
    <div
      v-for="user in usersList"
      v-show="user.username !== savedUser.name"
      class="flex flex-col items-center"
    >
      <button
        @click.prevent="chatWithPickedUser(user)"
        class="mb-2 w-1/2 cursor-pointer justify-center p-2 text-CLACCPrimary transition-all hover:text-CLACCSecondary dark:text-CDACCPrimary dark:hover:text-CDACCSecondary"
      >
        <h1 class="overflow-ellipsis text-center capitalize">
          {{ user.username }}
        </h1>
      </button>
    </div>
  </section>
</template>
