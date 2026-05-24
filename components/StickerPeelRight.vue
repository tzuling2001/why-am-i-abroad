<script setup>
/**
 * 右上 → 左下：與左同套撕開邏輯 + 鏡像，僅原圖 mask 方向相反
 * https://codepen.io/nowknow/pen/bGXygGz
 */
import tzRight from '~/assets/image/tz-right.webp'

const ready = ref(false)
const width = ref(116)
const height = ref(116)

const peelTo = 45
const duration = 2.4
const delay = 0.5

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
  backgroundImage: `url(${JSON.stringify(tzRight)})`,
}))
</script>

<template>
  <figure
    class="sticker-right"
    :class="{ 'is-ready': ready }"
    :style="rootStyle"
  >
    <img
      :src="tzRight"
      alt=""
      class="sticker-measure"
      draggable="false"
      @load="onImageLoad"
    >

    <div
      v-if="ready"
      class="inner"
    >
      <div class="peel-stage">
        <img
          :src="tzRight"
          alt=""
          class="sticker-img"
          draggable="false"
        >

        <div class="peel">
          <div
            class="peel-under"
            :style="peelUnderStyle"
          />
        </div>
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

.sticker-right {
  --w: 116px;
  --h: 116px;
  /* 撕開層：與左側相同（在鏡像座標內執行） */
  --angle-deg: -45deg;
  --ratio-x: -1;
  --ratio-y: -1;
  /* 原圖 mask：方向與左側相反 */
  --mask-img-deg: 45deg;
  --peel-to: 45%;
  --duration: 2.4s;
  --delay: 0.5s;
  --border-radius: 8px;

  display: inline-block;
  position: relative;
  border-radius: var(--border-radius);
  opacity: 0;
  flex-shrink: 0;
  user-select: none;
}

.sticker-right.is-ready {
  opacity: 1;
}

.sticker-measure {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.peel-stage {
  position: relative;
  transform: scaleX(-1);
}

.sticker-right > .inner {
  --dist: 5%;
  --remaining: calc(100% - var(--dist));
  position: relative;
  animation: peel-right var(--duration) cubic-bezier(0.68, 0.71, 0.33, 1.06)
    var(--delay) infinite alternate;
}

@keyframes peel-right {
  from {
    --dist: 5%;
  }
  to {
    --dist: var(--peel-to);
  }
}

/* 原圖：翻回正向 + mask 用 45deg */
.sticker-right .sticker-img {
  display: block;
  width: var(--w);
  height: var(--h);
  object-fit: contain;
  border-radius: var(--border-radius);
  pointer-events: none;
  transform: scaleX(-1);
  -webkit-mask-image: linear-gradient(
    var(--mask-img-deg),
    #000 var(--remaining),
    transparent var(--remaining)
  );
  mask-image: linear-gradient(
    var(--mask-img-deg),
    #000 var(--remaining),
    transparent var(--remaining)
  );
}

.sticker-right .peel {
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

.sticker-right .peel::after {
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

.sticker-right .peel-under {
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
  .sticker-right > .inner {
    animation: none;
    --dist: 5%;
  }
}
</style>
