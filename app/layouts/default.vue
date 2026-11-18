<template>
  <div class="relative flex min-h-screen flex-col">
    <DriftingClouds />
    <CursorGlow />
    <ScrollProgress />
    <SiteNav />
    <main class="relative z-10 flex-1">
      <slot />
    </main>
    <footer class="relative z-10 border-t-4 border-sand bg-midnight/95 px-5 py-6 text-center text-sm text-cream/80 shadow-[0_-8px_24px_-12px_rgba(230,204,158,.2)]">
      Juliana Angel N. Clado | BSIT student at Caraga State University
    </footer>
    <CommandPalette />
    <ToastHost />
  </div>
</template>
