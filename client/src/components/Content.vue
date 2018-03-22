<template>
    <div id="content" class="clearfix">
        <router-view/>
    </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style>
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
  /* font-weight: 300; */
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
  font-weight: 900;
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
