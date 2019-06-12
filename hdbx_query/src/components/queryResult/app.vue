<template>
  <div class="query-result">
    <div class="w1200">
      <top-nav ref="header"></top-nav>
      <breadcrumb :crumb="crumb"></breadcrumb>
      <search class="page" @search_handle="search_handle" @clearQueryData="clearQueryData" :showTypes="true"></search>
      <ul class="list" v-if="queryData.length > 0">
        <li v-for="(item, index) in queryData" :key="index">
          <component v-bind:is="currentTab + 'Item'" :queryData="item"></component>
        </li>
        <el-pagination style="text-align: center" :current-page="pageNo" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
      </ul>
    </div>
    <hd-footer></hd-footer>
  </div>
</template>

<script>

import '@css/queryResult'
import api from '@api'
import topNav from '@components/common/header'
import search from '@components/common/search'
import breadcrumb from '@components/common/breadcrumb'
import softListItem from './softListItem'
import oupsListItem from './oupsListItem'
import hdFooter from '@components/common/hdFooter'
import Utils from '@share/js/utils/utils'

export default {
  data() {
    return {
      crumb: [
        {
          name: '公告查询'
        }
      ], // 面包屑导航
      currentTab: 'softList', // 当前选中查询类型
      registerInfo: '', // 查询条件
      picker: [], // 时间选择
      currentType: 'all', // 当前选中公告类型
      queryData: [], // 查询到的结果
      pageNo: 1, // 页码
      pageSize: 20, // 每页获取条数
      total: 50, // 总页数
    }
  },
  components: { topNav, search, breadcrumb, softListItem, oupsListItem, hdFooter },
  methods: {
    /**
     * 搜索结果
     * @param isLogin 是否登录
     * @param registerInfo 查询内容
     * @param currentTab 查询公告
     * @param picker 查询时间
     * @param currentType 查询类型
     */
    search_handle(isLogin, registerInfo, currentTab, picker, currentType) {
      this.registerInfo = registerInfo
      this.currentTab = currentTab
      this.picker = picker
      this.currentType = currentType
      this.pageNo = 1
      if (isLogin) return this.getPublicity()
      this.$refs.header.openLogin('query', login => this.search_handle(login, registerInfo, currentTab, picker, currentType))
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
        keyWord: this.registerInfo,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        publicityType: this.currentType,
        searchType: 'all'
      }
      if (this.picker.length > 1) {
        params.registerDateStart = this.picker[0]
        params.registerDateEnd = this.picker[1]
      }
      api[apiName[this.currentTab]](params).then(res => {
        if (res.data) {
          this.queryData = [...res.data.list]
          this.total = res.data.paging.total
        }
      })
    },
    /**
     * 当前页面改变时会触发
     * @param val 当前页面的位置
     */
    handleCurrentChange(val) {
      this.pageNo = val
      this.getPublicity()
    },
    /**
     * 清空数据
     */
    clearQueryData() {
      this.queryData = []
    }
  },
  mounted() {
  },
  watch: {},
  created() {
    this.registerInfo = decodeURI(decodeURI(getUrlRequest().search || ''))
    this.currentTab = getUrlRequest().current || this.currentTab

    if (this.registerInfo) this.getPublicity()
  },
}

</script>