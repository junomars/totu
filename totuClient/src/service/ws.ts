import {Game} from "@/orm/Game";
import {reactive} from 'vue'
const state = reactive({
  socket: null as WebSocket | null,
  messages: [] as Array<any>,
  game: Game,
  chatMessages: [] as Array<string>, // Example additional state
})

export const useWebSocket = (url: string) => {
  if (!state.socket) {
    state.socket = new WebSocket(url)

    state.socket.onmessage = (event) => {
      const message = JSON.parse(event.data)
      state.messages.push(message)

      // Handle the message based on =its type
      switch (message.type) {
        case 'GameUpdate':
          state.game = message.payload
          break
        default:
          console.warn(`Unhandled message type: ${message.type}`)
      }
    }

    state.socket.onclose = () => {
      state.socket = null
    }
  }

  return state
}
