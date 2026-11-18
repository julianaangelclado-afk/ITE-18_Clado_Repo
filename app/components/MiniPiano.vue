<!-- A small playable piano: she plays instruments, so the site can too. -->
<template>
  <div>
    <div class="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 class="font-display text-2xl font-bold">Play me a tune</h2>
        <p class="mt-1 text-sm text-cream/80">
          Tap the keys, or press A S D F G H J K on your keyboard. Black keys are W E T Y U.
        </p>
      </div>
      <div class="eq" :class="{ on: active.size > 0 }" aria-hidden="true">
        <span v-for="n in 6" :key="n" :style="{ animationDelay: n * 0.11 + 's' }" />
      </div>
    </div>

    <div class="keys" role="group" aria-label="Piano keyboard">
      <div class="row">
        <button
          v-for="k in whites"
          :key="k.n"
          type="button"
          class="white"
          :class="{ down: active.has(k.n) }"
          :aria-label="`Play ${k.n}`"
          @pointerdown.prevent="press(k)"
          @pointerup="release(k)"
          @pointerleave="release(k)"
          @pointercancel="release(k)"
          @pointerenter="(e: PointerEvent) => e.buttons === 1 && press(k)"
          @keydown.enter.space.prevent="press(k)"
          @keyup.enter.space="release(k)"
        >
          <span>{{ k.n.replace(/\d/, '') }}</span>
        </button>

        <button
          v-for="k in blacks"
          :key="k.n"
          type="button"
          class="black"
          :class="{ down: active.has(k.n) }"
          :style="{ left: `calc(${k.pos * 12.5}% - 3.5%)` }"
          :aria-label="`Play ${k.n}`"
          @pointerdown.prevent="press(k)"
          @pointerup="release(k)"
          @pointerleave="release(k)"
          @pointercancel="release(k)"
          @pointerenter="(e: PointerEvent) => e.buttons === 1 && press(k)"
          @keydown.enter.space.prevent="press(k)"
          @keyup.enter.space="release(k)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Note { n: string; f: number; key: string; pos?: number }

const whites: Note[] = [
  { n: 'C4', f: 261.63, key: 'a' },
  { n: 'D4', f: 293.66, key: 's' },
  { n: 'E4', f: 329.63, key: 'd' },
  { n: 'F4', f: 349.23, key: 'f' },
  { n: 'G4', f: 392.0, key: 'g' },
  { n: 'A4', f: 440.0, key: 'h' },
  { n: 'B4', f: 493.88, key: 'j' },
  { n: 'C5', f: 523.25, key: 'k' },
]
const blacks: Note[] = [
  { n: 'C#4', f: 277.18, key: 'w', pos: 1 },
  { n: 'D#4', f: 311.13, key: 'e', pos: 2 },
  { n: 'F#4', f: 369.99, key: 't', pos: 4 },
  { n: 'G#4', f: 415.3, key: 'y', pos: 5 },
  { n: 'A#4', f: 466.16, key: 'u', pos: 6 },
]
const all = [...whites, ...blacks]

const active = reactive(new Set<string>())
let ctx: AudioContext | null = null

function play(freq: number) {
  const AC = window.AudioContext || (window as any).webkitAudioContext
  ctx ??= new AC()
  if (ctx.state === 'suspended') ctx.resume()
  const t = ctx.currentTime
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(0.32, t + 0.015)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.3)
  gain.connect(ctx.destination)
  // two slightly different waves give a soft, plucky tone
  for (const [type, mult, vol] of [['triangle', 1, 1], ['sine', 2, 0.25]] as const) {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq * mult
    g.gain.value = vol
    osc.connect(g).connect(gain)
    osc.start(t)
    osc.stop(t + 1.35)
  }
}

function press(k: Note) {
  active.add(k.n)
  play(k.f)
}
function release(k: Note) {
  setTimeout(() => active.delete(k.n), 140)
}

function onKeyDown(e: KeyboardEvent) {
  if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return
  const t = e.target as HTMLElement
  if (['INPUT', 'TEXTAREA'].includes(t.tagName)) return
  const k = all.find((n) => n.key === e.key.toLowerCase())
  if (k) press(k)
}
function onKeyUp(e: KeyboardEvent) {
  const k = all.find((n) => n.key === e.key.toLowerCase())
  if (k) release(k)
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
  ctx?.close()
})
</script>

<style scoped>
.keys {
  padding: 12px;
  border-radius: 22px;
  background: var(--color-midnight);
  border: 2px solid rgba(247,240,225,.2);
  box-shadow: inset 0 0 24px rgba(106,152,198,.12);
}
.row { position: relative; display: flex; gap: 4px; }

.white {
  flex: 1;
  height: 140px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 10px;
  border-radius: 0 0 14px 14px;
  background: linear-gradient(#fbf7ea, #e6dcc0);
  color: var(--color-navy);
  font-weight: 600;
  touch-action: manipulation;
  transition: background .25s, box-shadow .25s, transform .2s;
}
.white:hover { box-shadow: 0 0 12px rgba(179,207,224,.3); }
.white.down {
  background: linear-gradient(#f6e3b3, var(--color-sand));
  box-shadow: 0 0 20px rgba(230,204,158,.5);
  transform: translateY(3px);
}

.black {
  position: absolute;
  top: 0;
  width: 7%;
  height: 60%;
  z-index: 2;
  border-radius: 0 0 10px 10px;
  border: 2px solid rgba(247,240,225,.3);
  background: linear-gradient(#17406f, #0a1d36);
  touch-action: manipulation;
  transition: background .25s, box-shadow .25s, transform .2s;
}
.black:hover { box-shadow: 0 0 10px rgba(179,207,224,.3); }
.black.down {
  background: linear-gradient(var(--color-sky), var(--color-cloud));
  box-shadow: 0 0 18px rgba(179,207,224,.5);
  transform: translateY(2px);
}

/* Equalizer bars that dance while a note is playing */
.eq { display: flex; align-items: flex-end; gap: 4px; height: 36px; }
.eq span {
  width: 5px;
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(var(--color-sand), var(--color-sky));
  box-shadow: 0 0 6px rgba(230,204,158,.35);
  transform-origin: bottom;
  transform: scaleY(.2);
  animation: eq .8s ease-in-out infinite;
  animation-play-state: paused;
}
.eq.on span { animation-play-state: running; }
@keyframes eq { 0%, 100% { transform: scaleY(.2); } 50% { transform: scaleY(1); } }
</style>
