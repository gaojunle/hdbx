<template>
  <ul class="time-list-oups-item">
    <li v-for="(item, index) in detailsList" :key="index">
      <div class="title clearfix">
        <div class="time">{{ item.registerDate | formatDate }}</div>
        <div class="soft-type">{{ item.publicityRegisterType | registerType }}</div>
        <div class="register-number">
          <span>(</span>
          <span>登记号：</span>
          <span v-if="item.registerNumber" v-text="item.registerNumber"></span>
          <span v-else v-text="item.originalRegNum"></span>
          <span>)</span>
        </div>
      </div>
      <div class="content clearfix">
        <!-- Z11 -->
        <template v-if="item.publicityRegisterType === 'Z11'">
          <div class="opus-obligee w-max">
            著作权人：
            <span v-text="item.obligee"></span>
          </div>
          <div class="opus-complete-date">
            创作完成日期：
            <span>{{ item.completeDate | formatDate }}</span>
          </div>
          <div class="opus-appear-date">
            首次发表日期：
            <span>{{ item.appearDate | formatDate }}</span>
          </div>
        </template>
        <!-- Z21 -->
        <template v-if="item.publicityRegisterType === 'Z21'">
          <div class="opus-ceder">
            转让(许可)方：
            <span v-text="item.ceder"></span>
          </div>
          <div class="opus-alienee">
            受让(被许可)方：
            <span v-text="item.alienee"></span>
          </div>
        </template>
        <!-- Z31 -->
        <template v-if="item.publicityRegisterType === 'Z31'">
          <div class="opus-obligee w-max">
            权利人：
            <span v-text="item.obligee"></span>
          </div>
        </template>
        <!-- Z51 -->
        <template v-if="item.publicityRegisterType === 'Z51'">
          <div class="opus-czr">
            出质人：
            <span v-text="item.czr"></span>
          </div>
          <div class="opus-zqr">
            质权人：
            <span v-text="item.zqr"></span>
          </div>
        </template>
        <!-- Z53 -->
        <template v-if="item.publicityRegisterType === 'Z53'">
          <div class="opus-beforeContent">
            变更前：
            <span v-text="item.beforeContent"></span>
          </div>
          <div class="opus-czr">
            出质人：
            <span v-text="item.czr"></span>
          </div>
          <div class="opus-zqr">
            质权人：
            <span v-text="item.zqr"></span>
          </div>
          <div class="opus-afterContent w-max after">
            变更后：
            <span v-text="item.afterContent"></span>
          </div>
        </template>
        <!-- Z54 -->
        <template v-if="item.publicityRegisterType === 'Z54'">
          <div class="opus-czr">
            出质人：
            <span v-text="item.czr"></span>
          </div>
          <div class="opus-zqr">
            质权人：
            <span v-text="item.zqr"></span>
          </div>
          <div class="opus-copyrightScope">
            出质著作权范围：
            <span v-text="item.copyrightScope"></span>
          </div>
          <div class="opus-copyrightType w-max">
            出质著作权种类：
            <span v-text="item.copyrightType"></span>
          </div>
        </template>
        <!-- Z61 -->
        <template v-if="item.publicityRegisterType === 'Z61'">
          <div class="opus-beforeContent">
            变更/补充前：
            <span v-text="item.beforeContent"></span>
          </div>
          <div class="opus-afterContent w-max after">
            变更/补充后：
            <span v-text="item.afterContent"></span>
          </div>
        </template>
        <!-- Z62-->
        <template v-if="item.publicityRegisterType === 'Z62'">
          <div class="opus-register-type">
            原登记类型：
            <span v-text="item.registerType"></span>
          </div>
        </template>
      </div>
    </li>
  </ul>
</template>

<script>

import '@css/queryResultDetails/timeListOupsItem'

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