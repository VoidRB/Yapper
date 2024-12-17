<script setup>
import { Socket } from "socket.io-client";
import { ref } from "vue";
import { decode } from "@zaubrik/djwt";
import { useUserStore } from "@/stores/userStore";
import { useMessageStore } from "@/stores/messagesStore";

const userStore = useUserStore();
const messagestore = useMessageStore();
const usersList = ref([]);
const savedUser = ref("");
const sideBarStatus = ref(Boolean);
const fullTexts = ref([]);

const props = defineProps({
  socket: Socket,
});

savedUser.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    localStorage.getItem("Register-user-data"),
);

const [_header, payload] = await decode(savedUser.value.token);
props.socket.on("users:all", (users) => {
  usersList.value = users;
});

const chatWithPickedUser = (user) => {
  props.socket.emit("message:clear");
  userStore.setUser(user);

  messagestore.getRecievedMessages().filter((message) => {
    if (message.fromUserId === user.userId) {
      fullTexts.value.push(message);
    }
  });
  messagestore.getSentMessages().filter((message) => {
    if (message.toUserId === user.userId) {
      fullTexts.value.push(message);
    }
  });
  fullTexts.value.sort(function (a, b) {
    return a.id - b.id;
  });
  props.socket.emit("message:set", fullTexts.value);
};

const returnToGeneralChat = () => {
  props.socket.emit("message:clear");
  userStore.user = {};
};

const toggleClass = (element, addClasses, removeClasses) => {
  element.classList.add(...addClasses);
  element.classList.remove(...removeClasses);
};

sideBarStatus.value = false;
const sideBarVisibility = () => {
  const sidebar = document.getElementById("sidebar");
  const sidebarButton = document.getElementById("sidebarButton");
  const status = sideBarStatus.value;

  toggleClass(
    sidebar,
    status ? ["-translate-x-full"] : ["translate-x-0"], //close
    status ? ["translate-x-0"] : ["-translate-x-full"], //open
  );
  toggleClass(
    sidebarButton,
    status ? ["pi-users"] : ["pi-times", "rotate-90"],
    status ? ["pi-times", "rotate-90"] : ["pi-users"],
  );

  sideBarStatus.value = !status;
};
</script>
<template>
  <button
    class="absolute bottom-7 left-4 z-10 flex size-12 items-center justify-center rounded-full text-3xl font-extrabold text-CLACCPrimary shadow-2xl shadow-black ring-2 ring-CLACCPrimary transition-all hover:bg-white hover:bg-opacity-20 focus:text-CLACCSecondary focus:outline-none active:scale-110 active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary lg:hidden dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:focus:text-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
    @click="sideBarVisibility"
  >
    <i id="sidebarButton" class="pi pi-users transition-all"></i>
  </button>
  <div
    id="sidebar"
    class="fixed z-0 flex h-full w-full -translate-x-full flex-row transition-all duration-500 lg:relative lg:w-1/5 lg:translate-x-0"
  >
    <section
      class="flex h-full w-3/4 flex-col border-r-2 border-CLACCPrimary bg-CLBGPrimary sm:w-1/2 md:w-1/2 lg:w-96 lg:border-0 dark:border-CDACCPrimary dark:bg-CDBGPrimary"
    >
      <h1
        class="my-3 text-center text-xl font-bold text-CLACCPrimary dark:text-CDACCPrimary"
      >
        Now Chatting
        <span
          v-if="userStore.getUserLength() === 0"
          class="text-CLACCSecondary dark:text-CDACCSecondary"
          ><span class="text-CLACCPrimary dark:text-CDACCPrimary">in</span>
          General chat</span
        >
        <span v-else class="text-CLACCSecondary dark:text-CDACCSecondary"
          >With {{ userStore.user.username }}</span
        >
      </h1>
      <button
        @click="returnToGeneralChat"
        class="mb-2 flex w-full cursor-pointer items-center justify-center p-2 text-CLACCPrimary transition-all hover:text-CLACCSecondary dark:text-CDACCPrimary dark:hover:text-CDACCSecondary"
      >
        <h1 class="overflow-ellipsis text-center capitalize">
          return to general Chat
        </h1>
      </button>
      <hr
        class="w-5/6 justify-center self-center border-CLACCPrimary dark:border-CDACCPrimary"
      />
      <h1
        class="my-3 text-center text-xl font-bold text-CLACCSecondary dark:text-CDACCSecondary"
      >
        Online Users :
      </h1>
      <div
        v-for="user in usersList"
        v-show="user.username !== payload.payload.username"
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
    <section
      class="h-full w-1/4 cursor-pointer sm:w-1/2 lg:hidden"
      @click="sideBarVisibility"
    ></section>
  </div>
</template>
