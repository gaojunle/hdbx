<template>
  <ul class="type-list-soft-item">
    <li v-for="(item, index) in detailsList" :key="index">
      <div class="title">{{ item.publicityRegisterType | registerType }}</div>
      <div class="content clearfix">
        <div class="register-number">
          登记号：
          <span v-text="item.registerNumber"></span>
        </div>

        <!-- R11 -->
        <template v-if="item.publicityRegisterType === 'R11'">
          <div class="soft-short">
            软件简称：
            <span v-text="item.softForShort"></span>
          </div>
          <div class="soft-edition">
            版本号：
            <span v-text="item.editionNumber"></span>
          </div>
          <div class="soft-appearDate">
            软件开发完成日期：
            <span>{{ item.completeDate | formatDate }}</span>
          </div>
          <div class="soft-appearDate">
            首次发表日期：
            <span>{{ item.appearDate | formatDate }}</span>
          </div>
          <div class="soft-rightObtainMode">
            权利取得方式：
            <span>{{ item.rightObtainMode }}</span>
          </div>
          <div class="soft-rightScope">
            权利范围：
            <span>{{ item.rightScope }}</span>
          </div>
          <div class="soft-obligee w-max">
            著作权人：
            <span v-text="item.obligeePeoples"></span>
          </div>
        </template>
        <!-- R21Attorn -->
        <template v-else-if="item.publicityRegisterType === 'R21Attorn'">
          <div class="soft-origReg">
            软件著作权登记号：
            <span v-text="item.origRegNumber"></span>
          </div>
          <div class="soft-attorn">
            转让方：
            <span v-text="item.attornSide"></span>
          </div>
          <div class="soft-accept">
            受让方：
            <span v-text="item.acceptSide"></span>
          </div>
        </template>
        <!-- R21Proprietary -->
        <template v-else-if="item.publicityRegisterType === 'R21Proprietary'">
          <div class="soft-origReg">
            软件著作权登记号：
            <span v-text="item.origRegNumber"></span>
          </div>
          <div class="soft-leave">
            许可方：
            <span v-text="item.leaveSide"></span>
          </div>
          <div class="soft-beleave">
            被许可方：
            <span v-text="item.beleaveSide"></span>
          </div>
          <div class="soft-valid-date">
            许可期限：
            <span>{{ item.validStartDate | dateSection(item.validEndDate) }}</span>
          </div>
          <div class="soft-regionScope">
            地域范围：
            <span v-text="item.regionScope"></span>
          </div>
        </template>
        <!-- R31/R32 -->
        <template v-else-if="item.publicityRegisterType === 'R31' || item.publicityRegisterType === 'R32'">
          <div class="soft-czr">
            出质人：
            <span v-text="item.czr"></span>
          </div>
          <div class="soft-zqr">
            质权人：
            <span v-text="item.zqr"></span>
          </div>
          <div class="soft-zwqk w-max">
            质物情况：
            <span v-text="item.zwqk"></span>
          </div>
        </template>
        <!-- R41 -->
        <template v-else-if="item.publicityRegisterType === 'R41'">
          <div class="soft-change">
            变更/补充项：
            <span v-text="item.changeItem"></span>
          </div>
          <div class="soft-register">
            软件著作权登记号：
            <span v-text="item.registerNumber"></span>
          </div>
          <div class="soft-before">
            变更/补充前：
            <span v-text="item.beforeChange"></span>
          </div>
          <div class="soft-after w-max">
            变更/补充后：
            <span v-text="item.afterChange"></span>
          </div>
        </template>
        <!-- R42R44 -->
        <template v-else-if="item.publicityRegisterType === 'R42R44'">
          <div class="soft-original-register">
            原登记者：
            <span v-text="item.originalRegisterMan"></span>
          </div>
          <div class="soft-edition">
            版本号：
            <span v-text="item.editionNumber"></span>
          </div>
        </template>

        <div class="register-date">
          登记日期：
          <span>{{ item.registerDate | formatDate }}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>

import '@css/queryResultDetails/typeListSoftItem'

export default {
  data() {
    return {
    }
  },
  props: {
    detailsList: {
      type: Array,
      default: () => []
    }, // 详情列表内容
  },
  computed: {},
  components: {},
  methods: {},
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>