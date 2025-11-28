<template>
  <div class="container mt-5">
    <div class="card shadow-sm p-4" style="background-color: #d4edda;">
      <h3 class="mb-3">Thông tin cá nhân</h3>

      <div class="text-center mb-3">
        <img
          :src="user.avatarUrl || 'https://via.placeholder.com/150'"
          class="rounded-circle shadow-sm"
          style="width: 150px; height: 150px; object-fit: cover;"
          alt="avatar"
        />
      </div>

      <p><strong>Tên:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>

      <div class="text-center mt-3">
        <router-link class="btn btn-success me-3" :to="{ name: 'EditProfile' }">
          Chỉnh sửa thông tin
        </router-link>
        
        <button class="btn btn-danger" @click="handleDeleteAllPosts">
          <i class="fa fa-trash-alt"></i> Xóa TẤT CẢ Bài Viết
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../store/user'
import { usePostStore } from '../store/posts' // 💡 Import Post Store
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const postStore = usePostStore() // 💡 Khởi tạo Post Store
const router = useRouter()

// Guard: Chuyển hướng nếu chưa đăng nhập
if (!userStore.currentUser) {
  alert('Vui lòng đăng nhập để xem thông tin cá nhân!')
  router.push('/login')
}

// User data
const user = userStore.currentUser! // Dùng '!' vì đã có guard kiểm tra

/**
 * Xử lý sự kiện Xóa TẤT CẢ Bài viết.
 * Yêu cầu xác nhận và sau đó gọi action trong store.
 */
const handleDeleteAllPosts = () => {
  // Yêu cầu xác nhận từ người dùng
  const confirmDeletion = confirm(
    'CẢNH BÁO NGUY HIỂM: Bạn có chắc chắn muốn xóa TẤT CẢ bài viết? Hành động này không thể hoàn tác và sẽ xóa khỏi LocalStorage.'
  )

  if (confirmDeletion) {
    postStore.deleteAllPosts()
    alert('Đã xóa tất cả bài viết thành công.')
    // Tùy chọn: Làm mới trang hoặc chuyển hướng để cập nhật giao diện
    router.push({ name: 'Home' })
  }
}
</script>