<template>
  <div class="mt-6 flex flex-wrap gap-2" aria-label="Tag articolo">
    <span
      v-for="tag in tags"
      :key="tag.id"
      class="px-2 py-1 bg-blue-950 text-blue-400 text-xs rounded-full border border-blue-600 font-medium"
      :aria-label="`Tag: ${tag.name}`"
    >#{{ tag.name }}</span>
  </div>
</template>
<script setup>
defineProps({ tags: Array })
</script>
