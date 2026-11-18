<template>
  <div aria-live="polite" role="status" class="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center">
    <Transition name="toast">
      <p
        v-if="message"
        class="rounded-full border-2 border-sand/50 bg-navy px-5 py-2 text-sm shadow-[0_0_24px_-8px_rgba(230,204,158,.4)]"
      >
        {{ message }}
      </p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { message } = useToast()
</script>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: opacity .4s ease, transform .4s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(8px); }
</style>
