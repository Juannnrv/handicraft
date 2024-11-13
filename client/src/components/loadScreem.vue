<template>
    <div id="loadScreem">
        <img id="loadBGImg" :src="loadBGImg">
    </div>
</template>
<script>

import loadBGImg from '../images/loadBG.svg';

export default {
    data() {
        return {
            loadBGImg
        };
    },
    name: 'LoadScreem'
}
</script>
<style scoped>

    #loadScreem{
        position: absolute;
        width: 100vw;
        height: 100vh;
    }
    #loadBGImg{
        position: absolute;
    }

</style>