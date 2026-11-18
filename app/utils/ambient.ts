// A quiet, slow chord loop (Cmaj7, Am7, Fmaj7, G6) made with the Web Audio API.
let ctx: AudioContext | null = null
let filter: BiquadFilterNode | null = null
let master: GainNode | null = null
let timer: ReturnType<typeof setInterval> | undefined
let stopTimer: ReturnType<typeof setTimeout> | undefined
let voices: { osc: OscillatorNode; g: GainNode }[] = []
let step = 0

const chords = [
  [48, 52, 55, 59],
  [45, 48, 52, 55],
  [41, 45, 48, 52],
  [43, 47, 50, 52],
]
const mtof = (m: number) => 440 * Math.pow(2, (m - 69) / 12)

function killVoices(fade: number) {
  if (!ctx) return
  const t = ctx.currentTime
  for (const v of voices) {
    v.g.gain.cancelScheduledValues(t)
    v.g.gain.setValueAtTime(v.g.gain.value, t)
    v.g.gain.linearRampToValueAtTime(0, t + fade)
    v.osc.stop(t + fade + 0.05)
  }
  voices = []
}

function playChord() {
  if (!ctx || !filter) return
  killVoices(3)
  const t = ctx.currentTime
  const notes = chords[step % chords.length] ?? []
  voices = notes.map((m) => {
    const osc = ctx!.createOscillator()
    const g = ctx!.createGain()
    osc.type = 'sine'
    osc.frequency.value = mtof(m)
    osc.detune.value = (Math.random() - 0.5) * 8
    g.gain.setValueAtTime(0, t)
    g.gain.linearRampToValueAtTime(0.08, t + 3)
    osc.connect(g).connect(filter!)
    osc.start(t)
    return { osc, g }
  })
  step++
}

export function startAmbient() {
  if (!import.meta.client) return
  const AC = window.AudioContext || (window as any).webkitAudioContext
  if (!AC) return
  if (!ctx) {
    ctx = new AC()
    filter = ctx!.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 900
    master = ctx!.createGain()
    master.gain.value = 0
    filter.connect(master)
    master.connect(ctx!.destination)
  }
  ctx!.resume()
  clearTimeout(stopTimer)
  killVoices(0)
  const t = ctx!.currentTime
  master!.gain.cancelScheduledValues(t)
  master!.gain.setValueAtTime(master!.gain.value, t)
  master!.gain.linearRampToValueAtTime(0.5, t + 2.5)
  step = 0
  playChord()
  clearInterval(timer)
  timer = setInterval(playChord, 7000)
}

export function stopAmbient() {
  if (!ctx || !master) return
  clearInterval(timer)
  const t = ctx.currentTime
  master.gain.cancelScheduledValues(t)
  master.gain.setValueAtTime(master.gain.value, t)
  master.gain.linearRampToValueAtTime(0, t + 1.2)
  clearTimeout(stopTimer)
  stopTimer = setTimeout(() => killVoices(0), 1500)
}
