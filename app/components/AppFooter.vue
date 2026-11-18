<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <p class="footer__name">Ashford Academy</p>
      <p class="footer__motto">Learning, character and tradition since 1887.</p>
      <p class="footer__small">
        &copy; {{ year }} Ashford Academy. Student information website built with Nuxt and Vue.
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 4rem;
  background: linear-gradient(180deg, #0c1628, #070d1a);
  border-top: 1px solid var(--gold-dim);
  box-shadow: 0 -6px 30px rgba(201, 162, 75, 0.1);
  text-align: center;
}
.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
}
.footer__name {
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--gold-bright);
  text-shadow: 0 0 14px rgba(240, 210, 130, 0.45);
}
.footer__motto {
  margin-top: 0.3rem;
  font-style: italic;
  color: var(--cream-dim);
}
.footer__small {
  margin-top: 1.2rem;
  font-size: 0.85rem;
  color: #8a8570;
}
</style>
