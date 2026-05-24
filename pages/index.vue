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
  <!-- 外層：手機置中；桌機三欄，左右貼紙滿版 -->
  <div
    class="page-layout h-dvh min-h-dvh w-full overflow-hidden flex items-center justify-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"
  >
    <div class="sticker-side hidden lg:block h-full min-h-0 overflow-hidden opacity-5">
      <ClientOnly>
        <div class="w-50 h-50">
          <StickerPeelRight fill />
        </div>
      </ClientOnly>
    </div>

    <!-- 鎖定 480×844 手機比例，依視窗縮放但不拉伸 -->
    <div
      class="phone-viewport relative aspect-[480/844] w-[min(480px,100vw,calc(100dvh*480/844))] sm:w-[min(480px,calc(100dvh*480/844))] max-h-dvh shrink-0 overflow-x-hidden overflow-y-auto bg-white sm:justify-self-center sm:self-center"
    >
      <Transition name="loading-fade">
        <Loading v-if="webLoading" />
      </Transition>
      <Hero />
      <Letter />
    </div>

    <div class="sticker-side hidden lg:block h-full min-h-0 overflow-hidden opacity-5">
      <ClientOnly>
        <div class="w-50 h-50">
          <StickerPeelLeft fill />
        </div>
      </ClientOnly>
    </div>
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
  @apply mx-auto flex flex-col items-center justify-center p-6 py-10 text-center z-20 space-y-6 min-w-0;
}
.text-zh {
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 400;
  font-style: normal;
}

/* 桌機：左右貼紙槽滿高 */
@media (min-width: 640px) {
  .sticker-side {
    min-height: 100dvh;
  }

  .sticker-side :deep(.sticker-left),
  .sticker-side :deep(.sticker-right) {
    min-height: 100%;
  }
}

/* 桌機：可捲動但隱藏捲軸 */
@media (min-width: 640px) {
  .phone-viewport {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .phone-viewport::-webkit-scrollbar {
    display: none;
  }
}
</style>