<template>
  <div class="min-h-screen transition-colors duration-300 bg-slate-900">
    <section class="max-w-5xl mx-auto px-4 py-12" aria-labelledby="titolo-home">
      <header class="mb-8">
        <h1 id="titolo-home" class="text-4xl font-extrabold text-gray-100 mb-3 tracking-tight">
          Esplora gli ultimi <span class="text-blue-400">Articoli</span>
        </h1>
        <p class="text-gray-400 text-lg">
          Gli ultimi post della redazione, tra novità tecniche e cultura digitale.
        </p>
      </header>
      <div v-if="loading" class="flex justify-center items-center py-20" role="status" aria-live="polite">
        <svg class="animate-spin w-8 h-8 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          ircle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-xl text-blue-200">Caricamento...</span>
      </div>
      <div
        v-else
        class="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
        aria-live="polite"
        aria-atomic="true"
        aria-relevant="additions removals"
      >
      <router-link
        v-for="post in posts"
        :key="post.id"
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
                  {{ authorInitials(post.author.name) }}</span>
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
      </div>
      <Pagination
        :currentPage="currentPage"
        :totalPages="totalPages"
        :onPageChange="fetchPosts"
      />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Pagination from '../components/Pagination.vue'

const posts = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}
function authorInitials(name = "") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}

async function fetchPosts(page = 1) {
  loading.value = true
  try {
    const res = await fetch(`http://localhost:3000/posts?published=true&page=${page}&limit=10`)
    const result = await res.json()
    posts.value = result.data
    currentPage.value = result.page
    totalPages.value = result.totalPages
  } catch (e) {
    console.error('Errore nel caricamento post:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => fetchPosts())
// onMounted(async () => {
//   await fetchPosts();
//   console.log(posts.value[0]); // <-- qui vedi tutte le proprietà di un post
// });

</script>

<style>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
