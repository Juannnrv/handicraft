<!-- src/components/RegistrationForm.vue -->
<template>
    <div class="registration-container">
       <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
  
      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label class="bellotaBold">Nombre de usuario*</label>
          <small class = "bellotaRegular">* Crea un nombre de usuario de mínimo 5 y máximo de 15 caracteres.</small>
          <input type="text" v-model="form.username" required>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Correo electrónico*</label>
          <input type="email" v-model="form.email" required>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Confirma tu correo*</label>
          <input type="email" v-model="form.emailConfirmation" required>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Contraseña*</label>
          <input type="password" v-model="form.password" required>
          <small class = "bellotaRegular">Recuerda crear una contraseña difícil de adivinar</small>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Confirma tu contraseña*</label>
          <input type="password" v-model="form.passwordConfirmation" required>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Sexo</label>
          <select v-model="form.gender">
            <option value=""></option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </select>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Fecha de nacimiento</label>
          <div class="date-selects">
            <select v-model="form.day">
              <option value="">DD</option>
              <option v-for="day in 31" :key="day" :value="day">
                {{ String(day).padStart(2, '0') }}
              </option>
            </select>
  
            <select v-model="form.month">
              <option value="">MM</option>
              <option v-for="month in 12" :key="month" :value="month">
                {{ String(month).padStart(2, '0') }}
              </option>
            </select>
  
            <select v-model="form.year">
              <option value="">YYYY</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="continue-div">
            <strong class="bellotaBold">></strong>
            <a  class="continue bellotaRegular" href="">
                Continuar
            </a>
        </div>
          
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  import rotatedSquare from '../images/rotatedSquare.svg';
  import backArrow from '../images/backArrow.svg';
  
  
  const form = ref({
    username: '',
    email: '',
    emailConfirmation: '',
    password: '',
    passwordConfirmation: '',
    gender: '',
    day: '',
    month: '',
    year: ''
  })
  
  const years = computed(() => {
    const currentYear = new Date().getFullYear()
    const years = []
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year)
    }
    return years
  })
  
  const goBack = () => {
    console.log('Going back')
  }
  
  const handleSubmit = () => {
    console.log('Form submitted:', form.value)
  }

  </script>
  

  <style scoped>
    .square-bg{
        position: absolute;
        left: 0;
        top: 0px;
        width: 40px;
    }

  .registration-container {
    max-width: 400px;
    margin: 0px 30px;
    padding: 20px;
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
  
 
  
  .registration-form {
    height: 87vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  label {
    font-size: 16px;
    color: #333;
  }
  
  input, select {
    padding: 12px;
    border: none;
    background-color: #a7a7a78c;
    border-radius: 4px;
    font-size: 16px;
  }
  
  input:focus, select:focus {
    outline: none;
    background-color: #e8e8e8;
  }
  
  small {
    color: #666;
    font-size: 12px;
  }
  
  .date-selects {
    display: flex;
    gap: 10px;
  }
  
  .date-selects select {
    flex: 1;
  }
  
  .continue-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-top: 10px;
  }
  
  .continue-button:hover {
    background-color: #444;
  }

  .continue-div{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 17px;
    position: absolute;
    top: 92vh;
    right: 50px;
  }

  .continue-div > strong{
    font-size: 30px;
  }
  .continue{
    color: black;
  }
  </style>
  