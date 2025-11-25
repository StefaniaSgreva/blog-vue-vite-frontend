<template>
  <div class="max-w-2xl mx-auto p-8 bg-slate-900 min-h-screen">
    <h1 class="text-3xl font-extrabold text-gray-100 mb-8">Modifica articolo</h1>

    <!-- Form riutilizzabile per Edit -->
    <PostForm
      v-if="loaded"
      :loading="loading"
      :categories="categories"
      :tags="tags"
      :form="form"
      :imagePreview="imagePreview"
      edit
      @submit="handleEdit"
    />

    <div v-else class="text-gray-300">Loading...</div>
    <div v-if="error" class="mt-4 text-red-400">{{ error }}</div>
    <div v-if="success" class="mt-4 text-green-400">
        Articolo modificato con successo!!
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
import PostForm from "../components/PostForm.vue"

const route = useRoute()
const router = useRouter()

const slug = route.params.slug
const loading = ref(false)
const error = ref("")
const success = ref(false)
const loaded = ref(false)
const categories = ref([])
const tags = ref([])
const form = ref({})           // Da popolare con i dati del post
const imagePreview = ref(null) // Mostra l’immagine attuale

// Carica dati iniziali
onMounted(async () => {
  loading.value = true
  // Carica categorie/tags
  const [catRes, tagRes] = await Promise.all([
    fetch(import.meta.env.VITE_API_URL + "/categories"),
    fetch(import.meta.env.VITE_API_URL + "/tags"),
  ])
  categories.value = await catRes.json()
  tags.value = await tagRes.json()
  // Carica post attuale
  const postRes = await fetch(import.meta.env.VITE_API_URL + "/posts/" + slug)
  if (!postRes.ok) {
    error.value = "Post not found"
    loading.value = false
    return
  }
  const post = await postRes.json()
  form.value = {
    title: post.title,
    content: post.content,
    categoryId: post.category?.id || "",
    tagIds: post.tags.map(tag => tag.id),
    published: post.published,
    authorId: post.author?.id || ""
  }
  imagePreview.value = post.image ? (import.meta.env.VITE_API_URL + post.image) : null
  loaded.value = true
  loading.value = false
})

// Submit handler
async function handleEdit(data) {
  loading.value = true
  error.value = ""
  success.value = false
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/posts/" + slug, {
      method: "PUT",
      body: data, // FormData!
    })
    if (res.ok) {
      const result = await res.json()
      success.value = true
      router.push(`/posts/${result.slug}`)
    } else {
      const err = await res.json()
      error.value = err.message || "Update failed"
    }
  } catch (e) {
    error.value = "Network error"
  } finally {
    loading.value = false
  }
}
</script>
