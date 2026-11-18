<!-- A soft warm light that trails the mouse with a gentle delay. Only on devices with a real pointer. -->
<template>
  <div ref="el" class="cursor-glow" aria-hidden="true" />
</template>

<script setup lang="ts">
const el = ref<HTMLElement | null>(null)
let tx = 0, ty = 0, cx = 0, cy = 0
let raf = 0
let started = false

function tick() {
  cx += (tx - cx) * 0.08
  cy += (ty - cy) * 0.08
  if (el.value) {
    el.value.style.transform = `translate3d(${cx - 150}px, ${cy - 150}px, 0)`
    el.value.style.opacity = '1'
  }
  raf = Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5 ? requestAnimationFrame(tick) : 0
}
function move(e: PointerEvent) {
  tx = e.clientX
  ty = e.clientY
  if (!started) { cx = tx; cy = ty; started = true }
  if (!raf) raf = requestAnimationFrame(tick)
}
function hide() {
  if (el.value) el.value.style.opacity = '0'
}

onMounted(() => {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  window.addEventListener('pointermove', move, { passive: true })
  document.documentElement.addEventListener('mouseleave', hide)
})
onBeforeUnmount(() => {
  window.removeEventListener('pointermove', move)
  document.documentElement.removeEventListener('mouseleave', hide)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<style scoped>
.cursor-glow {
  position: fixed;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  border-radius: 9999px;
  pointer-events: none;
  z-index: 20;
  opacity: 0;
  transition: opacity .8s ease;
  background: radial-gradient(circle, rgba(230,204,158,.05), rgba(230,204,158,.018) 45%, transparent 72%);
}
</style>
