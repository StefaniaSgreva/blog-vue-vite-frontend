import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ArticleShow from '../views/ArticleShow.vue' 
import NewPost from '../views/NewPost.vue'
import EditPost from '../views/EditPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts/:slug', component: ArticleShow },
  { path: '/posts/new', name: 'NewPost', component: NewPost },
  { path: '/posts/:slug/edit', name: 'EditPost', component: EditPost },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
