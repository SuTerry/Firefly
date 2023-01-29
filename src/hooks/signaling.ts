import { io } from 'socket.io-client'

export default (): void => {
  const name = new Date().getTime().toString()
  console.log(name, 'name')

  const socket = io('//localhost:8888', {
    query: {
      name,
    },
  })

  socket.emit('login', { name })

  socket.on('login', (msg) => {
    console.log(msg, 'login')
  })
  socket.on('close', (msg) => {
    console.log(msg, 'close')
  })

  // socket.on('connect', () => {

  // })

  window.addEventListener('unload', () => {
    socket.disconnect()
  })

  // const socket = new WebSocket('ws://localhost:8888')

  // socket.onopen = (e) => {
  //   const data = {
  //     type: 'login',
  //     name: new Date().getTime().toString(),
  //   }
  //   socket.send(JSON.stringify(data))
  // }

  // socket.onmessage = (e) => {
  //   console.log(JSON.parse(e.data), 'e.data')
  // }

  // setTimeout(() => {
  //   socket.close()
  // }, 5000)
}
