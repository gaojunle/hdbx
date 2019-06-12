<template>
  <div class="query-result-details">
    <div class="w1200">
      <top-nav ref="header"></top-nav>
      <breadcrumb :crumb="crumb"></breadcrumb>
      <component v-bind:is="routeQuery.current + 'Item'" :queryData="queryData" :showButton="false"></component>
      <div class="details-content" v-if="tabContent.length > 0">
        <ul class="tab clearfix">
          <li :class="{'current': currentTab === 'timeList'}" @click="handleClickTab('timeList')">按时间查看</li>
          <!-- <li :class="{'current': currentTab === 'typeList'}" @click="handleClickTab('typeList')">按类别查看</li> -->
        </ul>
        <template v-if="routeQuery.current === 'softList'">
          <component v-bind:is="currentTab + 'SoftItem'" :detailsList="tabContent"></component>
        </template>
        <template v-else>
          <component v-bind:is="currentTab + 'OupsItem'" :detailsList="tabContent"></component>
        </template>
      </div>
    </div>
    <hd-footer></hd-footer>
  </div>
</template>

<script>

import '@css/queryResultDetails'
import api from '@api'
import topNav from '@components/common/header'
import breadcrumb from '@components/common/breadcrumb'
import softListItem from '@components/queryResult/softListItem'
import oupsListItem from '@components/queryResult/oupsListItem'
import timeListSoftItem from './timeListSoftItem'
import typeListSoftItem from './typeListSoftItem'
import timeListOupsItem from './timeListOupsItem'
import typeListOupsItem from './typeListOupsItem'
import hdFooter from '@components/common/hdFooter'
import Utils from '@share/js/utils/utils'

export default {
  data() {
    return {
      crumb: [
        {
          name: '公告查询',
          link: './queryResult.html'
        },
        {
          name: '查看详情',
        }
      ], // 面包屑导航
      routeQuery: getUrlRequest(), // 地址栏传参信息
      queryData: {}, // 头部数据信息
      currentTab: 'timeList', // 当前tab选项
      tabContent: [], // 当前展示的详情内容
      timeList: [], // 时间列表信息
      typeList: [], // 类别列表信息
    }
  },
  components: { topNav, breadcrumb, softListItem, oupsListItem, timeListSoftItem, typeListSoftItem, timeListOupsItem, typeListOupsItem, hdFooter },
  methods: {
    init() {
      this.getPublicity()
      this.getPublicityDetail()
    },
    /**
     * 调用查询接口
     */
    getPublicity() {
      let apiName = {
        softList: 'getSoftPublicity',
        oupsList: 'getOpusPublicity',
        3: 'getDCIPublicity',
      }
      let params = {
        keyWord: this.routeQuery.registerNumber,
        publicityType: this.routeQuery.publicityRegisterType,
        searchType: 'detail'
      }
      api[apiName[this.routeQuery.current]](params).then(res => {
        if (res.data) this.queryData = res.data.list[0]
      })
    },
    /**
     * 调用查询详情接口
     */
    getPublicityDetail() {
      let apiName = {
        softList: 'getSoftPublicityDetail',
        oupsList: 'getOpusPublicityDetail',
        3: 'getDCIPublicityDetail',
      }
      let params = {
        registerNumber: this.routeQuery.registerNumber,
        sortType: this.currentTab === 'timeList' ? 'date' : 'register',
        userId: getCookie().id
      }
      api[apiName[this.routeQuery.current]](params).then(res => {
        if (res.data) {
          this[this.currentTab] = res.data
          this.tabContent = [...res.data]
        }
      })
    },
    /**
     * 切换tab
     * @param type 当前选项
     */
    handleClickTab(type) {
      this.currentTab = type
      if (this[type].length > 0) return this.tabContent = [...this[type]]
      this.getPublicityDetail()
    },
  },
  mounted() {
  },
  watch: {},
  created() {
    this.init()
  },
}

</script>