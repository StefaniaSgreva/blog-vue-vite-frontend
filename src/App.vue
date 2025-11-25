<script setup>
import { onMounted } from 'vue'
// import Home from './views/Home.vue'
import Footer from './components/Footer.vue'

// All'avvio: forziamo la dark mode su <html>
onMounted(() => {
  document.documentElement.classList.add('dark')
})
</script>

<template>
  <!-- Skip-link: sempre il primo elemento! - accessibility -->
  <a href="#titolo-home" class="skip-link absolute left-2 top-2 bg-blue-700 text-white px-3 py-2 rounded focus:outline-none focus:ring transition shadow z-50">
    Salta al contenuto
  </a>

  <div>
    <!-- Navbar -->
    <nav class="flex items-center justify-between px-6 py-5 bg-slate-800 border-b border-slate-800 shadow-xl transition-all duration-300">
      <!-- Link testuale con animazione -->
      <router-link
        to="/"
        class="animated-link text-2xl font-extrabold text-blue-200 tracking-tight drop-shadow-glow animate-fade-in transition-colors"
      >
        Fullstack Stories
      </router-link>

      <!-- Bottone azione stile "Nuovo Articolo" -->
      <router-link
        to="/posts/new"
        class="btn-nuovo-articolo ml-4 font-bold flex items-center gap-2"
        aria-label="Crea un nuovo articolo"
      >
        <span class="text-xl leading-none">+</span>
        <span class="tracking-wide">Nuovo Articolo</span>
      </router-link>
    </nav>

    <main class="fade-in">
      <!-- <Home /> -->
       <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>
.drop-shadow-glow {
  filter: drop-shadow(0 0 8px #60a5fa90);
}
@keyframes fade-in {
  from { opacity: 0; transform: translateY(18px);}
  to { opacity: 1; transform: translateY(0);}
}
.fade-in {
  animation: fade-in 0.6s cubic-bezier(.6,.1,.62,1.0) both;
}
</style>
