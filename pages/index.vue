<script setup>
import Hero from '~/components/Hero.vue';


</script>
<template>
  <div>
    <Hero/>
    <Letter />
  </div>
</template>

<style>
.container {
  @apply mx-auto flex flex-col items-center justify-center p-6 py-10 text-center z-20 space-y-20;
}
.text-en {
  font-family: "Tangerine", cursive;
  font-weight: 400;
  font-style: normal;
  line-height: 1.2;
  letter-spacing: 0.05em;
}

.text-zh {
  font-family: "Noto Sans TC", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.hero-en-text {
  font-size: clamp(16px, 8vw, 160px);
  line-height: 1.2;
  letter-spacing: 0.05em;
  text-align: start;
  text-wrap: pretty;
  white-space: pre-line;
}
</style>