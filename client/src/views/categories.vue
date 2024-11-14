<template>
    <div id="workshopsGrid">
        <div class="workshopsGridSection center">
            <p class="bellotaBold" id="categoryTitle">Categorías</p>
            <img id="fSquareImg" :src="fSquareImg">
            <img id="squareImg" :src="squareImg">
            <img id="arrowImg" :src="arrowImg" @click="goToHome">
        </div>
        <div class="workshopsGridSection" id="categoryGrid">
            <div
                v-for="(category, index) in categories"
                :key="index"
                :class="getCategoryClass(index)"
                @click="selectCategory(index)"
            >
                <p class="bellotaBold">{{ category }}</p>
            </div>
        </div>
        <div class="workshopsGridSection"></div>
        <div class="workshopsGridSection">
            <input id="categoriesInputInput" class="bellotaRegular" placeholder="Buscar producto o palabra clave...">
                <img id="glassImg" :src="glassImg">
                <img id="filtersImg" :src="filtersImg">
        </div>
        <div class="workshopsGridSection" id="wrokshopsGrid">
            <div class="wrokshopsGridSection" v-for="(product, index) in products" :key="index">
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="product.img">
                </div>
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">{{ product.name }}</p>
                    <p class="wrokshopsGridSectionPrice bellotaBold">{{ product.Oprice }}</p>
                    <p class="wrokshopsGridSectionText2 bellotaRegular">{{ product.location }}</p>
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
import arrowImg from '../images/arrow.svg';
import filtersImg from '../images/filters.svg';

export default {
    data() {
        return {
            menuImg,
            glassImg,
            squareImg,
            fSquareImg,
            arrowImg,
            filtersImg,
            categories: [
                'Textileria', 'Cerámica', 'Joyería', 'Talla en piedra',
                'Talla en madera', 'Orfebrería', 'Estampado', 'Pintura tradicional',
                'Hojalatería', 'Bordado'
            ],
            products: [],
            selectedCategoryIndex: 0
        };
    },
    components: {
        Footer,
    },
    methods: {
        selectCategory(index) {
            this.selectedCategoryIndex = index;
            this.fetchProducts(this.categories[index]);
        },
        getCategoryClass(index) {
            return index === this.selectedCategoryIndex ? 'categoryGridDivB' : 'categoryGridDiv';
        },
        goToHome() {
            this.$router.push('/home');
        },
        fetchProducts(category) {
            fetch(`http://localhost:5000/product?category=${category}`, {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'x-version': '1.0.0'
                },
                credentials: 'include'
            })
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.products = data.data.products;
                console.log(data.data.products)
            })
        }
    },
    name: 'WorkshopsGallery'
};
</script>



<style scoped>
    #workshopsGrid {
        display: grid;
        grid-template-rows: 80px 80px 20px 40px calc(100% - 260px);
        width: 100vw;
        height: 100vh;
    }
    .workshopsGridSection {
        display: flex;
        align-items: center;
        position: relative;
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
        position: relative;
        display: flex;
        align-items: center;
        overflow: hidden;
        background-color: var(--color-B);
    }
    .wrokshopsGridSectionText {
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionText2 {
        position: absolute;
        bottom: 0;
        left: 0;
        margin-bottom: 6px;
        margin-left: 4px;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionPrice{
        position: absolute;
        left: 0;
        margin-bottom: 6px;
        margin-left: 4px;
        margin-top: 8px;
        color: var(--color-W);
        font-size: 16px;
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
        width: 76px;
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
</style>