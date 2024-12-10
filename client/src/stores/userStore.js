import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("User-Store", () => {
  const user = ref({});

  function setUser(incomingUser) {
    user.value = incomingUser;
  }

  function getUserLength() {
    return Object.keys(user.value).length;
  }

  return { setUser, getUserLength, user };
});
