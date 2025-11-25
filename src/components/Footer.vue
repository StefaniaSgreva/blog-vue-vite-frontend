<template>
  <footer
    class="mt-16 bg-slate-800 text-gray-400 py-8 w-full border-t border-slate-700 flex flex-col items-center"
    role="contentinfo"
  >
    <div class="max-w-5xl w-full px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <span class="text-center sm:text-left text-sm">
        &copy; {{ new Date().getFullYear() }} Fullstack Stories – All rights reserved.
      </span>
      <nav
        class="flex gap-3 justify-center sm:justify-end"
        aria-label="Link utili"
      >
        <a href="#" target="_blank" rel="noopener" class="hover:text-blue-400 underline transition">
          GitHub
        </a>
        <a href="#" class="hover:text-blue-400 underline transition">
          Privacy
        </a>
        <a href="#" class="hover:text-blue-400 underline transition">
          Contatti
        </a>
      </nav>
    </div>
  </footer>
</template>
