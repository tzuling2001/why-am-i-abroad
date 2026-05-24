<script setup>
import img12 from '~/assets/image/12.jpg'
import img13 from '~/assets/image/13.jpg'
import img14 from '~/assets/image/14.jpg'
import seeLeft from '~/assets/image/see-left.webp'
import seeRight from '~/assets/image/see-right.webp'
import teacher from '~/assets/image/teacher.webp'

const { textAnimation } = useTextScrollAnimation()

const data = [
"首先，由衷感謝大家對於黃資玲的支持與包容。但這也讓我意識到，最近接連發生的[[未出席?!!事件]]",
"Ỏ̷͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖̦̟͎̻̰_Ỏ̷͖͈̞̩͎̻̫̫̜͉̠̫͕̭̭̫̫̹̗̹͈̼̠̖͍͚̥͈̮̼͕̠̤̯̻̥̬̗̼̳̤̳̬̪̹͚̞̼̠͕̼̠̦͚̫͔̯̹͉͉̘͎͕̼̣̝͙̱̟̹̩̟̳̦̭͉̮̖̭̣̣̞̙̗̜̺̭̻̥͚͙̝̦̲̱͉͖͉̰̦͎̫̣̼͎͍̠̮͓̹̹͉̤̰̗̙͕͇͔̱͕̭͈̳̗̭͔̘̖̺̮̜̠͖̘͓̳͕̟̠̱̫̤͓͔̘̰̲͙͍͇̙͎̣̼̗̖͙̯͉̠̟͈͍͕̪͓̝̩̦̖̹̼̠̘̮͚̟͉̺̜͍͓̯̳̱̻͕̣̳͉̻̭̭̱͍̪̩̭̺͕̺̼̥̪͖̦̟͎̻̰",
"讓我在人生核心童年玩伴與未來人生重要心靈夥伴感到失望，這是我最不希望",
"看到",
"的情況。",
"在此，我誠懇地向每一位因此受影響的朋友表達我的歉意。連續錯過了兩次豎笛演奏會，尤其是對這位朋友\n — 簡宇彤老師來說，",
"這無疑是非常傷感且讓人失望的。我深感歉意，也萬分感謝願意協助我完成這次補救計劃的兩位好朋友。我清楚明白，這樣的情況不僅影響了偉大的表演者 — 宇彤老師，對於關心音樂藝術的朋友來說也是一種失落，身為富有音樂涵養又充滿知性的人生摯友，未能如約出席，實在是我的失職。希望能讓您知道，這不是我所希望發生的悲劇，未來我一定會竭盡所能地避免類似事件再次發生。",
"在這個時刻，我將更加努力改進在時間安排與雙方溝通的行政程序，保證不會再讓任何重要的時刻從我們的指尖悄然溜走。感謝您對我的包容與理解，我會謹記這段經歷，也會繼續以一百萬分的愛來回應您的期望及呵護這段友誼。最後，對此次失誤照成最大傷害的簡語彤 女士/老師，在這裡致上十二萬分的歉意，我承諾會更加謹慎與負責任地對待未來的每一次機會。並且，再次感謝每一位協助此次道歉補救計畫的好朋友，廖曉喬、林孜晏，感謝你們的支持與體諒。",
"誠摯，黃資玲 敬上"
]

// ==============================
// GSAP Animation（scrub 時間軸驅動逐字變色）
// ==============================
onMounted(async () => {
  await nextTick()
  textAnimation({
    trigger: '#text-container',
    start: 'top center',
    end: 'bottom bottom',
    scrub: 1,
    markers: true,
    letterDuration: 0.1,
    staggerEach: 0.05,
    toColor: '#9ca3af'
  })
})
</script>


<template>
  <div id="text-container" class="w-full">
    <!-- 第一段 -->
    <p>
      <AtomTextLetterAnimate :text="data[0]" />
      <span class="inline-images">
        <img :src="img12" alt="" class="inline-img" />
        <img :src="img13" alt="" class="inline-img" />
        <img :src="img14" alt="" class="inline-img" />
      </span>
    </p>
    <!-- 第二段 -->
    <p class="overflow-hidden">
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
    <p>
      <AtomTextLetterAnimate :text="data[6]" />
    </p>
    <!-- <div class="h-screen">
      <img :src="teacher" alt="" class="w-auto h-full object-cover" />
    </div> -->
    <p>
      <AtomTextLetterAnimate :text="data[7]" />
    </p>
    <p>
      <AtomTextLetterAnimate :text="data[8]" />
    </p>
    <p>
      <AtomTextLetterAnimate :text="data[9]" />
    </p>
  </div>
  <!-- bg -->
  <!-- <div class="fixed bottom-0 opacity-20 left-0 w-full h-screen bg-white z-[-1]">
    <img :src="bgDesktop" alt="bg-desktop" class="w-full h-full object-cover hidden md:block" />
    <img :src="bgMobile" alt="bg-mobile" class="w-full h-full object-cover block md:hidden" />
  </div> -->
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

h4, p {
  /* text-align: justify; */
  text-align: justify;
  text-wrap: pretty;
  white-space: pre-line;
  /* font-size: clamp(16px, 1.5vw, 400px); */
  font-size: clamp(16px, 8vw, 32px);
  line-height: clamp(24px, 8vw, 48px);
  letter-spacing: clamp(1px, 0.5vw, 10px);
  font-family: "Chiron GoRound TC", sans-serif;
  font-optical-sizing: auto;
  font-weight: clamp(300, 10vw, 400);
  font-style: normal;
}
.cryEmotion {
  mix-blend-mode: hue;
}
</style>
