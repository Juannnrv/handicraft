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
        <div class="homeGridSection">

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

import Footer from '../components/footer.vue';

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

export default {
    data() {
        return {
            menuImg,
            glassImg,
            ubicationImg,
            squareImg,
            squaresGroupImg,
            homeBGImg,
            categories: [
                { name: 'Textilería', image: textileImg },
                { name: 'Cerámica', image: ceramicImg },
                { name: 'Orfebrería', image: goldsmithingImg },
                { name: 'Talla en piedra', image: stoneCarvingImg },
                { name: 'Talla en madera', image: woodCarvingImg },
                { name: 'Bordado', image: embroideryImg },
                { name: 'Joyería', image: jewelryImg },
                { name: 'Hojalatería', image: tinsmithImg },
                { name: 'Estampado', image: printImg },
                { name: 'Pintura tradicional', image: picturesImg }
            ]
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
</style>