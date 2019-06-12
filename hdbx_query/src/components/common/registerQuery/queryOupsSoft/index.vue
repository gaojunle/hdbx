<template>
  <div class="query-oups-soft">
    <div class="title" v-text="aueryTitle">填写您需要查询的软件</div>
    <ul class="clearfix">
      <li class="register-number">
        <span>登记号</span>
        <input type="text" v-model="params.registerNumber" @blur="handleGetInfo" placeholder="请输入登记号">
        <div class="error" v-show="error.registerNumber" v-text="error.registerNumber"></div>
      </li>
      <!--软件名称-->
      <li class="soft-name" v-if="queryType === '1'">
        <span>软件名称</span>
        <input type="text" disabled="disabled" v-model="params.softname">
      </li>
      <!--作品名称-->
      <li class="soft-name" v-else>
        <span>作品名称</span>
        <input type="text" disabled="disabled" v-model="params.softname">
      </li>
      <!--著作权人-->
      <li v-if="!(queryType === '2' && applyType.value === 'agent')" class="owner-name" v-for="(item, index) in params.copyrightOwnerCorrect" :key="index">
        <span>
          著作权人
          <i v-show="(queryType === '1' && applyType.value === 'owner')">（国籍）</i>：
        </span>
        <input type="text" :disabled="applyType.value === 'owner'" v-model="params.copyrightOwner[index]" @blur="handleClearCopyrightOwnerError">
      </li>
      <!--著作权人信息-->
      <oups-owner v-if="(queryType === '2' && applyType.value === 'agent')" ref="oupsOwner"></oups-owner>
      <!--错误提示-->
      <div class="error" v-show="error.copyrightOwner" v-text="error.copyrightOwner"></div>
    </ul>
    <!--软件需要实名认证弹出框-->
    <div class="query-oups-soft-alert" v-if="isAlert">
      <div class="alert-box">
        <div class="title">所有著作权人都需要进行实名认证</div>
        <div class="button" @click="isAlert = false">关闭</div>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/common/registerQuery/queryOupsSoft/index'

import api from '@api'
import oupsOwner from './oupsOwner'

import { applyTypes } from '@share/constants/queryOupsSoft'

