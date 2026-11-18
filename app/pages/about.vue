<template>
  <div>
    <section class="head">
      <h1 class="head__title">About this site</h1>
      <p class="head__lead">
        Every page shares one header and one footer. Every student is one component
        fed by props.
      </p>
    </section>

    <section class="grid grid--2">
      <InfoCard
        title="AppHeader and AppFooter"
        description="Written once, placed in app.vue, and shown on every page. Edit a link in AppHeader and it changes across the whole site."
        tone="navy"
      />
      <InfoCard
        title="StudentCard"
        description="Receives name, course, year, ID, GPA, email and motto as props. Add a student to the data and a new card appears."
        tone="green"
      />
      <InfoCard
        title="InfoCard"
        description="Takes a title and a description. The three highlights on the home page and these four boxes all use this one component."
        tone="brown"
      />
      <InfoCard
        title="AppButton"
        description="Takes a label and a color (navy, green, brown or gold), plus optional size, outline and link. Try the filter buttons on the Students page."
        tone="green"
      />
    </section>

    <section class="contact">
      <h2 class="contact__title">Contact the registrar</h2>
      <p>Questions about a student record? Write to the registrar's office.</p>
      <div class="contact__actions">
        <AppButton label="Back to students" to="/students" color="green" />
        <AppButton label="Return home" to="/" color="brown" outline />
      </div>
    </section>
  </div>
</template>

<style scoped>
.head { padding: 4rem 0 2.5rem; text-align: center; }
.head__title {
  font-family: var(--font-display);
  font-size: clamp(2.2rem, 5vw, 3.4rem);
  font-weight: 600;
  color: var(--cream);
  text-shadow: 0 0 26px rgba(240, 210, 130, 0.35);
}
.head__lead { max-width: 52ch; margin: 0.8rem auto 0; line-height: 1.7; color: var(--cream-dim); }
.contact { margin-top: 3.5rem; text-align: center; color: var(--cream-dim); }
.contact__title {
  margin-bottom: 0.5rem;
  font-family: var(--font-display);
  font-size: 1.8rem;
  color: var(--gold-bright);
}
.contact__actions { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 1.4rem; }
</style>
