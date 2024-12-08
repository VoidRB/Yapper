import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("User-Store", () => {
  const user = ref({});

  function setUser(incomingUser) {
    user.value = incomingUser;
  }

  return { setUser, user };
});
