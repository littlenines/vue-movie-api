import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wallpaperBg from '@//assets/background.jpg'
import { getSession } from '@/utils/sessionStorage'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { bgImage: wallpaperBg }
  },
  {
    path: '/movies',
    name: 'movies',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/MovieView.vue')
  },
  {
    path: '/imdb/:id',
    name: 'MovieImdb',
    meta: {
      requiresAuth: true
    },
    component: () => import('../views/ImdbView.vue')
  },
  {
    path: "/:catchAll(.*)",
    component: () => import('@/components/PageNotFound')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!getSession()) {
      next({ name: 'home' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach(to => {
  if (to.meta && to.meta.bgImage) {
    document.documentElement.style.backgroundImage = `url(${to.meta.bgImage})`;
    document.documentElement.style.backgroundRepeat = "no-repeat";
    document.documentElement.style.backgroundPosition = "center";
    document.documentElement.style.backgroundSize = "cover";
    document.documentElement.style.backgroundAttachment = "fixed";
  } else {
    document.documentElement.style.backgroundRepeat = "";
    document.documentElement.style.backgroundSize = "";
    document.documentElement.style.backgroundPosition = "";
    document.documentElement.style.backgroundImage = "";
    document.documentElement.style.backgroundAttachment = "";
  }
})

export default router
