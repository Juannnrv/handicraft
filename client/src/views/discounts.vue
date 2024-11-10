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
            <p class="bellotaBold" id="workshopTitle">Descuentos y promociones</p>
            <p class="bellotaRegular" id="workshopText">En cientos de artesanías</p>
            <img id="squareImg" :src="squareImg">
        </div>
        <div class="workshopsGridSection" id="">
            
        </div>
        <div class="workshopsGridSection" id="wrokshopsGrid">

            <div class="wrokshopsGridSection">
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">Arte Abedail Aller</p>
                    <p class="wrokshopsGridSectionText2 bellotaRegular">Cusco</p>
                </div>
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="workshopImg">
                </div>
            </div>
            <div class="wrokshopsGridSection">
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">Arte Abedail Aller</p>
                    <p class="wrokshopsGridSectionText2 bellotaRegular">Cusco</p>
                </div>
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="workshopImg">
                </div>
            </div>
            <div class="wrokshopsGridSection">
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">Arte Abedail Aller</p>
                    <p class="wrokshopsGridSectionText2 bellotaRegular">Cusco</p>
                </div>
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="workshopImg">
                </div>
            </div>

        </div>
    </div>

    <Footer :selectedIndex="1" />
</template>
<script>

import Footer from '../components/footer.vue';

import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import squareImg from '../images/square.svg';

import workshopImg from '../images/test/workshop.svg';

    export default {
        data() {
            return {
                menuImg,
                glassImg,
                squareImg,
                workshopImg
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
        grid-template-rows: 80px 80px 30px calc(100% - 200px);
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
        color: var(--color-B);
        position: absolute;
        bottom: 0;
        font-size: 14px;
        margin-left: 25px;
    }
    #squareImg{
        position: absolute;
        height: 60%;
    }

    #wrokshopsGrid{
        margin: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
        overflow: auto;
    }
    .wrokshopsGridSection{
        border-radius: 10px;
        position: relative;
        display: grid;
        overflow: hidden;
        grid-template-rows: 60px calc(100% - 60px);
        height: 180px;
    }
    .wrokshopsGridSectionDiv{
        position: relative;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    .wrokshopsGridSectionDivB{
        position: relative;
        display: flex;
        overflow: hidden;
        background-color: var(--color-B);
    }

    .wrokshopsGridSectionText{
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionText2{
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .workshopImg{
        height: 100%;
    }
</style>