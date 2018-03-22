<template>
  <div id="app">
    <div id="main">
        <Header></Header>
        <Content></Content>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Content from '@/components/Content'

export default {
  components: {
    Header,
    Content
  },
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
    font-weight: 400;
}

#app {
  width: 100%;
  height: 100%;
}
#main #content {
  margin: 5px auto;
  width: 1400px;
}
</style>
