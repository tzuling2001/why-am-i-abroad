<script setup>
import img12 from '~/assets/image/12.jpg'
import img13 from '~/assets/image/13.jpg'
import img14 from '~/assets/image/14.jpg'
import seeLeft from '~/assets/image/see-left.webp'
import seeRight from '~/assets/image/see-right.webp'

const { textAnimation, refreshScrollTrigger } = useTextScrollAnimation()
const allStore = useAllStore()
const { webLoading } = storeToRefs(allStore)

const data = [
"首先，由衷感謝大家對於黃資玲的支持與\n包容。",
"關於近期接連發生的 {{{[[ 未出席?!!事件]] ",
"Ỏ̷͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖̦̟͎̻̰_Ỏ̷͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖̦̟͎̻̰ ",
"讓我意識到這讓我人生的童年玩伴與未來人生重要的心靈夥伴感到失望，而這是我最不希望",
"看到",
"的情況。",
"在此，我誠懇地向每一位因此受影響的朋友表達我的歉意。連續錯過了兩次豎笛演奏會，尤其是對於一位這位朋友 — 簡宇彤老師來說，這無疑是非常傷感且讓人失望的。我深感歉意，",
"也萬分感謝願意協助我完成這次補救計劃的兩位好朋友。",
"我們明白，這樣的情況不僅影響了偉大的表演者－ 宇彤老師，對於關心音樂藝術的朋友來說也是一種失落，身為富有音樂涵養又充滿知性的人生摯友，未能如約出席，實在是我的失職。我希望能讓您知道，這不是我所希望的，未來我會竭盡所能地避免類似事件再次發生。",
"在這個時刻，我將更加努力改進在時間安排與雙方溝通的行政程序，保證不會再讓任何重要的時刻從我們的指尖悄然溜走。感謝您對我的包容與理解，我們將謹記這段經歷，也會繼續以我的一百萬分的愛來回應您的期望及呵護這段友誼。",
"最後，對此次失誤照成最大傷害的\n簡語彤 女士/老師，",
"在這裡致\n上十二萬分的歉意，\n我承諾會更加謹慎\n與負責任地\n對待未來的每一次機會。",
"並且，\n再次感謝每一位協助此次道歉補救計畫的好朋友\n，廖曉喬、林孜晏，感謝你們的支持與協助。",
"最後祝福演出一切順利，每天都要吃早餐～\n誠摯，黃資玲 敬上",
]

// ==============================
// GSAP Animation（scrub 時間軸驅動逐字變色）
// ==============================
const initTextAnimation = async () => {
  await nextTick()
  textAnimation({
    trigger: '#text-container',
    scroller: '.phone-viewport',
    start: 'top center',
    end: 'bottom bottom',
    scrub: 1,
    // markers: true,
    letterDuration: 0.1,
    staggerEach: 0.05,
    toColor: '#9ca3af'
  })
  refreshScrollTrigger()
}

onMounted(async () => {
  await initTextAnimation()
  allStore.markSectionReady('letter')
})

watch(webLoading, (loading) => {
  if (loading) return
  initTextAnimation()
})
</script>


<template>
  <div id="text-container" class="container w-full">
    <!-- 第一段 -->
    <p class="whitespace-pre-line w-full text-left">
      <AtomTextLetterAnimate :text="data[0]"  />
      <span class="inline-images">
        <img :src="img12" alt="" class="inline-img" />
        <img :src="img13" alt="" class="inline-img" />
        <img :src="img14" alt="" class="inline-img" />
      </span>
    </p>
    <!-- 第二段 -->
    <p class="overflow-hidden text-left">
      <AtomTextLetterAnimate :text="data[1]" />
      <span class="cryEmotion">{{ data[2] }}</span>
      <AtomTextLetterAnimate :text="data[3]" />
      <span class="inline-images">
        <img :src="seeRight" alt="" class="inline-img" />
      </span>
      <AtomTextLetterAnimate :text="data[4]" />
      <span class="inline-images">
        <img :src="seeLeft" alt="" class="inline-img" />
      </span>
      <AtomTextLetterAnimate :text="data[5]" />
    </p>
    <!-- 第三段 -->
    <p class="text-left">
      <AtomTextLetterAnimate :text="data[6]" />
    </p>
    <!-- 第四段 (video) -->
    <Video src="/videos/對不起.mp4" />

    <!-- 第五段 (貪吃蛇) -->
    <div class="relative min-h-[200px]">
      <div class="absolute inset-0 z-0">
        <AtomDeco />
      </div>
      <p class="relative z-10 w-full flex flex-col gap-5 py-10 text-left">
        <AtomTextLetterAnimate :text="data[7]" />
        <AtomTextLetterAnimate :text="data[8]" />
        <AtomTextLetterAnimate :text="data[9]" />
      </p>
    </div>
    
    <!-- 第五段 -->
    <p class="w-full text-center text-center">
      <AtomTextLetterAnimate :text="data[10]" text-center="true"/>
    </p>
    <!-- 第六段 -->
    <Sorry :data="data[11]" />
    <!-- 第七段 -->
    <p class="w-full flex flex-col gap-5 py-10 text-center">
      <AtomTextLetterAnimate :text="data[12]" />
      <AtomTextLetterAnimate :text="data[13]" />
    </p>
  </div>
</template>

<style scoped>
.inline-images {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  margin-left: 1rem;
  vertical-align: middle;
}

.inline-img {
  width: clamp(3rem, 8vw, 10rem);
  height: clamp(3rem, 8vw, 10rem);
  object-fit: cover;
  vertical-align: middle;
}

p {
  /* text-align: justify; */
  /* text-align: justify; */
  text-wrap: pretty;
  white-space: pre-line;
  /* font-size: clamp(16px, 1.5vw, 400px); */
  font-size: clamp(12px, 1.5vw, 16px);
  line-height: clamp(1.2, 1.5vw, 1.5);
  letter-spacing: clamp(0.05em, 1.5vw, 0.05em);
  font-family: "Noto Sans TC", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.cryEmotion {
  mix-blend-mode: hue;
  color: aqua;
}
</style>
