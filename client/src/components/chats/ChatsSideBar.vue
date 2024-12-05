<script setup>
import { Socket } from "socket.io-client";
import { ref } from "vue";

const sidebarButton = document.getElementById("sidebarButton");
const sidebar = document.getElementById("sidebar");

const usersList = ref([]);
const savedUser = ref("");
const sideBarStatus = ref(Boolean);
const props = defineProps({
  socket: Socket,
});

savedUser.value = JSON.parse(
  sessionStorage.getItem("Login-user-data") ||
    sessionStorage.getItem("Register-user-data"),
);

const chatWithPickedUser = (user) => {
  props.socket.on("private message", {});
};

props.socket.on("users", (users) => {
  usersList.value = users;
});

sideBarStatus.value = false;
const sideBarVisibility = () => {
  if (sideBarStatus.value) {
    document.getElementById("sidebar").classList.remove("translate-x-0");
    document.getElementById("sidebar").classList.add("-translate-x-full");
    document.getElementById("sidebarButton").classList.add("pi-users");
    document.getElementById("sidebarButton").classList.remove("pi-times");
    document.getElementById("sidebarButton").classList.remove("rotate-90");

    sideBarStatus.value = false;
  } else {
    document.getElementById("sidebar").classList.add("translate-x-0");
    document.getElementById("sidebar").classList.remove("-translate-x-full");
    document.getElementById("sidebarButton").classList.remove("pi-users");
    document.getElementById("sidebarButton").classList.add("pi-times");
    document.getElementById("sidebarButton").classList.add("rotate-90");
    sideBarStatus.value = true;
  }
};
</script>
<template>
  <button
    class="absolute bottom-7 left-4 z-10 flex size-12 items-center justify-center rounded-full text-3xl font-extrabold text-CLACCPrimary shadow-2xl ring-2 ring-CLACCPrimary hover:bg-white hover:bg-opacity-20 hover:shadow-black focus:text-CLACCSecondary focus:outline-none active:bg-none active:text-CLACCSecondary active:shadow-inner active:ring-CLACCSecondary lg:hidden dark:border-CDACCPrimary dark:text-CDACCPrimary dark:ring-CDACCPrimary dark:focus:text-CDACCSecondary dark:active:border-CDACCSecondary dark:active:text-CDACCSecondary dark:active:ring-CDACCSecondary"
    @click="sideBarVisibility()"
  >
    <i id="sidebarButton" class="pi pi-users transition-all"></i>
  </button>
  <section
    id="sidebar"
    class="fixed z-0 h-full w-96 -translate-x-full flex-col border-2 border-b-0 border-l-0 border-CLACCPrimary bg-CLBGPrimary transition-all lg:relative lg:translate-x-0 lg:border-0 dark:border-CDACCPrimary dark:bg-CDBGPrimary"
  >
    <h1
      class="my-3 text-center text-xl font-bold text-CLACCSecondary dark:text-CDACCSecondary"
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
