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
            <div id="ubicationDiv">
                <img id="ubicationImg" :src="ubicationImg">
                <p class="bellotaRegular" id="ubicationText">Ubicación de entrega actual</p>
            </div>
        </div>
        <div class="homeGridSection">
            <p class="bellotaBold" id="categoryText">Categorías</p>
            <img id="squareImg" :src="squareImg">
        </div>
<div id="grid-container">
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="textileImg"></div><p class="categoryText bellotaRegular">Textilería</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="ceramicImg"></div><p class="categoryText bellotaRegular">Cerámica</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="goldsmithingImg"></div><p class="categoryText bellotaRegular">Orfebrería</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="stoneCarvingImg"></div><p class="categoryText bellotaRegular">Talla en piedra</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="woodCarvingImg"></div><p class="categoryText bellotaRegular">Talla en madera</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="embroideryImg"></div><p class="categoryText bellotaRegular">Bordado</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="jewelryImg"></div><p class="categoryText bellotaRegular">Joyería</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="tinsmithImg"></div><p class="categoryText bellotaRegular">Hojalatería</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="printImg"></div><p class="categoryText bellotaRegular">Estampado</p></div>
<div class="grid-item"><div class="categoryImgDiv"><img class="categoryImg" :src="picturesImg"></div><p class="categoryText bellotaRegular">Pintura tradicional</p></div>
        </div>
        <div class="homeGridSection">
            <img id="squaresGroupImg1" :src="squaresGroupImg">
            <img id="squaresGroupImg2" :src="squaresGroupImg">
            <p class="bellotaRegular" id="monthWorkshops">Talleres del mes</p>
            <p class="bellotaRegular" id="monthWorkshopsText">¡Aprende como hacerlos en estos talleres educativos!</p>
        </div>
        <div class="homeGridSection">
            <img id="homeBGImg" :src="homeBGImg">
        </div>
    </div>
</template>
<script>
import squareImg from '../images/square.svg'
import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import ubicationImg from '../images/ubication.svg';

import textileImg from '../images/textile.svg';
import ceramicImg from '../images/ceramic.svg';
import goldsmithingImg from '../images/goldsmithing.svg';
import stoneCarvingImg from '../images/stoneCarving.svg';
import woodCarvingImg from '../images/woodCarving.svg';
import embroideryImg from '../images/embroidery.svg';
import jewelryImg from '../images/jewelry.svg';
import tinsmithImg from '../images/tinsmith.svg';
import printImg from '../images/print.svg';
import picturesImg from '../images/pictures.svg';

import squaresGroupImg from '../images/squaresGroup.svg';
import homeBGImg from '../images/homeBG.svg';

    export default {
    data() {
      return {
        menuImg,
        glassImg,
        ubicationImg,
        squareImg,
        textileImg,
        ceramicImg,
        goldsmithingImg,
        stoneCarvingImg,
        woodCarvingImg,
        embroideryImg,
        jewelryImg,
        tinsmithImg,
        printImg,
        picturesImg,
        squaresGroupImg,
        homeBGImg
      };
    },
        name: 'TestComponent'
    }
</script>
<style scoped>

    #homeGrid{
        display: grid;
        grid-template-rows: 80px 60px 40px 180px 60px calc(100% - 420px);
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


    #ubicationDiv{
        display: flex;
        align-items: center;
        margin-left: 10px;
        background-color: var(--color-B3);
        height: 70%;
        width: calc(100% - 20px);
        border-radius: 8px;
    }
    #ubicationImg{
        height: 70%;
        margin-left: 10px;
    }
    #ubicationText{
        margin-left: 10px;
        font-size: 16px;
        color: var(--color-B-44);
    }


    #categoryText{
        color: var(--color-B);
        margin-left: 25px;
        font-size: 20px;
    }
    #squareImg{
        position: absolute;
        height: 100%;
    }


    #grid-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
        grid-template-rows: repeat(2, 1fr);
        grid-gap: 10px;
        width: calc(100% - 50px);
        margin-left: 25px;
        max-width: 100%;
        overflow: auto;
    }
    .grid-item {
        position: relative;
        padding: 20px;
        display: grid;
        min-height: 110px;
    }

    .categoryImgDiv{
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        overflow: hidden;
        position: absolute;
        background-color: var(--color-B3);
        width: 54px;
        margin-left: calc((100% - 54px) / 2);
        height: 54px;
        overflow: hidden;
    }
    .categoryImg{
        width: 60%;
    }

    .categoryText{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 50px;
        text-align: center;
        font-size: 16px;
    }

    #squaresGroupImg1{
        margin-top: 18px;
        position: absolute;
        top: 0;
        left: 0;
        height: 14px;
        margin-left: 10px;
    }
    #squaresGroupImg2{
        margin-top: 18px;
        position: absolute;
        top: 0;
        right: 0;
        height: 14px;
        margin-right: 10px;
    }
    #monthWorkshops{
        margin-top: 10px;
        position: absolute;
        top: 0;
        width: 100%;
        text-align: center;
        font-size: 22px;
    }
    #monthWorkshopsText{
        color: var(--color-B-44);
        font-size: 12px;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
    }

    #homeBGImg{
        width: 60%;
        position: absolute;
        margin-left: 20%;
        transform: translate(0px, 50px);
    }

</style>