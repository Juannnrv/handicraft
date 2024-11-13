<template>
    <div class="coupon-container">
        <header class="header">
        <img class="square-bg" :src="rotatedSquare" alt="">
        <a class="a-back" href="home">
            <img class="back-arrow" :src="backArrow" alt="">
        </a>
        <img class="title-square" :src="titleSquare" alt="">
        <h1 class="title bellotaBold">
            Canjear<br>cupón
        </h1>
      </header>
  
      <div class="coupon-form">
        <p class="form-text bellotaBold">¿Cuentas con algún cupón de descuento? Canjealo aquí</p>
        
        <div class="input-group">
          <img :src="coupon" style="width: 30px; margin: 0px 3px 0px 10px;" alt="">
          <input 
            type="text" 
            v-model="couponCode"
            placeholder="Ingresa tu cupón"
            class="coupon-input bellotaRegular"
          >
          <button @click="validateCoupon" class="validate-button bellotaLight">
            Validar
          </button>
        </div>
      </div>
  
      <div class="valid-coupons">
        <h2 class="section-title bellotaBold">Cupones vigentes</h2>
        <small class="expiry-notice bellotaRegular">*Usar antes de la fecha de vencimiento</small>
  
        <div class="coupons-list">
          <div v-for="coupon in coupons" :key="coupon.id" class="coupon-card">
            <img :src="coupon.image" :alt="coupon.title" class="coupon-image">
            <div class="coupon-details">
              <p class="discount-text bellotaRegular">{{ coupon.discount }} de descuento en <span class="bellotaBold">{{ coupon.description }}</span></p>
              <p class="expiry-date bellotaBold">Fecha de vencimiento: {{ coupon.expiryDate }}</p>
              <button @click="useCoupon(coupon)" class="use-button bellotaRegular">
                Usar cupón
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import titleSquare from '../images/titleSquare.svg'
  import rotatedSquare from '../images/rotatedSquare.svg'
import backArrow from '../images/backArrow.svg'
import coupon from '../images/coupon.svg'
  
  const couponCode = ref('')
  
  const coupons = ref([
    {
      id: 1,
      image: 'https://images.gameinfo.io/pokemon/256/p94f466.webp',
      discount: '50%',
      description: 'cartucheras del Taller Awaq Ayllus',
      expiryDate: '4/9/23'
    },
    {
      id: 2,
      image: 'https://www.vinoskichak.com/cdn/shop/articles/vaso-vino-uvas-barriles-madera-frescos_1268-27965.jpg',
      discount: '30%',
      description: 'productos artesanales',
      expiryDate: '5/9/23'
    },
    {
      id: 3,
      image: 'https://www.abc.com.py/resizer/v2/https%3A%2F%2Farc-anglerfish-arc2-prod-abccolor.s3.amazonaws.com%2Fpublic%2FZFSIRJUWORBYFNCS44PO3BM3CE.jpg?auth=5aabd593e267bdc08bdcfe2bc5f29649697263713d819743b0ee21711d612f8a&width=770&smart=true',
      discount: '30%',
      description: 'productos artesanales',
      expiryDate: '5/9/23'
    }
  ])
  
  const validateCoupon = () => {
    // Add validation logic here
    console.log('Validating coupon:', couponCode.value)
  }
  
  const useCoupon = (coupon) => {
    // Add coupon usage logic here
    console.log('Using coupon:', coupon)
  }
  
  const goBack = () => {
    // Add navigation logic here
    console.log('Going back')
  }
  </script>
  
  <style scoped>
  .coupon-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 0px;
    display: flex;
    flex-direction: column;
    height: 100vh;
    max-height: 100vh;
  }
  
  .back-button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .arrow {
    color: #333;
  }
  
  .title {
    text-align: center;
    font-size: 24px;
    margin-bottom: 30px;
  }
  
  .form-text {
    margin-bottom: 15px;
    color: #333;
  }

  .coupon-form{
    padding: 10px 20px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    background-color: #D9D9D9;
    border-radius: 8px;
    padding: 5px;
    margin-bottom: 30px;
  }
  
  .ticket-icon {
    padding: 0 10px;
    font-size: 20px;
  }
  
  .coupon-input {
    flex: 1;
    border: none;
    background: none;
    padding: 10px;
    font-size: 16px;
  }
  
  .coupon-input:focus {
    outline: none;
  }
  
  .validate-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 6px 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 5px;
  }
  
  .section-title {
    font-size: 20px;
    margin-bottom: 5px;
  }
  
  .expiry-notice {
    color: #666;
    display: block;
    margin-bottom: 20px;
  }

  .valid-coupons{
    display: flex;
    flex-direction: column;
    flex-grow: 1; 
    overflow: hidden;
    padding: 0px 20px;

  }
  
  .coupons-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: scroll;
    scrollbar-width: none;
  }
  
  .coupon-card {
      background-color: #D9D9D9;
      border-radius: 8px;
    display: flex;
    overflow: hidden;
    align-items: center;
    flex-shrink: 0;
    height: 135px;
  }
  
  .coupon-image {
    width: 135px;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  
  .coupon-details {
    padding: 0px 15px;
    flex: 1;
  }
  
  .discount-text {
    font-size: 0.8em;
    margin-bottom: 10px;
  }
  
  .expiry-date {
    color: black;
    font-size: 0.8em;
    margin-bottom: 10px;
  }
  
  .use-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .use-button:hover {
    background-color: #444;
  }
  .header {
    padding: 20px;
    position: relative;
  }
  
  
  .title {
    text-align: center;
    font-size: 16px;
    margin: 0;
    line-height: 1.2;
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
    .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }
  </style>