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
            />
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
              <p class="discount-text bellotaRegular">{{ coupon.discount }} de descuento en <span class="bellotaBold">{{ coupon.type }}</span></p>
              <p class="expiry-date bellotaBold">Fecha de vencimiento: {{ coupon.expirationDate = new Date(coupon.expirationDate).toISOString().split('T')[0].replace(/-/g, '/') }}</p>
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
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2'; // Importamos SweetAlert2
  import 'sweetalert2/dist/sweetalert2.min.css'; // Estilo de SweetAlert2
  import titleSquare from '../images/titleSquare.svg';
  import rotatedSquare from '../images/rotatedSquare.svg';
  import backArrow from '../images/backArrow.svg';
  import coupon from '../images/coupon.svg';
  
  const couponCode = ref(''); // Código ingresado por el usuario
  const coupons = ref([]); // Lista de cupones obtenidos
  const router = useRouter(); // Instancia del enrutador de Vue Router
  
  // Función para obtener los cupones desde el backend
  const fetchCoupons = async () => {
    try {
      const response = await fetch('http://localhost:5000/coupons/general', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials: 'include', // Asegura que se envíen las cookies
      });
  
      if (response.ok) {
        const result = await response.json();
        result.data.forEach(coupon => {
          coupon.image = 'https://www.svgrepo.com/show/99650/voucher.svg';
        });
        coupons.value = result.data; // Actualizamos los cupones con la data de la respuesta
      } else if (response.status === 401) {
        // Redirige al usuario a /login si recibe un código 401
        router.push('/login');
      } else {
        console.error('Error al obtener cupones:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  
  // Validar el código del cupón ingresado
  const validateCoupon = async () => {
    if (!couponCode.value.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor, ingrese un código de cupón.',
      });
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/coupons/search?code=${couponCode.value}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-version': '1.0.0',
        },
        credentials: 'include',
      });
  
      const res = await response.json();
  
      if (response.ok && res.data.length > 0) {
        const coupon = res.data[0];
  
        // Si el tipo de cupón es "workshop", validar que solo se aplique a productos con los ids correctos
        if (coupon.type === 'workshop') {
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          let couponApplied = false;
  
          cart.forEach(product => {
            if (!product.usedCoupons) product.usedCoupons = [];
            // Validar si el producto tiene el id adecuado para aplicar el cupón de tipo "workshop"

            if (!product.usedCoupons.includes(coupon._id) && product.productData.workshopId._id == coupon.workshopId) {
              const priceNumber = parseFloat(product.price.replace('$', ''));
              const discountedPrice = (priceNumber * (1 - coupon.discount / 100)).toFixed(2);
              product.price = `$${discountedPrice}`;
              product.usedCoupons.push(coupon._id);
              couponApplied = true;
            }
          });
  
          if (couponApplied) {
            localStorage.setItem('cart', JSON.stringify(cart));
            Swal.fire({
              icon: 'success',
              title: 'Cupón aplicado',
              text: `El cupón de tipo "workshop" fue aplicado exitosamente a los productos elegibles.`,
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Sin cambios',
              text: 'El cupón no se aplicó porque no es válido para los productos en el carrito.',
            });
          }
        } else {
          // Si el cupón no es de tipo "workshop", aplicar normalmente a todos los productos
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          let couponApplied = false;
  
          cart.forEach(product => {
            if (!product.usedCoupons) product.usedCoupons = [];
            if (!product.usedCoupons.includes(coupon._id)) {
              const priceNumber = parseFloat(product.price.replace('$', ''));
              const discountedPrice = (priceNumber * (1 - coupon.discount / 100)).toFixed(2);
              product.price = `$${discountedPrice}`;
              product.usedCoupons.push(coupon._id);
              couponApplied = true;
            }
          });
  
          if (couponApplied) {
            localStorage.setItem('cart', JSON.stringify(cart));
            Swal.fire({
              icon: 'success',
              title: 'Cupón aplicado',
              text: `El cupón fue aplicado exitosamente a los productos elegibles.`,
            });
          } else {
            Swal.fire({
              icon: 'info',
              title: 'Sin cambios',
              text: 'El cupón ya fue utilizado o no es aplicable a ningún producto.',
            });
          }
        }
      } else if (response.status === 401) {
        router.push('/login');
      } else if (response.status === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Cupón no válido',
          text: 'Cupón no encontrado o inválido.',
        });
      } else {
        console.error('Error al validar cupón:', response.status);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al validar el cupón.',
      });
    }
  };
  
  // Usar un cupón específico desde la lista
  const useCoupon = (coupon) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let couponApplied = false;
  
    cart.forEach(product => {
      if (!product.usedCoupons) product.usedCoupons = [];
      if (!product.usedCoupons.includes(coupon._id)) {
        const priceNumber = parseFloat(product.price.replace('$', ''));
        const discountedPrice = (priceNumber * (1 - coupon.discount / 100)).toFixed(2);
        product.price = `$${discountedPrice}`;
        product.usedCoupons.push(coupon._id);
        couponApplied = true;
      }
    });
  
    if (couponApplied) {
      localStorage.setItem('cart', JSON.stringify(cart));
      Swal.fire({
        icon: 'success',
        title: 'Cupón aplicado',
        text: 'El cupón fue aplicado exitosamente a los productos elegibles.',
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'El cupón ya fue utilizado o no es aplicable a ningún producto.',
      });
    }
  };
  
  // Obtener los cupones cuando se monta el componente
  onMounted(() => {
    fetchCoupons();
  });
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