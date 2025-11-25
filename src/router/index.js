import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleShow from '../views/ArticleShow.vue' 

const routes = [
  { path: '/', component: Home },
  { path: '/posts/:slug', component: ArticleShow } 
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
