<template>
  <!-- Overlay modale, copre tutta la pagina -->
  <div
    v-if="open"
    class="fixed z-50 inset-0 flex justify-center items-start bg-black/40"
    aria-hidden="true"
  >
    <!-- Modale principale -->
    <div
      class="bg-slate-800 rounded-xl p-8 w-full max-w-sm shadow-lg mt-12 outline-none"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="'confirm-modal-title'"
      aria-describedby="confirm-modal-message"
      tabindex="-1"
    >
      <!-- Titolo modale, associato tramite aria-labelledby -->
      <h3 id="confirm-modal-title" class="text-lg font-bold text-white mb-4">
        {{ title }}
      </h3>
      <!-- Messaggio principale, associato tramite aria-describedby -->
      <p id="confirm-modal-message" class="mb-6 text-gray-300">{{ message }}</p>
      <!-- Messaggio di errore per screen reader -->
      <p
        v-if="error"
        class="mb-4 text-red-400 font-semibold"
        role="alert"
        aria-live="assertive"
      >{{ error }}</p>
      <div class="flex gap-4 justify-end">
        <!-- Bottone "Annulla" focus di default quando modale si apre -->
        <button
          ref="cancelBtn"
          @click="cancel"
          class="px-4 py-2 rounded bg-gray-600 text-white hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-blue-400"
        >
          Annulla
        </button>
        <!-- Bottone "Elimina", può essere disabilitato se stai cancellando -->
        <button
          @click="confirm"
          class="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800 focus-visible:ring-2 focus-visible:ring-blue-400"
          :disabled="loading"
        >
          Elimina
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {  ref, watch, onMounted, onUnmounted } from 'vue'

// Props per apertura, titolo, messaggio, errore, e stato loading (opzionale per UX)
const props = defineProps({
  open: Boolean,
  title: String,
  message: String,
  error: String,
  loading: Boolean,
})

// Eventi del componente
const emit = defineEmits(['cancel', 'confirm'])

// Ref per gestire focus
const cancelBtn = ref(null)

// Funzione chiusura modale
function cancel() { emit('cancel') }
// Funzione conferma eliminazione
function confirm() { emit('confirm') }

// Blocca lo scroll sotto la modale ed esegui focus appena aperta
watch(() => props.open, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden'
    // Focus su "Annulla" quando modale si apre
    setTimeout(() => cancelBtn.value?.focus(), 0)
  } else {
    document.body.style.overflow = ''
  }
})

// Gestione ESC per chiudere modale via tastiera
function onKeydown(e) {
  if (props.open && e.key === 'Escape') emit('cancel')
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>
