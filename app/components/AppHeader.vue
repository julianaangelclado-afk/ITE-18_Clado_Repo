<script setup lang="ts">
// Website navigation. Add a page here and it appears everywhere.
const links = [
  { label: 'Home', to: '/' },
  { label: 'Students', to: '/students' },
  { label: 'About', to: '/about' }
]
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__brand">
        <span class="header__crest" aria-hidden="true">A</span>
        <span>
          <strong>Ashford Academy</strong>
          <small>Student Directory</small>
        </span>
      </NuxtLink>

      <nav class="header__nav" aria-label="Main navigation">
        <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="header__link">
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: linear-gradient(180deg, rgba(8, 16, 32, 0.97), rgba(13, 26, 48, 0.94));
  border-bottom: 1px solid var(--gold-dim);
  box-shadow: 0 6px 30px rgba(201, 162, 75, 0.12);
  backdrop-filter: blur(6px);
}
.header__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}
.header__brand {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  color: var(--cream);
  text-decoration: none;
}
.header__brand strong {
  display: block;
  font-family: var(--font-display);
  font-size: 1.4rem;
  line-height: 1.1;
}
.header__brand small {
  color: var(--gold);
  font-style: italic;
  font-size: 0.85rem;
}
.header__crest {
  display: grid;
  place-items: center;
  width: 2.6rem;
  height: 2.6rem;
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--gold-bright);
  border: 1px solid var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 16px rgba(201, 162, 75, 0.45), inset 0 0 0 3px rgba(201, 162, 75, 0.15);
  text-shadow: 0 0 10px rgba(240, 210, 130, 0.8);
}
.header__nav {
  display: flex;
  gap: 1.6rem;
}
.header__link {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--cream-dim);
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 1px solid transparent;
  transition: color 0.2s, text-shadow 0.2s;
}
.header__link:hover {
  color: var(--gold-bright);
  text-shadow: 0 0 12px rgba(240, 210, 130, 0.6);
}
.header__link.router-link-exact-active {
  color: var(--gold-bright);
  border-bottom-color: var(--gold);
  text-shadow: 0 0 12px rgba(240, 210, 130, 0.6);
}
.header__link:focus-visible,
.header__brand:focus-visible {
  outline: 2px solid var(--gold-bright);
  outline-offset: 4px;
}
</style>
