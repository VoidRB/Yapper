<script setup>
	import { RouterView } from "vue-router";
	import TopBar from "@/components/TopBar.vue";
</script>

<template>
	<div class="flex h-screen w-full flex-col">
		<TopBar />
		<RouterView />
	</div>
</template>
