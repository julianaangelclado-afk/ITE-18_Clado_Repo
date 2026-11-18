<template>
  <div class="mx-auto max-w-3xl px-5 py-8 md:py-10">
    <header class="glow-ring mb-8 flex items-center gap-5 rounded-[2rem] p-5 md:p-7">
      <img
        src="/juliana.png"
        alt="Juliana Angel N. Clado"
        class="halo size-20 shrink-0 rounded-full border-[3px] border-sand object-cover object-center md:size-24"
      />
      <div>
        <h1 class="text-glow font-display text-3xl font-bold md:text-4xl">My Profile</h1>
        <p class="mt-1 text-cream/80">Information Technology student, musician, movie fan.</p>
      </div>
    </header>

    <div class="grid gap-6">
      <SectionPanel title="Personal Information">
        <dl class="grid items-start gap-x-6 gap-y-4 sm:grid-cols-[auto_1fr]">
          <dt class="font-semibold text-sand">Full name</dt>
          <dd>Juliana Angel N. Clado</dd>

          <dt class="font-semibold text-sand">Age</dt>
          <dd>{{ age }}</dd>

          <dt class="font-semibold text-sand">Email</dt>
          <dd><CopyEmail email="julianaangel.clado@carsu.edu.ph" /></dd>

          <dt class="font-semibold text-sand">Birthday</dt>
          <dd>
            June 24, 2006
            <BirthdayCountdown :month="6" :day="24" :birth-year="2006" />
          </dd>
        </dl>

        <div class="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            class="btn-glow rounded-full bg-sand px-5 py-2 font-semibold text-midnight hover:bg-cream"
            @click="onSave"
          >
            Save my contact
          </button>
          <button type="button" class="chip rounded-full border-2 border-sky/60 px-5 py-2" @click="onShare">
            Share this page!
          </button>
        </div>
      </SectionPanel>

      <SectionPanel title="Educational background" accent="text-wine">
        <ol class="tl-line ml-3">
          <li v-for="step in education" :key="step.level" class="tl-item relative pb-6 pl-7 last:pb-0">
            <span class="tl-dot absolute -left-[0.8rem] top-1.5 size-5 rounded-full border-4 border-sand bg-wine" />
            <p class="font-display text-xl font-bold">{{ step.level }}</p>
            <p>{{ step.school }}</p>
            <p class="text-sm text-sky">{{ step.years }}</p>
          </li>
        </ol>
      </SectionPanel>

      <div class="grid gap-6 md:grid-cols-2">
        <SectionPanel title="Skills and Interests">
          <h3 class="mb-2 font-semibold text-sand">Skills</h3>
          <ul class="mb-5 flex flex-wrap gap-2">
            <li v-for="skill in skills" :key="skill" class="chip cursor-default rounded-full border-2 border-cloud bg-cloud px-4 py-1 font-medium">
              {{ skill }}
            </li>
          </ul>
          <h3 class="mb-2 font-semibold text-sand">Interests</h3>
          <ul class="flex flex-wrap gap-2">
            <li v-for="interest in interests" :key="interest" class="chip cursor-default rounded-full border-2 border-sky/60 px-4 py-1">
              {{ interest }}
            </li>
          </ul>
        </SectionPanel>

        <SectionPanel title="Hobbies" accent="text-sand">
          <ul class="grid gap-3">
            <li v-for="hobby in hobbies" :key="hobby" class="chip cursor-default rounded-2xl border-2 border-transparent bg-midnight/60 px-4 py-3">
              {{ hobby }}
            </li>
          </ul>
        </SectionPanel>
      </div>
    </div>

    <div class="mt-10 text-center">
      <NuxtLink
        to="/"
        class="btn-glow inline-block rounded-full bg-sand px-7 py-3 font-semibold text-midnight hover:bg-cream"
      >
        Back to home
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Profile | Juliana Angel N. Clado' })

const { show } = useToast()

function onSave() {
  saveContact()
  show('Contact file downloaded')
}
async function onShare() {
  const url = window.location.href
  if (navigator.share) {
    try {
      await navigator.share({ title: CONTACT.name, url })
    } catch {
      /* the visitor closed the share sheet */
    }
  } else {
    await copyText(url)
    show('Page link copied')
  }
}

// Shows 20 on the server, then keeps itself correct from the birthday.
const age = ref(20)
onMounted(() => {
  const now = new Date()
  let years = now.getFullYear() - 2006
  if (now < new Date(now.getFullYear(), 5, 24)) years--
  age.value = years
})

const education = [
  { level: 'Elementary', school: 'Libertad Central Elementary School', years: '2012-2018' },
  { level: 'Junior High School', school: 'Agusan National High School', years: '2018-2022' },
  { level: 'Senior High School', school: 'Agusan National High School', years: '2022-2024' },
  {
    level: 'College',
    school: 'Bachelor of Science in Information Technology, Caraga State University',
    years: 'Currently a 3rd year student',
  },
]

const skills = ['HTML', 'CSS', 'PHP', 'Python']
const interests = ['Watching Marvel', 'Crime Documentaries']
const hobbies = ['Playing instruments', 'Singing']
</script>
