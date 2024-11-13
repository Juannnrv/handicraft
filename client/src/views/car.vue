<template>
    <div v-if="isMenuVisible" ref="menu" class="menuContainer">
        <Menu />
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
            <div class="productSection">
                <div class="productSectionDiv center">
                    <div class="productImgDiv center">
                        <img class="productImg" :src="productImg">
                    </div>
                    <div class="productCountDiv">
                        <div class="productCountDivSection select" @click="decrementCount" ><img class="countImg" :src="minusImg"></div>
                        <div class="productCountDivSection"><p class="countNumber">{{ product.count }}</p></div>
                        <div class="productCountDivSection select" @click="incrementCount" ><img class="countImg" :src="plusImg"></div>
                    </div>
                </div>
                <div class="productSectionDiv padding">
                    <img class="trashImg" :src="trashImg">

                    <p class="productText">{{ product.name }}</p>
                    <p class="productText">${{ product.price }}</p>
                    <p class="productText">{{ product.dimensions }}</p>
                    <p class="productText">{{ product.producer }}</p>
                </div>
            </div>
        </div>
        <div class="homeGridSection">
            <div class="bellotaBold" id="couponDiv" @click="showCouponInput">
                <p v-if="!isCouponInputVisible">Añadir cupón de descuento</p>
                <input class="bellotaRegular" placeholder="Ingrese codigo del cupon..." v-if="isCouponInputVisible" id="couponInput" type="text">
            </div>
        </div>
        <div class="homeGridSection2">
            <div class="bellotaBold" id="infoDiv">
                <p id="subtotalText">Sub total</p>
                <p id="envioText">Envío</p>
                <p id="subtotalValue">${{ subtotal }}</p>
                <p id="envioValue">${{ product.count > 0 ? 10 : 0 }}</p>
            </div>
            <div class="bellotaBold" id="totalDiv">
                <p id="totalText">Total</p>
                <p id="totalValue">${{ total }}</p>
            </div>
            <div class="bellotaBold" id="buyDiv" v-if="product.count > 0">
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
import squaresGroupImg from '../images/squaresGroup.svg';
import homeBGImg from '../images/homeBG.svg';
import productImg from '../images/test/workshop.svg';
import trashImg from '../images/trash.svg';

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
            isCouponInputVisible: false,
            isMenuVisible: false,
            product: {
                name: 'Vasija pequeña con diseño de flor',
                price: 50,
                dimensions: '13x10 cm, 2 KG',
                producer: 'Asoc. de artesanos productores de Chazuta',
                count: 1
            }
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
        decrementCount() {
        if (this.product.count > 0) {
            this.product.count--;
        }
        },
        incrementCount() {
            this.product.count++;
        },
    },
    computed: {
        subtotal() {
            return this.product.price * this.product.count;
        },
        total() {
            const envio = this.product.count > 0 ? 10 : 0;
            return this.subtotal + envio;
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
</style>