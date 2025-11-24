<script setup>
const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  onPageChange: { type: Function, required: true }
});

function goTo(page) {
  if (page !== props.currentPage && page >= 1 && page <= props.totalPages) {
    props.onPageChange(page);
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="flex items-center justify-center mt-8">
    <nav class="flex gap-2">
      <button
        @click="goTo(currentPage - 1)"
        :disabled="currentPage <= 1"
        class="h-8 w-8 flex items-center justify-center rounded hover:bg-blue-800 transition disabled:opacity-30 disabled:cursor-not-allowed bg-blue-950 text-blue-300"
        aria-label="Prev"
        title="Precedente"
      >&#8592;</button>
      <template v-for="page in totalPages" :key="page">
        <button
          @click="goTo(page)"
          :class="[
            'h-8 w-8 flex items-center justify-center rounded text-sm font-medium transition',
            page === currentPage 
              ? 'bg-blue-500 text-white pointer-events-none'
              : 'bg-blue-900 text-blue-200 hover:bg-blue-700'
          ]"
          :aria-current="page === currentPage ? 'page' : undefined"
        >{{ page }}</button>
      </template>
      <button
        @click="goTo(currentPage + 1)"
        :disabled="currentPage >= totalPages"
        class="h-8 w-8 flex items-center justify-center rounded hover:bg-blue-800 transition disabled:opacity-30 disabled:cursor-not-allowed bg-blue-950 text-blue-300"
        aria-label="Next"
        title="Successiva"
      >&#8594;</button>
    </nav>
  </div>
</template>
