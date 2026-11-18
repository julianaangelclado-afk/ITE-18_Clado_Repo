<!-- Tilts toward the mouse and catches a moving highlight. -->
<template>
  <div class="tilt" @pointermove="onMove" @pointerleave="reset">
    <div class="tilt-inner" :style="style">
      <slot />
      <span class="shine rounded-[3rem]" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
const style = ref<Record<string, string>>({})

function onMove(e: PointerEvent) {
  if (e.pointerType !== 'mouse') return
  const r = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  style.value = {
    transform: `perspective(900px) rotateX(${(0.5 - py) * 6}deg) rotateY(${(px - 0.5) * 7}deg)`,
    '--mx': `${px * 100}%`,
    '--my': `${py * 100}%`,
    '--shine': '1',
  }
}
function reset() {
  style.value = {}
}
</script>

<style scoped>
.tilt { perspective: 900px; }
.tilt-inner { position: relative; transition: transform .6s ease-out; transform-style: preserve-3d; }
.shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: var(--shine, 0);
  transition: opacity .3s;
  background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,240,215,.14), transparent 60%);
}
</style>
