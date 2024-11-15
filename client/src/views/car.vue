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
                <input class="bellotaRegular" placeholder="Ingrese código del cupón..." v-if="isCouponInputVisible" id="couponInput" type="text">
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
    // Crear el array de objetos con la estructura requerida
    const orderDetails = this.products.map(product => ({
        productId: product.productData._id, // Suponiendo que cada producto tiene un _id único
        quantity: product.quantity,
        price: parseFloat(product.price.replace('$', '').trim()) // Asegúrate de convertir el precio a número
    }));

    // Obtener la fecha de hoy en formato DD/MM/YYYY
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Asegura que el día tenga 2 dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed, por eso sumamos 1
    const year = today.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const order = {
        products: orderDetails,
        total: this.total, // Utiliza el total calculado en la propiedad computada
        date: formattedDate, // La fecha en formato DD/MM/YYYY
        coupons: [] // Si tienes un cupón, puedes añadirlo aquí más adelante
    };

    // Mostrar el array de objetos en consola
    console.log(order);

    try {
        // Realizar la solicitud POST a la API para crear la orden
        const response = await fetch('http://localhost:5000/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'
            },
            body: JSON.stringify(order),
            credentials: 'include' // Esto asegura que se envíen las cookies de sesión si las hay
        });

        if (!response.ok) {
            throw new Error('Error al crear la orden');
        }

        const data = await response.json(); // Esperar la respuesta JSON
        // Aquí puedes manejar la respuesta exitosa
        console.log('Respuesta de la API:', data); // Imprime la respuesta completa
        console.log('Orden creada con éxito:', data);

        // Vaciar el carrito después de la compra
        localStorage.removeItem('cart');
        this.succes = true;
    } catch (error) {
        // Aquí puedes manejar los errores
        console.error('Error en la solicitud:', error);
    }
}


,
        getProductsFromLocalStorage() {
            const storedProducts = localStorage.getItem('cart');
            return storedProducts ? JSON.parse(storedProducts) : [];
        },
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.products));
        },
    },
    computed: {
        subtotal() {
            return this.products.reduce((total, product) => {
                const price = parseFloat(product.price.replace('$', '').trim()); // Convertir el precio a número
                return total + price * product.quantity; // Ahora puedes multiplicar correctamente
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