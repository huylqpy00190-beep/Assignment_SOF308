<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card p-4 shadow-sm" :style="{ backgroundColor: isLoginMode ? '#d4edda' : '#f8d7da' }">
          
          <div class="text-center mb-4">
            <button 
              :class="['btn me-2', isLoginMode ? 'btn-success' : 'btn-outline-success']"
              @click="isLoginMode = true"
            >
              Đăng nhập
            </button>
            <button 
              :class="['btn', !isLoginMode ? 'btn-danger' : 'btn-outline-danger']"
              @click="isLoginMode = false"
            >
              Đăng ký
            </button>
          </div>
          
          <h3 class="mb-3 text-center">{{ isLoginMode ? 'Đăng nhập' : 'Đăng ký tài khoản mới' }}</h3>

          <form v-if="isLoginMode" @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="loginEmail" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="loginPassword" type="password" class="form-control" required />
            </div>
            <button class="btn w-100" style="background-color: #198754; color:white;">Đăng nhập</button>
          </form>

          <form v-else @submit.prevent="register">
            <div class="mb-3">
              <label class="form-label">Tên</label>
              <input v-model="registerName" type="text" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input v-model="registerEmail" type="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Mật khẩu</label>
              <input v-model="registerPassword" type="password" class="form-control" required />
            </div>
            <button class="btn w-100" style="background-color: #dc3545; color:white;">Đăng ký</button>
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

const userStore = useUserStore()
const router = useRouter()

// Trạng thái chuyển đổi: Mặc định là Đăng nhập (true)
const isLoginMode = ref(true) 

// --- STATE CHO ĐĂNG NHẬP ---
const loginEmail = ref('')
const loginPassword = ref('')

// --- STATE CHO ĐĂNG KÝ ---
const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

// --- LOGIC ĐĂNG NHẬP (ĐÃ CẬP NHẬT) ---
const login = () => {
  const foundUser = userStore.users.find(
    u => u.email === loginEmail.value && u.password === loginPassword.value
  )

  if (foundUser) {
    // Tạo token giả để lưu vào localStorage cho Route Guard
    const userToken = `token-${foundUser.id}-${Date.now()}` 
    
    // Đăng nhập thành công và lưu vào store/localStorage
    userStore.login({
        ...foundUser,
        token: userToken // Gán token mới
    })
    
    alert(`Đăng nhập thành công! Chào mừng ${foundUser.name}.`)
    router.push('/')
  } else {
    alert('Email hoặc mật khẩu không đúng.')
  }
}

// --- LOGIC ĐĂNG KÝ (ĐÃ CẬP NHẬT) ---
const register = () => {
  if (!registerName.value || !registerEmail.value || !registerPassword.value) {
    alert('Vui lòng điền đầy đủ thông tin.')
    return
  }

  const newUser = {
    id: Date.now(), // ID duy nhất
    name: registerName.value,
    email: registerEmail.value,
    password: registerPassword.value, // Lưu mật khẩu (chỉ dùng cho mục đích demo)
    token: '', // Token sẽ được tạo khi đăng nhập
    avatarUrl: ''
  }
  
  const success = userStore.registerUser(newUser)

  if (success) {
    alert(`Đăng ký thành công cho ${registerName.value}! Vui lòng đăng nhập.`)
    
    // Chuyển về chế độ đăng nhập sau khi đăng ký thành công
    isLoginMode.value = true
    loginEmail.value = registerEmail.value // Điền sẵn email đã đăng ký
    
    // Reset form đăng ký
    registerName.value = ''
    registerEmail.value = ''
    registerPassword.value = ''
  } else {
    alert('Email này đã được sử dụng. Vui lòng thử email khác.')
  }
}
</script>