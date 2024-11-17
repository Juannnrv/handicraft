<template>
  <div id="workshopsGrid">
    <div class="workshopsGridSection center">
      <img 
        id="productBGImg" 
        :src="product.photos && product.photos.length > 0 ? product.photos[0] : null"
      />
      <img id="square2Img" :src="square2Img">
      <img id="arrow2Img" :src="arrow2Img" @click="goToHome">
      <div v-if="discount" id="discountDiv">
        <img id="discountImg" :src="discountImg">
        <p id="discountNumber" class="bellotaRegular">{{ discountPercent }}%</p>
      </div>
    </div>
    <div class="workshopsGridSection bellotaRegular" id="moreInfoDiv">
      {{ product.name }}
      <img id="squareImg1" :src="squareImg">
      <img id="squareImg2" :src="squareImg">
    </div>
    <div id="infoDiv">
      <img 
        id="hearthEmptyImg" 
        :src="isHearthFull ? hearthFullImg : hearthEmptyImg" 
        @click="toggleHearth" 
      >
      <p class="detailsText">
        <span v-if="discount" class="bellotaRegular" id="Oprice">{{ Oprice }}</span>
        <span class="bellotaBold">{{ Fprice }}</span>
      </p>
      <p class="detailsText"><span class="bellotaBold">{{ workshop.name}}</span></p>
      <p class="detailsText"><span class="bellotaBold">Dimensiones:</span> {{ product.dimensions }}</p>
      <p class="detailsText"><span class="bellotaBold">Descripción:</span> {{ product.description }}</p>
      <div id="alertTextDiv">
        <img id="checkImg" :src="checkImg">
        <p class="detailsText">Cuenta con envío hacia tu ubicación</p>
      </div>
      <div id="addCartDiv" @click="addToCart">
        <img id="shopCarImg" :src="shopCarImg">
        Añadir a mi carrito de compras
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import Footer from '../components/footer.vue';
import menuImg from '../images/menu.svg';
import squareImg from '../images/square.svg';
import workshopImg from '../images/test/workshop.svg';
import fSquareImg from '../images/fullSquare.svg';
import square2Img from '../images/square2.svg';
import arrowImg from '../images/arrow.svg';
import arrow2Img from '../images/arrow2.svg';
import hearthEmptyImg from '../images/hearthEmpty.svg';
import hearthFullImg from '../images/hearthFull.svg';
import checkImg from '../images/check.svg';
import shopCarImg from '../images/shopCar.svg';
import discountImg from '../images/discount.svg';
import productBGImg from '../images/test/productBG.svg';

export default {
  data() {
    return {
      menuImg,
      squareImg,
      fSquareImg,
      square2Img,
      arrowImg,
      arrow2Img,
      hearthEmptyImg,
      hearthFullImg,
      checkImg,
      shopCarImg,
      discountImg,
      productBGImg,
      discount: false,
      isHearthFull: false,
      product: {
        photos: []
      },
      workshop: {},
      originalPrice: null,
      discountedPrice: null,
      discountPercent: 0,
      Oprice: null,
      Fprice: null
    };
  },
  components: {
    Footer,
  },
  mounted() {
    const productId = this.$route.query.id;
    this.fetchProductDetails(productId);
  },
  methods: {
    goToHome() {
      this.$router.push('/home');
    },
    toggleHearth() {
      let productId = this.$route.query.id;
      if (this.isHearthFull) {
        fetch(`http://localhost:5000/user/favorites/${productId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'
          },
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => console.log(data));
      } else {
        fetch(`http://localhost:5000/user/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-version': '1.0.0'
          },
          body: JSON.stringify({ "favoriteId": productId }),
          credentials: 'include'
        })
        .then(response => response.json())
        .then(data => console.log(data));
      }
      this.isHearthFull = !this.isHearthFull;
    },
    fetchProductDetails(productId) {
      fetch(`http://localhost:5000/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        const productData = data.data;
        if (productData.discount) {
          this.discount = true;
          this.discountPercent = productData.percentage;
          this.Oprice = `$${productData.price}`;
          this.Fprice = `$${(productData.price * (1 - productData.percentage / 100)).toFixed(2)}`;
        } else {
          this.Fprice = `$${productData.price}`;
        }
        this.workshop = productData.workshopId;
        this.product = productData;
        this.originalPrice = productData.price.original || 0;
        this.discountedPrice = productData.price.discounted || 0;
      })
      .catch(error => console.error('Error fetching product details:', error));

      fetch(`http://localhost:5000/user/favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0'
        },
        credentials: 'include'
      })
      .then(response => response.json())
      .then(data => {
        const favoritesList = data.data.products;
        for (let i = 0; i < favoritesList.length; i++) {
          if (favoritesList[i]._id === productId) {
            this.isHearthFull = true;
          }
        }
      });
    },
    addToCart() {
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      const productInCart = cart.find(item => item.id === this.product._id);

      if (!productInCart) {
        cart.push({
          id: this.product._id,
          name: this.product.name,
          price: this.Fprice,
          image: this.product.image,
          quantity: 1,
          productData: this.product
        });
      } else {
        productInCart.quantity += 1;
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      // SweetAlert2: Mostrar una alerta estilizada
      Swal.fire({
        title: '¡Añadido al carrito!',
        text: `${this.product.name} se ha agregado correctamente.`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        timer: 2000,
        timerProgressBar: true,
      });
    }
  },
  name: 'ProductDetails'
};
</script>

  

