<template>
  <div v-if="days !== null" class="mt-2">
    <p class="text-sm text-sky">
      <template v-if="days === 0">Today is my birthday!</template>
      <template v-else>{{ days }} {{ days === 1 ? 'day' : 'days' }} until I turn {{ turning }}</template>
    </p>
    <div class="mt-2 h-2 w-full max-w-xs overflow-hidden rounded-full bg-midnight" role="presentation">
      <div
        class="h-full rounded-full bg-gradient-to-r from-cloud via-sky to-sand shadow-[0_0_8px_rgba(230,204,158,.35)]"
        :style="{ width: progress + '%' }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ month: number; day: number; birthYear: number }>()
const days = ref<number | null>(null)
const turning = ref(0)
const progress = ref(0)

onMounted(() => {
  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const next = new Date(now.getFullYear(), props.month - 1, props.day)
  if (next < today) next.setFullYear(now.getFullYear() + 1)
  const last = new Date(next)
  last.setFullYear(next.getFullYear() - 1)
  const dayMs = 86400000
  days.value = Math.round((next.getTime() - today.getTime()) / dayMs)
  turning.value = next.getFullYear() - props.birthYear
  progress.value = Math.min(100, Math.round(((today.getTime() - last.getTime()) / (next.getTime() - last.getTime())) * 100))
})
</script>
