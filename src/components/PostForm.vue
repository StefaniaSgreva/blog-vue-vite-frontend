<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Titolo -->
    <div>
      <label class="block text-gray-200 font-semibold">*Titolo</label>
      <input v-model="innerForm.title" required class="input" />
    </div>
    <!-- Contenuto -->
    <div>
      <label class="block text-gray-200 font-semibold">*Testo</label>
      <textarea v-model="innerForm.content" rows="6" required class="input"></textarea>
    </div>
    <!-- Categoria -->
    <div>
      <label class="block text-gray-200 font-semibold">*Categoria</label>
      <select v-model="innerForm.categoryId" required class="input">
        <option value="" disabled>Select a category</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
      </select>
    </div>
    <!-- Selezione Tags -->
    <div>
      <label class="block text-gray-200 font-semibold">*Tags (seleziona almeno un tag)</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="tag in tags" :key="tag.id" class="flex items-center gap-1 text-blue-400">
          <input type="checkbox" :value="tag.id" v-model="innerForm.tagIds" />
          {{ tag.name }}
        </label>
      </div>
      <!-- Messaggio errore obbligatorietà tag -->
      <p v-if="tagError" class="text-red-500 text-xs mt-2">Seleziona almeno un tag!</p>
    </div>
    <!-- Pubblicazione -->
    <div>
      <label class="flex items-center gap-2 text-blue-300 font-semibold">
        <input type="checkbox" v-model="innerForm.published" />
        Published
      </label>
    </div>
    <!-- Image preview corrente (solo se esiste) -->
    <div v-if="imagePreview" class="mb-3">
      <img :src="imagePreview" alt="Current cover" class="h-32 w-auto rounded mb-2" />
    </div>
    <!-- File Upload -->
    <div>
      <label class="block text-gray-200 font-semibold">Immagine (opzionale)</label>
      <input type="file" class="input" @change="handleFile" accept="image/*" />
    </div>
    <!-- Submit button -->
    <button
      type="submit"
      class="mt-6 bg-blue-600 py-2 px-6 rounded text-white font-bold hover:bg-blue-700"
      :disabled="loading"
    >
      {{ loading ? (isEdit ? 'Saving...' : 'Creating...') : (isEdit ? 'Save Changes' : 'Create') }}
    </button>
  </form>
</template>

<script setup>
// --- Importa le utility base Vue ---
import { ref, watch, computed } from 'vue'

// --- Props accettati dal componente ---
const props = defineProps({
  loading: Boolean,
  categories: Array,
  tags: Array,
  edit: Boolean,              // modalità edit
  imagePreview: String,       // anteprima immagine già presente
  form: Object                // valori iniziali del form (edit)
})

const emit = defineEmits(['submit'])

// --- Stato base del form interno ---
const defaultForm = {
  title: '',
  content: '',
  categoryId: '',
  tagIds: [],
  published: false
}

// --- Stato reattivo del form, file immagine e anteprima ---
const innerForm = ref({ ...defaultForm, ...props.form })
const imageFile = ref(null)
const imagePreview = ref(props.imagePreview || null)
const isEdit = computed(() => !!props.edit)

// --- Stato per messaggio di errore sui tag ---
const tagError = ref(false)

// --- Aggiornamento dati da prop (ri-precompila su edit) ---
watch(() => props.form, (newVal) => {
  if (newVal) innerForm.value = { ...defaultForm, ...newVal }
}, { immediate: true })

watch(() => props.imagePreview, (newVal) => {
  imagePreview.value = newVal || null
}, { immediate: true })

// --- Reset errore se selezioni almeno un tag dopo l'errore ---
watch(() => innerForm.value.tagIds, (val) => {
  if (val.length > 0) tagError.value = false
})

// --- Funzione per gestire nuovo file immagine (preview) ---
function handleFile(e) {
  imageFile.value = e.target.files[0]
  if (imageFile.value) {
    imagePreview.value = URL.createObjectURL(imageFile.value)
  }
}

// --- Reset completo del form dopo submit ---
function resetForm() {
  innerForm.value = { ...defaultForm }
  imageFile.value = null
  imagePreview.value = null
}

// --- Submit: obbligatorietà tag & invio dati ---
function submitForm() {
  // Validazione: almeno un tag selezionato
  tagError.value = innerForm.value.tagIds.length === 0
  if (tagError.value) return
  // Costruisci FormData per upload multipart/form-data
  const formData = new FormData()
  for (const [key, value] of Object.entries(innerForm.value)) {
    if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, v))
    } else {
      formData.append(key, value)
    }
  }
  if (imageFile.value) formData.append('image', imageFile.value)
  emit('submit', formData)
  resetForm()
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  margin-top: 0.25rem;
}
</style>
