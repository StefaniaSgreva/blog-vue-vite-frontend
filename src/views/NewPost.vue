<template>
  <div class="max-w-2xl mx-auto p-8 bg-slate-900 min-h-screen">
    <h1 class="text-3xl font-extrabold text-gray-100 mb-8">
      Crea nuovo articolo
    </h1>
    <PostForm @submit="handleSubmit" :loading="loading" :categories="categories" :tags="tags"/>
    <div v-if="error" class="mt-4 text-red-400">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-400">
        Articolo creato con successo!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import PostForm from '../components/PostForm.vue'

const loading = ref(false)
const error = ref('')
const success = ref(false)
const categories = ref([])
const tags = ref([])
const router = useRouter()

// Carica categorie e tag
onMounted(async () => {
  const cRes = await fetch('http://localhost:3000/categories')
  categories.value = await cRes.json()
  const tRes = await fetch('http://localhost:3000/tags')
  tags.value = await tRes.json()
})

async function handleSubmit(data) {
  loading.value = true
  error.value = ''
  success.value = false
  try {
    const res = await fetch('http://localhost:3000/posts', {
      method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data),
    body: data, // niente JSON.stringify!
    // nessun header Content-Type, lo setta FormData
    })
    if (res.ok) {
      const result = await res.json()
      success.value = true
      // Redirect solo se published: true
      if (result.published) {
        router.push(`/posts/${result.slug}`)
      }
      // Altrimenti resta sulla pagina, messaggio successo già mostrato
    } else {
      const err = await res.json()
      error.value = err.message || 'Errore creazione post'
    }
  } catch (e) {
    error.value = 'Errore di rete'
  } finally {
    loading.value = false
  }
}
</script>
