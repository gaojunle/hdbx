<template>
  <div class="instructions">
    <div class="title">选择您的身份</div>
    <div class="content">
      <div class="title">授权期限</div>
      <div class="term clearfix">
        <div class="term-left clearfix">
          <p>自</p>
          <el-date-picker v-model="params.baileeStartTime" type="date" placeholder="选择日期" :editable="false" :readonly="true"></el-date-picker>
          <p>起，至</p>
        </div>
        <ul class="term-right">
          <li>
            <hd-radio v-model="term" :label="'0'" :name="'term'" @change="handleTermChange">本次查询申请办理结束</hd-radio>
          </li>
          <li>
            <hd-radio v-model="term" :label="'1'" :name="'term'" @change="handleTermChange"></hd-radio>
            <el-date-picker v-model="params.baileeEndTime" type="date" placeholder="选择日期" :editable="false" @change="endDateChange" :disabled="term === '0'"></el-date-picker>
            <span>截止</span>
            <div class="error" v-show="error.baileeEndTime" v-text="error.baileeEndTime"></div>
          </li>
        </ul>
      </div>
      <div class="title">选择受托人</div>
      <ul class="bailee-list clearfix">
        <li v-for="bailee in baileeList" :key="bailee.id">
          <input type="checkbox" v-model="params.bailee" :value="bailee" :id="bailee.id" @change="handleTrusteeChange">
          <label :for="bailee.id" v-text="bailee.accountName"></label>
        </li>
        <li class="error" v-show="error.bailee" v-text="error.bailee"></li>
      </ul>
      <div class="button" @click="showAlert">查看授权委托书</div>
    </div>
    <div class="instructions-alert" v-show="isAlert">
      <div class="alert-box">
        <div class="close-alert" @click="hideAlert">X</div>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/common/registerQuery/instructions'
import '@css/theme'

import Vue from 'vue'
import api from '@api'
import hdRadio from '@share/components/hdRadio'
import {
  DatePicker,
} from 'element-ui'

Vue.use(DatePicker)

export default {
  data() {
    return {
      params: {
        baileeStartTime: new Date(new Date().setHours(0, 0, 0, 0)).getTime(), // 开始日期
        baileeEndTime: '', // 结束日期
        bailee: [], // 委托人
      },
      error: {
        baileeEndTime: '', // 结束日期
        bailee: '', // 委托人
      },
      term: '0', // 选择结束时间
      baileeList: [], // 受托人选项
      isAlert: false, // 显示授权委托书
    }
  },
  components: { hdRadio },
  methods: {
    /**
     * 组件初始化
     */
    init() {
      let userInfo = getCookie()
      if (parseInt(userInfo.accountType) === 0) {
        this.baileeList.push({
          accountName: userInfo.accountName,
          id: userInfo.id        })
        this.params.bailee.push({
          accountName: userInfo.accountName,
          id: userInfo.id
        })
        return
      }
    },
    /**
     * 结束时间选择
     */
    handleTermChange(ele) {
      // this.term = ele.target.value
      this.params.baileeEndTime = ''
      this.error.baileeEndTime = ''
    },
    /**
     * 授权结束日期变化
     */
    endDateChange() {
      this.params.baileeEndTime = new Date(this.params.baileeEndTime).getTime()
      this.error.baileeEndTime = this.params.baileeEndTime ?
        this.params.baileeEndTime - this.params.baileeStartTime > -1 ?
          '' : '授权截止日期不能小于授权开始日期'
        : '请选择授权截止日期'
    },
    /**
     * 授托人变化
     */
    handleTrusteeChange() {
      this.error.bailee = this.params.bailee.length === 0 ?
        '请选择受托人' : ''
    },
    /**
     * 显示授权委托书
     */
    showAlert() {
      if (!this.checkInstructions()) return
      this.isAlert = true
      document.body.style.position = 'fixed';
      document.body.style.overflow = 'hidden';
    },
    checkInstructions() {
      let flag = true
      if (this.term === '1') this.endDateChange()
      this.handleTrusteeChange()
      flag = !Object.values(this.error).some(item => item !== '')
      return flag
    },
    /**
     * 隐藏授权委托书
     */
    hideAlert() {
      this.isAlert = false
      document.body.style.position = 'relative';
      document.body.style.overflow = 'auto';
    },
    /**
     * 获取需要上传的信息
     * @returns {*}
     */
    getParams() {
      return this.params
    },
    /**
     * 设置需要上传的信息
     * @param data
     */
    setParams(data) {
      Object.keys(data).forEach(key => {
        if (data[key]) this.params[key] = data[key]
      })
      if (this.params.baileeEndTime) this.term = '1'
    },
  },
  mounted() {

  },
  watch: {},
  created() {
    this.init()
  }
}

</script>