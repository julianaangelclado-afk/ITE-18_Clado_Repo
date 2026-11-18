<!-- Glowing clouds that float slowly behind the content, like the textile come alive. -->
<template>
  <div class="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
    <CloudMark
      v-for="(c, i) in clouds"
      :key="i"
      class="cloud cloud-glow"
      :class="c.color"
      :style="{
        top: c.top,
        width: c.width,
        animationDuration: c.duration,
        animationDelay: c.delay,
        '--x': c.x,
      }"
    />
  </div>
</template>

<script setup lang="ts">
const clouds = [
  { top: '8%',  width: '130px', duration: '95s',  delay: '-20s', x: '15vw', color: 'text-cloud' },
  { top: '26%', width: '90px',  duration: '70s',  delay: '-55s', x: '70vw', color: 'text-wine' },
  { top: '48%', width: '170px', duration: '120s', delay: '-80s', x: '40vw', color: 'text-sand' },
  { top: '68%', width: '110px', duration: '85s',  delay: '-10s', x: '85vw', color: 'text-cloud' },
  { top: '86%', width: '150px', duration: '105s', delay: '-60s', x: '25vw', color: 'text-wine' },
]
</script>

<style scoped>
.cloud {
  position: absolute;
  left: 0;
  height: auto;
  opacity: .16;
  animation: drift linear infinite;
}
@media (prefers-reduced-motion: reduce) {
  .cloud { transform: translateX(var(--x)); }
}
</style>
