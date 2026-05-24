<script setup>
/**
 * 左上 → 右下撕開
 * https://codepen.io/nowknow/pen/bGXygGz
 */
import tzLeft from '~/assets/image/tz-left.webp'

const ready = ref(false)
const width = ref(116)
const height = ref(116)

const peelTo = 45
const duration = 2.4
const delay = 0

function onImageLoad(event) {
  const img = event.target
  if (!img.naturalWidth) return

  const maxWidth = 116
  const ratio = img.naturalHeight / img.naturalWidth
  width.value = maxWidth
  height.value = Math.round(maxWidth * ratio)
  ready.value = true
}

const rootStyle = computed(() => {
  if (!ready.value) return {}
  return {
    '--w': `${width.value}px`,
    '--h': `${height.value}px`,
    '--peel-to': `${peelTo}%`,
    '--duration': `${duration}s`,
    '--delay': `${delay}s`,
  }
})

const peelUnderStyle = computed(() => ({
  backgroundImage: `url(${JSON.stringify(tzLeft)})`,
}))
</script>

<template>
  <figure
    class="sticker-left"
    :class="{ 'is-ready': ready }"
    :style="rootStyle"
  >
    <img
      :src="tzLeft"
      alt=""
      class="sticker-measure"
      draggable="false"
      @load="onImageLoad"
    >

    <div
      v-if="ready"
      class="inner"
    >
      <img
        :src="tzLeft"
        alt=""
        draggable="false"
      >

      <div class="peel">
        <div
          class="peel-under"
          :style="peelUnderStyle"
        />
      </div>
    </div>
  </figure>
</template>

<style scoped>
@property --dist {
  syntax: '<percentage>';
  initial-value: 5%;
  inherits: true;
}

.sticker-left {
  --w: 116px;
  --h: 116px;
  --angle-deg: -45deg;
  --ratio-x: -1;
  --ratio-y: -1;
  --peel-to: 45%;
  --duration: 2.4s;
  --delay: 0s;
  --border-radius: 8px;

  display: inline-block;
  position: relative;
  border-radius: var(--border-radius);
  opacity: 0;
  flex-shrink: 0;
  user-select: none;
}

.sticker-left.is-ready {
  opacity: 1;
}

.sticker-measure {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.sticker-left > .inner {
  --dist: 5%;
  --remaining: calc(100% - var(--dist));
  position: relative;
  animation: peel-left var(--duration) cubic-bezier(0.68, 0.71, 0.33, 1.06)
    var(--delay) infinite alternate;
}

@keyframes peel-left {
  from {
    --dist: 5%;
  }
  to {
    --dist: var(--peel-to);
  }
}

.sticker-left img {
  display: block;
  width: var(--w);
  height: var(--h);
  object-fit: contain;
  border-radius: var(--border-radius);
  pointer-events: none;
  -webkit-mask-image: linear-gradient(
    var(--angle-deg),
    #000 var(--remaining),
    transparent var(--remaining)
  );
  mask-image: linear-gradient(
    var(--angle-deg),
    #000 var(--remaining),
    transparent var(--remaining)
  );
}

.sticker-left .peel {
  position: absolute;
  inset: 0;
  pointer-events: none;
  transform: translateX(
      calc(calc(var(--ratio-x) * var(--remaining)) + var(--dist))
    )
    translateY(calc(calc(var(--ratio-y) * var(--remaining)) + var(--dist)));
  -webkit-mask-image: linear-gradient(
    var(--angle-deg),
    #000 var(--dist),
    transparent var(--dist)
  );
  mask-image: linear-gradient(
    var(--angle-deg),
    #000 var(--dist),
    transparent var(--dist)
  );
}

.sticker-left .peel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    var(--angle-deg),
    transparent calc(var(--dist) - 15%),
    rgba(0, 0, 0, 0) var(--dist)
  );
  border-radius: var(--border-radius);
}

.sticker-left .peel-under {
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  transform: scale(-1, -1);
  filter: contrast(10%) brightness(170%);
}

@media (prefers-reduced-motion: reduce) {
  .sticker-left > .inner {
    animation: none;
    --dist: 5%;
  }
}
</style>
