// import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
// import LoginView from '../views/LoginView.vue'
// import RegisterView from '../views/_RegisterView.vue'
// import CreatePostView from '../views/CreatePostView.vue'
// import PostDetailView from '../views/PostDetailView.vue'
// import ProfileView from '../views/ProfileView.vue'
// import EditProfileView from '../views/EditProfileView.vue'

// const routes = [
//   { path: '/', name: 'Home', component: HomeView },
//   { path: '/login', name: 'Login', component: LoginView },
//   { path: '/register', name: 'Register', component: RegisterView },
//   { path: '/posts/create', name: 'CreatePost', component: CreatePostView, meta: { requiresAuth: true } },
//   { path: '/posts/:id', name: 'PostDetail', component: PostDetailView },
//   { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } },
//   { path: '/profile/edit', name: 'EditProfile', component: EditProfileView, meta: { requiresAuth: true } }
// ]

// const router = createRouter({
//   history: createWebHistory(),
//   routes
// })

// // Route guard cơ bản: nếu route yêu cầu auth mà chưa có token → chuyển về login
// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem('token')
//   if (to.meta.requiresAuth && !token) {
//     return next({ name: 'Login' })
//   }
//   next()
// })

// export default router
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue' // 💡 IMPORT COMPONENT AuthView MỚI
import CreatePostView from '../views/CreatePostView.vue'
import PostDetailView from '../views/PostDetailView.vue'
import ProfileView from '../views/ProfileView.vue'
import EditProfileView from '../views/EditProfileView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  
  // 💡 ROUTE MỚI CHO CẢ ĐĂNG NHẬP VÀ ĐĂNG KÝ
  { path: '/auth', name: 'Auth', component: AuthView }, 
  
  // Tùy chọn: Chuyển hướng các URL cũ về /auth
  { path: '/login', redirect: '/auth' },
  { path: '/register', redirect: '/auth' },

  { path: '/posts/create', name: 'CreatePost', component: CreatePostView, meta: { requiresAuth: true } },
  { path: '/posts/:id', name: 'PostDetail', component: PostDetailView },
  { path: '/profile', name: 'Profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/profile/edit', name: 'EditProfile', component: EditProfileView, meta: { requiresAuth: true } }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard cơ bản: nếu route yêu cầu auth mà chưa có token → chuyển về login
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  
  // 💡 Thay đổi điều hướng về route 'Auth' mới
  if (to.meta.requiresAuth && !token) {
    return next({ name: 'Auth' }) 
  }
  
  // Nếu người dùng đã đăng nhập và cố truy cập trang /auth, chuyển họ về trang chủ
  if ((to.name === 'Auth' || to.path === '/login' || to.path === '/register') && token) {
      return next({ name: 'Home' })
  }
  
  next()
})

export default router;