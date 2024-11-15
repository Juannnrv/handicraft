<template>
  <div id="loginBG">
    <img id="backgroundImg" :src="backgroundImg" />
    <p class="bellotaRegular" id="loginTitle">
      Inicia sesión y continúa viendo
      <span class="bellotaBold">tus artesanías favoritas</span>
    </p>

    <div class="loginBtn" @click="redirectToSocial('/auth/facebook')">
      <div class="loginBtnSection">
        <img class="loginBtnImg" :src="facebookImg" />
      </div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">
          Inicia sesión con <span class="bellotaBold">Facebook</span>
        </p>
      </div>
    </div>
    <div class="loginBtn" @click="redirectToSocial('/auth/google')">
      <div class="loginBtnSection">
        <img class="loginBtnImg" :src="googleImg" />
      </div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">
          Inicia sesión con <span class="bellotaBold">Google</span>
        </p>
      </div>
    </div>
    <div class="loginBtn" @click="redirectToSocial('/auth/discord')">
      <div class="loginBtnSection">
        <img class="loginBtnImg" :src="discordImg" />
      </div>
      <div class="loginBtnSection">
        <p class="bellotaRegular loginBtnText">
          Inicia sesión con <span class="bellotaBold">Discord</span>
        </p>
      </div>
    </div>
    <div class="loginBtn" style="height: 70px">
      <div class="loginBtnSection">
        <img class="loginBtnImg" :src="emailImg" />
      </div>
      <div class="loginBtnSection">
        <router-link to="/loginForm" class="bellotaRegular loginBtnText"
          >Inicia sesión con tu cuenta de
          <span class="bellotaBold">Ruraq Maki</span></router-link
        >
      </div>
    </div>
    <p id="loginText" class="bellotaRegular">¿No tienes una cuenta?</p>
    <router-link to="/signup" class="bellotaBold" id="signInBtn"
      >Registrarse</router-link
    >
  </div>
</template>

<script>
import facebookImg from "../images/facebook.svg";
import googleImg from "../images/google.svg";
import discordImg from "../images/discord.svg";
import emailImg from "../images/email.svg";
import celImg from "../images/cel.svg";
import backgroundImg from "../images/background.png";
export default {
  data() {
    return {
      facebookImg,
      googleImg,
      discordImg,
      emailImg,
      celImg,
      backgroundImg,
    };
  },
  name: "TestComponent",
  methods: {
    redirectToSocial(authRoute) {
      window.location.href = `http://localhost:5000${authRoute}`;
    },
  }
};
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
  font-size: 25px;
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
  text-align: center;
  font-size: 16px;
  text-decoration: none;
  color: #000;
}
#backgroundImg {
  position: absolute;
  min-height: 100%;
  width: 100%;
  z-index: -1;
  filter: saturate(0);
}
</style>
