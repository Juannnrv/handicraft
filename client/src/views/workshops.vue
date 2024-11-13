<template>
    <div class="page-container">
      <header class="header">
        <img class="square-bg" :src="rotatedSquare" alt="">
        <a class="a-back" href="registerEmail">
            <img class="back-arrow" :src="backArrow" alt="">
        </a>
        <img class="title-square" :src="titleSquare" alt="">
        <h1 class="title bellotaBold">
          Talleres<br>
          educativos
        </h1>
      </header>
  
      <div class="search-container">
        <div class="search-bar">
          <img style="width: 20px; margin-right: 10PX;" :src="glass" alt="">
          <input 
            class="bellotaRegular"
            type="text" 
            placeholder="Buscar taller, por categoría o artesanos"
            v-model="searchQuery"
          >
        </div>
      </div>
  
      <div class="workshops-container">
        <div class="workshop-card" v-for="workshop in workshops" :key="workshop.id">
            <div class="workshop-image-div">
                <img :src="workshop.image" :alt="workshop.title" class="workshop-image">
            </div>
          <div class="workshop-info">
            <h2 class="workshop-title bellotaBold">{{ workshop.title }}</h2>
            <p class="workshop-audience bellotaRegular"><u>{{ workshop.audience }}</u></p>
            <p class="workshop-instructor bellotaBold">{{ workshop.instructor }}</p>
            <button class="learn-more-button bellotaBold">
              <u>Entérate más sobre el taller aquí</u>
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import titleSquare from '../images/titleSquare.svg'
  import rotatedSquare from '../images/rotatedSquare.svg'
    import backArrow from '../images/backArrow.svg'
    import glass from '../images/glass.svg'
  
  const searchQuery = ref('')
  
  const workshops = ref([
    {
      id: 1,
      title: 'Taller de bordado ayacuchano',
      audience: 'Para el público en general',
      instructor: 'Taller dado por los artesanos de Taller Awaq Ayllus',
      image: 'https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg'
    },
    {
      id: 2,
      title: 'Taller de cerámica artesanal',
      audience: 'Para el público en general',
      instructor: 'Taller dado por los artesanos de Cerámicas Tater Vera',
      image: 'https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg'
    },
    {
      id: 3,
      title: 'Taller de alfarería infantil',
      audience: 'Para niños de 4 a 12 años',
      instructor: 'Taller dado por la artesana María Santos Minchán',
      image: 'https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg'
    },
    {
      id: 4,
      title: 'Taller de pintura tradicional',
      audience: 'Para adultos mayores',
      instructor: 'Taller dado por los artesanos Roldan y Harry Pinedo',
      image: 'https://concepto.de/wp-content/uploads/2018/08/workshop-1-e1676660941240.jpg'
    }
  ])
  
  const goBack = () => {
    // Add navigation logic here
    console.log('Going back')
  }
  </script>
  
  <style scoped>
  .page-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .header {
    padding: 20px;
    position: relative;
  }
  
  
  .title {
    text-align: center;
    font-size: 16px;
    margin: 0;
    line-height: 1.2;
  }
  
  .search-container {
    padding: 0 20px;
    margin-bottom: 20px;
  }
  
  .search-bar {
    background-color: #e0e0e0;
    border-radius: 25px;
    padding: 12px 20px;
    display: flex;
    align-items: center;
  }
  
  .search-icon {
    margin-right: 10px;
    color: #666;
  }
  
  .search-bar input {
    border: none;
    background: none;
    width: 100%;
    font-size: 0.8em;
    color: #333;
  }
  
  .search-bar input:focus {
    outline: none;
  }
  
  .workshops-container {
    flex: 1;
    overflow-y: auto;
    padding: 0 20px 20px;
  }
  
  .workshop-card {
    background-color: #d6d6d6;
    border-radius: 15px;
    margin-bottom: 20px;
    overflow: hidden;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: relative;
    height: 135px;
  }
  
  .workshop-image-div {
    width: 135px;
    height: 100%;
    border-radius: 15px;
    background-color: green;
    position: relative;
    overflow: hidden; 
}

