import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'
import { gsap } from 'gsap'
import {
  fadeIn,
  fadeOut,
  aosFadeIn,
  counter,
  rollingCounter,
  marquee
} from '~/utils/effects'


/**
 * GSAP Effects 自訂效果，方便重複使用
 *
 * 一般使用時 gsap.effects.fadeIn('.target')
 * Timeline 使用時 tl.fadeIn('.target')
 * @see https://greensock.com/docs/v3/GSAP/gsap.registerEffect()
 */
const registerEffects = () => {
  gsap.registerEffect(fadeIn)
  gsap.registerEffect(fadeOut)
  gsap.registerEffect(aosFadeIn)
  gsap.registerEffect(counter)
  gsap.registerEffect(rollingCounter)
  gsap.registerEffect(marquee)
}


export default defineNuxtPlugin(() => {
  if (process.client) {
    gsap.registerPlugin(ScrollTrigger, Flip)


    registerEffects()
  }

  return {
    provide: {
      gsap,
      ScrollTrigger,
      Flip
    }
  }
})
