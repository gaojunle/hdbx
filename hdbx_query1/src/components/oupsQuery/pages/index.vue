<template>
  <div class="register">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <div class="w1200">
      <progress-nav :currentPage="1"></progress-nav>
      <apply-purpose ref="applyPurpose" v-model="params.applyPurpose" :applyPurposes="applyPurposes" :disabled="disableds.applyPurpose" @change="getApplyIdentitys"></apply-purpose>
      <apply-type v-model="params.applyIdentity" :applyTypes="applyIdentitys" :disabled="disableds.applyIdentity"></apply-type>
      <div class="bottom">
        <hd-button width="232" height="50" @click="handleNext">下一步</hd-button>
      </div>
    </div>
    <hd-alert ref="hdAlert" title="需实名认证" confirmText="前往实名认证" :clearBtn="true" @handleConfirm="toPage">
      <p>需要实名认证方可进行查询业务</p>
    </hd-alert>
  </div>
</template>

<script>

import '@css/oupsQuery/register'

import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import applyPurpose from '@share/components/softQuery/applyPurpose'
import applyType from '@share/components/softQuery/applyType'
import hdButton from '@share/components/hdButton'
import hdAlert from '@share/components/hdAlert'
import { applyPurposesOups, applyTypesOpus, agentOupsType } from '@share/constants/queryOupsSoft'
import { HTML_HOST } from '@share/api/config'

export default {
  data() {
    return {
      crumb: [
        {
          name: '申请作品登记查询'
        }
      ], // 面包屑导航
      paramsOriginal: {
        applyPurpose: '', // 用途
        applyIdentity: '', // 身份
        oupsQuery: '', // 接口返回或缓存中的数据
      }, // 接口返回或缓存中的数据
      params: {
        applyPurpose: applyPurposesOups[0].value, // 用途
        applyIdentity: '', // 身份
      },
      applyPurposes: applyPurposesOups, // 用途列表
      applyIdentitys: [], // 身份列表
      disableds: {
        applyPurpose: false,
        applyIdentity: false,
        queryOpusBaseInfoEntityList: false,
        opusQueryPeopleInfoVo: false,
        attachementList: false,
        receiveType: false,
      }, // 是否可修改
    }
  },
  computed: {},
  components: { breadcrumb, progressNav, applyPurpose, applyType, hdButton, hdAlert },
  methods: {
    /**
   * 设置数据
   */
    setParams(data) {
      Object.keys(this.disableds).forEach(key => {
        this.disableds[key] = data.fillInfo[key] ? true : false
      })
      setSession(this.disableds, 'oupsDisableds')
      this.params = { ...data.opusQueryInfo }
      this.params.flowNumber = this.$route.query.flowNumber
      this.init(data.opusQueryInfo)
    },
    /**
     * 初始化页面数据
     * @param softQuery 页面数据
     */
    init(oupsQuery) {
      let { applyPurpose, applyIdentity } = oupsQuery
      this.paramsOriginal.applyPurpose = applyPurpose
      this.paramsOriginal.applyIdentity = applyIdentity
      this.paramsOriginal.oupsQuery = oupsQuery
      this.getApplyIdentitys(applyPurpose)
      Object.assign(this.params, { applyPurpose, applyIdentity })
    },
    /**
     * 获取身份类型列表
     */
    getApplyIdentitys(value) {
      let applyPurpose = applyPurposesOups.find(item => item.value === value)
      this.applyIdentitys = applyPurpose.applyTypes.map(applyType => applyTypesOpus.find(item => item.value === applyType))
      this.params.applyIdentity = this.applyIdentitys[0].value
    },
    /**
     * 点击下一步
     */
    handleNext() {
      if (this.params.applyIdentity === 'JUDICIAL') return this.nextPage()
      parseInt(getCookie().authenticationState) === 2 ? this.nextPage() : this.showAlert()
    },
    /**
     * 展示弹出框
     */
    showAlert() {
      this.$refs.hdAlert.alertShow = true
    },
    /**
     * 前往实名认证页面
     */
    toPage() {
      window.location.href = HTML_HOST + 'accounts/authentication.html'
    },
    /**
  * 进入下一页
  */
    nextPage() {
      let flowNumber = this.$route.query.flowNumber
      let flag = true
      if (this.params.applyPurpose !== this.paramsOriginal.applyPurpose) flag = false
      if (this.params.applyIdentity !== this.paramsOriginal.applyIdentity) flag = false
      if (flag) Object.assign(this.params, this.paramsOriginal.oupsQuery)
      clearSession('oupsQuery')
      setSession(this.params, 'oupsQuery')

      this.$router.push({ name: 'register', query: { flowNumber } })
    },
  },
  mounted() {
    if (this.flowNumber) return api.getReFillInfo(this.flowNumber).then(res => {
      if (res.data) this.setParams(res.data)
    })
    let oupsQuery = getSession('oupsQuery')
    if (oupsQuery) this.init(oupsQuery)
  },
  watch: {},
  created() {
    this.getApplyIdentitys(this.params.applyPurpose)
    clearSession('oupsDisableds')
    this.flowNumber = this.$route.query.flowNumber
  }
}
</script>