.workshop-image {
    width: 100%;
    height: 100%;
    object-fit: cover; /* Ajusta la imagen para cubrir completamente el contenedor */
}
  
  .workshop-info {
    padding: 10px;
    flex: 1;
  }
  


  .workshop-title {
    font-size: 0.8em;
    color: #333;
  }
  
  .workshop-audience {
    font-size: 0.8em;
    color: #666;
    margin: 0 0 4px 0;
  }
  
  .workshop-instructor {
    font-size: 0.8em;
    color: #666;
    margin: 0 0 5px 0;
  }
  
  .learn-more-button {
    background-color: #333;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.6em;
    cursor: pointer;
  }
  
  .learn-more-button:hover {
    background-color: #444;
  }
  
  /* For webkit browsers */
  .workshops-container::-webkit-scrollbar {
    width: 8px;
  }
  
  .workshops-container::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  
  .workshops-container::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  
  .workshops-container::-webkit-scrollbar-thumb:hover {
    background: #666;
  }
  .title-square{
    width: 80px;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 0;
    z-index: -1;
}
.square-bg{
          position: absolute;
          left: 0;
          top: 0px;
          width: 40px;
      }
  
      .a-back{
      position: absolute;
      width: 25px;
      left: 3px;
      top: 25px;
      display: flex
    }
  
    .a-back > img{
      width: 100%;
    }
    .header {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 24px;
  }
  </style>
<template>
    <div v-if="isMenuVisible" ref="menu" class="menuContainer">
        <Menu />
    </div>
    <div id="workshopsGrid">
      <div class="workshopsGridSectionB">
        <img id="menuImg" :src="menuImg" @click="toggleMenuVisibility">
        <div id="homeInputDiv">
          <input class="bellotaRegular" type="text" id="homeInput" placeholder="Buscar producto o tienda...">
          <img id="glassImg" :src="glassImg">
        </div>
      </div>
      <div class="workshopsGridSection">
        <p class="bellotaBold" id="workshopTitle">Talleres y tiendas artesanales</p>
        <p class="bellotaRegular" id="workshopText">Tiendas de artesanías de todas partes del Perú</p>
        <img id="squareImg" :src="squareImg">
        <img id="filterImg" :src="filterImg">
      </div>
      <div class="workshopsGridSection" id="wrokshopsGrid">
        <div v-for="(workshop, index) in workshops" :key="index" class="wrokshopsGridSection">
          <div class="wrokshopsGridSectionDivB">
            <p class="wrokshopsGridSectionText bellotaBold">{{ workshop.name }}</p>
            <p class="wrokshopsGridSectionText2 bellotaRegular">{{ workshop.location }}</p>
          </div>
          <div class="wrokshopsGridSectionDiv">
            <img class="workshopImg" :src="workshopImg">
          </div>
        </div>
      </div>
    </div>
    <Footer :selectedIndex="0" />
  </template>
  
  <script>
  import Footer from '../components/footer.vue';
  import Menu from '../components/menu.vue';

  import menuImg from '../images/menu.svg';
  import glassImg from '../images/glass.svg';
  import squareImg from '../images/square.svg';
  import filterImg from '../images/filters.svg';
  import workshopImg from '../images/test/workshop.svg';
  
  export default {
    data() {
      return {
        menuImg,
        glassImg,
        squareImg,
        filterImg,
        workshopImg,
        workshops: [
          { name: "Arte Abedail Aller", location: "Cusco" },
          { name: "Taller de Cerámica", location: "Lima" },
          { name: "Arte Textil Andino", location: "Arequipa" },
          { name: "Arte Textil Andino", location: "Arequipa" }
        ],
        isMenuVisible: false
      }
    },
    components: {
      Footer,
      Menu
    },
    methods: {
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

    #workshopsGrid{
        display: grid;
        grid-template-rows: 80px 80px calc(100% - 220px);
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
    #filterImg{
        cursor: pointer;
        position: absolute;
        height: 60%;
        right: 0;
        margin-right: 25px;
        transform: translate(0px, 12px);
    }

    #wrokshopsGrid{
        height: 100%;
        padding-bottom: 30px;
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