const baseUrl = 'http://localhost:8000/api'
const Fetch = (path: string, options: RequestInit | any = {}) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`
  }
  return fetch(baseUrl + path, { ...options, headers })
}


const Login = (username: string, password: string) => {
  Fetch('/auth/login/', {
    method: 'POST',
    body: JSON.stringify({
      'username': username,
      'password': password
    })
  }).then(res => res.json()).then((data) => {
    if (data.token === undefined) {
      alert('登录失败')
      return
    }
    localStorage.setItem('token', data.token)
    window.location.href = '/'
  })
}

export { Fetch, Login }