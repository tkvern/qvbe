<template>
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
            <td width="7.5%" class="right aligned"><span>{{ item.max_supply > 0 ? (item.max_supply * 0.000001).toFixed(2) : '-' }}</span></td>
        </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'
import localStorage from '@/lib/localStorage'
import Config from '../config'

export default {
  name: 'MarketPrice',
  data () {
    return {
      items: localStorage.fetch('price-items')
    }
  },
  beforeMount () {
    this.initData()
  },
  mounted () {
    this.$nextTick(function () {
      this.timer = setInterval(this.initData, 5000)
    })
  },
  destroyed () {
    clearInterval(this.timer)
  },
  watch: {
    items: {
      handler: function (items) {
        localStorage.save('price-items', items)
      },
      deep: true
    }
  },
  methods: {
    async initData () {
      let res = await axios.get(Config.domain + '/api/ticker', {
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

      if (!res['data'] || !res.data['list'] || !currentItems || currentItems.length <= 0) {
        return
      }
      res.data['list'].map(function (item, index, arr) {
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
      if (res.data['list'] !== undefined) {
        this.items = res.data['list']
      }
      // function sortId (a, b) {
      //   return a['24h_volume_rank'] - b['24h_volume_rank']
      // }
      // res.data.list.sort()
    }
  }
}
</script>
