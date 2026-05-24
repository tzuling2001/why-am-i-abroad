<script setup>
import mask1 from '~/assets/image/Mask-1.jpg'
import mask2 from '~/assets/image/Mask-2.jpg'
import mask3 from '~/assets/image/Mask-3.jpg'
import mask4 from '~/assets/image/Mask.jpg'

const masks = [mask1, mask2, mask3, mask4]

const props = defineProps({
  segmentSize: { type: Number, default: 30 },
  bodyCount: { type: Number, default: 6 },
  speed: { type: Number, default: 1 },
})

const arenaRef = ref(null)
const arenaSize = ref({ w: 0, h: 0 })
const snakes = ref([])

let animationId = null
let resizeObserver = null

const headRadius = computed(() => props.segmentSize / 2)
const bodyRadius = computed(() => props.segmentSize * 0.22)
const bodyDotSize = computed(() => props.segmentSize * 0.45)
const bodySpacing = computed(() => props.segmentSize * 0.5)

function randomVelocity() {
  const angle = Math.random() * Math.PI * 2
  return {
    vx: Math.cos(angle) * props.speed,
    vy: Math.sin(angle) * props.speed,
  }
}

function randomPosition() {
  const half = headRadius.value
  const { w, h } = arenaSize.value
  return {
    x: half + Math.random() * Math.max(0, w - props.segmentSize),
    y: half + Math.random() * Math.max(0, h - props.segmentSize),
  }
}

function createBody(headX, headY) {
  return Array.from({ length: props.bodyCount }, (_, i) => ({
    x: headX - (i + 1) * bodySpacing.value * 0.85,
    y: headY,
  }))
}

function createSnake(img, index) {
  const pos = randomPosition()
  const vel = randomVelocity()
  return {
    id: index,
    img,
    x: pos.x,
    y: pos.y,
    vx: vel.vx,
    vy: vel.vy,
    body: createBody(pos.x, pos.y),
  }
}

function initSnakes() {
  snakes.value = masks.map((img, i) => createSnake(img, i))
}

function updateArenaSize() {
  if (!arenaRef.value) return
  arenaSize.value = {
    w: arenaRef.value.clientWidth,
    h: arenaRef.value.clientHeight,
  }
}

function bounceWall(snake) {
  const half = headRadius.value
  const { w, h } = arenaSize.value
  if (!w || !h) return

  if (snake.x <= half) {
    snake.x = half
    snake.vx = Math.abs(snake.vx)
  } else if (snake.x >= w - half) {
    snake.x = w - half
    snake.vx = -Math.abs(snake.vx)
  }

  if (snake.y <= half) {
    snake.y = half
    snake.vy = Math.abs(snake.vy)
  } else if (snake.y >= h - half) {
    snake.y = h - half
    snake.vy = -Math.abs(snake.vy)
  }
}

function followBody(snake) {
  const spacing = bodySpacing.value
  let leader = { x: snake.x, y: snake.y }

  for (const seg of snake.body) {
    const dx = leader.x - seg.x
    const dy = leader.y - seg.y
    const dist = Math.hypot(dx, dy) || 0.001

    if (dist > spacing) {
      const t = (dist - spacing) / dist
      seg.x += dx * t
      seg.y += dy * t
    }

    leader = seg
  }
}

function resolveHeadHead(a, b) {
  const r = headRadius.value * 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.hypot(dx, dy)
  if (!dist || dist >= r) return

  const nx = dx / dist
  const ny = dy / dist
  const overlap = r - dist

  a.x -= nx * (overlap / 2)
  a.y -= ny * (overlap / 2)
  b.x += nx * (overlap / 2)
  b.y += ny * (overlap / 2)

  const dvx = a.vx - b.vx
  const dvy = a.vy - b.vy
  const dot = dvx * nx + dvy * ny

  if (dot < 0) {
    a.vx -= dot * nx
    a.vy -= dot * ny
    b.vx += dot * nx
    b.vy += dot * ny
  }
}

function resolveHeadBody(headSnake, segX, segY) {
  const sumR = headRadius.value + bodyRadius.value
  const dx = headSnake.x - segX
  const dy = headSnake.y - segY
  const dist = Math.hypot(dx, dy)
  if (!dist || dist >= sumR) return

  const nx = dx / dist
  const ny = dy / dist
  const overlap = sumR - dist

  headSnake.x += nx * overlap
  headSnake.y += ny * overlap

  const dot = headSnake.vx * nx + headSnake.vy * ny
  if (dot < 0) {
    headSnake.vx -= 2 * dot * nx
    headSnake.vy -= 2 * dot * ny
  }
}

function resolveSnakeCollisions() {
  const list = snakes.value

  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const a = list[i]
      const b = list[j]

      resolveHeadHead(a, b)

      for (const seg of b.body) {
        resolveHeadBody(a, seg.x, seg.y)
      }

      for (const seg of a.body) {
        resolveHeadBody(b, seg.x, seg.y)
      }
    }
  }
}

function tick() {
  const { w, h } = arenaSize.value
  if (!w || !h) {
    animationId = requestAnimationFrame(tick)
    return
  }

  for (const snake of snakes.value) {
    snake.x += snake.vx
    snake.y += snake.vy
    bounceWall(snake)
    followBody(snake)
  }

  resolveSnakeCollisions()

  animationId = requestAnimationFrame(tick)
}

function headStyle(snake) {
  const size = props.segmentSize
  return {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translate3d(${snake.x - size / 2}px, ${snake.y - size / 2}px, 0)`,
  }
}

function bodyStyle(seg) {
  const size = bodyDotSize.value
  return {
    width: `${size}px`,
    height: `${size}px`,
    transform: `translate3d(${seg.x - size / 2}px, ${seg.y - size / 2}px, 0)`,
  }
}

function setupArena() {
  updateArenaSize()
  if (arenaSize.value.w && arenaSize.value.h) {
    initSnakes()
  }
}

onMounted(async () => {
  await nextTick()
  setupArena()

  if (!arenaSize.value.w || !arenaSize.value.h) {
    requestAnimationFrame(() => {
      setupArena()
    })
  }

  if (arenaRef.value && typeof ResizeObserver !== 'undefined') {
    resizeObserver = new ResizeObserver(() => {
      const hadSize = arenaSize.value.w > 0 && arenaSize.value.h > 0
      updateArenaSize()
      const hasSize = arenaSize.value.w > 0 && arenaSize.value.h > 0
      if (!hadSize && hasSize) {
        initSnakes()
      }
    })
    resizeObserver.observe(arenaRef.value)
  }

  animationId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
  resizeObserver?.disconnect()
})
</script>

<template>
  <div ref="arenaRef" class="deco-snake" aria-hidden="true">
    <div
      v-for="snake in snakes"
      :key="snake.id"
      class="deco-snake__unit"
    >
      <div
        v-for="(seg, index) in snake.body"
        :key="`${snake.id}-body-${index}`"
        class="deco-snake__body"
        :style="bodyStyle(seg)"
      />
      <div class="deco-snake__head" :style="headStyle(snake)">
        <img :src="snake.img" alt="" draggable="false" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.deco-snake {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 180px;
  overflow: hidden;
  pointer-events: none;
}

.deco-snake__unit {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.deco-snake__head,
.deco-snake__body {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  will-change: transform;
  transform: translate3d(0, 0, 0);
}

.deco-snake__head {
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  z-index: 2;
  
}

.deco-snake__body {
  background: #c80808;
  z-index: 1;
}

.deco-snake__head img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  user-select: none;
}
</style>
