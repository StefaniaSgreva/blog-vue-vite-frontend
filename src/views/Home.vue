<template>
  <div class="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
    <section class="max-w-5xl mx-auto px-4 py-12">
      <h1 class="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">
        Esplora gli ultimi <span class="text-blue-600 dark:text-blue-400">Articoli</span>
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mb-12 text-lg">
        Gli ultimi post della redazione, tra novità tecniche e cultura digitale.
      </p>

      <div v-if="loading" class="flex justify-center items-center py-20">
        <svg class="animate-spin w-8 h-8 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
        </svg>
        <span class="text-xl text-blue-200">Caricamento...</span>
      </div>

      <div v-else class="grid md:grid-cols-2 gap-8">
        <article
          v-for="post in posts"
          :key="post.id"
          class="bg-white dark:bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 group flex flex-col overflow-hidden border border-slate-200 dark:border-slate-700"
        >
          <img
            v-if="post.image"
            :src="post.image"
            alt="Immagine copertina"
            class="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
            loading="lazy"
          />
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-2 mb-3">
              <span
                v-if="post.category"
                class="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-sm"
              >{{ post.category.name }}</span>
              <span v-if="post.author" class="ml-auto flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                <span class="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-950 h-7 w-7 rounded-full mr-1 text-blue-700 dark:text-blue-300 font-bold uppercase border border-blue-600">
                  {{ authorInitials(post.author.name) }}</span>
                <span>{{ post.author.name }}</span>
              </span>
            </div>
            <h2 class="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-150">
              {{ post.title }}
            </h2>
            <p class="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">{{ post.content }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in post.tags"
                :key="tag.id"
                class="px-2 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs rounded-full border border-blue-200 dark:border-blue-600 font-medium"
              >#{{ tag.name }}</span>
            </div>
            <div class="text-xs text-gray-400 dark:text-gray-500 mt-auto">
              Pubblicato il {{ formatDate(post.createdAt) }}
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)

function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}
function authorInitials(name="") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/posts?published=true&page=1&limit=10')
    const result = await res.json()
    posts.value = result.data
  } catch (e) {
    console.error('Errore nel caricamento post:', e)
  } finally {
    loading.value = false
  }
})
</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
