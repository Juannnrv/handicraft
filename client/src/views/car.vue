<template>
    <div id="homeGrid">
        <div class="homeGridSectionB">
            <img id="menuImg" :src="menuImg">
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
                </div>
                <div class="productSectionDiv padding">
                    <img class="trashImg" :src="trashImg">

                    <p class="productText">Vasija pequeña con diseño de flor</p>
                    <p class="productText">$50</p>
                    <p class="productText">13x10 cm, 2 KG</p>
                    <p class="productText">Asoc. de artesanos productores de Chazuta</p>
                </div>
            </div>
        </div>
        <div class="homeGridSection">

        </div>
        <div class="homeGridSection">
            
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

import Footer from '../components/footer.vue';

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
            trashImg
        };
    },
    components: {
        Footer,
    },
    methods: {
        redirectToWorkshops() {
            this.$router.push('/workshops');
        }
    },
    name: 'TestComponent'
}
</script>
<style scoped>

    #homeGrid{
        display: grid;
        grid-template-rows: 80px 80px 260px 60px calc(100% - 420px);
        width: 100vw;
        height: 100vh;
    }
    .homeGridSection{
        border: 1px solid green;
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
        background-color: var(--color-W);
        border-radius: 8px;
        box-shadow: 0px 0px 20px 0px var(--color-B-44);
        width: 100px;
        height: 100px;
    }
    .productImg{
        width: 100%;
        height: 100%;
    }
    .productText{
        font-family: 'bellotaRegular';
        font-size: 14px;
        width: 80%;
    }
    .trashImg{
        position: absolute;
        right: 0;
        top: 0;
        width: 24px;
        margin-right: 10px;
        margin-top: 10px;
    }

    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .padding{
        padding: 10px;
    }
</style>