export default {
  data() {
    return {
      aueryTitle: this.queryType === '1' ?
        this.applyType.value === 'owner' ? '填写您需要查询的软件' : '填写您需要查询的作品' :
        this.applyType.value === 'owner' ? '填写您需要查询的作品' : '填写您需要查询的作品及著作权人信息', // 标题
      params: {
        registerNumber: '', // 登记号
        softname: '', // 软件名称
        copyrightOwner: [], // 著作权人
        copyrightOwnerCorrect: [], // 正确的著作权人
        opusname: '', // 作品名称
        ownerType: [], // 著作权人类型
        ownerCountry: [], // 著作权人国家
        owner: [], // 著作权人
        ownerIdType: [], // 著作权人证件类型
        ownerIdNumber: [], // 著作权人证件号码
      },
      error: {
        registerNumber: '', // 登记号
        copyrightOwner: '', // 著作权人
      }, // 错误信息
      dataInfo: [], // 查询信息
      userInfo: getCookie(), // 用户信息
      isAlert: false, // 是否显示未实名认证人员弹出框
      authenticationText: '所有著作权人都需要进行实名认证', // 提示错误文案
    }
  },
  props: {
    queryType: {
      type: String,
      default: '1'
    }, // 查询类型 1：软件查询；2：作品查询
    applyType: {
      type: Object,
      default: () => applyTypes[0]
    }, // 查询人身份 0：著作权人；1：代理人
  },
  components: { oupsOwner },
  methods: {
    /**
     * 软件相关信息获取
     */
    handleGetInfo() {
      let apiName = this.queryType === '1' ? 'getSoftInfo' : 'getOpusInfo'
      let params = {
        registerNumber: this.params.registerNumber,
        createUser: this.userInfo.accountName,
        applyType: this.applyType.value,
      }
      this.checkRegisterNumber()
      this.error.registerNumber = ''
      this.params.softname = ''
      if (!params.registerNumber) return
      api[apiName](params).then(res => {
        if (res.data && res.data.length > 0) {
          this.error.registerNumber = ''
          this.softResult(res.data)
        } else {
          this.error.registerNumber = '无效登记号'
        }
      })
    },
    /**
     * 软件查询结果
     * @param data
     */
    softResult(data) {
      let name = data[0].name
      this.dataInfo = data
      this.$emit('ownerChange', data)
      this.params.softname = name
      this.params.copyrightOwnerCorrect = data.map(item => item.owner)
      if (this.applyType.value === 'owner') {
        this.params.copyrightOwner = data.map(item => item.owner)
      } else {
        if (this.queryType === '2') return this.$refs.oupsOwner.setOupsOwner(this.params.copyrightOwnerCorrect)
        this.isAlert = data.some(item => parseInt(item.authorized) !== 1)
        if (this.isAlert) this.error.copyrightOwner = this.authenticationText
      }
    },
    /**
     * 校验登记号是否正确
     */
    checkRegisterNumber() {
      this.error.registerNumber = this.params.registerNumber ?
        this.params.softname ? '' : '无效登记号' : '请输入登记号'
    },
    /**
     * 清除著作人错误信息
     */
    handleClearCopyrightOwnerError() {
      if (this.checkCopyrightOwner()) this.error.copyrightOwner = ''
    },
    /**
     * 校验著作权人是否正确
     */
    handleCheckCopyrightOwner() {
      if (this.queryType === '1' && this.applyType === 'agent' && this.dataInfo.some(item => parseInt(item.authenticationState) !== 1)) return this.error.copyrightOwner = this.authenticationText
      if (!this.params.copyrightOwnerCorrect.length === 0) return this.error.registerNumber = '请输入正确的登记号'
      this.error.copyrightOwner = this.checkCopyrightOwner() ? '' : '著作权人不正确'
    },
    /**
     * 校验著作权人
     */
    checkCopyrightOwner() {
      let flag = true
      if (this.params.copyrightOwnerCorrect.length !== this.params.copyrightOwner.length) return false
      if (this.params.copyrightOwner.some(item => item === '')) return false
      this.params.copyrightOwnerCorrect.forEach(copyrightOwnerCorrect => {
        if (!this.params.copyrightOwner.some(copyrightOwner => copyrightOwner === copyrightOwnerCorrect)) flag = false
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
      if (this.queryType === '2' && this.applyType === 'agent') {
        if (!this.$refs.oupsOwner.checkOupsOwnerData()) return false
      } else {
        this.handleCheckCopyrightOwner()
      }
      return !keys.some(key => this.error[key] !== '')
    },
    /**
     * 获取data对象的值
     * @param key
     * @returns {*}
     */
    getData() {
      let oups = {
        registerNumber: '', // 登记号
        opusname: '', // 作品名称
        owner: [], // 著作权人
        ownerType: [], // 著作权人类型
        ownerCountry: [], // 著作权人国家
        ownerIdType: [], // 著作权人证件类型
        ownerIdNumber: [], // 著作权人证件号码
      }
      let soft = {
        registerNumber: '', // 登记号
        owner: [], // 著作权人
        owners: [], // 著作权人
        softname: '', // 软件名称
        copyrightOwner: [], // 著作权人
      }
      let params = this.queryType === '1' ? soft : oups


      Object.keys(params).forEach(key => {
        params[key] = this.params[key]
        if (key === 'opusname') params[key] = this.params.softname
        if (key === 'owner') params[key] = this.params.copyrightOwner
        if (key === 'owners') params[key] = this.dataInfo
        if (Array.isArray(params[key]) && params[key].length === 0) delete params[key]
      })
      if (this.queryType === '2' && this.applyType === 'agent') Object.assign(params, this.$refs.oupsOwner.getParams())
      return params
    },
    /**
     * 设置data对象的值
     * @param key
     * @param value
     */
    setData(data) {
      this.$nextTick(() => {
        if (data.ownerType) {
          let { ownerType, ownerCountry, owner, ownerIdType, ownerIdNumber } = data
          this.$refs.oupsOwner.setParams({            ownerType, ownerCountry, owner,
            ownerIdType, ownerIdNumber          })
        }

        Object.keys(data).forEach(key => {
          if (key === 'copyrightOwner') this.params.copyrightOwnerCorrect = data[key]
          if (key === 'opusname') this.params.softname = data[key]
          if (key === 'owner') {
            this.params.copyrightOwner = data[key]
            this.params.copyrightOwnerCorrect = data[key]
          }
          this.params[key] = data[key]
        })
      })
    },
  },
  mounted() {

  },
  watch: {
    applyType: {
      handler(val) {
        Object.keys(this.params).forEach(key => {
          this.params[key] = Array.isArray(this.params[key]) ? [] : ''
        })
        Object.keys(this.error).forEach(key => {
          this.error[key] = ''
        })
      },
      deep: true
    }
  },
  created() {
  },
}

</script>