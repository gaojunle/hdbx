<template>
  <div class="query-soft">
    <div class="title" v-text="aueryTitle"></div>
    <ul class="clearfix">
      <li class="register-number">
        <span>登记号</span>
        <input type="text" v-model="params.registerNumber" @blur="handleGetInfo" placeholder="请输入登记号">
        <div class="error" v-show="error.registerNumber" v-text="error.registerNumber"></div>
      </li>
      <!--软件名称-->
      <li class="soft-name">
        <span>软件名称</span>
        <input type="text" disabled="disabled" v-model="params.softFullName">
      </li>
      <!--著作权人-->
      <li class="owner-name" v-for="(item, index) in copyrightOwnerCorrect" :key="index">
        <span>
          著作权人
          <i v-show="applyType === 'owner'">（国籍）</i>：
        </span>
        <input type="text" :disabled="applyType === 'owner'" v-model="params.owner[index]" @blur="handleClearCopyrightOwnerError">
      </li>
      <!--错误提示-->
      <div class="error" v-show="error.owner" v-text="error.owner"></div>
    </ul>
    <!--软件需要实名认证弹出框-->
    <div class="query-soft-alert" v-if="isAlert">
      <div class="alert-box">
        <div class="title">所有著作权人都需要进行实名认证</div>
        <div class="button" @click="isAlert = false">关闭</div>
      </div>
    </div>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/querySoft'
import axios from '../../api/axios'
import { API_HOST } from '../../api/config'
import { applyTypes } from '../../constants/queryOupsSoft'

export default {
  data() {
    return {
      dataInfo: [], // 查询信息
      params: {
        registerNumber: '', // 登记号
        softFullName: '', // 软件名称
        owner: [], // 著作权人
      },
      copyrightOwnerCorrect: [], // 正确的著作权人
      error: {
        registerNumber: '', // 登记号
        owner: '', // 著作权人
      }, // 错误信息
      userInfo: getCookie(), // 用户信息
      isAlert: false, // 是否显示未实名认证人员弹出框
      authenticationText: '所有著作权人都需要进行实名认证', // 提示错误文案
    }
  },
  props: {
    applyType: {
      type: String,
      default: () => applyTypes[0].value
    }, // 查询人身份 
    apiAddress: {
      type: String,
      default: API_HOST + '/registerQuerySoftServer/softQuery/getSoftPeopleInfo'
    }, // 接口接口地址
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  computed: {
    // 标题
    aueryTitle() {
      return this.applyType.value === 'owner' ? '填写您需要查询的作品' : '填写您需要查询的作品及著作权人信息'
    },
  },
  components: {},
  methods: {
    /**
     * 软件相关信息获取
     */
    handleGetInfo() {
      let params = {
        registerNumber: this.params.registerNumber,
        createUser: this.userInfo.id,
        applyType: this.applyType,
      }
      this.checkRegisterNumber()
      this.error.registerNumber = ''
      this.params.softFullName = ''
      if (!params.registerNumber) return
      axios(this.apiAddress, params).then(res => {
        if (res.data && res.data.length > 0) {
          this.error.registerNumber = ''
          this.softResult(res.data)
        } else {
          this.clearInit('registerNumber')
          this.error.registerNumber = '无效登记号'
        }
      })
    },
    /**
     * 校验登记号是否正确
     */
    checkRegisterNumber() {
      this.error.registerNumber = this.params.registerNumber ?
        this.params.softFullName ? '' : '无效登记号' : '请输入登记号'
    },
    /**
     * 软件查询结果
     * @param data 接口返回信息
     */
    softResult(data) {
      this.dataInfo = data
      this.$emit('ownerChange', data)
      this.params.softFullName = data[0].softFullName
      this.copyrightOwnerCorrect = data.map(item => item.owner)
      if (this.applyType === 'owner') {
        this.params.owner = data.map(item => item.owner)
      } else {
        this.isAlert = data.some(item => parseInt(item.authorized) !== 1)
        if (this.isAlert) this.error.owner = this.authenticationText
      }
    },
    /**
     * 清除著作人错误信息
     */
    handleClearCopyrightOwnerError() {
      if (this.checkCopyrightOwner()) this.error.owner = ''
    },
    /**
     * 校验著作权人
     */
    checkCopyrightOwner() {
      let flag = true
      if (this.copyrightOwnerCorrect.length !== this.params.owner.length) return false
      if (this.params.owner.some(item => item === '')) return false
      this.copyrightOwnerCorrect.forEach(copyrightOwnerCorrect => {
        if (!this.params.owner.some(owner => owner === copyrightOwnerCorrect)) flag = false
      })
      return flag
    },

    /**
     * 验证查询软件是否正确
     * @returns {boolean}
     */
    checkQueryOupsSoft() {

      let keys = Object.keys(this.error)
      this.checkRegisterNumber()
      this.handleCheckCopyrightOwner()
      return !keys.some(key => this.error[key] !== '')
    },
    /**
     * 校验著作权人是否正确
     */
    handleCheckCopyrightOwner() {
      if (this.applyType === 'agent' && this.dataInfo.some(item => parseInt(item.authorized) !== 1)) return this.error.owner = this.authenticationText
      if (!this.copyrightOwnerCorrect.length === 0) return this.error.registerNumber = '请输入正确的登记号'
      this.error.owner = this.checkCopyrightOwner() ? '' : '著作权人不正确'
    },
    /**
     * 清空数据
     * @filters 不需要清空的数据
     */
    clearInit(...filters) {
      Object.keys(this.params).forEach(key => {
        if (filters.some(filter => filter === key)) return
        this.params[key] = Array.isArray(this.params[key]) ? [] : ''
      })
      Object.keys(this.error).forEach(key => {
        this.error[key] = ''
      })
    },
    /**
    * 获取data对象的值
    * @returns {*}
    */
    getData() {

      return this.params
    },
    /**
     * 设置data对象的值
     * @param key
     * @param value
     */
    setData(data) {
      this.$nextTick(() => {
        Object.keys(data).forEach(key => {
          if (key === 'owner') this.copyrightOwnerCorrect = data[key]
          this.params[key] = data[key]
        })
      })
    },
  },
  watch: {
    applyType: {
      handler(val) {
        this.clearInit()
      },
      deep: true
    }
  },
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>