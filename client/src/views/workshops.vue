<template>
    <div id="workshopsGrid">
        <div class="workshopsGridSectionB">
            <img id="menuImg" :src="menuImg">
            <div id="homeInputDiv">
                <input class="bellotaRegular" type="text" id="homeInput" placeholder="Buscar producto o tienda...">
                <img id="glassImg" :src="glassImg">
            </div>
        </div>
        <div class="workshopsGridSection">
            <p class="bellotaBold" id="workshopTitle">Talleres y tiendas artesanales</p>
            <p class="bellotaRegular" id="workshopText">Tiendas de artesanías de todas partes del Perú</p>
            <img id="squareImg" :src="squareImg">
        </div>
        <div class="workshopsGridSection">

        </div>
    </div>

    <Footer :selectedIndex="0" />
</template>
<script>

import Footer from '../components/footer.vue';

import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import squareImg from '../images/square.svg';

    export default {
        data() {
            return {
                menuImg,
                glassImg,
                squareImg
            }
        },
        components: {
            Footer,
        },
        name: 'TestComponent'
    }
</script>
<style scoped>

    #workshopsGrid{
        display: grid;
        grid-template-rows: 80px 80px calc(100% - 220px);
        width: 100vw;
        height: 100vh;
    }
    .workshopsGridSection{
        display: flex;
        align-items: center;
        position: relative;
    }
    .workshopsGridSectionB{
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


    #workshopTitle{
        font-size: 20px;
        margin-left: 25px;
    }
    #workshopText{
        color: var(--color-B-44);
        position: absolute;
        bottom: 0;
        font-size: 16px;
        margin-left: 25px;
    }
    #squareImg{
        position: absolute;
        height: 60%;
    }
</style>