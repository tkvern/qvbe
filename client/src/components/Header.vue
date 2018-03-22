<template>
    <div id="header" class="clearfix">
      <div>
        <div id="logo">SuperPass</div>
        <ul class="clearfix">
          <!-- <li>SP 100 Index</li> -->
          <li v-on:click="routerJump('/price')">Market Price</li>
          <!-- <li>Public</li> -->
          <li v-on:click="routerJump('/exchange')">Exchange</li>
          <!-- <li>Notice</li> -->
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    routerJump (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style scoped>
#main #header {
  /* background-color: #1C1F24; */
  min-width: 1400px;
  background-color: #273c61;
  height: 60px;
  padding: 0 auto;
}
#main #header > div {
  width: 1400px;
  margin: 0 auto;
}
#main #header > div #logo {
  /* background-image: url(/static/img/logo.4b6b044.png); */
  /* background-size: auto 30px; */
  /* background-position: left center; */
  height: 60px;
  width: 250px;
  margin-left: 20px;
  background-repeat: no-repeat;
  float: left;
  font-size: 40px;
  line-height: 60px;
  font-weight: 700;
  letter-spacing: 4px;
  /* text-transform: uppercase; */
  font-style: oblique;
  text-align: center;

}
#main #header > div ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
#main #header > div ul li {
  /* color: #D6D6D6; */
  color: #fff;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  text-align: center;
  float: left;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
#main #header > div ul li:hover {
  /* background-color: #27282B; */
  background-color: #061c41;
  /* color: #fff; */
}
#main #header > div ul li.selected {
  border-bottom: solid 3px #F1F1F1;
  height: 57px;
}
#main #content {
  margin: 5px auto;
  width: 1400px;
}
</style>
