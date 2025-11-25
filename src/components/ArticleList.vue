<template>
  <div
    class="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
    aria-live="polite"
    aria-atomic="true"
    aria-relevant="additions removals"
  >
    <ArticleCard
      v-for="post in posts"
      :key="post.id"
      :post="post"
    />
  </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue'
defineProps({ posts: Array })
</script>
