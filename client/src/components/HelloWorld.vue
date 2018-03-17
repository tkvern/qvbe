<template>
  <div id="main">
    <div id="header" class="clearfix">
      <div>
        <div id="logo">SuperPass</div>
        <ul class="clearfix">
          <!-- <li>Qvbe 100 Index</li> -->
          <li>Market Price</li>
          <!-- <li>Public</li> -->
          <!-- <li>Exchange</li> -->
          <!-- <li>Notice</li> -->
        </ul>
      </div>
    </div>
    <div id="content" class="clearfix">
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th width="140">Name</th>
              <th colspan="2" class="center aligned">Price<br>$ | BTC</th>
              <th colspan="2" class="center aligned">24Hour Volume<br>Rank | $M</th>
              <th colspan="2" class="center aligned">Price Change<br>1Hour, $ | %</th>
              <th colspan="2" class="center aligned">Price Change<br>24Hour, $ | %</th>
              <th colspan="2" class="center aligned">Price Change<br>7Day, $ | %</th>
              <th class="center aligned">Market Cap<br>$Million</th>
              <th colspan="2" class="center aligned">Circulating Supply<br>#Million | %</th>
              <th class="center aligned">Max Supply<br>#Million</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item._id">
              <td width="2.8571%">{{ item.rank }}</td>
              <td width="5.1429%">{{ item.symbol }}</td>
              <td width="9.7857%">{{ item.name }}</td>
              <td width="8.5714%" class="right">
                <span v-bind:class="{ 'price-up' : item.prcie_change_status == 'up', 'price-down' : item.prcie_change_status == 'down' }">
                  <template v-if="item.prcie_change_status == 'up'">↑</template>
                  <template v-else-if="item.prcie_change_status == 'down'">↓</template>
                  {{ item.price_usd.toFixed(6) }}
                </span>
              </td>
              <td width="6.0714%" class="right aligned">{{ item.price_btc.toFixed(6) }}</td>
              <td width="4%" class="right aligned">
                <span  v-bind:class="{ 'price-up' : item['24h_volume_rank'] - item['rank'] < 0, 'price-down' : item['24h_volume_rank'] - item['rank'] > 0 }">
                  <template v-if="item['24h_volume_rank'] - item['rank'] < 0">↑</template>
                  <template v-else-if="item['24h_volume_rank'] - item['rank'] > 0">↓</template>
                  {{ item['24h_volume_rank'] }}
                </span>
              </td>
              <td width="6.0714%" class="right aligned">0.00</td>
              <td width="4.7143%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_1h >= 0, 'price-down' : item.percent_change_1h < 0 }">
                {{ (item.price_usd * item.percent_change_1h * 0.01).toFixed(2) }}
              </td>
              <td width="5.1429%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_1h >= 0, 'price-down' : item.percent_change_1h < 0 }">
                {{ item.percent_change_1h.toFixed(2) }}%
              </td>
              <td width="4.9286%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_24h >= 0, 'price-down' : item.percent_change_24h < 0 }">
                {{ (item.price_usd * item.percent_change_24h * 0.01).toFixed(2) }}
              </td>
              <td width="5.1429%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_24h >= 0, 'price-down' : item.percent_change_24h < 0 }">
                {{ item.percent_change_24h.toFixed(2) }}%
              </td>
              <td width="5.3571%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_7d >= 0, 'price-down' : item.percent_change_7d < 0 }">
                {{ (item.price_usd * item.percent_change_7d * 0.01).toFixed(2) }}
              </td>
              <td width="5.1429%" class="right aligned" v-bind:class="{ 'price-up' : item.percent_change_7d >= 0, 'price-down' : item.percent_change_7d < 0 }">
                {{ item.percent_change_7d.toFixed(2) }}%
              </td>
              <td width="7.7143%" class="right aligned"><span>{{ (item.market_cap_usd * 0.000001).toFixed(2) }}</span></td>
              <td width="6.7143%" class="right aligned"><span>{{ (item.available_supply * 0.000001).toFixed(2) }}</span></td>
              <td width="5.1429%" class="right aligned"><span>{{ item.max_supply > 0 ? (item.available_supply / item.max_supply * 100).toFixed(1) + '%' : '-' }}</span></td>
              <td width="7.5%" class="right aligned"><span>{{ item.max_supply > 0 ? (item.max_supply * 0.000001).toFixed(2) : '-' }}</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App Vern',
      items: []
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.initData()
      setInterval(this.initData, 5000)
    })
  },
  methods: {
    async initData () {
      let res = await axios.get('//superpass.ai/api/ticker', {
        params: {
          page: 1,
          size: 100
        },
        timeout: 4900
      }).then(function (response) {
        return response.data
      }).catch(function (error) {
        console.log(error)
      })

      if (!res) {
        console.log('network error')
        return false
      }
      let currentItems = this.items
      if (!!currentItems && currentItems.length > 0) {
        res.data.list.map(function (item, index, arr) {
          let diffPrice = item.price_usd - currentItems[index].price_usd
          if (diffPrice > 0) {
            item.prcie_change_status = 'up'
          } else if (diffPrice < 0) {
            item.prcie_change_status = 'down'
          } else {
            item.prcie_change_status = ''
          }
          return item
        })
      }
      this.items = res.data.list
      // function sortId (a, b) {
      //   return a['24h_volume_rank'] - b['24h_volume_rank']
      // }
      // res.data.list.sort()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
    width: 100%;
    height: 100%;
}

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

.chart {
  width: 437px;
  background-color: #26272A;
  border-radius: 4px;
  overflow: hidden;
}
.index-info {
  width: 261px;
}
.top5 {
  width: 698px;
}
.top8-price {
  margin-bottom: 2px;
  overflow: hidden;
}
.top8-price .my-card {
  padding: 10px 16px;
}
.top8-price .my-card .card-title {
  font-size: 16px;
  font-weight: 500;
  margin-right: 6px;
}
.top8-price .my-card .card-content {
  font-size: 20px;
  font-weight: 700;
}
.top8-price .my-card .card-subcontent {
  font-size: 20px;
  font-weight: 700;
}

.summary {
  width: 465px;
}
.summary:first-child {
  width: 466px;
}
.chart {
  width: 465px;
  background-color: #26272A;
  height: 195px;
  border-radius: 4px;
  overflow: hidden;
}
.chart:first-child {
  width: 466px;
}

ul {
  /* background-color: #26272A; */
  /* border-radius: 4px; */
  padding: 0;
  margin: 0;
  list-style: none;
}
ul > li {
  padding: 20px;
  /* border-bottom: solid 1px #49515c; */
  cursor: pointer;
  font-size: 14px;
}
ul > li:hover {
  /* background-color: #333539; */
}
ul > li:first-child {
  border-radius: 4px 4px 0 0;
}
ul > li > .title > i {
  margin-right: 10px;
}
ul > li > .date {
  float: right;
  font-size: 12px;
  color: #909090;
}
ul > li > .date > i {
  margin-right: 4px;
}
.tail {
  background-color: #1C252E;
  padding: 6px;
  border-radius: 0 0 4px 4px;
}

.notice {
  padding: 20px;
  border-radius: 4px;
  background-color: #26272A;
}
.notice h1 {
  font-size: 16px;
  font-weight: 700;
  padding: 0;
  margin: 0;
  margin-bottom: 20px;
}
.notice .content a {
  color: #FFFFFF;
  text-decoration: underline;
}
.notice .tail {
  margin-top: 70px;
  text-align: right;
}
* {
  font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
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
a {
  color: #FFFFFF;
  text-decoration: underline;
}
.clearfix::after {
  display: block;
  content: "";
  clear: both;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.price-up {
  /* color: #73fb4c; */
  color: #3CBC6C;
}
.price-down {
  color: #d26966;
}
#content .row {
  margin-bottom: 2px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
      -ms-flex-direction: row;
          flex-direction: row;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -webkit-box-align: stretch;
      -ms-flex-align: stretch;
          align-items: stretch;
}
#content .row:last-child {
  margin-bottom: 0;
}
#content .row::after {
  display: block;
  content: "";
  clear: both;
}
#content .column {
  float: left;
  margin-right: 2px;
}
#content .column:last-child {
  margin-right: 0;
}
#content table {
  width: 100%;
  /* background: #2a2c30; */
  background: #fff;
  border-radius: 4px;
  border: none;
  border-collapse: separate;
  border-spacing: 0;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  /* color: rgba(255, 255, 255, 0.9); */
  color: rgba(0, 0, 0);
  overflow: hidden;
}
#content table thead {
  -webkit-box-shadow: none;
          box-shadow: none;
}
#content table thead tr {
  margin-bottom: 1px;
}
#content table thead tr th {
  font-weight: 700;
  /* background-color: #1d2934; */
  background-color: #fff;
  padding: .7em .7em;
  /* border-bottom: solid 1px #49515c; */
  /* border-left: solid 1px #49515c; */
  border-bottom: solid 1px #e4ebf0;
  border-left: solid 1px #e4ebf0;
}
#content table thead tr th:first-child {
  border-left: none;
  border-radius: 4px 0 0 0;
}
#content table thead tr th:last-child {
  border-radius: 0 4px 0 0;
}
#content table thead tr th:only-child {
  border-radius: 4px 4px 0 0;
}
#content table tbody tr.only {
  border-radius: 4px;
}
#content table tbody tr.only td:first-child {
  border-radius: 4px 0 0 4px;
}
#content table tbody tr.only td:last-child {
  border-radius: 0 4px 4px 0;
}
#content table tbody tr.only td:only-child {
  border-radius: 4px;
}
#content table tbody tr:first-child td {
  border-top: none;
}
#content table tbody tr:hover {
  /* background-color: #333539; */
  background-color: #f8f8f8;
}
#content table tbody tr td {
  padding: 6px;
  /* border-left: solid 1px #1e2228; */
  /* border-top: solid 1px #1e2228; */
  border-left: solid 1px #e4ebf0;
  border-top: solid 1px #e4ebf0;
}
#content table tbody tr td:first-child {
  border-left: none;
}
#content table tfoot {
  -webkit-box-shadow: none;
          box-shadow: none;
}
#content table tfoot tr {
  margin-top: 1px;
}
#content table tfoot tr th {
  font-weight: 700;
  background-color: #1d2934;
  padding: .7em .7em;
  border-top: solid 1px #49515c;
  border-left: solid 1px #49515c;
}
#content table tfoot tr th:first-child {
  border-left: none;
  border-radius: 0 0 0 4px;
}
#content table tfoot tr th:last-child {
  border-radius: 0 0 4px 0;
}
#content table tfoot tr th:only-child {
  border-radius: 0 0 4px 4px;
}
#content .pager {
  float: right;
}
#content .pager::after {
  display: block;
  content: "";
  clear: both;
}
#content .pager > a {
  height: 28px;
  width: 28px;
  display: block;
  float: left;
  text-align: center;
  line-height: 28px;
  background-color: black;
  border-right: solid 1px rgba(255, 255, 255, 0.15);
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
}
#content .pager > a:hover {
  background-color: #515355;
}
#content .pager > a.active {
  font-weight: 700;
  background-color: #3B3C3E;
}
#content .pager > a:first-child {
  border-radius: 4px 0 0 4px;
}
#content .pager > a:last-child {
  border-radius: 0 4px 4px 0;
}
#content .pager > a > i {
  font-size: 14px;
}
</style>
