<template>
    <div v-if="isMenuVisible" ref="menu" class="menuContainer">
        <Menu />
    </div>
    <div id="workshopsGrid">
        <div class="workshopsGridSectionB">
            <img id="menuImg" :src="menuImg" @click="toggleMenuVisibility">
            <div id="homeInputDiv">
                <input
                    class="bellotaRegular"
                    type="text"
                    id="homeInput"
                    placeholder="Buscar producto o tienda..."
                    v-model="searchQuery"
                >
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
            <div class="wrokshopsGridSection" v-for="(product, index) in filteredProducts" :key="index" @click="goToProductDetails(product._id)">
                <div class="discountPercentDiv">
                    <p class="discountPercent bellotaBold">-{{ product.percentage }}%</p>
                    <img class="dcImg" :src="dcImg">
                </div>
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
    <Footer :selectedIndex="1" />
</template>

<script>
import Footer from '../components/footer.vue';
import Menu from '../components/menu.vue';

import menuImg from '../images/menu.svg';
import glassImg from '../images/glass.svg';
import squareImg from '../images/square.svg';
import dcImg from '../images/discount.svg';

export default {
    data() {
        return {
            isMenuVisible: false,
            menuImg,
            glassImg,
            squareImg,
            dcImg,
            searchQuery: '',
            categories: [
                'Todos', 'Textileria', 'Cerámica', 'Joyería', 'Talla en piedra',
                'Talla en madera', 'Orfebrería', 'Estampado', 'Pintura tradicional',
                'Hojalatería', 'Bordado'
            ],
            products: [],
            selectedCategoryIndex: 0,
        };
    },
    components: {
        Footer,
        Menu
    },
    mounted() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.fetchProducts(this.categories[this.selectedCategoryIndex]);
    },
    methods: {
        goToProductDetails(productId) {
            this.$router.push(`/productdetails?id=${productId}`);
        },
        toggleMenuVisibility() {
            this.isMenuVisible = !this.isMenuVisible;
        },
        handleClickOutside(event) {
            if (this.isMenuVisible && this.$refs.menu && !this.$refs.menu.contains(event.target)) {
                this.isMenuVisible = false;
            }
        },
        selectCategory(index) {
            this.selectedCategoryIndex = index;
            this.fetchProducts(this.categories[index]);
        },
        getCategoryClass(index) {
            return index === this.selectedCategoryIndex ? 'categoryGridDivB' : 'categoryGridDiv';
        },
        fetchProducts(category) {
            const url =
                category === 'Todos'
                    ? 'http://localhost:5000/product'
                    : `http://localhost:5000/product?category=${category}`;

            fetch(url, {
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
                })
                .catch(error => {
                    console.error('Error al obtener los productos: ', error);
                });
        }
    },
    beforeDestroy() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    },
    computed: {
        filteredProducts() {
            const query = this.searchQuery.toLowerCase();
            const filteredBySearch = this.products.filter(product =>
                product.name.toLowerCase().includes(query)
            );

            if (this.categories[this.selectedCategoryIndex] === 'Todos') {
                return filteredBySearch;
            }

            const category = this.categories[this.selectedCategoryIndex];
            return filteredBySearch.filter(product => product.category === category);
        }
    },
    name: 'WorkshopsDiscounts',
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
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        background-color: var(--color-B);
    }
    .wrokshopsGridSectionText {
        top: 0;
        left: 0;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionText2 {
        bottom: 0;
        left: 0;
        color: var(--color-W);
        font-size: 16px;
    }
    .wrokshopsGridSectionPrice{
        left: 0;
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