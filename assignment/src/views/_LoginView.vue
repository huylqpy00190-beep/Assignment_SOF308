<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm">
          <h3 class="mb-3 text-center">Đăng nhập</h3>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="email" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="password" type="password" class="form-control" required />
            </div>
            <button class="btn w-100" style="background-color: #198754; color:white;">Đăng nhập</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/user'  // ✅ sửa lại đường dẫn đúng
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const userStore = useUserStore()
const router = useRouter()

const login = () => {
  // Giả lập login
  const user = {
    id: Date.now(),
    name: 'Người dùng',
    email: email.value,
    token: Math.random().toString(36).substr(2)
  }
  userStore.login(user)
  alert('Đăng nhập thành công!')
  router.push('/') // Chuyển về trang Home sau khi login
}
</script>
