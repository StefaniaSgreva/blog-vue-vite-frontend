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
        <LoaderSpinner />
        <span class="text-xl text-blue-200">Caricamento...</span>
      </div>
      <ArticleList
        v-else
        :posts="posts"
      />
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
import ArticleList from '../components/ArticleList.vue'
import LoaderSpinner from '../components/LoaderSpinner.vue'

const posts = ref([])
const loading = ref(false)
const currentPage = ref(1)
const totalPages = ref(1)

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
</script>
