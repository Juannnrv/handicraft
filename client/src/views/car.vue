<template>
    <div v-if="isMenuVisible" ref="menu" class="menuContainer">
        <Menu />
    </div>
    <div v-if="succes" id="succesDiv" class="bellotaRegular">
        <img id="giantCheckImg" :src="giantCheckImg">
        <span class="bellotaBold" style="font-size: 20px;">¡Compra realizada con exito!</span>
        <img class="squaresGroupImg" :src="squaresGroupImg">
        Gracias por apoyar a los artesanos peruanos
        <img class="squaresGroupImg" :src="squaresGroupImg">
        Sigue buscando artesanías!
        <div id="backDiv" @click="goToHome" class="bellotaRegular">Regresar al inicio</div>
    </div>
    <div id="homeGrid">
        <div class="homeGridSectionB">
            <img id="menuImg" :src="menuImg" @click="toggleMenuVisibility">
            <div id="homeInputDiv">
                <input class="bellotaRegular" type="text" id="homeInput" placeholder="Buscar producto o tienda...">
                <img id="glassImg" :src="glassImg">
            </div>
        </div>
        <div class="homeGridSection">
            <img id="squareImg" :src="squareImg">
            <p class="bellotaBold" id="carTitle">Tu carrito de compras</p>
            <p class="bellotaRegular" id="carText">Revisa aquí los productos que añadiste a tu carrito</p>
        </div>
        <div class="homeGridSection" id="productsGrid">
            <div v-for="(product, index) in products" :key="index" class="productSection">
                <div class="productSectionDiv center">
                    <div class="productImgDiv center">
                        <img class="productImg" :src="product.productData.photos[0]">
                    </div>
                    <div class="productCountDiv">
                        <div class="productCountDivSection select" @click="decrementCount(index)">
                            <img class="countImg" :src="minusImg">
                        </div>
                        <div class="productCountDivSection"><p class="countNumber">{{ product.quantity }}</p></div>
                        <div class="productCountDivSection select" @click="incrementCount(index)">
                            <img class="countImg" :src="plusImg">
                        </div>
                    </div>
                </div>
                <div class="productSectionDiv padding">
                    <img class="trashImg" :src="trashImg" @click="removeProduct(index)">
                    <p class="productText">{{ product.name }}</p>
                    <p class="productText">{{ product.price }}</p>
                    <p class="productText">{{ product.productData.dimensions }}</p>
                    <p class="productText">{{ product.productData.description }}</p>
                </div>
            </div>
        </div>
        <div class="homeGridSection">
            <div class="bellotaBold" id="couponDiv" @click="showCouponInput">
                <p v-if="!isCouponInputVisible">Añadir cupón de descuento</p>
                <input class="bellotaRegular" placeholder="Ingrese código del cupón..." v-if="isCouponInputVisible" id="couponInput" type="text" v-model="couponCode" @keydown.enter="applyCoupon">
            </div>
        </div>
        <div class="homeGridSection2">
            <div class="bellotaBold" id="infoDiv">
                <p id="subtotalText">Sub total</p>
                <p id="envioText">Envío</p>
                <p id="subtotalValue">${{ subtotal }}</p>
                <p id="envioValue">${{ envioCost }}</p>
            </div>
            <div class="bellotaBold" id="totalDiv">
                <p id="totalText">Total</p>
                <p id="totalValue">${{ total }}</p>
            </div>
            <div class="bellotaBold" id="buyDiv" v-if="products.length > 0" @click="buy">
                Realizar compra
            </div>
        </div>
    </div>
    <Footer :selectedIndex="3" />
</template>

<script>
import squareImg from '../images/square.svg';
import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import ubicationImg from '../images/ubication.svg';
import squaresGroupImg from '../images/squaresGroup3.svg';
import homeBGImg from '../images/homeBG.svg';
import productImg from '../images/test/workshop.svg';
import trashImg from '../images/trash.svg';
import giantCheckImg from '../images/giantCheck.svg';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import 'sweetalert2/dist/sweetalert2.min.css'; // Estilo de SweetAlert2

import minusImg from '../images/minus.svg';
import plusImg from '../images/plus.svg';

import Footer from '../components/footer.vue';
import Menu from '../components/menu.vue';

