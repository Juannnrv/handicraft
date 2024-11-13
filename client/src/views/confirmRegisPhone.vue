<template>
  <div class="privacy-form">
    <img class="squareBGTop" :src="squareBG" alt="">
    <img class="squareBG" :src="squareBG" alt="">
    <img class="square-bg" :src="rotatedSquare" alt="">
    <a class="a-back" href="registerPhone">
      <img class="back-arrow" :src="backArrow" alt="">
    </a>
    <div class="checkbox-group">
      <label class="checkbox-label">
        <input type="checkbox" v-model="privacyAccepted">
        <span class="checkbox-custom"></span>
        <span class="label-text bellotaRegular">
          He leído y acepto la <a href="#" class="link bellotaBold">Política de privacidad</a>*
        </span>
      </label>

      <label class="checkbox-label">
        <input type="checkbox" v-model="termsAccepted">
        <span class="checkbox-custom"></span>
        <span class="label-text bellotaRegular">
          He leído y acepto los <a href="#" class="link bellotaBold">Términos y condiciones</a>*
        </span>
      </label>

      <label class="checkbox-label">
        <input type="checkbox" v-model="promotionsAccepted">
        <span class="checkbox-custom"></span>
        <span class="label-text bellotaRegular">
          Acepto que me envíen promociones y eventos a mi número de celular
        </span>
      </label>
    </div>

    <!-- Botón de Registrarse que se habilita solo si todas las casillas están marcadas -->
    <div class="continue-div">
      <strong class="bellotaBold">></strong>
      <a @click="handleSubmit" class="continue bellotaRegular" :class="{ disabled: !(privacyAccepted && termsAccepted && promotionsAccepted) }">
        <u>Registrarse</u>
      </a>
    </div>
  </div>
</template>

  
<script setup>
import { ref } from 'vue'
import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import squareBG from '../images/squareBG.svg'

// Definir las variables de los checkboxes
const privacyAccepted = ref(false)
const termsAccepted = ref(false)
const promotionsAccepted = ref(false)

// Función para manejar el envío del formulario
const handleSubmit = () => {
  if (!privacyAccepted.value || !termsAccepted.value || !promotionsAccepted.value) {
    alert("Por favor, acepta todos los términos y condiciones para continuar.");
    return;
  }

  alert("Formulario enviado con éxito");
}
</script>
  
  <style scoped>
  .privacy-form {
    padding: 20px;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .checkbox-group {
    padding-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 35px;
  }
  
  .checkbox-label {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    cursor: pointer;
    position: relative;
    padding-left: 35px;
  }
  
  .checkbox-label input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  
  .checkbox-custom {
    position: absolute;
    left: 0;
    height: 24px;
    width: 24px;
    border: 2px solid #333;
    border-radius: 4px;
  }
  
  .checkbox-label input:checked ~ .checkbox-custom::after {
    content: "";
    position: absolute;
    left: 7px;
    top: 3px;
    width: 6px;
    height: 12px;
    border: solid #333;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
  
  .label-text {
    font-size: 14px;
    line-height: 1.4;
    color: #333;
  }
  
  .link {
    color: #333;
    text-decoration: underline;
  }
  
  .register-button {
    margin-top: 20px;
    padding: 12px 24px;
    background: transparent;
    border: none;
    color: #333;
    font-size: 16px;
    cursor: pointer;
    text-decoration: underline;
    align-self: flex-start;
  }
  
  .register-button:hover {
    opacity: 0.8;
  }

  .squareBG{
    width: 60vh;
    position: absolute;
    bottom: 0;
    left: -29vh;
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

  .squareBGTop{
    width: 60vh;
    position: absolute;
    top: -36vh;
    right: -29vh;
    z-index: -1;
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
  .continue-div > a.disabled {
  color: #ccc;
  pointer-events: none; /* Desactiva el clic */
}
  </style>