<script setup>
import { RouterView } from "vue-router";
import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <div class="flex h-screen w-full select-none flex-col">
    <TopBar />
    <Suspense>
      <RouterView />
      <template #fallback>Loading...</template>
    </Suspense>
  </div>
</template>
