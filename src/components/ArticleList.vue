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
import { ref } from 'vue'
import ArticleCard from './ArticleCard.vue'
import ConfirmModal from './ConfirmModal.vue'

const props = defineProps({ posts: Array })
const emits = defineEmits(['update:posts'])

const showDeleteModal = ref(false)
const pendingDeleteSlug = ref(null)
const deleting = ref(false)
const errorMsg = ref('')

// local copy reattiva dei posts per modificarla internamente
const localPosts = ref([...props.posts])

function askDelete(slug) {
  pendingDeleteSlug.value = slug
  showDeleteModal.value = true
  errorMsg.value = ''
}

async function confirmDelete() {
  if (!pendingDeleteSlug.value) return
  deleting.value = true
  errorMsg.value = ''
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/posts/${pendingDeleteSlug.value}`,
      { method: 'DELETE' }
    )
    if (!res.ok) throw new Error('Errore durante la cancellazione')

    // Aggiorna la lista locale senza reloadare
    const idx = localPosts.value.findIndex(
      p => p.slug === pendingDeleteSlug.value
    )
    if (idx !== -1) localPosts.value.splice(idx, 1)

    // Chiudi la modale e reset slug
    showDeleteModal.value = false
    pendingDeleteSlug.value = null

  } catch(err) {
    // La modale rimane aperta e mostra l'errore
    errorMsg.value = err.message || 'Errore sconosciuto'
  } finally {
    deleting.value = false
  }

}
</script>