<style scoped>
    #workshopsGrid {
        display: grid;
        grid-template-rows: 300px 40px calc(100% - 340px);
        width: 100vw;
        height: 100vh;
    }
    .workshopsGridSection {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    .workshopsGridSectionB {
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-B);
    }
    #squareImg {
        position: absolute;
        left: 0;
        height: 80px;
    }
    #arrowImg{
        cursor: pointer;
        position: absolute;
        height: 20px;
        margin-left: 6px;
        left: 0;
        z-index: +1;
    }
    #wrokshopsGrid {
        height: 100%;
        padding-bottom: 30px;
        margin: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
        overflow: auto;
    }
    .wrokshopsGridSection {
        overflow: hidden;
        border-radius: 10px;
        position: relative;
        display: grid;
        grid-template-rows: 60% 40%;
        height: 180px;
    }
    .wrokshopsGridSectionDiv {
        position: relative;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    .wrokshopsGridSectionDivB {
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: var(--color-B);
    }
    .wrokshopsGridSectionText {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionText2 {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionPrice{
        position: absolute;
        left: 0;
        margin-bottom: 6px;
        margin-left: 4px;
        margin-top: 8px;
        color: var(--color-W);
        font-size: 16px;
    }
    .workshopImg {
        height: 100%;
    }
    #categoryGrid {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 140px;
        overflow-x: auto;
        border-bottom: 2px solid var(--color-B);
    }
    .categoryGridDiv {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        height: 100%;
    }
    .categoryGridDivB {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        height: 100%;
        border-bottom: 4px solid var(--color-B);
    }
    .lineText {
    text-decoration: line-through;
    }

    .discountPercentDiv{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: absolute;
        width: 50px;
        height: 50px;
        top: 0;
        left: 0;
        z-index: +1;
    }
    .dcImg{
        position: absolute;
        width: 100%;
    }
    .discountPercent{
        position: absolute;
        z-index: +1;
        color: var(--color-W);
        font-size: 14px;
    }
    #fSquareImg{
        position: absolute;
        width: 68px;
    }
    #categoryTitle{
        z-index: +1;
        position: absolute;
        font-size: 22px;
        color: var(--color-B);
    }
    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #categoriesInputInput{
        position: absolute;
        padding-left: 40px;
        font-size: 14px;
        border: none;
        outline: none;
        border-radius: 8px;
        width: calc(100% - 100px);
        margin-left: 25px;
        height: 100%;
        background-color: var(--color-B3);
    }
    #glassImg{
        filter: invert();
        width: 20px;
        margin-left: 35px;
        position: absolute;
        z-index: +1;
    }
    #filtersImg{
        position: absolute;
        right: 0;
        margin-right: 30px;
        width: 28px;
    }
    #commentImg{
        position: absolute;
        right: 0;
        margin-right: 24px;
        width: 44px;
    }
    #productBGImg{
        position: absolute;
        height: 100%;
    }

    #moreInfoDiv{
        display: flex;
        align-items: center;
        text-align: center;
        color: var(--color-W);
        background-color: var(--color-B2);
        padding-left: 40px;
    }
    #workshopTitleDiv{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        position: absolute;
        margin-left: calc((100% - 200px) / 2);
        color: var(--color-W);
        top: 0;
        width: 200px;
        height: 40px;
        background-color: var(--color-B2);
        z-index: +1;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    #square2Img{
        position: absolute;
        left: 0;
        top: 0;
        width: 34px;
        z-index: +1;
    }
    #arrow2Img{
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 25px;
        margin-left: 5px;
        width: 16px;
        z-index: +1;
    }

    #squareImg1{
        position: absolute;
        height: 100%;
        left: 0;
    }
    #squareImg2{
        position: absolute;
        height: 100%;
        right: 0;
        transform: rotate(180deg);
    }

    #infoDiv{
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    .detailsText{
        font-family: 'bellotaRegular';
        margin-bottom: 3px;
    }
    #hearthEmptyImg{
        cursor: pointer;
        position: absolute;
        top: 0;
        right: 0;
        width: 50px;
        margin: 10px;
    }
    #alertTextDiv{
        display: flex;
        align-items: center;
        position: relative;
        padding-left: 30px;
        margin-top: 30px;
    }
    #checkImg{
        position: absolute;
        height: 100%;
        left: 0;
    }

    #addCartDiv{
        cursor: pointer;
        position: relative;
        font-family: 'bellotaRegular';
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        border-radius: 8px;
        margin-top: 30px;
        width: 300px;
        height: 30px;
        background-color: var(--color-B3);
    }
    #shopCarImg{
        height: 80%;
    }

    #discountDiv{
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 0;
        left: 0;
        margin: 10px;
        width: 80px;
        height: 80px;
        z-index: +1;
    }
    #discountImg{
        width: 100%;
    }
    #discountNumber{
        position: absolute;
        color: var(--color-W);
        font-size: 16px;
    }
    #Oprice{
        text-decoration: line-through;
        margin-right: 4px;
    }
</style>