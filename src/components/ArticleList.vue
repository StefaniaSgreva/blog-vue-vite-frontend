<template>
  <div
      class="grid gap-6 sm:grid-cols-1 md:grid-cols-2"
      role="list"
      aria-live="polite"
      aria-atomic="true"
      aria-relevant="additions removals"
    >
      <!-- Modale Conferma Eliminazione -->
    <ConfirmModal
      :open="showDeleteModal"
      title="Elimina articolo"
      message="Sei sicuro di voler eliminare questo articolo? L’operazione è irreversibile!"
      :error="errorMsg"
      :loading="deleting"
      @cancel="showDeleteModal = false"
      @confirm="confirmDelete"
    />

    <!-- CARDS -->
    <ArticleCard
      v-for="post in localPosts"
      :key="post.id"
      :post="post"
      @ask-delete="askDelete"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import ArticleCard from './ArticleCard.vue'
import ConfirmModal from './ConfirmModal.vue'

// Props ricevuta dal parent (posts da mostrare)
const props = defineProps({
  posts: {
    type: Array,
    default: () => []
  }
})

// Gestione modale di conferma
const showDeleteModal = ref(false)      // Stato apertura modale
const pendingDeleteSlug = ref(null)     // Slug del post da cancellare
const deleting = ref(false)             // Stato loading durante la cancellazione
const errorMsg = ref('')                // Eventuale messaggio errore

// lista locale reattiva, parte vuota
const localPosts = ref([])

// sincronizza SEMPRE localPosts con la prop posts (anche al mount)
watch(
  () => props.posts,
  (newPosts) => {
    localPosts.value = Array.isArray(newPosts) ? [...newPosts] : []
  },
  { immediate: true }
)

// Quando utente clicca su "elimina", salva lo slug e apri la modale
function askDelete(slug) {
  pendingDeleteSlug.value = slug
  showDeleteModal.value = true
  errorMsg.value = ''
}

// Quando utente conferma la cancellazione
async function confirmDelete() {
  if (!pendingDeleteSlug.value) return
  deleting.value = true
  errorMsg.value = ''
  try {
    // Chiamata DELETE all'API con lo slug selezionato
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${pendingDeleteSlug.value}`,
      { method: 'DELETE' }
    )
    if (!res.ok) throw new Error('Errore durante la cancellazione')

    // rimuovi il post eliminato dalla lista locale
    const idx = localPosts.value.findIndex(
      p => p.slug === pendingDeleteSlug.value
    )
    if (idx !== -1) localPosts.value.splice(idx, 1)

    showDeleteModal.value = false
    pendingDeleteSlug.value = null
  } catch (err) {
    // Mostra errore (resta sulla modale)
    errorMsg.value = err.message || 'Errore sconosciuto'
  } finally {
    deleting.value = false
  }
}
</script>

