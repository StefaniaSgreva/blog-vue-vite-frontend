<template>
  <span
    class="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-sm"
    :aria-label="`Categoria: ${category.name}`"
  >
    {{ category.name }}
  </span>
</template>
<script setup>
defineProps({ category: Object })
</script>
