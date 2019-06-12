<template>
  <div class="search">
    <ul class="tabs clearfix">
      <li v-for="(tab, index) in tabs" :key="index" v-text="tab.text" :class="{'current': currentTab === tab.value}" @click="handleChangeTab(tab)"></li>
    </ul>
    <div class="search-box clearfix">
      <div class="keyword" v-if="showTypes">关键字：</div>
      <input type="text" :placeholder="placeholders[currentTab]" v-model="registerInfo" @keyup.enter="search_handle">
      <template v-if="showTypes && currentTab === 'oupsList'">
        <div class="date">登记日期：</div>
        <el-date-picker v-model="picker" type="daterange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
      </template>
      <div class="button" @click="search_handle">检索</div>
    </div>
    <div class="types clearfix" v-if="showTypes">
      <div class="types-title">公告类型：</div>
      <ul class="clearfix">
        <li v-for="(type, index) in types[currentTab]" :key="index" v-text="type.label" :class="{'current': currentType === type.value}" @click="handleChangeTpye(type)"></li>
      </ul>
    </div>
  </div>
</template>

<script>

import '@css/common/search'
import '@share/css/theme'
import Vue from 'vue'
import { DatePicker } from 'element-ui'

Vue.use(DatePicker)

export default {
  data() {
    return {
      tabs: [
        {
          text: '软件公告', // 展示文案
          value: 'softList', // 查询类型
        },
        {
          text: '作品公告', // 展示文案
          value: 'oupsList', // 查询类型
        },
        {
          text: 'DCI公告', // 展示文案
          value: 3, // 查询类型
        },
      ], // 查询类型
      currentTab: 'softList', // 当前选中查询类型
      registerInfo: '', // 查询条件
      placeholders: {
        1: '请输入精确登记号、软件名称、著作权人',
        2: '请输入【登记号】、【作品名称】或【著作权人】，多关键字用空格隔开',
      }, // 搜索框默认文案
      picker: [], // 时间选择
      types: {
        softList: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '软件著作权登记',
            value: 'R11'
          },
          {
            label: '软件著作权转让合同登记',
            value: 'R21Attorn'
          },
          {
            label: '软件著作权专有许可合同登记',
            value: 'R21Proprietary'
          },
          {
            label: '软件著作权变更补充登记',
            value: 'R41'
          },
          {
            label: '软件著作权登记撤销',
            value: 'R42R44'
          },
          {
            label: '软件著作权质押合同登记',
            value: 'R31'
          },
          {
            label: '软件著作权质押合同注销',
            value: 'R32'
          },
          {
            label: '已解密的软件著作权登记',
            value: 9
          },
        ], // 软件公告
        oupsList: [
          {
            label: '全部',
            value: 'all'
          },
          {
            label: '作品著作权登记',
            value: 'Z11'
          },
          {
            label: '著作权合同备案',
            value: 'Z21'
          },
          {
            label: '与著作权相关权利事项登记',
            value: 'Z31'
          },
          {
            label: '重印国外期刊合同登记',
            value: 'Z41'
          },
          {
            label: '著作权质押合同登记',
            value: 'Z51'
          },
          {
            label: '著作权质押合同变更登记',
            value: 'Z53'
          },
          {
            label: '著作权质押合同注销撤销登记',
            value: 'Z54'
          },
          {
            label: '作品著作权和合同变更或补充登记',
            value: 'Z61'
          },
          {
            label: '撤销作品著作权和合同登记',
            value: 'Z62'
          },
        ], // 作品公告
      }, // 公告类型
      currentType: 'all', // 当前选中公告类型
    }
  },
  props: {
    showTypes: {
      type: Boolean,
      default: false
    },
  },
  components: {},
  methods: {
    /**
     * 选择公告
     * @param tab 当前选中项
     */
    handleChangeTab(tab) {
      this.currentTab = tab.value
      this.picker = []
      this.currentType = 'all'
      this.$emit('clearQueryData')
    },
    /**
     * 查询
     */
    search_handle() {
      if (!this.registerInfo) return
      let isLogin = Boolean(getCookie())
      this.$emit('search_handle', isLogin, this.registerInfo, this.currentTab, this.picker, this.currentType)
    },
    /**
     * 选择公告类型
     * @param type 当前选中项
     */
    handleChangeTpye(type) {
      this.currentType = type.value
      this.search_handle()
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    this.registerInfo = decodeURI(decodeURI(getUrlRequest().search || ''))
    this.currentTab = getUrlRequest().current || this.currentTab
  },
}

</script>