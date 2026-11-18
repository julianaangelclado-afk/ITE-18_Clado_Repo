export function useVibe() {
  const on = useState<boolean>('vibe-on', () => false)
  function toggle() {
    on.value = !on.value
    try {
      on.value ? startAmbient() : stopAmbient()
    } catch {
      on.value = false
    }
  }
  return { on, toggle }
}
