<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm">
          <h3 class="mb-3 text-center">Đăng ký</h3>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Tên</label>
              <input v-model="name" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" required />
            </div>
            <button class="btn w-100" style="background-color: #198754; color:white;">Đăng ký</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/user'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const register = () => {
  const user = { id: Date.now(), name: name.value, email: email.value, token: Math.random().toString(36).substr(2) }
  userStore.login(user)
  alert('Đăng ký thành công!')
  router.push('/')
}
</script>
