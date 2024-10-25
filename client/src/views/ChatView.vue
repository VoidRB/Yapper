<script setup>
import ChatsBar from "@/components/ChatsBar.vue";
import ChattingSpace from "@/components/ChattingSpace.vue";
import { useRoute } from "vue-router";

const route = useRoute();

console.log(`${route.params}`);
</script>

<template>
  <div class="flex h-full w-full">
    <ChatsBar />
    <ChattingSpace />
  </div>
</template>
