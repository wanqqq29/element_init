import { defineStore } from 'pinia'

export const AuthStore = defineStore('auth', {
  state: () => ({
    id: '',
    username: '',
    role: ''
  }),
  actions: {
    setinfo() {
      const token = localStorage.getItem('token')
      if (token === null) {
        return
      }
      const payload = token.split('.')[1]
      const data = JSON.parse(atob(payload))
      this.id = data.user_id
      this.username = data.user_name
      this.role = data.role
    }
  }
})
