<template>
    <div id="menuDiv">

    </div>
</template>
  
<script>
  import workshopImg from '../images/footer/workhop.svg';
  
  export default {
    props: {
      selectedIndex: {
        type: Number,
        default: 2,
      },
    },
    data() {
      return {
        workshopImg,
      };
    },
    name: 'Menu',
  };
</script>
<style scoped>

    #menuDiv{
        position: fixed;
        height: 100%;
        width: 240px;
        background-color: var(--color-B);
        z-index: +2;
        box-shadow: 0px 0px 30px 0px var(--color-B);
    }

</style>  