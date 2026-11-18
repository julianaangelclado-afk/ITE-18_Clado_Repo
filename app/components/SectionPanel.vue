<template>
  <section class="panel rounded-[2rem] p-6 md:p-8">
    <div class="mb-5 flex items-center gap-3">
      <CloudMark :class="['cloud-glow w-10 shrink-0', accent]" />
      <h2 class="font-display text-2xl font-bold md:text-3xl">{{ title }}</h2>
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ title: string; accent?: string }>(), {
  accent: 'text-cloud',
})
</script>
