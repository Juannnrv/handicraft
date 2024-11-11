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
        <div class="workshopsGridSection"></div>
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
        <div class="workshopsGridSection" id="wrokshopsGrid">
            <div class="wrokshopsGridSection" v-for="(workshop, index) in workshops" :key="index">
                <div class="discountPercentDiv">
                    <p class="discountPercent bellotaBold">-{{ workshop.percent }}%</p>
                    <img class="dcImg" :src="workshop.dcImg">
                </div>
                <div class="wrokshopsGridSectionDiv">
                    <img class="workshopImg" :src="workshop.img">
                </div>
                <div class="wrokshopsGridSectionDivB">
                    <p class="wrokshopsGridSectionText bellotaBold">{{ workshop.title }}</p>
                    <p class="wrokshopsGridSectionPrice bellotaBold"><span class="lineText">{{ workshop.Oprice }}</span> / {{ workshop.Fprice }}</p>
                    <p class="wrokshopsGridSectionText2 bellotaRegular">{{ workshop.location }}</p>
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
import discountImg from '../images/discount.svg';

export default {
    data() {
        return {
            menuImg,
            glassImg,
            squareImg,
            categories: [
                'Textileria', 'Cerámica', 'Joyería', 'Talla en piedra',
                'Talla en madera', 'Orfebrería', 'Estampado', 'Pintura tradicional',
                'Hojalatería', 'Bordado'
            ],
            workshops: [
                { title: 'Arte Abedail Aller', location: 'Cusco', img: workshopImg, Oprice: '$20', Fprice: '$16', dcImg: discountImg, percent: '25'},
                { title: 'Arte Abedail Aller', location: 'Cusco', img: workshopImg, Oprice: '$20', Fprice: '$16', dcImg: discountImg, percent: '50'}
            ],
            selectedCategoryIndex: 0
        };
    },
    components: {
        Footer,
    },
    methods: {
        selectCategory(index) {
            this.selectedCategoryIndex = index;
        },
        getCategoryClass(index) {
            return index === this.selectedCategoryIndex ? 'categoryGridDivB' : 'categoryGridDiv';
        }
    },
    name: 'TestComponent'
};
</script>

<style scoped>
    #workshopsGrid {
        display: grid;
        grid-template-rows: 80px 80px 20px 30px calc(100% - 270px);
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
    #menuImg {
        width: 40px;
        cursor: pointer;
        position: absolute;
        height: 50%;
        margin-left: 10px;
    }
    #glassImg {
        margin-left: 10px;
        width: 25px;
        height: 25px;
        position: absolute;
    }
    #homeInputDiv {
        display: flex;
        align-items: center;
        position: absolute;
        height: 50%;
        width: calc(100% - 80px);
        right: 0;
        margin-right: 10px;
    }
    #homeInput {
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
    #workshopTitle {
        font-size: 20px;
        margin-left: 25px;
    }
    #workshopText {
        color: var(--color-B);
        position: absolute;
        bottom: 0;
        font-size: 14px;
        margin-left: 25px;
    }
    #squareImg {
        position: absolute;
        height: 60%;
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
        background-color: var(--color-B3);
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
        background-color: var(--color-B);
        color: var(--color-W);
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
</style>