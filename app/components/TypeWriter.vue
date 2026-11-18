<template>
  <span>{{ text }}<span class="caret" aria-hidden="true" /></span>
</template>

<script setup lang="ts">
const props = defineProps<{ phrases: string[] }>()
const text = ref(props.phrases[0] ?? '')
let stopped = false

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  let i = 0
  while (!stopped) {
    await sleep(2400)
    while (text.value.length && !stopped) {
      text.value = text.value.slice(0, -1)
      await sleep(35)
    }
    i = (i + 1) % props.phrases.length
    const target = props.phrases[i] ?? ''
    for (let c = 1; c <= target.length && !stopped; c++) {
      text.value = target.slice(0, c)
      await sleep(70)
    }
  }
})
onBeforeUnmount(() => { stopped = true })
</script>

<style scoped>
.caret {
  display: inline-block;
  width: 3px;
  height: 1.1em;
  margin-left: 4px;
  vertical-align: -0.15em;
  background: var(--color-sand);
  animation: blink 1.4s steps(1) infinite;
}
</style>
