<template>
  <div id="app">

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    if (!localStorage.getItem('car')) {
      const car = {
        userId: null,
        products: [{productId: 12, quantity: 0, price: 0}, {productId: 13, quantity: 0, price: 0}],
        total: 0,
        date: null,
        status: 'Pendiente',
        coupons: [null]
      };
      
      localStorage.setItem('car', JSON.stringify(car));
      console.log('Objeto guardado en localStorage');
    } else {
      console.log('El objeto ya existe en localStorage');
    }
  }
}
</script>