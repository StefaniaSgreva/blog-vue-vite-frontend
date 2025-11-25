<template>
  <div class="relative">
    <!-- ICONA MODIFICA -->
    <router-link
      :to="`/posts/${post.slug}/edit`"
      class="absolute top-3 right-3 p-2 z-10 bg-slate-800/90 rounded-full hover:bg-blue-600 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"      
      :aria-label="`Modifica articolo: ${post.title}`"
      @click.stop
      tabindex="0"
      style="box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    >
      <!-- ICONA MODIFICA - SVG Personalizzata -->
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-blue-300" aria-hidden="true" focusable="false">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16.862 5.087A2 2 0 0120 8.226l-9.193 9.194a2 2 0 01-.729.482l-4.346 1.482 1.481-4.346a2 2 0 01.482-.73l9.195-9.19zM19.428 4.572a2.286 2.286 0 00-3.236 0l-1.372 1.37 3.236 3.237 1.372-1.37a2.286 2.286 0 000-3.237z" />
      </svg>
    </router-link>

    <!-- Pulsante Elimina -->
    <button
      @click.stop.prevent="deletePost(post.slug)"
      class="absolute top-3 right-14 p-2 z-10 bg-red-700/90 rounded-full hover:bg-red-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
      :aria-label="`Elimina articolo: ${post.title}`"
      tabindex="0"
      style="box-shadow: 0 2px 8px rgba(0,0,0,0.1);"
    >
      <!-- SVG icona cestino -->
       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-5 h-5 text-red-300" aria-hidden="true" focusable="false">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4"/>
      </svg>
    </button>

    <!-- CARD -->
    <router-link
      :to="`/posts/${post.slug}`"
      class="bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-200 group flex flex-col overflow-hidden border border-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
      tabindex="0"
      style="text-decoration: none;"
      :aria-labelledby="`post-title-${post.id}`"
    >
      <article>
      <img
        :src="post.image ? (apiBaseUrl + post.image) : '/img/placeholder.webp'" 
        :alt="post.image ? `Copertina dell'articolo: ${post.title}` : 'Immagine di copertina generica articolo'"
        class="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-200"
        loading="lazy"
      />
        <div class="p-6 flex flex-col flex-1">
          <div class="flex flex-wrap items-center gap-2 mb-3">
            <span
              v-if="post.category"
              class="inline-block bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-xs px-3 py-1 rounded-full uppercase tracking-wide shadow-sm"
              :aria-label="`Categoria: ${post.category.name}`"
            >{{ post.category.name }}</span>
            <span v-if="post.author" class="ml-auto flex items-center gap-1 text-xs text-gray-400">
              <span class="inline-flex items-center justify-center bg-blue-950 h-7 w-7 rounded-full mr-1 text-blue-300 font-bold uppercase border border-blue-600" :aria-label="`Autore: ${post.author.name}`">
                {{ authorInitials(post.author.name) }}
              </span>
              <span>{{ post.author.name }}</span>
            </span>
          </div>
          <h2
            class="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors duration-150"
            :id="`post-title-${post.id}`"
            tabindex="0"
          >
            {{ post.title }}
          </h2>
          <p class="text-gray-300 mb-3 line-clamp-3">{{ post.content }}</p>
          <div class="flex flex-wrap gap-2 mb-4" aria-label="Tag articolo">
            <span
              v-for="tag in post.tags"
              :key="tag.id"
              class="px-2 py-1 bg-blue-950 text-blue-400 text-xs rounded-full border border-blue-600 font-medium"
              :aria-label="`Tag: ${tag.name}`"
            >#{{ tag.name }}</span>
          </div>
          <div class="text-xs text-gray-500 mt-auto">
            Pubblicato il <time :dateTime="post.createdAt">{{ formatDate(post.createdAt) }}</time>
          </div>
        </div>
      </article>
    </router-link>
  </div>
</template>

<script setup>
const apiBaseUrl = import.meta.env.VITE_API_URL

defineProps({ post: Object })
function authorInitials(name = "") {
  return name.split(' ').map(part => part[0]).join('').toUpperCase()
}
function formatDate(dateStr) {
  const dt = new Date(dateStr)
  return dt.toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function deletePost(slug) {
  if (!confirm(`Sei sicuro di voler eliminare l'articolo "${slug}"?`)) return;
  try {
    const res = await fetch(`${apiBaseUrl}/posts/${slug}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Errore durante la cancellazione');
    
    alert('Articolo eliminato con successo');
    // Ricarica la pagina per aggiornare la lista post
    window.location.reload();
  } catch (err) {
    alert(`Errore: ${err.message}`);
  }
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(1.5em * 3); /* assicura spazio a 3 righe */
}

</style>
