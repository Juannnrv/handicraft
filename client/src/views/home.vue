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

        </div>
    </div>
</template>
<script>
import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
    export default {
    data() {
      return {
        menuImg,
        glassImg
      };
    },
        name: 'TestComponent'
    }
</script>
<style scoped>

    #homeGrid{
        display: grid;
        grid-template-rows: 80px calc(100% - 80px);
        width: 100vw;
        height: 100vh;
    }
    .homeGridSection{
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
        width: 25px;
        height: 25px;
        position: absolute;
    }
    #homeInputDiv{
        display: flex;
        align-items: center;
        position: absolute;
        height: 50%;
        width: calc(100% - 90px);
        right: 0;
        margin-right: 10px;
    }
    #homeInput{
        width: 100%;
        height: 100%;
        position: absolute;
        right: 0;
        margin-right: 10px;
        background-color: var(--color-B2);
        outline: none;
        border: none;
        border-radius: 8px;
        padding-left: 40px;
        color: var(--color-W);
    }

</style>