<template>
  <div class="min-h-screen transition-colors duration-300 bg-slate-900">
    <section class="max-w-3xl mx-auto px-4 py-10" v-if="article" aria-labelledby="article-title">
      <header class="mb-6">
        <h1 id="article-title" class="text-3xl font-extrabold text-gray-100 mb-3 tracking-tight">
          {{ article.title }}
        </h1>
        <div class="flex flex-wrap gap-2 items-center text-xs text-gray-400">
          <CategoryBadge v-if="article.category" :category="article.category" />
          <AuthorBadge v-if="article.author" :author="article.author" />
          <time class="ml-3" :dateTime="article.createdAt">
            {{ formatDate(article.createdAt) }}
          </time>
        </div>
      </header>
      <img
        :src="article.image ? (apiBaseUrl + article.image) : '/img/placeholder.webp'" 
        :alt="article.image ? `Copertina dell'articolo: ${article.title}` : 'Immagine di copertina generica articolo'"
        class="w-full rounded-xl shadow mb-8"
        loading="lazy"
      />
      <article class="prose prose-invert max-w-none text-gray-100">
        <p>{{ article.content }}</p>
      </article>
      <TagList :tags="article.tags" />
      <router-link
        class="mt-10 inline-block text-blue-400 underline hover:text-blue-200 font-semibold transition"
        to="/"
      >← Torna agli articoli</router-link>
    </section>
    <ArticleNotFound v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CategoryBadge from '../components/CategoryBadge.vue'
import AuthorBadge from '../components/AuthorBadge.vue'
import TagList from '../components/TagList.vue'
import ArticleNotFound from '../components/ArticleNotFound.vue'

const route = useRoute()
const article = ref(null)
const apiBaseUrl = import.meta.env.VITE_API_URL

function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function fetchArticle(slug) {
  try {
    const res = await fetch(`http://localhost:3000/posts/${slug}`)
    const result = await res.json()
    article.value = result.data || result
  } catch (e) {
    article.value = null
  }
}

onMounted(() => fetchArticle(route.params.slug))
</script>
