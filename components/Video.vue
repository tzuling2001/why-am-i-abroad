<script setup>
import { withBase } from 'ufo'

const config = useRuntimeConfig()

const props = defineProps({
  src: {
    type: String,
    default: '/videos/對不起.mp4',
  },
  poster: {
    type: String,
    default: '',
  },
  centerTolerance: {
    type: Number,
    default: 80,
  },
  /** true：整頁只自動開一次；false：每次滑到中心都可觸發 */
  once: {
    type: Boolean,
    default: false,
  },
})

const encodedSrc = computed(() =>
  encodeURI(withBase(props.src, config.app.baseURL)),
)

const triggerRef = ref(null)
const videoRef = ref(null)
const isOpen = ref(false)
const hasAutoOpenedOnce = ref(false)
const thumbUrl = ref('')
const wasCentered = ref(false)

let scrollLockY = 0

const lockBodyScroll = () => {
  scrollLockY = window.scrollY
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollLockY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  document.body.style.overflow = ''
  window.scrollTo(0, scrollLockY)
}

watch(isOpen, (open) => {
  if (!import.meta.client) return
  if (open) lockBodyScroll()
  else unlockBodyScroll()
})

let observer = null
let scrollRoot = null
let scrollRafId = null
let isInView = false
let isWatchingScroll = false

const isElementCenteredInViewport = (target) => {
  const rect = target.getBoundingClientRect()
  const elCenterY = rect.top + rect.height / 2

  if (scrollRoot) {
    const rootRect = scrollRoot.getBoundingClientRect()
    const rootCenterY = rootRect.top + rootRect.height / 2
    return Math.abs(elCenterY - rootCenterY) <= props.centerTolerance
  }

  const viewportCenterY = window.innerHeight / 2
  return Math.abs(elCenterY - viewportCenterY) <= props.centerTolerance
}

const scheduleCenterCheck = () => {
  if (scrollRafId) return
  scrollRafId = requestAnimationFrame(() => {
    scrollRafId = null
    if (isInView) tryAutoOpen()
  })
}

const startScrollWatch = () => {
  if (isWatchingScroll) return
  isWatchingScroll = true
  scrollRoot?.addEventListener('scroll', scheduleCenterCheck, { passive: true })
  window.addEventListener('scroll', scheduleCenterCheck, { passive: true })
  window.addEventListener('resize', scheduleCenterCheck, { passive: true })
}

const stopScrollWatch = () => {
  if (!isWatchingScroll) return
  isWatchingScroll = false
  scrollRoot?.removeEventListener('scroll', scheduleCenterCheck)
  window.removeEventListener('scroll', scheduleCenterCheck)
  window.removeEventListener('resize', scheduleCenterCheck)
  if (scrollRafId) {
    cancelAnimationFrame(scrollRafId)
    scrollRafId = null
  }
}

const syncCenterState = () => {
  if (!triggerRef.value) return
  wasCentered.value = isElementCenteredInViewport(triggerRef.value)
}

const tryAutoOpen = () => {
  if (!triggerRef.value || isOpen.value) return

  const centered = isElementCenteredInViewport(triggerRef.value)

  // 只在「剛進入中心帶」時觸發，避免停在中心時重複開啟
  if (centered && !wasCentered.value) {
    if (props.once && hasAutoOpenedOnce.value) {
      wasCentered.value = centered
      return
    }

    hasAutoOpenedOnce.value = true
    openModal()
  }

  wasCentered.value = centered
}

const openModal = async () => {
  if (isOpen.value) return
  isOpen.value = true
  await nextTick()
  const video = videoRef.value
  if (!video) return
  video.currentTime = 0
  try {
    await video.play()
  } catch {
    // 部分瀏覽器需使用者手勢才能播放有聲影片
  }
}

const closeModal = () => {
  const video = videoRef.value
  if (video) {
    video.pause()
    video.currentTime = 0
  }
  isOpen.value = false
  // 關閉後需先滑離中心再滑回來，才會再次自動開啟
  syncCenterState()
}

const onTriggerClick = () => {
  openModal()
}

const captureThumbFromVideo = () => {
  if (props.poster || !import.meta.client) return

  const video = document.createElement('video')
  video.muted = true
  video.playsInline = true
  video.preload = 'auto'
  video.src = encodedSrc.value

  const cleanup = () => {
    video.removeAttribute('src')
    video.load()
  }

  video.addEventListener('loadeddata', () => {
    video.currentTime = 0.1
  })

  video.addEventListener('seeked', () => {
    if (!video.videoWidth || !video.videoHeight) {
      cleanup()
      return
    }

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    thumbUrl.value = canvas.toDataURL('image/jpeg', 0.85)
    cleanup()
  })

  video.addEventListener('error', cleanup)
  video.load()
}

const onKeydown = (e) => {
  if (e.key === 'Escape' && isOpen.value) closeModal()
}

onMounted(() => {
  captureThumbFromVideo()

  if (!triggerRef.value) return

  scrollRoot = triggerRef.value.closest('.phone-viewport')

  observer = new IntersectionObserver(
    (entries) => {
      isInView = entries[0]?.isIntersecting ?? false
      if (isInView) {
        startScrollWatch()
        scheduleCenterCheck()
      } else {
        stopScrollWatch()
        wasCentered.value = false
      }
    },
    {
      threshold: 0,
      root: scrollRoot,
      rootMargin: '0px',
    },
  )

  observer.observe(triggerRef.value)
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  stopScrollWatch()
  observer?.disconnect()
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client && isOpen.value) unlockBodyScroll()
})
</script>

<template>
  <button
    ref="triggerRef"
    type="button"
    class="group relative w-full aspect-video overflow-hidden bg-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
    aria-label="播放影片"
    @click="onTriggerClick"
  >
    <img
      v-if="poster || thumbUrl"
      :src="poster || thumbUrl"
      alt="影片預覽"
      class="absolute inset-0 h-full w-full object-cover"
    />

    <div class="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />

    <span
      class="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <span
        class="flex size-10 items-center justify-center bg-[#00FFFF] text-black transition-transform group-hover:scale-105"
      >
        <svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  </button>

  <Teleport to="body">
    <div
      v-if="isOpen"
      class="video-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="影片播放"
    >
      <div
        class="absolute inset-0 bg-black/85"
        @click="closeModal"
      />

      <div class="relative z-10 w-full max-w-3xl">
        <!-- <button
          type="button"
          class="absolute -bottom-5 left-1/2 -translate-x-1/2 size-10 bg-white flex items-center justify-center text-black"
          aria-label="關閉影片"
          @click.stop="closeModal"
        >
         ✕
        </button> -->

        <video
          ref="videoRef"
          class="w-full bg-black"
          :src="encodedSrc"
          controls
          playsinline
          autoplay
          @ended="closeModal"
        />
      </div>
    </div>
  </Teleport>
</template>

<style>
.video-modal-overlay {
  animation: video-modal-fade-in 0.2s ease;
}

@keyframes video-modal-fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
