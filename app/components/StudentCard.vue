<script setup lang="ts">
// Displays one student. All data arrives through props.
const props = defineProps<{
  name: string
  course: string
  year: number
  studentId: string
  gpa: number
  email: string
  motto?: string
}>()

// Initials for the monogram, e.g. "Eleanor Whitmore" -> "EW"
const initials = computed(() =>
  props.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
)
</script>

<template>
  <article class="card">
    <div class="card__monogram" aria-hidden="true">{{ initials }}</div>

    <h3 class="card__name">{{ name }}</h3>
    <p class="card__course">{{ course }}</p>

    <dl class="card__details">
      <div>
        <dt>Year</dt>
        <dd>{{ year }}</dd>
      </div>
      <div>
        <dt>GPA</dt>
        <dd>{{ gpa.toFixed(2) }}</dd>
      </div>
      <div>
        <dt>ID</dt>
        <dd>{{ studentId }}</dd>
      </div>
    </dl>

    <p v-if="motto" class="card__motto">&ldquo;{{ motto }}&rdquo;</p>
    <a :href="`mailto:${email}`" class="card__email">{{ email }}</a>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  padding: 2rem 1.5rem 1.6rem;
  text-align: center;
  background:
    radial-gradient(circle at 50% 0%, rgba(201, 162, 75, 0.1), transparent 60%),
    linear-gradient(170deg, #14264a, #0b1730);
  border: 1px solid var(--gold-dim);
  border-radius: 15px;
  box-shadow: 0 0 24px rgba(0, 0, 0, 0.45), 0 0 22px rgba(201, 162, 75, 0.08);
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}
/* inner frame line, like an engraved certificate */
.card::before {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(201, 162, 75, 0.25);
  pointer-events: none;
}
.card:hover {
  border-color: var(--gold);
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.5), 0 0 34px rgba(201, 162, 75, 0.28);
}

.card__monogram {
  display: grid;
  place-items: center;
  width: 4.4rem;
  height: 4.4rem;
  margin: 0 auto 1rem;
  font-family: var(--font-display);
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--gold-bright);
  background: radial-gradient(circle, #4b5a2a, #2c371a);
  border: 1px solid var(--gold);
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(201, 162, 75, 0.4), inset 0 0 0 4px rgba(0, 0, 0, 0.2);
  text-shadow: 0 0 10px rgba(240, 210, 130, 0.8);
}
.card__name {
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--cream);
}
.card__course {
  margin-top: 0.15rem;
  font-style: italic;
  color: #c3a06a;
}
.card__details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  margin: 1.3rem 0 1.1rem;
  padding: 0.9rem 0;
  border-top: 1px solid rgba(201, 162, 75, 0.25);
  border-bottom: 1px solid rgba(201, 162, 75, 0.25);
}
.card__details dt {
  font-size: 0.8rem;
  color: #8f9a6a;
}
.card__details dd {
  margin-top: 0.15rem;
  font-family: var(--font-display);
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--cream);
  overflow-wrap: anywhere;
}
.card__motto {
  margin-bottom: 0.9rem;
  font-style: italic;
  color: var(--cream-dim);
}
.card__email {
  font-size: 0.9rem;
  color: var(--gold);
  text-decoration: none;
  border-bottom: 1px dotted var(--gold-dim);
}
.card__email:hover { color: var(--gold-bright); }
.card__email:focus-visible {
  outline: 2px solid var(--gold-bright);
  outline-offset: 3px;
}
</style>
