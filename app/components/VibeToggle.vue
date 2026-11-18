<!-- Turns on a quiet ambient chord loop. Off by default; browsers need a click before sound can play. -->
<template>
  <button
    type="button"
    class="vibe"
    :class="{ on }"
    :aria-pressed="on"
    title="Vibe mode: soft ambient music"
    @click="toggle"
  >
    <span class="bars" aria-hidden="true"><i /><i /><i /></span>
    <span class="hidden sm:inline">Vibe</span>
    <span class="sr-only">mode {{ on ? 'on' : 'off' }}</span>
  </button>
</template>

<script setup lang="ts">
const { on, toggle } = useVibe()
</script>

<style scoped>
.vibe {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: 9999px;
  border: 2px solid rgba(230,204,158,.35);
  font-weight: 500;
  transition: background-color .4s ease, border-color .4s ease, box-shadow .4s ease;
}
.vibe:hover { background-color: rgba(230,204,158,.12); }
.vibe.on {
  background-color: rgba(230,204,158,.2);
  border-color: rgba(230,204,158,.7);
  box-shadow: 0 0 14px rgba(230,204,158,.25);
}
.bars { display: flex; align-items: flex-end; gap: 2px; height: 14px; }
.bars i {
  width: 3px;
  height: 100%;
  border-radius: 2px;
  background: var(--color-sand);
  transform-origin: bottom;
  transform: scaleY(.35);
  animation: vb 1.6s ease-in-out infinite;
  animation-play-state: paused;
}
.bars i:nth-child(2) { animation-delay: -.5s; }
.bars i:nth-child(3) { animation-delay: -1s; }
.vibe.on .bars i { animation-play-state: running; }
@keyframes vb { 0%, 100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
</style>
