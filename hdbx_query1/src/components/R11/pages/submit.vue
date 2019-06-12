<template>
  <div class="submit">
    <breadcrumb :crumb="crumb"></breadcrumb>
    <progress-nav :currentPage="2"></progress-nav>
    <div class="from">
      <soft-info :params="this.params"></soft-info>
      <ownership-info :params="this.params"></ownership-info>
      <div class="agentProxy" v-if="params.agentProxy">
        <div class="title">授权委托书</div>
        <img :src="params.agentProxy" alt>
      </div>
      <template v-if="identifyShow">
        <identify v-model="params.depositMode" ref="identify"></identify>
      </template>
      <handle-mode v-model="params.handleType"></handle-mode>
      <receive-mode v-model="params.receiveType" :propReceiveAddress="params.receiveAddress" :receiveModes="receiveModes" ref="receiveMode"></receive-mode>
    </div>
    <div class="buttons clearfix">
      <hd-button class="prev" width="232" height="50" @click="handlePrevPage('ownership')">上一步</hd-button>
      <hd-button class="next" width="232" height="50" @click="handleNext">下一步</hd-button>
    </div>
  </div>
</template>

<script>
import '@css/R11/submit'

import api from '@api'
import breadcrumb from '@components/common/breadcrumb'
import progressNav from '@components/common/registerQuery/progressNav'
import softInfo from '../components/softInfo'
import ownershipInfo from '../components/ownershipInfo'
import identify from '../components/identify'
import handleMode from '@share/components/softQuery/handleMode'
import receiveMode from '@share/components/softQuery/receiveMode'
import hdButton from '@share/components/hdButton'

export default {
  data() {
    return {
      crumb: [
        {
          name: '软件著作权登记申请'
        }
      ], // 面包屑导航
      params: {
        depositMode: '1', // 交存形式
        handleType: 'tq', // 办理方式
        receiveType: 'tq', // 证书领取方式
        receiveAddress: '', // 领取地点
      },
      identifyShow: false, // 鉴别材料是否显示
      receiveModes: [
        {
          name: '登记大厅自取',
          value: 'xc'
        },
        {
          name: 'EMS到付',
          value: 'ems'
        },
        {
          name: '挂号信',
          value: 'mail'
        },
      ], // 办理方式选择
    }
  },
  props: [],
  computed: {},
  components: { breadcrumb, progressNav, softInfo, ownershipInfo, identify, handleMode, receiveMode, hdButton },
  methods: {
    /**
     * 回退上一页
     * @param pageName 跳转页面名称
     */
    handlePrevPage(pageName) {
      let flowNumber = this.$route.query.flowNumber
      this.$router.push({ name: pageName, query: { flowNumber } })
    },
    /**
     * 点击下一步
     */
    handleNext() {
      if (this.$refs.identify.check(this.params)) return
      this.params.receiveAddress = this.params.receiveType === 'mail' ?
        this.$refs.receiveMode.getReceiveAddress() : this.params.receiveType === 'ems' ?
          this.$refs.receiveMode.getReceiveAddress() : ''

      api.addR11BaseInfo(this.params).then(res => {
        if (res.data) this.submitSuccess(res.data)
      })
    },
    /**
     * 提交成功
     * @param flowNumber 流水号
     */
    submitSuccess(flowNumber) {
      clearSession('R11')
      this.$router.push({ name: 'printMaterial', query: { flowNumber, type: 'R11' } })
    },
  },
  watch: {},
  mounted() { },
  created() {
    Object.assign(this.params, getSession('R11'))
    this.identifyShow = !this.params.inheritanceSoftRegNum
  },
}

</script>
<style lang='scss' scoped>
</style>