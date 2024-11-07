<template>
    <div class="registration-container">
      <img class="squareBG" :src="squareBG" alt="">
      <img class="square-bg" :src="rotatedSquare" alt="">
      <a class="a-back" href="">
        <img class="back-arrow" :src="backArrow" alt="">
      </a>
  
      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label class="bellotaBold">Nombre de usuario*</label>
          <small class="bellotaRegular">* Crea un nombre de usuario de mínimo 5 y máximo de 15 caracteres.</small>
          <input type="text" v-model="formData.username" required>
        </div>
  
        <div class="form-group">
          <label for="phone" class="label bellotaBold">Número de celular*</label>
          <div class="phone-input">
            <select v-model="formData.countryCode" class="country-code">
                <option value="+1">+1 (EE. UU., Canadá, Caribe)</option>
                <option value="+54">+54 (Argentina)</option>
                <option value="+55">+55 (Brasil)</option>
                <option value="+56">+56 (Chile)</option>
                <option value="+57">+57 (Colombia)</option>
                <option value="+58">+58 (Venezuela)</option>
                <option value="+51">+51 (Perú)</option>
                <option value="+52">+52 (México)</option>
                <option value="+53">+53 (Cuba)</option>
                <option value="+34">+34 (España)</option>
                <option value="+44">+44 (Reino Unido)</option>
                <option value="+33">+33 (Francia)</option>
                <option value="+49">+49 (Alemania)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japón)</option>
                <option value="+91">+91 (India)</option>
                <option value="+62">+62 (Indonesia)</option>
                <option value="+65">+65 (Singapur)</option>
                <option value="+27">+27 (Sudáfrica)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+61">+61 (Australia)</option>

            </select>
            <input 
              type="tel" 
              id="phone" 
              v-model="formData.phone" 
              required 
              class="input"
              @input="formatPhoneNumber"
            >
          </div>
        </div>
  
        <div class="form-group">
          <label for="phoneConfirmation" class="label bellotaBold">Confirma tu celular*</label>
          <div class="phone-input">
            <select v-model="formData.countryCode" class="country-code">
                <option value="+1">+1 (EE. UU., Canadá, Caribe)</option>
                <option value="+54">+54 (Argentina)</option>
                <option value="+55">+55 (Brasil)</option>
                <option value="+56">+56 (Chile)</option>
                <option value="+57">+57 (Colombia)</option>
                <option value="+58">+58 (Venezuela)</option>
                <option value="+51">+51 (Perú)</option>
                <option value="+52">+52 (México)</option>
                <option value="+53">+53 (Cuba)</option>
                <option value="+34">+34 (España)</option>
                <option value="+44">+44 (Reino Unido)</option>
                <option value="+33">+33 (Francia)</option>
                <option value="+49">+49 (Alemania)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+81">+81 (Japón)</option>
                <option value="+91">+91 (India)</option>
                <option value="+62">+62 (Indonesia)</option>
                <option value="+65">+65 (Singapur)</option>
                <option value="+27">+27 (Sudáfrica)</option>
                <option value="+61">+61 (Australia)</option>
                <option value="+61">+61 (Australia)</option>

            </select>
            <input 
              type="tel" 
              id="phoneConfirmation" 
              v-model="phoneConfirmation" 
              required 
              class="input"
            >
          </div>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Contraseña*</label>
          <input type="password" v-model="formData.password" required>
          <small class="bellotaRegular">Recuerda crear una contraseña difícil de adivinar</small>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Confirma tu contraseña*</label>
          <input type="password" v-model="passwordConfirmation" required>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Sexo</label>
          <select v-model="formData.gender">
            <option value=""></option>
            <option value="hombre">Masculino</option>
            <option value="mujer">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
  
        <div class="form-group">
          <label class="bellotaBold">Fecha de nacimiento</label>
          <div class="date-selects">
            <select v-model="birthDate.day">
              <option value="">DD</option>
              <option v-for="day in 31" :key="day" :value="day">
                {{ String(day).padStart(2, '0') }}
              </option>
            </select>
  
            <select v-model="birthDate.month">
              <option value="">MM</option>
              <option v-for="month in 12" :key="month" :value="month">
                {{ String(month).padStart(2, '0') }}
              </option>
            </select>
  
            <select v-model="birthDate.year">
              <option value="">YYYY</option>
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="continue-div">
          <strong class="bellotaBold">></strong>
          <a @click="handleSubmit" class="continue bellotaRegular">
            Continuar
          </a>
        </div>
      </form>
  
      <!-- Mensajes de error -->
      <div v-if="formError" class="error-message">
        <p>{{ formError }}</p>
      </div>
    </div>
  </template>
  Cambios en el script:
  Añadimos la lógica para mostrar el error cuando las validaciones no se cumplen. Lo que se muestra en el contenedor es el mensaje de error.
  
  javascript
  Copiar código
  <script setup>
  import { ref, computed } from 'vue'
  import rotatedSquare from '../images/rotatedSquare.svg'
  import backArrow from '../images/backArrow.svg'
  import squareBG from '../images/squareBG.svg'
  
  const formData = ref({
    username: '',
    email: '',
    password: '',
    profilePicture: 'https://i.pinimg.com/474x/4c/92/2b/4c922b0a793123bcb292e005b7981df6.jpg',
    address: '',
    phone: '',
    type: 'comprador',
    favorites: [],
    purchases: [],
    workshopsEnrolled: [],
    coupons: [],
    gender: '',
    birthday: ''
  })
  
  const phoneConfirmation = ref('')
  const passwordConfirmation = ref('')
  const birthDate = ref({
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
  
  // Para manejar los errores
  const formError = ref('')
  
  // Formato de número de teléfono
  const formatPhoneNumber = () => {
    formData.value.phone = formData.value.phone.replace(/\D/g, '')
  }
  
  // Validación de formulario
  const validateForm = () => {
    // Limpiar error antes de validar
    formError.value = ''
  
    if (formData.value.phone !== phoneConfirmation.value) {
      formError.value = 'Los números de teléfono no coinciden'
      return false
    }
  
    if (formData.value.password !== passwordConfirmation.value) {
      formError.value = 'Las contraseñas no coinciden'
      return false
    }
  
    if (formData.value.phone.length < 9) {
      formError.value = 'El número de teléfono debe tener 9 dígitos'
      return false
    }
  
    if (!birthDate.value.day || !birthDate.value.month || !birthDate.value.year) {
      formError.value = 'Por favor complete la fecha de nacimiento'
      return false
    }
  
    return true
  }
  
  const handleSubmit = async () => {
    if (!validateForm()) return
  
    // Formato de fecha de nacimiento
    const formattedBirthday = new Date(
      birthDate.value.year,
      birthDate.value.month - 1,
      birthDate.value.day
    ).toISOString()
  
    const dataToSubmit = {
      ...formData.value,
      birthday: formattedBirthday,
      phone: formData.value.countryCode + formData.value.phone
    }
  
    try {
      // Ejemplo de API
      delete dataToSubmit.countryCode;
      console.log(JSON.stringify(dataToSubmit))
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit)
      })
  
      if (!response.ok) {
        throw new Error('Error en el registro')
      }
  
      const data = await response.json()
      console.log('Registration successful:', data)
      // Manejo de éxito (e.g., redirección)
    } catch (error) {
      console.error('Error en el registro:', error)
      alert('Error en el registro. Por favor intente nuevamente.')
    }
  }
  </script>
  

  <style scoped>
  .error-message {
  color: red;
  font-size: 14px;
  margin-top: 20px;
}
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
    background-color: #bebebe;
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
  .squareBG{
    width: 60vh;
    position: absolute;
    bottom: 0;
    right: -29vh;
    z-index: -1;
  }



  .input, .select, .country-code {
  padding: 12px;
  border: none;
  background-color: #bebebe;
  border-radius: 4px;
  font-size: 16px;
}

.phone-input {
    width: 100%;
    border-radius: 4px;
  display: flex;
  gap: 10px;
}

.phone-input > input {
    width: 100%;
}

.country-code {
  width: 75px;
}

  </style>
  