export default {
    data() {
        return {
            menuImg,
            glassImg,
            ubicationImg,
            squareImg,
            squaresGroupImg,
            homeBGImg,
            productImg,
            trashImg,
            minusImg,
            plusImg,
            giantCheckImg,
            isCouponInputVisible: false,
            isMenuVisible: false,
            succes: false,
            products: this.getProductsFromLocalStorage(),
            couponCode: "", // Aquí añadimos el código del cupón
        };
    },
    components: {
        Footer,
        Menu,
    },
    methods: {
        redirectToWorkshops() {
            this.$router.push('/workshops');
        },
        showCouponInput() {
            if (!this.isCouponInputVisible) {
                this.isCouponInputVisible = true;
            }
        },
        toggleMenuVisibility() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        handleClickOutside(event) {
            if (this.isMenuVisible && this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                this.isMenuVisible = false;
            }
        },
        decrementCount(index) {
            if (this.products[index].quantity > 1) {
                this.products[index].quantity--;
                this.updateLocalStorage();
            }
        },
        incrementCount(index) {
            this.products[index].quantity++;
            this.updateLocalStorage();
        },
        removeProduct(index) {
            this.products.splice(index, 1);
            this.updateLocalStorage();
        },
        goToHome() {
            this.$router.push('/home');
        },
        async buy() {
            const orderDetails = this.products.map(product => ({
                productId: product.productData._id,
                quantity: product.quantity,
                price: parseFloat(product.price.replace('$', '').trim())
            }));

            const today = new Date();
            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const year = today.getFullYear();
            const formattedDate = `${day}/${month}/${year}`;

           // Recuperar cart del localStorage (suponiendo que es un string JSON)
            const cart = JSON.parse(localStorage.getItem('cart'));

            // Crear la orden
            const order = {
                products: orderDetails,
                total: this.total,
                date: formattedDate,
                coupons: [] 
            };

            // Recorrer los elementos de cart
            cart.forEach(item => {
                if (item.usedCoupons && Array.isArray(item.usedCoupons)) {
                    item.usedCoupons.forEach(coupon => {
                        // Verificar si el cupón ya está en la lista de cupones de la orden
                        if (!order.coupons.includes(coupon)) {
                            order.coupons.push(coupon); // Agregar el cupón si no existe
                        }
                    });
                }
            });

            console.log(order.coupons);


            try {
                const response = await fetch('http://localhost:5000/orders/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-version': '1.0.0'
                    },
                    body: JSON.stringify(order),
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error('Error al crear la orden');
                }

                const data = await response.json();
                console.log('Respuesta de la API:', data);
                console.log('Orden creada con éxito:', data);

                localStorage.removeItem('cart');
                this.succes = true;
            } catch (error) {
                console.error('Error en la solicitud:', error);
            }
        },
        getProductsFromLocalStorage() {
            const storedProducts = localStorage.getItem('cart');
            return storedProducts ? JSON.parse(storedProducts) : [];
        },
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.products));
        },
        async applyCoupon() {
            if (this.couponCode.trim()) {
                try {
      const response = await fetch(`http://localhost:5000/coupons/search?code=${this.couponCode.trim()}`, {
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
            this.products = this.getProductsFromLocalStorage()
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
            console.log(product)
            if (!product.usedCoupons) product.usedCoupons = [];
            if (!product.usedCoupons.includes(coupon._id)) {
                const priceNumber = parseFloat(product.price.replace('$', ''));
                console.log(product)
              const discountedPrice = (priceNumber * (1 - coupon.discount / 100)).toFixed(2);
              product.price = `$${discountedPrice}`;
              product.usedCoupons.push(coupon._id);
              couponApplied = true;
            }
          });
  
          if (couponApplied) {
            localStorage.setItem('cart', JSON.stringify(cart));
            this.products = this.getProductsFromLocalStorage()
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
            }
        }
    },
    computed: {
        subtotal() {
            return this.products.reduce((total, product) => {
                const price = parseFloat(product.price.replace('$', '').trim());
                return total + price * product.quantity;
            }, 0);
        },
        envioCost() {
            return this.products.length > 0 ? 10 : 0;
        },
        total() {
            return this.subtotal + this.envioCost;
        }
    },
    mounted() {
        document.addEventListener('mousedown', this.handleClickOutside);
        // Asegurarse de que el ref esté correctamente asignado en el template
        const couponInput = this.$refs.couponInput;
        if (couponInput) {
            couponInput.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    this.applyCoupon();
                }
            });
        }
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    name: 'TestComponent'
}
</script>



