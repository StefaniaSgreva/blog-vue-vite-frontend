<template>
  <router-link
    :to="`/posts/${post.slug}`"
    class="bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 group flex flex-col overflow-hidden border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
    tabindex="0"
    style="text-decoration: none;"
    :aria-labelledby="`post-title-${post.id}`"
  >
    <article>
      <img
        :src="post.image || '/img/placeholder.webp'"
        :alt="post.image ? `Copertina dell'articolo: ${post.title}` : 'Immagine di copertina generica articolo'"
        class="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
        loading="lazy"
      />
      <div class="p-6 flex flex-col flex-1">
        <div class="flex flex-wrap items-center gap-2 mb-3">
          <span
            v-if="post.category"
            class="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-sm"
            :aria-label="`Categoria: ${post.category.name}`"
          >{{ post.category.name }}</span>
          <span v-if="post.author" class="ml-auto flex items-center gap-1 text-xs text-gray-400">
            <span class="inline-flex items-center justify-center bg-blue-950 h-7 w-7 rounded-full mr-1 text-blue-300 font-bold uppercase border border-blue-600" :aria-label="`Autore: ${post.author.name}`">
              {{ authorInitials(post.author.name) }}
            </span>
            <span>{{ post.author.name }}</span>
          </span>
        </div>
        <h2
          class="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-150"
          :id="`post-title-${post.id}`"
          tabindex="0"
        >
          {{ post.title }}
        </h2>
        <p class="text-gray-300 mb-3 line-clamp-3">{{ post.content }}</p>
        <div class="flex flex-wrap gap-2 mb-4" aria-label="Tag articolo">
          <span
            v-for="tag in post.tags"
            :key="tag.id"
            class="px-2 py-1 bg-blue-950 text-blue-400 text-xs rounded-full border border-blue-600 font-medium"
            :aria-label="`Tag: ${tag.name}`"
          >#{{ tag.name }}</span>
        </div>
        <div class="text-xs text-gray-500 mt-auto">
          Pubblicato il <time :dateTime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
        </div>
      </div>
    </article>
  </router-link>
</template>

<script setup>
defineProps({ post: Object })
function authorInitials(name = "") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}
function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
