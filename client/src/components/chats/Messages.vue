<script setup>
const props = defineProps({
  texts: Array,
  userId: String,
});
</script>
<template>
  <section
    class="my-2 flex max-h-full w-full flex-col gap-1 overflow-y-scroll p-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    <div v-for="text in texts" :key="text.id" class="h-full w-full">
      <div
        v-if="text.id === props.userId"
        class="mb-1 w-1/2 place-self-start text-wrap rounded-bl-xl rounded-tr-xl bg-CLBGPrimary text-white shadow-xl ring-2 ring-CLACCSecondary dark:bg-CDBGPrimary dark:ring-CDACCPrimary"
      >
        <h1 class="ml-2 break-words p-2">{{ text.msg }}</h1>
      </div>

      <div
        v-else
        class="mb-1 w-1/2 place-self-end text-wrap rounded-bl-xl rounded-tr-xl bg-CLACCPrimary text-white shadow-xl ring-2 ring-CLACCSecondary dark:bg-CDACCSecondary dark:ring-CDACCPrimary"
      >
        <h1 class="ml-2 break-words pt-2 text-xs">{{ text.username }}</h1>
        <h1 class="ml-2 break-words p-2">{{ text.msg }}</h1>
      </div>
    </div>
  </section>
</template>
