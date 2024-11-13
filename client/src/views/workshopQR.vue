<template>
    <div class="container">
        <img class="square-bg" :src="rotatedSquare" alt="">
        <a class="a-back" href="registerEmail">
            <img class="back-arrow" :src="backArrow" alt="">
        </a>
  
      <div class="divider">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
      </div>
  
      <p class="description bellotaRegular">
        El Taller de Arte Awaq Ayllus reúne a más de 60 tejedores y tejedoras ayacuchanos que producen tapices murales y delicadas piezas bordadas para diversos usos decorativos y utilitarios.
      </p>
  
      <div class="divider" style="font-size: 1.1em;">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
        <img :src="dividerSquare" alt="">
      </div>
  
      <h1 class="title bellotaBold">Taller de arte Awaq Ayllus - Documental</h1>
  
      <div class="XD">
      <a :href="videoUrl" class="video-link">
        <div class="video-container">
          <img src="https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg" alt="Video thumbnail" class="video-thumbnail">
          <div class="play-button">
            <div class="play-icon"></div>
          </div>
        </div>
      </a>
    </div>

      <div class="interactive-section">
        <h2 class="bellotaBold">Conoce más del taller de forma interactiva</h2>
        <p class="bellotaRegular">Escanea el código QR con tu celular y disfruta de la experiencia</p>
        
        <div class="qr-code">
            <QrcodeVue :value="qrCode" :size="150"/>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue'
import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import QrcodeVue from 'qrcode.vue'
import dividerSquare from '../images/dividerSquare.svg'
  
  const videoUrl = 'https://www.youtube.com/watch?v=O1wUdB7MQbI'
  const qrCode = ref('https://www.gob.pe/institucion/mincetur/noticias/304773-te-gustaria-conocer-los-trabajos-y-talleres-de-ilustres-artesanos-del-peru')
  
  const goBack = () => {
    // Add navigation logic here
    console.log('Going back')
  }
  </script>
  
  <style scoped>
  .container {
    max-width: 440px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'BellotaRegular', sans-serif;
    height: 100vh;
    overflow: scroll;
    scrollbar-width: none;
  }
  
  .arrow {
    color: #333;
  }
  
  .divider {
    display: flex;
    justify-content: center;
    color: #ccc;
    margin: 20px 0;
    gap: 3px;
  }

  .divider > img{
    width: 16px;
 
  }
  
  .description {
    text-align: center;
    line-height: 1.6;
    color: #333;
    margin: 20px 0;
    padding: 0 20px;
    font-size: .8em;
  }
  
  .title {
    font-size: 1em;
    color: #333;
    margin: 25px 0;
  }
  
.XD{
    margin: -20px;
    padding: 1px 20px;
    width: 111%;
    background-color: #D9D9D9;
}

  .video-container {
    position: relative;
    width: 100%;
    border-radius: 8px;
    overflow: hidden;
    margin: 20px 0;
  }
  
  .video-thumbnail {
    width: 100%;
    height: auto;
    display: block;
  }
  
  .play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .play-icon {
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 20px 0 20px 30px;
    border-color: transparent transparent transparent #333;
    margin-left: 8px;
  }
  
  .interactive-section {
    margin-top: 40px;
  }
  
  .interactive-section h2 {
    font-size: 1em;
    color: #333;
    margin-bottom: 10px;
  }
  
  .interactive-section p {
    font-size: 1em;
    color: #666;
    margin-bottom: 20px;
  }
  
  .qr-code {
    display: flex;
    justify-content: center;
    width: 100%;
    position: relative;
  }

  
  /* Hover effects */
  .video-container:hover .play-button {
    background: rgba(255, 255, 255, 0.9);
  }
  
  .back-button:hover {
    opacity: 0.8;
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