/** 等待頁面上 img 載入完成（含失敗也算結束，避免永遠卡住） */
export function waitForPageImages(selector = 'img') {
  if (!import.meta.client) return Promise.resolve()

  const images = Array.from(document.querySelectorAll(selector))
  if (!images.length) return Promise.resolve()

  return Promise.all(
    images.map(
      (img) =>
        new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            resolve()
            return
          }
          img.addEventListener('load', resolve, { once: true })
          img.addEventListener('error', resolve, { once: true })
        })
    )
  )
}
