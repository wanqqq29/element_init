
const GetMessage = async (token) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token || ''}`
  }
  const response = await fetch('http://localhost:8000/api/message/',{
    method: 'GET',
    headers
  })
  postMessage(await response.json())
}


self.addEventListener('message', async (e) => {
  console.log('worker init')
  const { action, token } = e.data
  if (action === 'getMessage') {
    try {
      GetMessage(token)
      setInterval(async () => {
        GetMessage(token)
      }, 1000 * 30)
    } catch (error) {
      // 错误处理：发送错误信息回主线程
      postMessage({ error: error.message })
    }
  }
})