// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'

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
