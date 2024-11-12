<template>
    <div class="chat-container">
      <header class="chat-header">
        <button class="back-button" @click="goBack">
          <span class="arrow-left"></span>
        </button>
        <div class="header-title">
          <span class="chat-icon"></span>
          Chat con Taller Awaq Ayllus
        </div>
      </header>
  
      <div class="messages-container" ref="messagesContainer">
        <div v-for="message in messages" 
             :key="message.id" 
             :class="['message', message.type]">
          {{ message.text }}
        </div>
      </div>
  
      <form class="message-form" @submit.prevent="sendMessage">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="Mandar mensaje a Taller Awaq Ayllus"
          class="message-input"
        />
        <button type="submit" class="send-button">
          <span class="send-icon"></span>
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { io } from 'socket.io-client'
  
  const socket = io('http://localhost:3000') // Replace with your server URL
  const messages = ref([])
  const newMessage = ref('')
  const messagesContainer = ref(null)
  
  onMounted(() => {
    socket.on('message', (message) => {
      messages.value.push({
        id: Date.now(),
        text: message,
        type: 'received'
      })
      scrollToBottom()
    })
  })
  
  onUnmounted(() => {
    socket.disconnect()
  })
  
  const sendMessage = () => {
    if (newMessage.value.trim()) {
      const message = {
        id: Date.now(),
        text: newMessage.value,
        type: 'sent'
      }
      messages.value.push(message)
      socket.emit('message', newMessage.value)
      newMessage.value = ''
      scrollToBottom()
    }
  }
  
  const scrollToBottom = () => {
    setTimeout(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
      }
    }, 100)
  }
  
  const goBack = () => {
    // Implement your navigation logic here
    console.log('Going back')
  }
  </script>
  
  <style scoped>
  .chat-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f0f0f0;
  }
  
  .chat-header {
    background-color: #4a4a4a;
    color: white;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .back-button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .arrow-left::before {
    content: '←';
    font-size: 1.2rem;
  }
  
  .header-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
  }
  
  .chat-icon::before {
    content: '💬';
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
    background-color: #e0e0e0;
    display: flex;
    gap: 0.5rem;
  }
  
  .message-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border: none;
    border-radius: 1.5rem;
    font-size: 0.9rem;
    background-color: white;
  }
  
  .message-input:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4a4a4a;
  }
  
  .send-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .send-icon::before {
    content: '➤';
    font-size: 1.2rem;
    color: #4a4a4a;
  }
  </style>