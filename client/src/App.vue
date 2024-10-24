<script setup>
import { RouterView } from "vue-router";
import TopBar from "@/components/TopBar.vue";
</script>

<template>
  <div class="flex h-screen flex-col">
    <TopBar />
    <RouterView />
    <!-- <RouterView v-slot="{ Component }">
      <Transition name="page">
        <component :is="Component" />
      </Transition>
    </RouterView> -->
  </div>
</template>

<style>
.page-enter-active {
  transition: 1200ms ease all;
}

.page-enter-from {
  opacity: 0;
}
</style>
