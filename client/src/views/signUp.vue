<template>
  <div id="loginBG">
    <img id="backgroundImg" :src="backgroundImg" />
    <p class="bellotaRegular" id="loginTitle">Regístrate ahora y obtén las mejores promociones en <span class="bellotaBold">artesanías peruanas</span></p>

    <!-- Botón para Facebook -->
    <div class="loginBtn" @click="redirectToSocial('/auth/facebook')">
      <div class="loginBtnSection"><img class="loginBtnImg" :src="facebookImg" /></div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">Regístrate con <span class="bellotaBold">Facebook</span></p>
      </div>
    </div>

    <!-- Botón para Google -->
    <div class="loginBtn" @click="redirectToSocial('/auth/google')">
      <div class="loginBtnSection"><img class="loginBtnImg" :src="googleImg" /></div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">Regístrate con <span class="bellotaBold">Google</span></p>
      </div>
    </div>

    <!-- Botón para Discord -->
    <div class="loginBtn" @click="redirectToSocial('/auth/discord')">
      <div class="loginBtnSection"><img class="loginBtnImg" :src="discordImg" /></div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">Regístrate con <span class="bellotaBold">Discord</span></p>
      </div>
    </div>

    <!-- Botón para registro con correo -->
    <div class="loginBtn" @click="redirectToRegister">
      <div class="loginBtnSection"><img class="loginBtnImg" :src="emailImg" /></div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">Regístrate con <span class="bellotaBold">Correo</span></p>
      </div>
    </div>

    <!-- Botón para registro con celular -->
    <div class="loginBtn" @click="redirectToPhone">
      <div class="loginBtnSection"><img class="loginBtnImg" :src="celImg" /></div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">Regístrate con <span class="bellotaBold">Celular</span></p>
      </div>
    </div>

    <p id="loginText" class="bellotaRegular">¿Ya tienes una cuenta?</p>
    <router-link to="/login" class="bellotaBold" id="signInBtn">Inicia sesión</router-link>
  </div>
</template>

<script>
import facebookImg from '../images/facebook.svg';
import googleImg from '../images/google.svg';
import discordImg from '../images/discord.svg';
import emailImg from '../images/email.svg';
import celImg from '../images/cel.svg';
import backgroundImg from '../images/background.png';

export default {
  name: 'LoginComponent',
  data() {
    return {
      facebookImg,
      googleImg,
      discordImg,
      emailImg,
      celImg,
      backgroundImg
    };
  },
  methods: {
    redirectToSocial(authRoute) {
      // Redirige al usuario a la ruta de autenticación en el backend
      window.location.href = `http://localhost:5000${authRoute}`;
    },
    redirectToRegister() {
      this.$router.push('/registerEmail');
    },
    redirectToPhone() {
      this.$router.push('/registerPhone');
    }
  }
}
</script>

<style scoped>
  #loginBG {
    width: 80vw;
    margin-left: 10vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  #loginTitle {
    letter-spacing: 1px;
    font-size: 24px;
    text-align: center;
    margin-bottom: 36px;
  }
  #loginText {
    margin-top: 16px;
    font-size: 24px;
  }
  #signInBtn {
    font-size: 24px;
    color: var(--black);
  }

  .loginBtn {
    display: grid;
    grid-template-columns: 46px calc(100% - 66px);
    padding-left: 20px;
    cursor: pointer;
    background-color: var(--color-W);
    width: 100%;
    height: 46px;
    border-radius: 8px;
    margin-bottom: 20px;
  }
  .loginBtnSection {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .loginBtnImg {
    width: 80%;
  }
  .loginBtnText {
    font-size: 16px;
  }
  #backgroundImg {
    position: absolute;
    min-height: 100%;
    width: 100%;
    z-index: -1;
    filter: saturate(0);
  }
</style>
