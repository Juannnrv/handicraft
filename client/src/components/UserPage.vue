<template>
  <div class="user-page">
    <!-- Mostrar el nombre de usuario si los datos están cargados -->
    <h1 v-if="user && user.data">{{ user.data.username }}</h1>
    <p v-else>Loading...</p> <!-- Mostrar mensaje de carga mientras se obtiene el usuario -->

    <!-- Mostrar el chat si hay mensajes -->
    <div v-if="chatMessages.length" class="chat-box">
      <div v-for="(message, index) in chatMessages" :key="index" class="message">
        <strong>{{ message.sender === 'user' ? 'You' : 'Admin' }}:</strong> {{ message.content }}
      </div>
    </div>
    
    <!-- Formulario para enviar mensajes -->
    <div class="message-input">
      <input v-model="newMessage" type="text" placeholder="Type a message..." />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client';

export default {
  data() {
    return {
      user: {}, // Información del usuario
      socket: null, // Conexión de socket
      newMessage: "", // Mensaje a enviar
      chatMessages: [] // Mensajes del chat
    };
  },
  mounted() {
    // Obtener los datos del usuario
    fetch('http://localhost:5000/user', {
      method: 'GET',
      credentials: 'include',
      headers: {
        "x-version": "1.0.0",
      }
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User data:", data);  // Verifica la estructura de los datos recibidos
        this.user = data;
        
        // Verificar que la estructura de los datos es correcta
        if (this.user && this.user.data) {
          this.initializeSocket();
        } else {
          console.error("Invalid user data structure");
        }
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  },
  methods: {
    initializeSocket() {
      // Conectar al servidor de sockets
      this.socket = io('http://localhost:5000', { withCredentials: true });

      // Unirse a la sala del usuario
      this.socket.emit('joinRoom', { userId: this.user.data._id });

      // Escuchar mensajes del servidor
      this.socket.on('chat message', (message) => {
        this.chatMessages.push(message);
      });
    },
    sendMessage() {
      if (this.newMessage.trim()) {
        // Enviar el mensaje al servidor
        const messageData = {
          userId: this.user.data._id, // Usar user.data._id en lugar de user._id
          content: this.newMessage
        };
        this.socket.emit('chat message', messageData);
        this.newMessage = ''; // Limpiar el campo de texto
      }
    }
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect(); // Desconectar el socket al destruir el componente
    }
  }
};
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.chat-box {
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

.message-input {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 600px;
}

.message-input input {
  width: 80%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.message-input button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.message-input button:hover {
  background-color: #45a049;
}
</style>
