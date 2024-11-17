<template>
  <div id="menuDiv">
    <div id="profileDiv">
      <div id="profilePhotoDiv">
        <img id="profileImg" :src="profileImg">
      </div>
      <p id="profileName" class="bellotaBold">{{ username }}</p>
    </div>

    <div v-for="(option, index) in menuOptions" :key="index" class="menuOptionDiv" @click="redirectTo(option.route)">
      <img class="menuOptionImg" :src="option.imgSrc" alt="menu option">
      <p class="menuOptionText bellotaRegular">{{ option.text }}</p>
    </div>

    <img id="squaresImg" :src="squaresImg">

    <div v-for="(option, index) in menuOptions2" :key="index" class="menuOptionDiv" @click="redirectTo(option.route)">
      <img class="menuOptionImg" :src="option.imgSrc" alt="menu option">
      <p class="menuOptionText bellotaRegular">{{ option.text }}</p>
    </div>
  </div>
</template>
  
<script>
import profileImg from '../images/test/profile.svg';
import favoriteImg from '../images/menu/favorite.svg';
import shopsImg from '../images/menu/shops.svg';
import workshopsImg from '../images/menu/workshops.svg';
import couponImg from '../images/menu/coupons.svg';
import settingsImg from '../images/menu/settings.svg';
import commentsImg from '../images/menu/comments.svg';
import clientImg from '../images/menu/client.svg';
import squaresImg from '../images/squaresGroup2.svg';

export default {
  data() {
    return {
      profileImg,
      squaresImg,
      username: "Cargando...", // Nombre de usuario inicial
      menuOptions: [
        { imgSrc: favoriteImg, text: 'Lista de favoritos', route: '/favorites' },
        { imgSrc: shopsImg, text: 'Compras', route: '/home' },
        { imgSrc: workshopsImg, text: 'Talleres', route: '/workshops' },
        { imgSrc: couponImg, text: 'Canjear cupón', route: '/redeemCoupon' }
      ],
      menuOptions2: [
        { imgSrc: settingsImg, text: 'Ajustes', route: '/settings' },
        { imgSrc: commentsImg, text: 'Comentarios', route: '/comments' },
        { imgSrc: clientImg, text: 'Atención al cliente', route: '/customerService' }
      ]
    };
  },
  methods: {
    redirectTo(route) {
      this.$router.push(route);
    },
    async fetchUserData() {
      try {
        const response = await fetch('http://localhost:5000/user/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'
          },
          credentials: 'include' // Envía cookies automáticamente
        });

        if (response.status === 401) {
          this.$router.push('/login'); // Redirige a la página de inicio de sesión
        } else if (response.ok) {
          const userData = await response.json();
          console.log(userData.data)
          this.username = userData.data.username || "Usuario"; 
          this.profileImg = userData.data.profilePicture// Actualiza el nombre del usuario
        } else {
          console.error("Error inesperado al obtener datos del usuario.");
        }
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
      }
    }
  },
  created() {
    this.fetchUserData(); // Llama a la función al montar el componente
  },
  name: 'Menu',
};
</script>

<style scoped>
/* Sin cambios */
#menuDiv {
  position: fixed;
  height: 100%;
  width: 240px;
  background-color: var(--color-B);
  z-index: +2;
  box-shadow: 0px 0px 30px 0px var(--color-B);
}
#profileDiv {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  margin-top: 10px;
}
#profilePhotoDiv {
  position: absolute;
  left: 0;
  margin-left: 10px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
#profileName {
  color: var(--color-W);
  position: absolute;
  left: 0;
  margin-left: 90px;
}
#profileImg {
  width: 100%;
}

.menuOptionDiv {
  transition: 0.2s;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  width: calc(100% - 20px);
  margin-left: 10px;
  height: 50px;
  border-radius: 10px;
}

.menuOptionDiv:hover {
  background-color: var(--color-B2);
}

.menuOptionImg {
  position: absolute;
  left: 0;
  width: 40px;
}

.menuOptionText {
  position: absolute;
  color: var(--color-W);
  left: 0;
  margin-left: 50px;
}
#squaresImg {
  margin-top: 20px;
  width: calc(100% - 20px);
  margin-left: 10px;
}
</style>
