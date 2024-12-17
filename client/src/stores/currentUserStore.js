import { defineStore } from "pinia";
import { ref } from "vue";

export const useCurrentUserStore = defineStore("Current-User-store", () => {
  const currentUser = ref({});
  function setCurrentUser(user) {
    currentUser.value = user;
  }
  function getCurrentUser() {
    return currentUser.value;
  }

  return { setCurrentUser, getCurrentUser, currentUser };
});
