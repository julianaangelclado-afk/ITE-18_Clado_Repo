<script setup lang="ts">
const students = useStudents()
const selectedYear = ref<number | null>(null)

const visible = computed(() =>
  selectedYear.value === null
    ? students
    : students.filter((s) => s.year === selectedYear.value)
)

const years = [1, 2, 3, 4]
</script>

<template>
  <div>
    <section class="head">
      <h1 class="head__title">Student directory</h1>
      <p class="head__lead">
        {{ visible.length }} {{ visible.length === 1 ? 'student' : 'students' }} shown.
        Filter by year of study.
      </p>

      <div class="filters">
        <!-- Same AppButton, different props: the active filter changes color. -->
        <span @click="selectedYear = null">
          <AppButton label="All years" :color="selectedYear === null ? 'gold' : 'navy'" size="sm" />
        </span>
        <span v-for="y in years" :key="y" @click="selectedYear = y">
          <AppButton :label="`Year ${y}`" :color="selectedYear === y ? 'gold' : 'navy'" size="sm" />
        </span>
      </div>
    </section>

    <section class="grid grid--3">
      <StudentCard
        v-for="s in visible"
        :key="s.id"
        :name="s.name"
        :course="s.course"
        :year="s.year"
        :student-id="s.id"
        :gpa="s.gpa"
        :email="s.email"
        :motto="s.motto"
      />
    </section>

    <p v-if="visible.length === 0" class="empty">
      No students in this year. Choose another year above.
    </p>
  </div>
</template>

<style scoped>
.head { padding: 4rem 0 2rem; text-align: center; }
.head__title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 600;
  color: var(--cream);
  text-shadow: 0 0 26px rgba(240, 210, 130, 0.35);
}
.head__lead { margin-top: 0.6rem; color: var(--cream-dim); }
.filters {
  display: flex;
  justify-content: center;
  gap: 0.7rem;
  flex-wrap: wrap;
  margin-top: 1.6rem;
}
.filters span { display: inline-block; }
.empty { text-align: center; color: var(--cream-dim); font-style: italic; }
</style>
