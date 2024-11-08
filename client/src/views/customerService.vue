<template>
    <div class="support-container">
      <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="registerEmail">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
      <header class="header">
        <img class="title-square" :src="titleSquare" alt="">
        <h1 class="bellotaBold">Atención al cliente</h1>
      </header>
  
      <section class="faq-section bellotaBold">
        <h2>Preguntas frecuentes</h2>
        <div class="faq-list bellotaBold">
          <button class="faq-item bellotaBold">¿Cómo compro en la app?</button>
          <button class="faq-item bellotaBold">¿Cómo me inscribo en un taller?</button>
          <button class="faq-item bellotaBold">¿Cómo escaneo el QR interactivo?</button>
          <button class="faq-item bellotaBold">¿Cómo cambio la moneda en la app?</button>
          <button class="faq-item bellotaBold">¿Cómo reporto un problema?</button>
        </div>
      </section>
  
      <section class="personal-support">
        <p class="support-text bellotaBold">
          ¿Necesitas atención personalizada? habla con nuestro equipo de soporte
        </p>
        
        <div class="support-actions ">
          <button class="support-button bellotaBold">
            <span class="icon">💬</span>
            Empieza un chat
          </button>
          <button class="support-button bellotaBold">
            <span class="icon">📞</span>
            Programa una llamada
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import titleSquare from '../images/titleSquare.svg'
  import rotatedSquare from '../images/rotatedSquare.svg'
    import backArrow from '../images/backArrow.svg'
  
     // Add any required functionality here
  const handleFaqClick = (question) => {
    // Handle FAQ item click
    console.log('FAQ clicked:', question)
  }
  
  const startChat = () => {
    // Handle chat initiation
    console.log('Starting chat...')
  }
  
  const scheduleCall = () => {
    // Handle call scheduling
    console.log('Scheduling call...')
  }
  
  
  </script>

  <style scoped>
  .support-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 24px;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 24px;
    padding: 8px;
    cursor: pointer;
    margin-right: 16px;
  }
  
  h1 {

    font-size: 17px;
    margin: 0;
    text-align: center;
    width: 100px;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 16px;
  }
  
  .faq-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 32px;
  }
  
  .faq-item {
    width: 100%;
    padding: 16px;
    text-align: left;
    background-color: #d6d6d6;
    border: none;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .faq-item:hover {
    background-color: #ebebeb;
  }
  
  .personal-support {
    margin-top: 32px;
  }
  
  .support-text {
    font-size: 14px;
    margin-bottom: 16px;
    color: #333;
  }
  
  .support-actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .support-button {
    width: 100%;
    padding: 16px;
    background-color: #d6d6d6;
    border: none;
    border-radius: 8px;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    font-size: 14px;
  }
  
  .support-button:hover {
    background-color: #ebebeb;
  }
  
  .icon {
    margin-right: 12px;
    font-size: 18px;
  }
  .title-square{
    width: 80px;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    z-index: -1;
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
  