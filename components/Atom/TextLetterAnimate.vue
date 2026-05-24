<script setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    default: 'span'
  },
  toColor: {
    type: String,
    default: 'var(--txt-animate-to, #c80808)'
  },
  textCenter: {
    type: Boolean,
    default: false
  }
})

const letters = computed(() => {
  const source = props.text ?? ''
  if (!source) return []
  return source.split('')
})
</script>

<template>
  <component
    :is="tag"
    class="txt-animate-wrap"
    :class="{ 'text-center': textCenter }"
    :style="{ '--txt-animate-to': toColor }"
  >
    <span
      v-for="(char, index) in letters"
      :key="index"
      class="txt-letter"
    >{{ char }}</span>
  </component>
</template>

<style scoped>
.txt-animate-wrap {
  display: inline;
}

.txt-letter {
  display: inline;
}
</style>
