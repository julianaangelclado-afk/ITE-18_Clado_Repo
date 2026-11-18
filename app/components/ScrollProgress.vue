<!-- A thin bar at the very top that fills as you read down the page. -->
<template>
  <div class="pointer-events-none fixed inset-x-0 top-0 z-40 h-[3px]" aria-hidden="true">
    <div
      class="h-full origin-left bg-gradient-to-r from-wine via-sand to-sky"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>

<script setup lang="ts">
const progress = ref(0)

function update() {
  const max = document.documentElement.scrollHeight - window.innerHeight
  progress.value = max > 0 ? Math.min(1, window.scrollY / max) : 0
}
onMounted(() => {
  update()
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', update)
  window.removeEventListener('resize', update)
})
</script>
