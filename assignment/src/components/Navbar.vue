<template>
  <nav class="navbar navbar-expand-lg" style="background-color: #198754;">
    <div class="container">
      <router-link class="navbar-brand text-white fw-bold" to="/">VueBlog</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
        aria-controls="navmenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/">Home</router-link>
          </li>
          
          <li class="nav-item" v-if="userStore.currentUser">
            <router-link class="nav-link text-white" to="/posts/create">Tạo bài</router-link>
          </li>
          <li class="nav-item" v-if="userStore.currentUser">
            <router-link class="nav-link text-white" to="/profile">Profile</router-link>
          </li>
          
          <li class="nav-item" v-if="!userStore.currentUser">
            <router-link class="nav-link text-white" to="/auth">Đăng nhập</router-link>
          </li>
          <li class="nav-item dropdown" v-if="userStore.currentUser">
            <a
              class="nav-link dropdown-toggle text-white"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              {{ userStore.currentUser.name }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <button class="dropdown-item" @click="logout">Đăng xuất</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const logout = () => {
  userStore.logout()
  alert('Đăng xuất thành công!')
  router.push('/') // Quay về Home
}
</script>

<style scoped>
.navbar-toggler-icon {
  filter: invert(1); /* Đổi màu icon cho navbar xanh lá */
}
</style>