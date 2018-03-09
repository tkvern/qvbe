<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
    /* font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif; */
    line-height: 20px;
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}

body {
    background-color: #FFFFFF;
    margin: 0;
    padding: 0;
    font-size: 12px;
    color: #FFFFFF;
    font-weight: 300;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
