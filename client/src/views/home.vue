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
        <div class="homeGridSection">

        </div>
        <div class="homeGridSection">

        </div>
    </div>
</template>
<script>
import squareImg from '../images/square.svg'
import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import ubicationImg from '../images/ubication.svg';
    export default {
    data() {
      return {
        menuImg,
        glassImg,
        ubicationImg,
        squareImg
      };
    },
        name: 'TestComponent'
    }
</script>
<style scoped>

    #homeGrid{
        display: grid;
        grid-template-rows: 80px 60px 40px 120px calc(100% - 300px);
        width: 100vw;
        height: 100vh;
    }
    .homeGridSection{
        display: flex;
        align-items: center;
        border: 1px solid gray;
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

</style>