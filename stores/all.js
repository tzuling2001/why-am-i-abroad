// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'
import { waitForPageImages } from '~/composables/useWebLoading.js'

export const useAllStore = defineStore('all', () => {
  const nowPath = ref('')

  // 視窗寬度
  const windowWidth = ref(0)
  /** 視窗高度（`app.vue` onMounted／resize 寫入；Collection 跑道等換算 px） */
  const windowHeight = ref(0)

  // 是否為手機版
  const isDesktop = ref(false)

  // 頁面 Loading 設定
  const pageLoading = ref(false)
  const webLoading = ref(true)
  const fetchLoading = ref(false)

  /** 首頁區塊掛載完成後才可關閉 webLoading */
  const WEB_LOADING_SECTIONS = ['hero', 'letter']
  const sectionsReady = ref(
    Object.fromEntries(WEB_LOADING_SECTIONS.map((key) => [key, false]))
  )
  const webLoadingStartedAt = ref(0)
  const WEB_LOADING_MIN_MS = 1200
  let webLoadingFinishLock = false

  const allSectionsReady = computed(() =>
    WEB_LOADING_SECTIONS.every((key) => sectionsReady.value[key])
  )

  function resetSectionsReady() {
    WEB_LOADING_SECTIONS.forEach((key) => {
      sectionsReady.value[key] = false
    })
  }

  function initWebLoading() {
    webLoading.value = true
    webLoadingFinishLock = false
    webLoadingStartedAt.value = Date.now()
    resetSectionsReady()
  }

  function markSectionReady(section) {
    if (!(section in sectionsReady.value) || sectionsReady.value[section]) return
    sectionsReady.value[section] = true
    void tryFinishWebLoading()
  }

  async function tryFinishWebLoading() {
    if (!import.meta.client) return
    if (!webLoading.value || webLoadingFinishLock || !allSectionsReady.value) return

    webLoadingFinishLock = true

    try {
      if (document.fonts?.ready) {
        await document.fonts.ready
      }

      await waitForPageImages('img')

      const elapsed = Date.now() - webLoadingStartedAt.value
      const remain = Math.max(0, WEB_LOADING_MIN_MS - elapsed)
      if (remain > 0) {
        await new Promise((resolve) => setTimeout(resolve, remain))
      }

      webLoading.value = false
    } finally {
      webLoadingFinishLock = false
    }
  }

  /** Collection Three.js 場景已成功掛載並開始繪製（由 CanvasHost 設定） */
  const threeSceneMounted = ref(false)

  function resetThreeSceneMounted() {
    threeSceneMounted.value = false
  }

  function notifyThreeSceneMounted() {
    threeSceneMounted.value = true
  }

  // 全域資料
  const globalData = ref({})

  // 範例程式碼
  const count = ref(0)
  const increment = () => {
    count.value += 1
  }
  const decrement = () => {
    count.value -= 1
  }
  const doubleCount = computed(() => count.value * 2)

  return {
    windowWidth,
    windowHeight,
    isDesktop,
    pageLoading,
    webLoading,
    sectionsReady,
    allSectionsReady,
    initWebLoading,
    markSectionReady,
    tryFinishWebLoading,
    threeSceneMounted,
    resetThreeSceneMounted,
    notifyThreeSceneMounted,
    fetchLoading,
    globalData,
    nowPath,
    count,
    increment,
    decrement,
    doubleCount
  }
})
