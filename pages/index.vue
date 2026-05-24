<script setup>
import Hero from '~/components/Hero.vue'

const allStore = useAllStore()
const { webLoading } = storeToRefs(allStore)

onBeforeMount(() => {
  allStore.initWebLoading()
})

watch(
  webLoading,
  (loading) => {
    if (!import.meta.client) return
    document.body.style.overflow = loading ? 'hidden' : ''
  },
  { immediate: true }
)

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
})
</script>
<template>
  <div class="relative max-w-[480px] h-screen mx-auto py-10 sm:py-0">
    <Transition name="loading-fade">
      <Loading v-if="webLoading" />
    </Transition>
    <Hero />
    <Letter />
  </div>
</template>

<style>
.loading-fade-enter-active,
.loading-fade-leave-active {
  transition: opacity 0.6s ease;
}

.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}

.container {
  @apply mx-auto flex flex-col items-center justify-center p-6 py-10 text-center z-20 space-y-6;
}
.text-en {
  font-family: "Tangerine", cursive;
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.text-zh {
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.hero-en-text {
  font-size: clamp(16px, 8vw, 160px);
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-align: start;
  text-wrap: pretty;
  white-space: pre-line;
}
</style>