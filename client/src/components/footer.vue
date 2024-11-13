<template>
    <div id="footerGrid">
      <div 
        v-for="(img, index) in images" 
        :key="index" 
        class="footerGridSection"
        :class="{ selected: selectedIndex === index }"
        @click="navigateTo(index)"
      >
        <div class="footerImgDiv">
          <img class="footerImg" :src="img" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import workshopImg from '../images/footer/workhop.svg';
  import discountImg from '../images/footer/discount.svg';
  import homeImg from '../images/footer/home.svg';
  import carImg from '../images/footer/car.svg';
  import userImg from '../images/footer/user.svg';
  
  export default {
    props: {
      selectedIndex: {
        type: Number,
        default: 2,
      },
    },
    data() {
      return {
        images: [workshopImg, discountImg, homeImg, carImg, userImg],
        routes: [
          '/workshopsgallery',    
          '/discounts',    
          '/home',            
          '/car',          
          '/profile',
        ]
      };
    },
    methods: {
      navigateTo(index) {
        this.$router.push(this.routes[index]);
      },
    },
    name: 'Footer',
  };
  </script>
  
  <style scoped>
  #footerGrid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background-color: var(--color-B);
  }
  
  .footerGridSection {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .footerImgDiv {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-B2);
  }
  
  .footerImg {
    width: 60%;
    height: 60%;
  }
  
  .selected {
    transform: scale(1.5);
  }
  </style>  