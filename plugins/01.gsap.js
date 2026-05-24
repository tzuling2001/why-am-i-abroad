import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'

export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    gsap.registerPlugin(ScrollTrigger)
  }

  return {
    provide: {
      gsap,
      ScrollTrigger
    }
  }
})
