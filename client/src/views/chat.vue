<template>
  <div class="chat-container">
    <header class="chat-header">
      <img
        class="square-bg"
        style="filter: invert(100%)"
        :src="rotatedSquare"
        alt=""
      />
      <a class="a-back" href="customerService">
        <img
          class="back-arrow"
          style="filter: invert(100%)"
          :src="backArrow"
          alt=""
        />
      </a>
      <div class="header-title bellotaBold">
        <img :src="chatImg" style="width: 30px" alt="" />
        Chat con Taller Awaq Ayllus
      </div>
    </header>

    <div class="messages-container bellotaRegular" ref="messagesContainer">
      <div
        v-for="message in chatMessages"
        :key="message.id"
        :class="['message', message.sender === 'user' ? 'sent' : 'received']"
      >
        {{ message.content }}
      </div>
    </div>

    <form class="message-form bellotaRegular" @submit.prevent="sendMessage">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Mandar mensaje a Taller Awaq Ayllus"
        class="message-input bellotaRegular"
      />
      <button type="submit" class="send-button">
        <img :src="send" style="width: 20px" alt="" />
      </button>
    </form>
  </div>
</template>

<script>
import { io } from 'socket.io-client';
import rotatedSquare from '../images/rotatedSquare.svg';
import backArrow from '../images/backArrow.svg';
import chatImg from '../images/chat.svg';
import send from '../images/send.svg';

export default {
  data() {
    return {
      user: {}, // Información del usuario
      socket: null, // Conexión de socket
      newMessage: "", // Mensaje nuevo a enviar
      chatMessages: [], // Mensajes del chat
    };
  },
  mounted() {
    // Cargar datos del usuario
    fetch('http://localhost:5000/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "x-version": "1.0.0",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.user = data;
        if (this.user && this.user.data) {
          this.initializeSocket();
        } else {
          console.error("Invalid user data structure");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  },
  methods: {
    initializeSocket() {
      // Conectar al servidor de sockets
      this.socket = io('http://localhost:5000', { withCredentials: true });

      // Unirse a la sala del usuario
      this.socket.emit('joinRoom', { userId: this.user.data._id });

      // Escuchar mensajes del servidor
      this.socket.on('chat message', (message) => {
        console.log("Mensaje recibido del servidor:", message); // Depuración
        const formattedMessage = {
          content: message.content || message.text, // Ajusta según el formato recibido
          sender: message.sender || 'server', // Ajusta según el formato recibido
        };
        this.chatMessages.push(formattedMessage);
        this.scrollToBottom();
      });
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        const messageData = {
          userId: this.user.data._id,
          content: this.newMessage,
          sender: 'user',
        };
        // Enviar mensaje al servidor
        this.socket.emit('chat message', messageData);

        // Limpiar el campo de entrada
        this.newMessage = '';
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-header {
  background-color: #d9d9d9;
  color: #000000;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 80px;
}

.back-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
}

.arrow-left::before {
  content: "←";
  font-size: 1.2rem;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.chat-icon::before {
  content: "💬";
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.message {
  max-width: 70%;
  padding: 0.6rem 0.8rem;
  border-radius: 0.5rem;
  word-break: break-word;
}

.message.sent {
  background-color: #e0e0e0;
  color: black;
  align-self: flex-end;
  border-bottom-right-radius: 0;
}

.message.received {
  background-color: #4a4a4a;
  color: white;
  align-self: flex-start;
  border-bottom-left-radius: 0;
}

.message-form {
  padding: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.message-input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border: none;
  border-radius: 10px;
  font-size: 0.9rem;
  background-color: #d9d9d9;
  margin-bottom: 15px;
}

.message-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px #4a4a4a;
}

.send-button {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.send-icon::before {
  content: "➤";
  font-size: 1.2rem;
  color: #4a4a4a;
}

.square-bg {
  position: absolute;
  left: 0;
  top: 0px;
  width: 40px;
}

.a-back {
  position: absolute;
  width: 25px;
  left: 3px;
  top: 25px;
  display: flex;
}

.a-back > img {
  width: 100%;
}
</style>
