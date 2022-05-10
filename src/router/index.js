import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import wallpaperBg from '@//assets/background.jpg'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { bgImage: wallpaperBg }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach(to => {
  if(to.meta && to.meta.bgImage) {
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
