<!--<script setup lang="ts">-->

<!--</script>-->

<template>
  <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
  export default{
    mounted(){
      this.store.commit("initializeStore");
    }
  }

</script>

<style lang="scss">
#app{
  font-family: Avenir, "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
