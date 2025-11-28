import { defineStore } from 'pinia'

interface Comment {
  user: string
  content: string
  createdAt: string
}

interface Post {
  id: number
  title: string
  content: string
  author: string
  authorId: number        // thêm để xác định quyền tác giả
  createdAt: string
  imageUrl?: string
  comments: Comment[]
}

export const usePostStore = defineStore('posts', {
  state: () => ({
    posts: [] as Post[]
  }),
  actions: {
    loadPosts() {
      const savedPosts = localStorage.getItem('posts')
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts)
      }
    },
    savePosts() {
      localStorage.setItem('posts', JSON.stringify(this.posts))
    },
    addPost(post: Post) {
      this.posts.push(post)
      this.savePosts()
    },
    editPost(postId: number, updated: Partial<Post>) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        Object.assign(post, updated)
        this.savePosts()
      }
    },
    deletePost(postId: number) {
      this.posts = this.posts.filter(p => p.id !== postId)
      this.savePosts()
    },
    addComment(postId: number, comment: Comment) {
      const post = this.posts.find(p => p.id === postId)
      if (post) {
        post.comments.push(comment)
        this.savePosts()
      }
    },
    // Hành động mới đã được thêm vào: Xóa tất cả bài viết
    deleteAllPosts() {
      this.posts = [] // Đặt lại mảng posts thành rỗng
      this.savePosts() // Lưu mảng rỗng vào localStorage để xóa dữ liệu
      console.log('Đã xóa tất cả bài viết khỏi store và localStorage.')
    }
  }
});