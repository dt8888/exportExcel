<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
  @import "../static/font/iconfont.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: env(safe-area-inset-top);
  /*margin-top: 60px;*/
}
@supports (bottom: env(safe-area-inset-top)) or (bottom: env(safe-area-inset-top)) {
 /*在这里做iphoneX的判断*/
  #app {
    margin-top: 88px;
  }
}
/*@media screen and (device-width:375px) and (device-height:812px){*/
  /*#app {*/
    /*margin-top: 88px;*/
  /*}*/
/*}*/
</style>
