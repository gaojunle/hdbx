<template>
  <div class="soft-list-item">
    <div class="title clearfix">
      <div class="title-left">
        登记号：
        <span v-text="queryData.registerNumber"></span>
      </div>
      <div class="title-right">{{ queryData.publicityRegisterType | registerType }}</div>
    </div>
    <div class="query-data-box clearfix">
      <div class="soft-name">
        软件全称：
        <span v-text="queryData.softFullName"></span>
      </div>
      <!-- R11 -->
      <template v-if="queryData.publicityRegisterType === 'R11'">
        <div class="soft-obligee">
          著作权人：
          <span v-text="queryData.obligeePeoples"></span>
        </div>
        <div class="soft-edition">
          版本号：
          <span v-text="queryData.editionNumber"></span>
        </div>
        <div class="soft-short">
          简称：
          <span v-text="queryData.softForShort"></span>
        </div>
        <div class="soft-appearDate">
          软件开发完成日期：
          <span>{{ queryData.completeDate | formatDate }}</span>
        </div>
        <div class="soft-appearDate">
          首次发表日期：
          <span>{{ queryData.appearDate | formatDate }}</span>
        </div>
        <div class="soft-rightObtainMode">
          权利取得方式：
          <span>{{ queryData.rightObtainMode }}</span>
        </div>
        <div class="soft-rightScope">
          权利范围：
          <span>{{ queryData.rightScope }}</span>
        </div>
      </template>
      <!-- R21Attorn -->
      <template v-else-if="queryData.publicityRegisterType === 'R21Attorn'">
        <div class="soft-edition">
          版本号：
          <span v-text="queryData.editionNumber"></span>
        </div>
        <div class="soft-origReg">
          软件著作权登记号：
          <span v-text="queryData.origRegNumber"></span>
        </div>
        <div class="soft-attorn">
          转让方：
          <span v-text="queryData.attornSide"></span>
        </div>
        <div class="soft-accept">
          受让方：
          <span v-text="queryData.acceptSide"></span>
        </div>
      </template>
      <!-- R21Proprietary -->
      <template v-else-if="queryData.publicityRegisterType === 'R21Proprietary'">
        <div class="soft-edition">
          版本号：
          <span v-text="queryData.editionNumber"></span>
        </div>
        <div class="soft-origReg">
          软件著作权登记号：
          <span v-text="queryData.origRegNumber"></span>
        </div>
        <div class="soft-leave">
          许可方：
          <span v-text="queryData.leaveSide"></span>
        </div>
        <div class="soft-beleave">
          被许可方：
          <span v-text="queryData.beleaveSide"></span>
        </div>
        <div class="soft-valid-date">
          许可期限：
          <span>{{ queryData.validStartDate | dateSection(queryData.validEndDate) }}</span>
        </div>
        <div class="soft-rightScope">
          许可权利：
          <span v-text="queryData.rightScope"></span>
        </div>
        <div class="soft-regionScope">
          地域范围：
          <span v-text="queryData.regionScope"></span>
        </div>
      </template>
      <!-- R31/R32 -->
      <template v-else-if="queryData.publicityRegisterType === 'R31' || queryData.publicityRegisterType === 'R32'">
        <div class="soft-zwqk">
          质物情况：
          <span v-text="queryData.zwqk"></span>
        </div>
        <div class="soft-czr">
          出质人：
          <span v-text="queryData.czr"></span>
        </div>
        <div class="soft-zqr">
          质权人：
          <span v-text="queryData.zqr"></span>
        </div>
      </template>
      <!-- R41 -->
      <template v-else-if="queryData.publicityRegisterType === 'R41'">
        <div class="soft-change">
          变更/补充项：
          <span v-text="queryData.changeItem"></span>
        </div>
        <div class="soft-register">
          软件著作权登记号：
          <span v-text="queryData.registerNumber"></span>
        </div>
        <div class="soft-before">
          变更/补充前：
          <span v-text="queryData.beforeChange"></span>
        </div>
        <div class="soft-after">
          变更/补充后：
          <span v-text="queryData.afterChange"></span>
        </div>
      </template>
      <!-- R42R44 -->
      <template v-else-if="queryData.publicityRegisterType === 'R42R44'">
        <div class="soft-original-register">
          原登记者：
          <span v-text="queryData.originalRegisterMan"></span>
        </div>
        <div class="soft-edition">
          版本号：
          <span v-text="queryData.editionNumber"></span>
        </div>
      </template>
      <!-- 查看详情按钮 -->
      <template v-if="showButton && parseInt(userInfo.authenticationState) === 1">
        <div class="button" @click="handleToDetails(queryData)">查看详情</div>
      </template>
      <!-- 登记日期 -->
      <div class="register-date">
        登记日期：
        <span>{{ queryData.registerDate | formatDate }}</span>
      </div>
    </div>
  </div>
</template>

<script>

import '@css/queryResult/softListItem'

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
    },
    showButton: {
      type: Boolean,
      default: true
    }
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
      open(`./queryResultDetails.html?current=softList&registerNumber=${registerNumber}&publicityRegisterType=${publicityRegisterType}`)
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>