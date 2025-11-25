<template>
  <span class="ml-2 flex items-center text-xs text-gray-400" :aria-label="`Autore: ${author.name}`">
    <span class="inline-flex items-center justify-center bg-blue-950 h-7 w-7 rounded-full mr-1 text-blue-300 font-bold uppercase border border-blue-600">
      {{ initials(author.name) }}
    </span>
    <span>{{ author.name }}</span>
  </span>
</template>

<script setup>
defineProps({ author: Object })
function initials(name = "") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}
</script>
