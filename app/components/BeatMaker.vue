<!-- A 16-step beat maker. Notes are scheduled ahead on the audio clock so the rhythm stays steady. -->
<template>
  <div>
    <div class="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 class="font-display text-2xl font-bold">Make a beat</h2>
        <p class="mt-1 text-sm text-cream/80">Tap the squares to build a loop, then press play.</p>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <button
          type="button"
          class="btn-glow rounded-full bg-sand px-6 py-2 font-semibold text-midnight hover:bg-cream"
          :aria-pressed="playing"
          @click="toggle"
        >
          {{ playing ? 'Stop' : 'Play' }}
        </button>
        <button type="button" class="chip rounded-full border-2 border-sky/60 px-4 py-1.5 text-sm" @click="surprise">Surprise me</button>
        <button type="button" class="chip rounded-full border-2 border-sky/60 px-4 py-1.5 text-sm" @click="clear">Clear</button>
        <label class="flex items-center gap-2 text-sm">
          Tempo
          <input v-model.number="bpm" type="range" min="60" max="120" class="w-24 accent-[#e6cc9e]" />
          <span class="w-14 tabular-nums">{{ bpm }} bpm</span>
        </label>
      </div>
    </div>

    <div class="overflow-x-auto pb-1">
      <div class="grid min-w-[480px] gap-2">
        <div v-for="(row, r) in rows" :key="row.name" class="grid grid-cols-[4rem_1fr] items-center gap-3">
          <span class="text-sm font-medium" :style="{ color: row.color }">{{ row.name }}</span>
          <div class="grid grid-cols-16 gap-1">
            <button
              v-for="c in 16"
              :key="c"
              type="button"
              class="step"
              :class="{ on: pattern[r]?.[c - 1], now: playing && current === c - 1, group: (c - 1) % 4 === 0 }"
              :style="{ '--c': row.color }"
              :aria-pressed="!!pattern[r]?.[c - 1]"
              :aria-label="`${row.name}, step ${c}`"
              @click="tap(r, c - 1)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { name: 'Kick', color: '#c9757b' },
  { name: 'Snare', color: '#6a98c6' },
  { name: 'Hi-hat', color: '#b3cfe0' },
  { name: 'Bell', color: '#e6cc9e' },
]
const STEPS = 16
const make = (on: number[]) => Array.from({ length: STEPS }, (_, i) => on.includes(i))

const pattern = ref<boolean[][]>([
  make([0, 7, 10]),
  make([4, 12]),
  make([0, 2, 4, 6, 8, 10, 12, 14]),
  make([2, 6, 11, 14]),
])
const bpm = ref(84)
const playing = ref(false)
const current = ref(-1)

let ctx: AudioContext | null = null
let out!: GainNode
let noise!: AudioBuffer
let timer: ReturnType<typeof setInterval> | undefined
let nextTime = 0
let stepIdx = 0

function ensure() {
  if (ctx) return
  const AC = window.AudioContext || (window as any).webkitAudioContext
  ctx = new AC() as AudioContext
  out = ctx.createGain()
  out.gain.value = 0.6
  const comp = ctx.createDynamicsCompressor()
  out.connect(comp).connect(ctx.destination)
  noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
  const d = noise.getChannelData(0)
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1
}

function noiseHit(t: number, type: BiquadFilterType, freq: number, vol: number, dur: number) {
  const src = ctx!.createBufferSource()
  src.buffer = noise
  const f = ctx!.createBiquadFilter()
  f.type = type
  f.frequency.value = freq
  const g = ctx!.createGain()
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  src.connect(f).connect(g).connect(out)
  src.start(t)
  src.stop(t + dur + 0.02)
}

function tone(t: number, type: OscillatorType, freq: number, vol: number, dur: number, endFreq?: number) {
  const o = ctx!.createOscillator()
  const g = ctx!.createGain()
  o.type = type
  o.frequency.setValueAtTime(freq, t)
  if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur * 0.45)
  g.gain.setValueAtTime(vol, t)
  g.gain.exponentialRampToValueAtTime(0.001, t + dur)
  o.connect(g).connect(out)
  o.start(t)
  o.stop(t + dur + 0.02)
}

const scale = [523.25, 587.33, 659.25, 783.99, 880]

function hit(row: number, col: number, t: number) {
  if (row === 0) tone(t, 'sine', 140, 0.9, 0.32, 42)
  else if (row === 1) {
    noiseHit(t, 'bandpass', 1800, 0.45, 0.16)
    tone(t, 'triangle', 190, 0.25, 0.1)
  } else if (row === 2) noiseHit(t, 'highpass', 7500, 0.14, 0.05)
  else {
    const f = scale[col % scale.length] ?? 523.25
    tone(t, 'sine', f, 0.2, 0.8)
    tone(t, 'sine', f * 2, 0.05, 0.5)
  }
}

function scheduler() {
  if (!ctx) return
  while (nextTime < ctx.currentTime + 0.12) {
    const s = stepIdx
    pattern.value.forEach((row, r) => row[s] && hit(r, s, nextTime))
    const delay = Math.max(0, (nextTime - ctx.currentTime) * 1000)
    setTimeout(() => { if (playing.value) current.value = s }, delay)
    nextTime += 60 / bpm.value / 4
    stepIdx = (stepIdx + 1) % STEPS
  }
}

function start() {
  ensure()
  ctx!.resume()
  stepIdx = 0
  nextTime = ctx!.currentTime + 0.06
  playing.value = true
  scheduler()
  timer = setInterval(scheduler, 25)
}
function stop() {
  clearInterval(timer)
  playing.value = false
  current.value = -1
}
function toggle() {
  playing.value ? stop() : start()
}

function tap(r: number, c: number) {
  const row = pattern.value[r]
  if (!row) return
  row[c] = !row[c]
  if (row[c] && !playing.value) {
    ensure()
    ctx!.resume()
    hit(r, c, ctx!.currentTime)
  }
}
function clear() {
  pattern.value = rows.map(() => make([]))
}
function surprise() {
  const rand = (p: number) => Array.from({ length: STEPS }, () => Math.random() < p)
  const hats = Array.from({ length: STEPS }, (_, i) => i % 2 === 0 && Math.random() < 0.85)
  const kick = rand(0.2)
  kick[0] = true
  pattern.value = [kick, make([4, 12]), hats, rand(0.22)]
}

onBeforeUnmount(() => {
  stop()
  ctx?.close()
})
</script>

<style scoped>
.step {
  aspect-ratio: 1;
  min-width: 0;
  border-radius: 8px;
  background: rgba(247,240,225,.07);
  border: 1.5px solid rgba(247,240,225,.12);
  transition: background-color .25s ease, box-shadow .25s ease, transform .2s ease, filter .2s ease;
}
.step.group { background: rgba(247,240,225,.12); }
.step:hover { border-color: var(--c); }
.step.on {
  background: var(--c);
  border-color: var(--c);
  box-shadow: 0 0 10px -2px var(--c);
}
.step.now { filter: brightness(1.35); transform: translateY(-2px); }
.step:not(.on).now { background: rgba(247,240,225,.28); }
</style>
