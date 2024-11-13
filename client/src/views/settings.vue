<template>
  <div class="settings-container">
    <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="home">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
    <header class="header bellotaBold">
        <img class="title-square" :src="titleSquare" alt="">
      <h1>Ajustes</h1>
    </header>

    <section class="settings-section bellotaBold">
      <h2>Global</h2>
      <div class="settings-group">
        <div class="setting-item">
          <span>Cambiar país y región</span>
          <span class="setting-value">Canadá, Toronto</span>
        </div>
        <div class="setting-item">
          <span>Cambiar idioma</span>
          <span class="setting-value">Español</span>
        </div>
        <div class="setting-item">
          <span>Cambiar moneda</span>
          <span class="setting-value">PEN</span>
        </div>
      </div>
    </section>

    <section class="settings-section bellotaBold">
      <h2>Notificaciones</h2>
      <div class="settings-group">
        <div class="setting-item">
          <span>Mostrar notificaciones de compras</span>
          <label class="toggle">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <span>Mostrar notificaciones de descuentos</span>
          <label class="toggle">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <span>Mostrar notificaciones de talleres</span>
          <label class="toggle">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
        <div class="setting-item">
          <span>Sonido de notificaciones</span>
          <label class="toggle">
            <input type="checkbox">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </section>

    <section class="settings-section bellotaBold">
      <h2>Legal</h2>
      <div class="settings-group">
        <div class="setting-item">
          <span>Política de privacidad</span>
        </div>
        <div class="setting-item">
          <span>Información legal</span>
        </div>
        <div class="setting-item">
          <span>Libro de reclamaciones</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import titleSquare from '../images/titleSquare.svg'
import rotatedSquare from '../images/rotatedSquare.svg'
  import backArrow from '../images/backArrow.svg'



</script>

<style scoped>
.settings-container {
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
  font-size: 20px;
  padding: 8px;
  cursor: pointer;
  margin-right: 16px;
}

h1 {
  font-size: 17px;
  margin: 0;
  margin-top: 10px;
}

.settings-section {
  margin-bottom: 24px;
}

h2 {
  font-size: 17px;
  margin-bottom: 8px;
}

.settings-group {
  background-color: #d6d6d6;
  border-radius: 8px;
  overflow: hidden;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  font-size: 13px;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-value {
  color: #666;
}

/* Toggle Switch Styles */
.toggle {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #949494;
  transition: .4s;
  border-radius: 8px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 0px;
  bottom: 0px;
  background-color: white;
  transition: .4s;
  border-radius: 8px;
}

input:checked + .slider {
  background-color: #222222;
}

input:checked + .slider:before {
  transform: translateX(26px);
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