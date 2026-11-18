<script setup lang="ts">
// Reusable button. Customize it with props: label, color, size, outline.
// Pass `to` to render it as a link instead of a <button>.
withDefaults(
  defineProps<{
    label: string
    color?: 'navy' | 'green' | 'brown' | 'gold'
    size?: 'sm' | 'md' | 'lg'
    outline?: boolean
    to?: string
  }>(),
  {
    color: 'green',
    size: 'md',
    outline: false,
    to: undefined
  }
)
</script>

<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="btn"
    :class="[`btn--${color}`, `btn--${size}`, { 'btn--outline': outline }]"
  >
    {{ label }}
  </NuxtLink>
  <button
    v-else
    type="button"
    class="btn"
    :class="[`btn--${color}`, `btn--${size}`, { 'btn--outline': outline }]"
  >
    {{ label }}
  </button>
</template>

<style scoped>
.btn {
  --bg: #4b5a2a;
  --glow: rgba(120, 140, 70, 0.55);
  display: inline-block;
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.03em;
  color: var(--cream);
  background: linear-gradient(180deg, color-mix(in srgb, var(--bg) 85%, white), var(--bg));
  border: 1px solid var(--gold);
  border-radius: 2px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 0 0 14px var(--glow), inset 0 0 0 3px rgba(0, 0, 0, 0.18);
  transition: box-shadow 0.25s ease, transform 0.15s ease;
}
.btn:hover {
  box-shadow: 0 0 26px var(--glow), inset 0 0 0 3px rgba(0, 0, 0, 0.18);
  transform: translateY(-1px);
}
.btn:focus-visible {
  outline: 2px solid var(--gold-bright);
  outline-offset: 3px;
}

.btn--navy  { --bg: #1b2f55; --glow: rgba(70, 110, 190, 0.5); }
.btn--green { --bg: #4b5a2a; --glow: rgba(120, 140, 70, 0.55); }
.btn--brown { --bg: #6a4425; --glow: rgba(190, 130, 70, 0.5); }
.btn--gold  { --bg: #a98530; --glow: rgba(230, 190, 90, 0.55); color: #1a1408; }

.btn--outline {
  background: transparent;
  color: var(--gold-bright);
  box-shadow: 0 0 10px var(--glow);
}

.btn--sm { padding: 0.4rem 0.9rem; font-size: 0.95rem; }
.btn--md { padding: 0.65rem 1.5rem; font-size: 1.1rem; }
.btn--lg { padding: 0.85rem 2.1rem; font-size: 1.3rem; }
</style>
