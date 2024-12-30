import { defineStore } from "pinia";
import { ref } from "vue";

export const useMessageStore = defineStore("Message-Store", () => {
  const recievedMessages = ref([]);
  const sentMessages = ref([]);
  const fullConversation = ref([]);

  function setRecievedMessages(incomingMessages) {
    recievedMessages.value = incomingMessages;
  }
  function setSentMessages(incomingMessages) {
    sentMessages.value = incomingMessages;
  }
  function setFullConversation(incomingfullConversation) {
    fullConversation.value = incomingfullConversation;
  }

  function getRecievedMessages() {
    return recievedMessages.value;
  }
  function getSentMessages() {
    return sentMessages.value;
  }
  function getFullConversation() {
    return fullConversation.value;
  }

  return {
    setRecievedMessages,
    getRecievedMessages,
    setSentMessages,
    getSentMessages,
    setFullConversation,
    getFullConversation,
  };
});
