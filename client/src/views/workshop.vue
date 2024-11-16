<template>
    <div id="workshopsGrid">
        <div class="workshopsGridSection">
            <div id="workshopTitleDiv" class="bellotaRegular">{{ workshop.name }}</div>
            <img id="workshopBGImg" :src="workshop.photo">
            <img id="square2Img" :src="square2Img">
            <img id="arrow2Img" :src="arrow2Img" @click="goToWorkshops">
        </div>
        <div class="workshopsGridSection bellotaRegular" id="moreInfoDiv">
            <a :href="workshop.documentary" target="_blank" id="moreInfoText">
                Conoce la historia detrás de este taller artesanal y conoce como producen sus textiles
            </a>
            <img id="squareImg1" :src="squareImg">
            <img id="squareImg2" :src="squareImg">
        </div>
        <div class="workshopsGridSection center">
            <p class="bellotaBold" id="categoryTitle">Artesanías</p>
            <img id="fSquareImg" :src="fSquareImg">
            <img id="commentImg" :src="commentImg">
        </div>
        <div class="workshopsGridSection"></div>
        <div class="workshopsGridSection">
            <input 
                id="categoriesInputInput" 
                class="bellotaRegular" 
                placeholder="Buscar producto o palabra clave..."
                v-model="searchTerm"
            >
            <img id="glassImg" :src="glassImg">
            <img id="filtersImg" :src="filtersImg">
        </div>
        <div class="workshopsGridSection" id="wrokshopsGrid">
            <div 
                class="wrokshopsGridSection" 
                v-for="(product, index) in filteredProducts" 
                :key="index" 
                @click="goToProduct(product._id)"
            >
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="product.photos[0]">
                </div>
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">{{ product.name }}</p>
                    <p class="wrokshopsGridSectionPrice bellotaBold">${{ product.price }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Footer from '../components/footer.vue';

import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import squareImg from '../images/square.svg';
import workshopImg from '../images/test/workshop.svg';
import fSquareImg from '../images/fullSquare.svg';
import square2Img from '../images/square2.svg';
import arrowImg from '../images/arrow.svg';
import arrow2Img from '../images/arrow2.svg';
import filtersImg from '../images/filters.svg';
import commentImg from '../images/comment.svg';
import workshopBGImg from '../images/test/workshopBG.svg';

export default {
    data() {
        return {
            menuImg,
            glassImg,
            squareImg,
            fSquareImg,
            square2Img,
            arrowImg,
            arrow2Img,
            filtersImg,
            commentImg,
            workshopBGImg,
            workshop: {},
            categories: [
                'Textileria', 'Cerámica', 'Joyería', 'Talla en piedra',
                'Talla en madera', 'Orfebrería', 'Estampado', 'Pintura tradicional',
                'Hojalatería', 'Bordado'
            ],
            products: [],
            selectedCategoryIndex: 0,
            searchTerm: ''  // Para almacenar el término de búsqueda
        };
    },
    components: {
        Footer,
    },
    created() {
        const workshopId = this.$route.query.id;
        
        fetch(`http://localhost:5000/workshop/${workshopId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'
            },
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            this.workshop = data.data;
            this.fetchProductsByWorkshop(data.data._id);
        });
    },
    computed: {
        // Computed property para filtrar productos según el término de búsqueda
        filteredProducts() {
            const searchTermNormalized = this.normalizeString(this.searchTerm);
            return this.products.filter(product => {
                return this.normalizeString(product.name).includes(searchTermNormalized);
            });
        }
    },
    methods: {
        normalizeString(str) {
            // Convertir a minúsculas y quitar tildes
            return str
                .toLowerCase()  // Convierte todo a minúsculas
                .normalize("NFD")  // Normaliza el texto para separar caracteres acentuados
                .replace(/[\u0300-\u036f]/g, "");  // Elimina los acentos
        },
        selectCategory(index) {
            this.selectedCategoryIndex = index;
        },
        getCategoryClass(index) {
            return index === this.selectedCategoryIndex ? 'categoryGridDivB' : 'categoryGridDiv';
        },
        goToWorkshops() {
            this.$router.push('/workshopsgallery');
        },
        goToProduct(productId) {
            this.$router.push(`/productdetails?id=${productId}`);
        },
        fetchProductsByWorkshop(workshopId) {
            fetch(`http://localhost:5000/product/?workshopId=${workshopId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-version': '1.0.0'
                },
                credentials: 'include'
            })
            .then(response => response.json())
            .then(data => {
                this.products = data.data.products;
            });
        }
    },
    name: 'TestComponent'
};
</script>

