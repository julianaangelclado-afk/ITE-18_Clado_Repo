let timer: ReturnType<typeof setTimeout> | undefined

export function useToast() {
  const message = useState<string>('toast', () => '')
  function show(text: string) {
    message.value = text
    clearTimeout(timer)
    timer = setTimeout(() => (message.value = ''), 2400)
  }
  return { message, show }
}
