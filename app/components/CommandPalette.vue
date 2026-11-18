<!-- Quick menu. Open it with Ctrl+K (or ⌘K), type, and press Enter. -->
<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="pal">
        <div
          v-if="open"
          class="fixed inset-0 z-50 flex items-start justify-center bg-midnight/60 px-4 pt-[14vh]"
          @mousedown.self="close"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Quick menu"
            class="pal-box w-full max-w-md overflow-hidden rounded-3xl border-2 border-cream/20 bg-navy shadow-[0_0_60px_-20px_rgba(230,204,158,.35)]"
          >
            <input
              ref="input"
              v-model="query"
              type="text"
              autocomplete="off"
              spellcheck="false"
              placeholder="Where to? Try piano, beat or email"
              class="w-full border-b-2 border-cream/10 bg-transparent px-5 py-4 text-base text-cream placeholder:text-cream/50 focus:outline-none"
              role="combobox"
              aria-expanded="true"
              aria-controls="pal-list"
              :aria-activedescendant="activeId"
              @keydown="onInputKey"
            />
            <ul id="pal-list" role="listbox" class="max-h-72 overflow-y-auto p-2">
              <li
                v-for="(item, i) in filtered"
                :id="'pal-' + item.id"
                :key="item.id"
                role="option"
                :aria-selected="i === active"
              >
                <button type="button" class="pal-item" :class="{ active: i === active }" @mousemove="active = i" @click="run(item)">
                  <span>{{ item.label }}</span>
                  <span class="text-sm text-sky">{{ item.hint }}</span>
                </button>
              </li>
              <li v-if="!filtered.length" class="px-4 py-3 text-cream/70">
                Nothing matches. Try "profile" or "piano".
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Item { id: string; label: string; hint: string; run: () => unknown }

const open = useState('palette-open', () => false)
const { on: vibeOn, toggle: toggleVibe } = useVibe()
const { show } = useToast()

const query = ref('')
const active = ref(0)
const input = ref<HTMLInputElement | null>(null)
let lastFocus: HTMLElement | null = null

const items = computed<Item[]>(() => [
  { id: 'home', label: 'Go to Home', hint: 'Page', run: () => navigateTo('/') },
  { id: 'profile', label: 'Go to Profile', hint: 'Page', run: () => navigateTo('/profile') },
  { id: 'piano', label: 'Play the piano', hint: 'Home', run: () => navigateTo({ path: '/', hash: '#piano' }) },
  { id: 'beat', label: 'Make a beat', hint: 'Home', run: () => navigateTo({ path: '/', hash: '#beat' }) },
  { id: 'vibe', label: vibeOn.value ? 'Turn vibe mode off' : 'Turn vibe mode on', hint: 'Music', run: () => toggleVibe() },
  {
    id: 'email',
    label: 'Copy my email',
    hint: 'Action',
    run: async () => {
      await copyText(CONTACT.email)
      show('Email copied')
    },
  },
  {
    id: 'contact',
    label: 'Save my contact (.vcf)',
    hint: 'Action',
    run: () => {
      saveContact()
      show('Contact file downloaded')
    },
  },
])

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q ? items.value.filter((i) => `${i.label} ${i.hint} ${i.id}`.toLowerCase().includes(q)) : items.value
})

const activeId = computed(() => {
  const item = filtered.value[active.value]
  return item ? 'pal-' + item.id : undefined
})

watch(query, () => (active.value = 0))
watch(open, async (isOpen) => {
  if (isOpen) {
    lastFocus = document.activeElement as HTMLElement | null
    query.value = ''
    active.value = 0
    await nextTick()
    input.value?.focus()
  } else {
    lastFocus?.focus?.()
  }
})

function close() {
  open.value = false
}
async function run(item: Item) {
  close()
  await item.run()
}
function onInputKey(e: KeyboardEvent) {
  const n = filtered.value.length
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    active.value = n ? (active.value + 1) % n : 0
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    active.value = n ? (active.value - 1 + n) % n : 0
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = filtered.value[active.value]
    if (item) run(item)
  }
}
function onGlobalKey(e: KeyboardEvent) {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = !open.value
  } else if (e.key === 'Escape' && open.value) {
    close()
  }
}

onMounted(() => window.addEventListener('keydown', onGlobalKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<style scoped>
.pal-item {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 14px;
  text-align: left;
  transition: background-color .25s ease;
}
.pal-item.active { background-color: rgba(230,204,158,.16); }

.pal-enter-active, .pal-leave-active { transition: opacity .25s ease; }
.pal-enter-active .pal-box, .pal-leave-active .pal-box { transition: transform .25s ease; }
.pal-enter-from, .pal-leave-to { opacity: 0; }
.pal-enter-from .pal-box, .pal-leave-to .pal-box { transform: translateY(-8px); }
</style>
