<template>
  <div id="menuDiv">
    <div id="profileDiv">
      <div id="profilePhotoDiv">
        <img id="profileImg" :src="profileImg">
      </div>
      <p id="profileName" class="bellotaBold">Username</p>
    </div>

    <div v-for="(option, index) in menuOptions" :key="index" class="menuOptionDiv">
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
  
  export default {
    data() {
      return {
        profileImg,
        menuOptions: [
          { imgSrc: favoriteImg, text: 'Lista de favoritos' },
          { imgSrc: shopsImg, text: 'Compras' },
          { imgSrc: workshopsImg, text: 'Talleres' },
          { imgSrc: couponImg, text: 'Canjear cupón' }
        ]
      };
    },
    name: 'Menu',
  };
</script>

<style scoped>
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
</style>