<style scoped>
    #workshopsGrid {
        display: grid;
        grid-template-rows: 200px 60px 80px 20px 40px calc(100% - 440px);
        width: 100vw;
        height: 100vh;
    }
    .workshopsGridSection {
        display: flex;
        align-items: center;
        position: relative;
        overflow: hidden;
    }
    .workshopsGridSectionB {
        display: flex;
        align-items: center;
        position: relative;
        background-color: var(--color-B);
    }
    #squareImg {
        position: absolute;
        left: 0;
        height: 80px;
    }
    #arrowImg{
        cursor: pointer;
        position: absolute;
        height: 20px;
        margin-left: 6px;
        left: 0;
        z-index: +1;
    }
    #wrokshopsGrid {
        height: 100%;
        padding-bottom: 30px;
        margin: 25px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 10px;
        overflow: auto;
    }
    .wrokshopsGridSection {
        cursor: pointer;
        overflow: hidden;
        border-radius: 10px;
        position: relative;
        display: grid;
        grid-template-rows: 60% 40%;
        height: 180px;
    }
    .wrokshopsGridSectionDiv {
        position: relative;
        display: flex;
        justify-content: center;
        overflow: hidden;
    }
    .wrokshopsGridSectionDivB {
        padding: 4px;
        position: relative;
        display: flex;
        justify-content: center;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--color-B);
    }
    .wrokshopsGridSectionText {
        top: 0;
        left: 0;
        color: var(--color-W);
        font-size: 14px;
    }
    .wrokshopsGridSectionText2 {
        bottom: 0;
        left: 0;
        color: var(--color-W);
        font-size: 14px;
    }
    .wrokshopsGridSectionPrice{
        left: 0;
        color: var(--color-W);
        font-size: 14px;
    }
    .workshopImg {
        height: 100%;
    }
    #categoryGrid {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 140px;
        overflow-x: auto;
        border-bottom: 2px solid var(--color-B);
    }
    .categoryGridDiv {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        height: 100%;
    }
    .categoryGridDivB {
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        height: 100%;
        border-bottom: 4px solid var(--color-B);
    }
    .lineText {
    text-decoration: line-through;
    }

    .discountPercentDiv{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: absolute;
        width: 50px;
        height: 50px;
        top: 0;
        left: 0;
        z-index: +1;
    }
    .dcImg{
        position: absolute;
        width: 100%;
    }
    .discountPercent{
        position: absolute;
        z-index: +1;
        color: var(--color-W);
        font-size: 14px;
    }
    #fSquareImg{
        position: absolute;
        width: 68px;
    }
    #categoryTitle{
        z-index: +1;
        position: absolute;
        font-size: 22px;
        color: var(--color-B);
    }
    .center{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #categoriesInputInput{
        position: absolute;
        padding-left: 40px;
        font-size: 14px;
        border: none;
        outline: none;
        border-radius: 8px;
        width: calc(100% - 100px);
        margin-left: 25px;
        height: 100%;
        background-color: var(--color-B3);
    }
    #glassImg{
        filter: invert();
        width: 20px;
        margin-left: 35px;
        position: absolute;
        z-index: +1;
    }
    #filtersImg{
        position: absolute;
        right: 0;
        margin-right: 30px;
        width: 28px;
    }
    #commentImg{
        position: absolute;
        right: 0;
        margin-right: 24px;
        width: 44px;
    }
    #workshopBGImg{
        position: absolute;
        width: 100%;
    }

    #moreInfoDiv{
        color: var(--color-B);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--color-W);
        background-color: var(--color-B2);
        padding-right: 30px;
        padding-left: 30px;
    }
    #moreInfoText{
        color: inherit;
        text-decoration: none;
        cursor: pointer;
    }
    #workshopTitleDiv{
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        position: absolute;
        margin-left: calc((100% - 200px) / 2);
        color: var(--color-W);
        top: 0;
        width: 200px;
        height: 40px;
        background-color: var(--color-B2);
        z-index: +1;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    #square2Img{
        position: absolute;
        top: 0;
        width: 34px;
        z-index: +1;
    }
    #arrow2Img{
        cursor: pointer;
        position: absolute;
        top: 0;
        margin-top: 25px;
        margin-left: 5px;
        width: 16px;
        z-index: +1;
    }

    #squareImg1{
        position: absolute;
        height: 100%;
        left: 0;
    }
    #squareImg2{
        position: absolute;
        height: 100%;
        right: 0;
        transform: rotate(180deg);
    }
</style>