<style scoped>

    #homeGrid{
        overflow-y: scroll;
        display: grid;
        grid-template-rows: 80px 80px 260px 60px calc(100% - 400px);
        width: 100vw;
        height: 100vh;
    }
    .homeGridSection{
        display: flex;
        align-items: center;
        position: relative;
    }
    .homeGridSectionB{
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-B);
    }

    #menuImg{
        width: 40px;
        cursor: pointer;
        position: absolute;
        height: 50%;
        margin-left: 10px;
    }
    #glassImg{
        margin-left: 10px;
        width: 25px;
        height: 25px;
        position: absolute;
    }
    #homeInputDiv{
        display: flex;
        align-items: center;
        position: absolute;
        height: 50%;
        width: calc(100% - 80px);
        right: 0;
        margin-right: 10px;
    }
    #homeInput{
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        background-color: var(--color-B2);
        outline: none;
        border: none;
        border-radius: 8px;
        padding-left: 40px;
        color: var(--color-W);
    }

    #squareImg{
        position: absolute;
        height: 50px;
    }
    #carTitle{
        position: absolute;
        font-size: 20px;
        margin-left: 25px;
    }
    #carText{
        color: var(--color-B);
        position: absolute;
        bottom: 0;
        font-size: 14px;
        margin-left: 25px;
    }

    #productsGrid{
        display: grid;
        gap: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        grid-template-columns: 1;
        overflow-y: auto;
    }
    .productSection{
        display: grid;
        grid-template-columns: 120px calc(100% - 120px);
        width: calc(100% - 50px);
        margin-left: 25px;
        height: 160px;
        background-color: var(--color-B3);
        border-radius: 8px;
    }

    .productSectionDiv{
        position: relative;
    }
    .productImgDiv{
        position: absolute;
        top: 0;
        margin-top: 10px;
        background-color: var(--color-W);
        border-radius: 8px;
        width: 100px;
        height: 100px;
    }
    .productImg{
        width: 100%;
        height: 100%;
    }
    .productCountDiv{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        overflow: hidden;
        gap: 4px;
        position: absolute;
        bottom: 0;
        margin-bottom: 10px;
        border-radius: 8px;
        width: 100px;
        height: 30px;
    }
    .productCountDivSection{
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--color-B2);
    }
    .countNumber{
        font-family: 'bellotaBold';
        color: var(--color-W);
    }
    .countImg{
        width: 10px;
    }
    .productText{
        font-family: 'bellotaRegular';
        font-size: 14px;
        width: 80%;
    }
    .trashImg{
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        margin-right: 20px;
        margin-top: 20px;
    }

    #couponDiv{
        display: flex;
        font-size: 18px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border-radius: 8px;
        width: calc(100% - 50px);
        margin-left: 25px;
        background-color: var(--color-B3);
        height: 40px;
    }

    #infoDiv{
        position: relative;
        width: calc(100% - 50px);
        margin-left: 25px;
        height: 70px;
        background-color: var(--color-B3);
        border-radius: 8px;
    }
    #subtotalText{
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 10px;
        margin-left: 10px;
    }
    #envioText{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 10px;
        margin-left: 10px;
    }
    #subtotalValue{
        position: absolute;
        top: 0;
        right: 0;
        margin-top: 10px;
        margin-right: 10px;
    }
    #envioValue{
        position: absolute;
        bottom: 0;
        right: 0;
        margin-bottom: 10px;
        margin-right: 10px;
    }

    #totalDiv{
        position: relative;
        display: flex;
        align-items: center;
        width: calc(100% - 50px);
        margin-left: 25px;
        margin-top: 10px;
        height: 40px;
        background-color: var(--color-B3);
        border-radius: 8px;
    }
    #totalText{
        position: absolute;
        left: 0;
        margin-left: 10px;
    }
    #totalValue{
        position: absolute;
        right: 0;
        margin-right: 10px;
    }

    #buyDiv{
        cursor: pointer;
        background-color: var(--color-B2);
        height: 30px;
        color: var(--color-W);
        width: 180px;
        margin-left: calc((100% - 180px) / 2);
        margin-top: 15px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #couponInput{
        background-color: var(--color-B3);
        width: 100%;
        height: 100%;
        border-radius: 8px;
        border: none;
        padding-left: 20px;
        outline: none;
    }

    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .padding{
        padding: 10px;
    }
    .select{
        cursor: pointer;
    }

    #succesDiv{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding-left: 10vw;
        padding-right: 10vw;
        width: 100vw;
        height: 100vh;
        background-color: var(--color-W);
        z-index: +1;
    }
    #giantCheckImg{
        width: 220px;
        margin-bottom: 20px;
    }
    .squaresGroupImg{
        margin-top: 20px;
        margin-bottom: 20px;
        width: 220px;
    }

    #backDiv{
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--color-W);
        margin-top: 20px;
        width: 160px;
        height: 30px;
        background-color: var(--color-B2);
    }
</style>