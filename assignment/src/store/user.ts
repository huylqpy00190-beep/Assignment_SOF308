import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  token: string
  password?: string // Thêm password để phục vụ việc xác thực
  avatarUrl?: string
}

// Hàm tải danh sách user từ localStorage
const loadUsers = (): User[] => {
  const savedUsers = localStorage.getItem('registeredUsers')
  return savedUsers ? JSON.parse(savedUsers) : []
}

// Hàm lưu danh sách user vào localStorage
const saveUsers = (users: User[]) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users))
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null') as User | null,
    users: loadUsers() as User[] // 💡 DANH SÁCH TẤT CẢ NGƯỜI DÙNG
  }),

  actions: {
    // 💡 HÀNH ĐỘNG MỚI: Đăng ký người dùng mới
    registerUser(newUser: User) {
      if (this.users.some(u => u.email === newUser.email)) {
        return false // Email đã tồn tại
      }
      this.users.push(newUser)
      saveUsers(this.users)
      return true // Đăng ký thành công
    },
    
    // Đăng nhập + lưu vào localStorage
    login(user: User) {
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user))
      localStorage.setItem('token', user.token)
    },

    // Đăng xuất + xoá localStorage
    logout() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
      localStorage.removeItem('token')
    },

    // Cập nhật thông tin người dùng
    updateUser(user: Partial<User>) {
      if (!this.currentUser) return
      
      // 1. Cập nhật currentUser
      this.currentUser = { ...this.currentUser, ...user }
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
      
      // 2. Cập nhật trong danh sách users để duy trì sự thay đổi
      const index = this.users.findIndex(u => u.id === this.currentUser!.id)
      if (index !== -1) {
          this.users[index] = this.currentUser
          saveUsers(this.users)
      }
    }
  }
});