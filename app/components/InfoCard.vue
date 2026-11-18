<script setup lang="ts">
// Displays a title and a description. Optional `tone` changes the accent color.
withDefaults(
  defineProps<{
    title: string
    description: string
    tone?: 'green' | 'brown' | 'navy'
  }>(),
  { tone: 'green' }
)
</script>

<template>
  <article class="info" :class="`info--${tone}`">
    <h3 class="info__title">{{ title }}</h3>
    <p class="info__text">{{ description }}</p>
  </article>
</template>

<style scoped>
.info {
  --accent: #7c8f4a;
  padding: 1.6rem 1.5rem;
  background: linear-gradient(160deg, rgba(20, 36, 64, 0.85), rgba(10, 20, 38, 0.9));
  border: 1px solid var(--gold-dim);
  border-left: 4px solid var(--accent);
  border-radius: 3px;
  box-shadow: 0 0 22px rgba(0, 0, 0, 0.35), 0 0 18px color-mix(in srgb, var(--accent) 25%, transparent);
}
.info--green { --accent: #7c8f4a; }
.info--brown { --accent: #a8743f; }
.info--navy  { --accent: #5d82c4; }

.info__title {
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-weight: 600;
  color: var(--gold-bright);
  margin-bottom: 0.5rem;
}
.info__text {
  color: var(--cream-dim);
  line-height: 1.65;
}
</style>
