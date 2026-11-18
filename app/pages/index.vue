<template>
  <div class="mx-auto max-w-5xl px-5 py-8 md:py-12">
    <section class="glow-ring rounded-[2.5rem] p-6 md:p-10">
      <div class="grid items-center gap-10 md:grid-cols-[1.15fr_1fr]">
        <div>
          <p class="text-sand">{{ greeting }}! Welcome to my little corner of the internet.</p>
          <h1 class="text-glow mt-2 font-display text-4xl font-bold leading-tight md:text-5xl">
            Juliana Angel N. Clado
          </h1>

          <p class="mt-4 min-h-[2.2rem] font-display text-lg text-sky md:text-xl">
            I'm <TypeWriter :phrases="phrases" />
          </p>

          <p class="mt-5 max-w-prose leading-relaxed text-cream/90">
            I'm an open, optimistic person and a friend you can rely on. I love
            watching movies, playing instruments, listening and vibing to music,
            and assembling things. Most of all, I love making song covers.
          </p>

          <ul class="mt-6 flex flex-wrap gap-2">
            <li
              v-for="hobby in hobbies"
              :key="hobby"
              class="chip cursor-default rounded-full border-2 border-sky/60 px-4 py-1 text-sm"
            >
              {{ hobby }}
            </li>
          </ul>

          <NuxtLink
            to="/profile"
            class="btn-glow mt-8 inline-block rounded-full bg-sand px-7 py-3 font-semibold text-midnight hover:bg-cream"
          >
            View my profile
          </NuxtLink>
        </div>

        <div class="relative mx-auto w-full max-w-xs">
          <CloudMark class="bob cloud-glow absolute -left-5 -top-6 z-10 w-20 text-wine" />
          <CloudMark class="bob cloud-glow absolute -bottom-6 -right-5 z-10 w-24 text-cloud" style="animation-delay: -3s" />
          <TiltFrame>
            <img
              src="/juliana.png"
              alt="Portrait of Juliana wearing round glasses, with one hand on her head"
              class="halo relative aspect-[4/5] w-full rounded-[3rem] border-[3px] border-sand object-cover object-center"
            />
          </TiltFrame>
        </div>
      </div>
    </section>

    <section id="piano" class="panel mt-8 scroll-mt-24 rounded-[2rem] p-6 md:p-8">
      <MiniPiano />
    </section>

    <section id="beat" class="panel mt-8 scroll-mt-24 rounded-[2rem] p-6 md:p-8">
      <BeatMaker />
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Home | Juliana Angel N. Clado' })

// Says hello based on the visitor's local time (set after load).
const greeting = ref('Hello')
onMounted(() => {
  const h = new Date().getHours()
  greeting.value = h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'
})

const hobbies = ['Movies', 'Instruments', 'Music', 'Assembling things', 'Song covers']
const phrases = [
  'a friend you can rely on.',
  'an open, optimistic person.',
  'a song cover maker.',
  'a movie and music lover.',
  'always assembling something.',
]
</script>
