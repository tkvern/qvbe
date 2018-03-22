<template>
    <table>
        <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Region</th>
            <th>Domain</th>
            <!-- <th>Total vol 24h<br>BTC</th> -->
            <th>Fee</th>
            <th>Fiat money</th>
            <th>Pairs</th>
            <!-- <th colspan="2">Top pairs<br>by volume</th> -->
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in items" :key="item._id">
            <td class="center">{{ index + 1 }}</td>
            <td class="center">{{ item.name }}</td>
            <td class="center">{{ item.region }}</td>
            <td class="center link" v-on:click="targetLink(item.domain)">{{ item.domain }}</td>
            <!-- <td class="right">{{ item.vol_24h }}</td> -->
            <td class="center">{{ item.fee }}</td>
            <td class="center">{{ item.fiat_money }}</td>
            <td class="center">{{ item.number_of_pairs }}</td>
            <!-- <td class="center">{{ item.top_vol[0].pair }}</td> -->
            <!-- <td class="center">{{ item.top_vol[0].change }}</td> -->
        </tr>
        </tbody>
    </table>
</template>

<script>
import axios from 'axios'
import localStorage from '@/lib/localStorage'
import Config from '../config'

export default {
  name: 'Exchange',
  data () {
    return {
      items: localStorage.fetch('exchange-items')
    }
  },
  beforeMount () {
    this.initData()
  },
  watch: {
    items: {
      handler: function (items) {
        localStorage.save('exchange-items', items)
      },
      deep: true
    }
  },
  methods: {
    async initData () {
      let res = await axios.get(Config.domain + '/api/exchange', {
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
      this.items = res
      // function sortId (a, b) {
      //   return a['24h_volume_rank'] - b['24h_volume_rank']
      // }
      // res.data.list.sort()
    },
    targetLink (url) {
      if (url !== '') {
        window.open('//' + url, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.link {
  cursor: pointer;
  color: #2e74f5;
}
</style>
