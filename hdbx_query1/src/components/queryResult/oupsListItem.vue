<template>
  <div class="oups-list-item">
    <div class="title clearfix">
      <div class="title-left" v-if="queryData.registerNumber">
        登记号：
        <span v-text="queryData.registerNumber"></span>
      </div>
      <div class="title-left" v-else>
        原登记号：
        <span v-text="queryData.originalRegNum"></span>
      </div>
      <div class="title-right">{{ queryData.publicityRegisterType | registerType }}</div>
    </div>
    <div class="query-data-box clearfix">
      <!-- Z11 -->
      <template v-if="queryData.publicityRegisterType === 'Z11'">
        <div class="opus-name w-max">
          作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-obligee w-max">
          著作权人：
          <span v-text="queryData.obligee"></span>
        </div>
        <div class="opus-type">
          作品类别：
          <span v-text="queryData.opusType"></span>
        </div>
        <div class="opus-complete-date">
          创作完成日期：
          <span>{{ queryData.completeDate | formatDate }}</span>
        </div>
        <div class="opus-appear-date">
          首次发表日期：
          <span>{{ queryData.appearDate | formatDate }}</span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z21 -->
      <template v-if="queryData.publicityRegisterType === 'Z21'">
        <div class="opus-name w-max">
          作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-type">
          作品类别：
          <span v-text="queryData.opusType"></span>
        </div>
        <div class="opus-ceder">
          转让(许可)方：
          <span v-text="queryData.ceder"></span>
        </div>
        <div class="opus-alienee">
          受让(被许可)方：
          <span v-text="queryData.alienee"></span>
        </div>
        <div class="date">
          备案日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z31 -->
      <template v-if="queryData.publicityRegisterType === 'Z31'">
        <div class="opus-name w-max">
          作品名称：
          <span v-text="queryData.registerName"></span>
        </div>
        <div class="opus-obligee w-max">
          权利人：
          <span v-text="queryData.obligee"></span>
        </div>
        <div class="opus-type">
          作品类别：
          <span v-text="queryData.registerType"></span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z41 -->
      <template v-if="queryData.publicityRegisterType === 'Z41'">
        <div class="opus-cn-name w-max">
          期刊中文名称：
          <span v-text="queryData.opusCnName"></span>
        </div>
        <div class="opus-ceder">
          转让（许可）方：
          <span v-text="queryData.ceder"></span>
        </div>
        <div class="opus-alienee">
          受让（被许可）方：
          <span v-text="queryData.alienee"></span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z51 -->
      <template v-if="queryData.publicityRegisterType === 'Z51'">
        <div class="opus-name w-max">
          涉及作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-czr">
          出质人：
          <span v-text="queryData.czr"></span>
        </div>
        <div class="opus-zqr">
          质权人：
          <span v-text="queryData.zqr"></span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z53 -->
      <template v-if="queryData.publicityRegisterType === 'Z53'">
        <div class="opus-name w-max">
          涉及作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-item">
          变更项：
          <span v-text="queryData.item"></span>
        </div>
        <div class="opus-czr">
          出质人：
          <span v-text="queryData.czr"></span>
        </div>
        <div class="opus-zqr">
          质权人：
          <span v-text="queryData.zqr"></span>
        </div>
        <div class="opus-beforeContent">
          变更前：
          <span v-text="queryData.beforeContent"></span>
        </div>
        <div class="opus-afterContent w-max after">
          变更后：
          <span v-text="queryData.afterContent"></span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z54 -->
      <template v-if="queryData.publicityRegisterType === 'Z54'">
        <div class="opus-name w-max">
          涉及作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-czr">
          出质人：
          <span v-text="queryData.czr"></span>
        </div>
        <div class="opus-zqr">
          质权人：
          <span v-text="queryData.zqr"></span>
        </div>
        <div class="opus-copyrightScope">
          出质著作权范围：
          <span v-text="queryData.copyrightScope"></span>
        </div>
        <div class="opus-copyrightType w-max">
          出质著作权种类：
          <span v-text="queryData.copyrightType"></span>
        </div>
        <div class="date">
          登记日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z61 -->
      <template v-if="queryData.publicityRegisterType === 'Z61'">
        <div class="opus-name w-max">
          作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-item">
          变更/补充项：
          <span v-text="queryData.item"></span>
        </div>
        <div class="opus-orgRegister-type">
          原登记类型：
          <span v-text="queryData.registerType"></span>
        </div>
        <div class="opus-beforeContent">
          变更/补充前：
          <span v-text="queryData.beforeContent"></span>
        </div>
        <div class="opus-afterContent w-max after">
          变更/补充后：
          <span v-text="queryData.afterContent"></span>
        </div>
        <div class="date">
          变更日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- Z62-->
      <template v-if="queryData.publicityRegisterType === 'Z62'">
        <div class="opus-name w-max">
          作品名称：
          <span v-text="queryData.opusName"></span>
        </div>
        <div class="opus-register-type">
          原登记类型：
          <span v-text="queryData.registerType"></span>
        </div>
        <div class="date">
          撤销日期：
          <span>{{ queryData.registerDate | formatDate }}</span>
        </div>
      </template>
      <!-- 查看详情按钮 -->
      <template v-if="showButton && parseInt(userInfo.authenticationState) === 1">
        <div class="button" @click="handleToDetails(queryData)">查看详情</div>
      </template>
    </div>
  </div>
</template>

<script>

import '@css/queryResult/oupsListItem'

export default {
  data() {
    return {
      userInfo: getCookie(), // 用户信息
    }
  },
  props: {
    queryData: {
      type: Object,
      default: () => ({})
    }, // 内容数据
    showButton: {
      type: Boolean,
      default: true
    }, // 是否显示详情按钮
  },
  computed: {},
  components: {},
  methods: {
    /**
     * 进入详情
     * @param queryData 选中项信息
     */
    handleToDetails(queryData) {
      let { registerNumber, publicityRegisterType } = queryData
      open(`./queryResultDetails.html?current=oupsList&registerNumber=${registerNumber}&publicityRegisterType=${publicityRegisterType}`)
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>