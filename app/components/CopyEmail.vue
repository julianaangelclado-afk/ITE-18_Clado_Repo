<template>
  <span>
    <button type="button" class="copy chip" @click="copy" :title="`Copy ${email}`">
      <span class="break-all text-left">{{ email }}</span>
      <span class="badge">{{ copied ? 'Copied!' : 'Copy' }}</span>
    </button>
    <span class="sr-only" aria-live="polite">{{ copied ? 'Email copied to clipboard' : '' }}</span>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ email: string }>()
const copied = ref(false)
let timer: ReturnType<typeof setTimeout>

async function copy() {
  try {
    await navigator.clipboard.writeText(props.email)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = props.email
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
  copied.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (copied.value = false), 2000)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.copy {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 8px 6px 16px;
  border-radius: 9999px;
  border: 2px solid rgba(179,207,224,.6);
}
.badge {
  flex-shrink: 0;
  padding: 2px 12px;
  border-radius: 9999px;
  font-size: .8rem;
  font-weight: 600;
  background: var(--color-cloud);
  color: var(--color-cream);
}
.copy:hover .badge { background: var(--color-midnight); }
</style>
