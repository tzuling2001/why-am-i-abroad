<script setup>
const props = defineProps({
  data: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <p class="flex items-center gap-2 w-full relative justify-between overflow-hidden">
    <StickerPeelLeft class="sm:hidden shrink-0" />
    <AtomTextLetterAnimate
      :text="data"
      class="absolute left-1/2 z-10 -translate-x-1/2 top-1/2 -translate-y-1/2 max-w-[200px] mx-auto text-center"
    />
    <StickerPeelRight class="sm:hidden shrink-0" />
  </p>
</template>
