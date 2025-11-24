<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  onPageChange: { type: Function, required: true }
})

function goTo(page) {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    props.onPageChange(page)
  }
}
</script>

<template>
<nav
  class="my-8 flex justify-center items-center select-none"
  role="navigation"
  aria-label="Navigazione pagine articoli"
>
  <ul class="flex flex-wrap items-center gap-1 p-0 m-0 list-none">
    <li>
      <button
        @click="goTo(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="h-8 w-8 flex items-center justify-center rounded text-xs md:text-sm bg-blue-850 text-blue-200 hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Pagina precedente"
      >
        <span aria-hidden="true">&#8592;</span>
      </button>
    </li>
    <li v-for="page in totalPages" :key="page">
      <button
        @click="goTo(page)"
        :class="[
          'h-8 w-8 flex items-center justify-center rounded text-xs md:text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400',
          page === currentPage
            ? 'bg-blue-400 text-white pointer-events-none'
            : 'bg-blue-900 text-blue-200 hover:bg-blue-700'
        ]"
        :aria-current="page === currentPage ? 'page' : undefined"
        :tabindex="page === currentPage ? '-1' : '0'"
      >
        {{ page }}
      </button>
    </li>
    <li>
      <button
        @click="goTo(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="h-8 w-8 flex items-center justify-center rounded text-xs md:text-sm bg-blue-850 text-blue-200 hover:bg-blue-700 active:bg-blue-800 transition disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        aria-label="Pagina successiva"
      >
        <span aria-hidden="true">&#8594;</span>
      </button>
    </li>
  </ul>
</nav>
</template>
