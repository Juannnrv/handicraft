<template>
    <div class="chat-container">
      <header class="chat-header">
        <img class="square-bg" style="filter: invert(100%);" :src="rotatedSquare" alt="">
        <a class="a-back" href="customerService">
            <img class="back-arrow" style="filter: invert(100%);" :src="backArrow" alt="">
        </a>
        <div class="header-title bellotaBold">
          <img :src="chatImg" style="width: 30px;" alt="">
          Chat con Taller Awaq Ayllus
        </div>
      </header>
  
      <div class="messages-container bellotaRegular" ref="messagesContainer">
        <div v-for="message in messages" 
             :key="message.id" 
             :class="['message', message.type]">
          {{ message.text }}
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
          <img :src="send" style="width: 20px;" alt="">
        </button>   
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { io } from 'socket.io-client'

  import rotatedSquare from '../images/rotatedSquare.svg'
  import backArrow from '../images/backArrow.svg'
  import chatImg from '../images/chat.svg'
  import send from '../images/send.svg'
  
  const socket = io('http://localhost:3000')
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
    console.log('Going back')
  }
  </script>
  
  <style scoped>
  .chat-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .chat-header {
    background-color: #D9D9D9;
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
    display: flex;
    gap: 0.5rem;
  }
  
  .message-input {
    flex: 1;
    padding: 0.6rem 0.8rem;
    border: none;
    border-radius: 10px;
    font-size: 0.9rem;
    background-color: #D9D9D9;
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
    content: '➤';
    font-size: 1.2rem;
    color: #4a4a4a;
  }

  .square-bg{
    position: absolute;
    left: 0;
    top: 0px;
    width: 40px;
}

.a-back{
position: absolute;
width: 25px;
left: 3px;
top: 25px;
display: flex
}

.a-back > img{
width: 100%;
}
  </style>