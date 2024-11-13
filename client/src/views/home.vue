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
            <router-link 
                v-for="(category, index) in categories" 
                :key="index" 
                :to="'/categories'"
                class="grid-item-link"
            >
                <div class="grid-item">
                    <div class="categoryImgDiv">
                        <img class="categoryImg" :src="category.image">
                    </div>
                    <p class="categoryText bellotaRegular">{{ category.name }}</p>
                </div>
            </router-link>
        </div>
        
        <div class="homeGridSection">
            <img id="squaresGroupImg1" :src="squaresGroupImg">
            <img id="squaresGroupImg2" :src="squaresGroupImg">
            <router-link to="/workshops" class="bellotaRegular" id="monthWorkshops">Talleres del mes</router-link>
            <p class="bellotaRegular" id="monthWorkshopsText">¡Aprende como hacerlos en estos talleres educativos!</p>
        </div>
        <div class="homeGridSection">
            <img @click="redirectToWorkshops" id="homeBGImg" :src="homeBGImg">
        </div>
    </div>
    <Footer :selectedIndex="2" />
    <LoadScreem />
</template>
<script>
import squareImg from '../images/square.svg';
import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import ubicationImg from '../images/ubication.svg';
import squaresGroupImg from '../images/squaresGroup.svg';
import homeBGImg from '../images/homeBG.svg';

import Footer from '../components/footer.vue';
import Menu from '../components/menu.vue';
import LoadScreem from '../components/loadScreem.vue';

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
            ],
            isMenuVisible: false
        };
    },
    components: {
        Footer,
        Menu,
        LoadScreem
    },
    methods: {
        redirectToWorkshops() {
            this.$router.push('/workshops');
        },
        toggleMenuVisibility() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        handleClickOutside(event) {
            if (this.isMenuVisible && this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                this.isMenuVisible = false;
            }
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
    .grid-item-link {
    display: block;
    text-decoration: none;
    color: inherit;
    }
    .grid-item .categoryText {
        color: var(--color-B);
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
        color: var(--color-B);
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
        filter: saturate(0);
        width: 70%;
        position: absolute;
        margin-left: 15%;
        transform: translate(0px, 12vh);
    }

</style>