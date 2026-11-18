<script setup lang="ts">
const students = useStudents()
const featured = students.slice(0, 3)
</script>

<template>
  <div>
    <section class="hero">
      <h1 class="hero__title">Know the students of Ashford Academy.</h1>
      <p class="hero__lead">
        Browse the student directory, see each student's course, year and standing,
        and get in touch.
      </p>
      <div class="hero__actions">
        <AppButton label="Browse students" to="/students" color="green" size="lg" />
        <AppButton label="About this site" to="/about" color="brown" size="lg" outline />
      </div>
    </section>

    <section class="section">
      <h2 class="section__title">The school at a glance</h2>
      <div class="grid grid--3">
        <InfoCard
          title="A long tradition"
          description="Founded in 1887, Ashford has taught generations of students across the arts, sciences and engineering."
          tone="navy"
        />
        <InfoCard
          title="Small classes"
          description="Seminars stay small so every student is known by name and taught closely by their tutors."
          tone="green"
        />
        <InfoCard
          title="Character first"
          description="Grades matter, but so do manners, curiosity and the habit of finishing what you start."
          tone="brown"
        />
      </div>
    </section>

    <section class="section">
      <h2 class="section__title">Featured students</h2>
      <div class="grid grid--3">
        <StudentCard
          v-for="s in featured"
          :key="s.id"
          :name="s.name"
          :course="s.course"
          :year="s.year"
          :student-id="s.id"
          :gpa="s.gpa"
          :email="s.email"
          :motto="s.motto"
        />
      </div>
      <div class="section__more">
        <AppButton label="See all students" to="/students" color="gold" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  padding: 5.5rem 0 3rem;
  text-align: center;
}
.hero__title {
  max-width: 16ch;
  margin: 0 auto;
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  font-weight: 600;
  line-height: 1.05;
  color: var(--cream);
  text-shadow: 0 0 30px rgba(240, 210, 130, 0.35);
}
.hero__lead {
  max-width: 52ch;
  margin: 1.4rem auto 2rem;
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--cream-dim);
}
.hero__actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.section { padding-top: 3.5rem; }
.section__title {
  margin-bottom: 1.6rem;
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 600;
  color: var(--gold-bright);
  text-shadow: 0 0 16px rgba(240, 210, 130, 0.35);
}
.section__more { margin-top: 2rem; text-align: center; }
</style>
