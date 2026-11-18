<template>
  <header class="sticky top-0 z-30 border-b-4 border-sand bg-midnight/95 shadow-[0_6px_24px_-12px_rgba(230,204,158,.25)] backdrop-blur">
    <nav class="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3" aria-label="Main navigation">
      <NuxtLink to="/" class="flex items-center gap-3">
        <CloudMark class="logo-cloud w-12 text-cloud" />
        <span class="font-display text-lg font-bold leading-tight">Juliana Clado</span>
      </NuxtLink>

      <div class="flex items-center gap-2">
        <VibeToggle />

        <button
          type="button"
          class="pal-btn"
          title="Quick menu"
          @click="open = true"
        >
          <svg viewBox="0 0 20 20" class="size-4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" /><path d="M13 13l4 4" />
          </svg>
          <kbd class="hidden md:inline">{{ shortcut }}</kbd>
          <span class="sr-only">Open quick menu</span>
        </button>

        <ul class="flex items-center gap-1">
          <li v-for="link in links" :key="link.to">
            <NuxtLink :to="link.to" class="nav-link rounded-full px-4 py-2 font-medium text-cream" active-class="is-active">
              {{ link.label }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
const open = useState('palette-open', () => false)
const shortcut = ref('Ctrl K')
onMounted(() => {
  if (/Mac|iPhone|iPad/.test(navigator.platform)) shortcut.value = '⌘K'
})

const links = [
  { label: 'Home', to: '/' },
  { label: 'Profile', to: '/profile' },
]
</script>

<style scoped>
.nav-link { transition: background-color .4s ease, box-shadow .4s ease, color .4s ease; }
.nav-link:hover { background-color: rgba(106,152,198,.22); box-shadow: 0 0 12px rgba(179,207,224,.25); }
.nav-link.is-active { background-color: var(--color-sand); color: var(--color-midnight); box-shadow: 0 0 14px rgba(230,204,158,.3); }

.pal-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border-radius: 9999px;
  border: 2px solid rgba(179,207,224,.35);
  transition: background-color .4s ease, border-color .4s ease;
}
.pal-btn:hover { background-color: rgba(106,152,198,.2); border-color: rgba(179,207,224,.6); }
.pal-btn kbd { font-family: inherit; font-size: .75rem; opacity: .8; }
</style>
