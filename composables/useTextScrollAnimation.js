/**
 * 將 #text-container 內 .txt-letter 的變色進度綁定到 ScrollTrigger scrub 時間軸
 */
export function useTextScrollAnimation() {
  const { $gsap: gsap } = useNuxtApp()

  let textTl = null

  const textAnimation = (options = {}) => {
    const {
      container = '#text-container',
      trigger,
      start = 'top top',
      end = 'bottom bottom',
      scrub = 1,
      toColor = '#9ca3af',
      letterDuration = 0.2,
      staggerEach = 0.05
    } = options

    const letters = gsap.utils.toArray(`${container} .txt-letter`)
    if (!letters.length) return null

    textTl?.scrollTrigger?.kill()
    textTl?.kill()

    textTl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger ?? container,
        start,
        end,
        scrub
      }
    })

    textTl.to(letters, {
      color: toColor,
      duration: letterDuration,
      stagger: {
        each: staggerEach,
        from: 'start'
      },
      ease: 'none'
    })

    return textTl
  }

  onUnmounted(() => {
    textTl?.scrollTrigger?.kill()
    textTl?.kill()
    textTl = null
  })

  return {
    textAnimation
  }
}
