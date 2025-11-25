<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <div>
      <label class="block text-gray-200 font-semibold">Titolo</label>
      <input v-model="form.title" required class="input" />
    </div>
    <div>
      <label class="block text-gray-200 font-semibold">Contenuto</label>
      <textarea v-model="form.content" rows="6" required class="input"></textarea>
    </div>
    <div>
      <label class="block text-gray-200 font-semibold">Categoria</label>
      <select v-model="form.categoryId" required class="input">
        <option value="" disabled>Seleziona categoria</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>
    <div>
      <label class="block text-gray-200 font-semibold">Tag</label>
      <div class="flex flex-wrap gap-2">
        <label v-for="tag in tags" :key="tag.id" class="flex items-center gap-1 text-blue-400">
          <input type="checkbox" :value="tag.id" v-model="form.tagIds" />
          {{ tag.name }}
        </label>
      </div>
    </div>
    <div>
        <label class="flex items-center gap-2 text-blue-300 font-semibold">
            <input type="checkbox" v-model="form.published" />
            Pubblica subito
        </label>
    </div>
    <div>
      <label class="block text-gray-200 font-semibold">Immagine (opzionale)</label>
      <input type="file" class="input" @change="handleFile" accept="image/*" />
    </div>
    <button
      type="submit"
      class="mt-6 bg-blue-600 py-2 px-6 rounded text-white font-bold hover:bg-blue-700"
      :disabled="loading"
    >
      {{ loading ? 'Salvataggio...' : 'Crea' }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({ loading: Boolean, categories: Array, tags: Array })
const emit = defineEmits(['submit'])

const form = ref({
  title: '',
  content: '',
  categoryId: '',
  tagIds: [],
  published: false
})
const imageFile = ref(null)

function handleFile(e) {
  imageFile.value = e.target.files[0]
}

function submitForm() {
  const formData = new FormData()
  for (const [key, value] of Object.entries(form.value)) {
    if (Array.isArray(value)) {
      value.forEach(v => formData.append(key, v))
    } else {
      formData.append(key, value)
    }
  }
  if (imageFile.value) {
    formData.append('image', imageFile.value)
  }
  emit('submit', formData)
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
