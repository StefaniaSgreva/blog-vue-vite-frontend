<template>
  <div class="min-h-screen transition-colors duration-300 bg-slate-900">
    <section class="max-w-3xl mx-auto px-4 py-10" v-if="article" aria-labelledby="article-title">
      <header class="mb-6">
        <h1 id="article-title" class="text-3xl font-extrabold text-gray-100 mb-3 tracking-tight">
          {{ article.title }}
        </h1>
        <div class="flex flex-wrap gap-2 items-center text-xs text-gray-400">
          <span
            v-if="article.category"
            class="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-sm"
            :aria-label="`Categoria: ${article.category.name}`"
          >{{ article.category.name }}</span>
          <span
            v-if="article.author"
            class="ml-2 flex items-center"
            :aria-label="`Autore: ${article.author.name}`"
          >
            <span class="inline-flex items-center justify-center bg-blue-950 h-7 w-7 rounded-full mr-1 text-blue-300 font-bold uppercase border border-blue-600">
              {{ authorInitials(article.author.name) }}
            </span>
            <span>{{ article.author.name }}</span>
          </span>
          <time class="ml-3" :dateTime="article.createdAt">
            {{ formatDate(article.createdAt) }}
          </time>
        </div>
      </header>
      <img
        :src="article.image || '/img/placeholder.webp'"
        :alt="article.image ? `Copertina dell'articolo: ${article.title}` : 'Immagine di copertina generica articolo'"
        class="w-full rounded-xl shadow mb-8"
        loading="lazy"
      />
      <article class="prose prose-invert max-w-none text-gray-100">
        <p>{{ article.content }}</p>
      </article>
      <div class="mt-6 flex flex-wrap gap-2" aria-label="Tag articolo">
        <span
          v-for="tag in article.tags"
          :key="tag.id"
          class="px-2 py-1 bg-blue-950 text-blue-400 text-xs rounded-full border border-blue-600 font-medium"
          :aria-label="`Tag: ${tag.name}`"
        >#{{ tag.name }}</span>
      </div>
      <router-link
        class="mt-10 inline-block text-blue-400 underline hover:text-blue-200 font-semibold transition"
        to="/"
      >← Torna agli articoli</router-link>
    </section>
    <section v-else class="flex items-center justify-center min-h-[60vh]">
      <div>
        <h2 class="text-xl text-gray-200 mb-4">Articolo non trovato</h2>
        <router-link class="text-blue-400 underline hover:text-blue-200" to="/">Torna alla Home</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const article = ref(null)

async function fetchArticle(slug) {
  try {
    const res = await fetch(`http://localhost:3000/posts/${slug}`)
    const result = await res.json()
    console.log("API result:", result) 
    article.value = result.data || result // alcune API inviano "data", altre il post direttamente
  } catch (e) {
    article.value = null
  }
}


function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}
function authorInitials(name = "") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}

onMounted(() => fetchArticle(route.params.slug))
</script>
