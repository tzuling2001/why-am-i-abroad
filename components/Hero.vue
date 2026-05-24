<script setup>
const { $gsap } = useNuxtApp()
import indexChart from '~/assets/image/index-chart.jpg'
import sorrySvg from '~/assets/Sorry..svg'
import iReallySvg from '~/assets/I really.svg'
import really1Svg from '~/assets/really-1.svg'
import really2Svg from '~/assets/really-2.svg'
import reallySvg from '~/assets/really.svg'
import questionSvg from '~/assets/q.svg'

// === GSAP Animation ===
let heroTl = null

const heroAnimation = () => {
    heroTl = $gsap.timeline()

    $gsap.set('#hero', {
        autoAlpha: 0
    })

    heroTl.set(['#iReallySvg', '#really2Svg', '#really1Svg', '#reallySvg', '#content', '#sorrySvg'], {
        autoAlpha: 0,
        y: '20%'
    })

    .to('#hero', {
        autoAlpha: 1,
        duration: 1,
        ease: 'power1.inOut'
    })
    .to('#iReallySvg', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    },'<0.1')
    .to('#really2Svg', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    },'<0.2')
    .to('#really1Svg', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    },'<0.3')
    .to('#reallySvg', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    },'<0.4')
    .to('#content', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    })
    .to('#sorrySvg', {
        autoAlpha: 1,
        y: '0%',
        duration: 1,
        ease: 'power1.inOut'
    })
}

const allStore = useAllStore()
const { webLoading } = storeToRefs(allStore)
let heroStarted = false

const startHeroAnimation = () => {
    if (heroStarted) return
    heroStarted = true
    heroAnimation()
}

watch(
    webLoading,
    (loading) => {
        if (!loading) startHeroAnimation()
    },
    { immediate: true }
)

onMounted(() => {
    allStore.markSectionReady('hero')
})
</script>
<template>
<div id="hero" class="w-full min-h-full relative overflow-hidden bg-white py-6">
    <div id="questionSvg" class="w-full max-w-[240px] absolute top-6 -right-1 z-10 mix-blend-difference">
        <img :src="questionSvg" alt="question" class="w-full h-auto" />
    </div>
    <!-- I really -->
    <div id="iReallySvg" class="flex flex-col w-full px-6 pb-6">
        <img :src="iReallySvg" alt="I really" class="w-full max-w-[120px] h-auto" />
        <div id="really2Svg" class="w-full pl-8">
            <img :src="really2Svg" alt="really" class="w-full max-w-[95px] h-auto" />
        </div>
        <div id="really1Svg" class="w-full pl-16">
            <img :src="really1Svg" alt="really" class="w-full max-w-[120px] h-auto" />
        </div>
        <div id="reallySvg" class="w-full pl-16 mt-5">
            <img :src="reallySvg" alt="really" class="w-full max-w-[120px] h-auto" />
        </div>
    </div>
    <p id="content" class="w-full px-6 text-zh text-left whitespace-pre-line text-[12px]">
    {{`針對再次未出席 \n 簡宇彤女士/老師，於 2026/05/31 舉辦的豎笛演奏會 \n \n 我在此致上最誠心的道歉， \n 對不起！！！！！！`}}
    </p>

    <div class="flex justify-end">
    <img :src="indexChart" alt="why-am-i-abroad" class="w-[75%] h-auto relative -top-2 -right-2 object-cover"/>
    </div>
    <div id="sorrySvg" class="flex w-full justify-end px-6 absolute bottom-10 right-6">
        <img :src="sorrySvg" alt="Sorry" class="max-w-[200px] w-full" />
    </div>
</div>
</template>

