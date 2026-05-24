// eslint-disable-next-line node/no-extraneous-import
import { defineStore } from 'pinia'
import { waitForPageImages } from '~/composables/useWebLoading.js'

export const useAllStore = defineStore('all', () => {
  const webLoading = ref(true)

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

  return {
    webLoading,
    initWebLoading,
    markSectionReady
  }
})
