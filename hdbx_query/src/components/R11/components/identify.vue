<template>
  <div class="identify">
    <div class="title">鉴别材料</div>
    <div class="content">
      <ul class="deposit clearfix">
        <li v-for="(item, index) in depositModes" :key="index">
          <hd-radio :label="item.value" name="depositMode" v-model="radioValue" @change="handleDepositModeChange">{{ item.label }}</hd-radio>
        </li>
      </ul>
      <div class="commonly" v-show="parseInt(radioValue) === 1">
        <p>1、源程序前连续的30页和后连续的30页</p>
        <p>2、文档的前连续的30页和后连续的30页</p>
        <ul class="clearfix">
          <li v-for="(item, index) in depositNormalMultiTyps" :key="index">
            <hd-radio :label="item.value" name="depositMode" v-model="depositNormalMultiType" @change="handleDepositNormalMultiTypeChange">{{ item.label }}</hd-radio>
            <template v-if="index === 1">
              <hd-input type="number" v-show="depositNormalMultiType === '2'" v-model="params.depositNormalMultiType"></hd-input>
            </template>
          </li>
        </ul>
      </div>
      <div class="outs" v-show="parseInt(radioValue) === 2">
        <ul>
          <li v-for="(item, index) in depositExceps" :key="index" class="clearfix">
            <hd-radio :label="item.value" name="depositMode" v-model="params.depositExcep" @change="handleDepositExcepChange">{{ item.label }}</hd-radio>
            <template v-if="index === 0">
              <hd-input type="number" v-show="params.depositExcep === 'exp1'" v-model="params.depositExcepCoverPages"></hd-input>
            </template>
          </li>
        </ul>
      </div>
      <div class="error" v-show="errorFont" v-text="errorFont"></div>
    </div>
  </div>
</template>

<script>
import '@css/R11/identify'


import hdRadio from '@share/components/hdRadio'
import hdInput from '@share/components/hdInput'

export default {
  data() {
    return {
      depositModes: [
        {
          label: '一般交存',
          value: '1',
        },
        {
          label: '例外交存',
          value: '2',
        },
      ],
      depositNormalMultiTyps: [
        {
          label: '1种文档',
          value: '1',
        },
        {
          label: '多种文档，种类为',
          value: '2',
        },
      ],
      depositExceps: [
        {
          label: '使用黑色宽斜线覆盖，页码为',
          value: 'exp1',
        },
        {
          label: '前10页和任选连续的50页',
          value: 'exp2',
        }, {
          label: '目标程序的连续的前、后各30页和源程序任选连续的20页',
          value: 'exp3',
        },
      ],
      depositNormalMultiType: '1', // 一般交存多文档类型
      params: {
        depositNormalMultiType: '', // 一般交存多文档类型（数字，多少种类型）
        depositExcep: 'exp1', // 例外交存形式
        depositExcepCoverPages: '', // 例外交存覆盖页数
      },
      errorFont: '', // 错误提示文案
    }
  },
  model: {
    prop: 'depositMode',
    event: 'change'
  },
  props: {
    depositMode: {
      type: String,
      default: ''
    },
  },
  computed: {
    /**
   * 单选框值
   */
    radioValue: {
      get() {
        return this.depositMode
      },
      set() { },
    },
  },
  components: { hdRadio, hdInput },
  methods: {
    /**
     * 交存形式发生变化
     */
    handleDepositModeChange(val) {
      this.errorFont = ''
      this.$emit('change', val)
      if (val === '1') {
        this.depositNormalMultiType = '1'
        this.params.depositNormalMultiType = '1'
      } else {
        this.params.depositExcep = 'exp1'
        this.params.depositExcepCoverPages = ''
      }
    },
    /**
     * 一般交存/例外交存发生变化
     */
    handleDepositNormalMultiTypeChange(val) {
      this.errorFont = ''
      this.params.depositNormalMultiType = val === '1' ? '1' : ''
    },
    /**
     * 例外交存下的选项
     */
    handleDepositExcepChange(val) {
      this.errorFont = ''
      this.params.depositExcepCoverPages = ''
    },
    /**
     * 验证
     */
    check(params) {
      let flag = false
      if (this.radioValue === '1' && !this.params.depositNormalMultiType) this.errorFont = '请输入多种文档种类'
      if (this.radioValue === '2' && this.params.depositExcep === 'exp1' && !this.params.depositExcepCoverPages) this.errorFont = '请输入黑色宽斜覆盖页码'
      if (this.errorFont) flag = true
      if (!flag) Object.assign(params, this.params)
      return flag
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>