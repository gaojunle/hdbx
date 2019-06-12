<template>
  <div class="rights-scope">
    <ul class="scope clearfix">
      <li v-for="(item, index) in rightsScopes" :key="index">
        <hd-radio :label="item.value" name="publishStatus" v-model="radioValue" @change="handleRightsScopesChange">{{ item.label }}</hd-radio>
      </li>
    </ul>
    <ul class="part clearfix">
      <li v-for="(item, index) in rightScopeParts" :key="index">
        <hd-checkbox v-model="rightScopePart" :name="item.value" @change="handleCheckboxChange">{{ item.label }}</hd-checkbox>
      </li>
      <div class="disabled" v-show="mustAll || all"></div>
      <div class="error-rightScopePart" v-show="errorRightScopePart" v-text="errorRightScopePart"></div>
    </ul>
  </div>
</template>

<script>

import '@css/R11/rightsScope'

import hdRadio from '@share/components/hdRadio'
import hdCheckbox from '@share/components/hdCheckbox'

export default {
  data() {
    return {
      rightsScopes: [
        {
          label: '全部',
          value: '1',
        },
        {
          label: '部分',
          value: '2',
        },
      ],
      rightScopeParts: [
        {
          label: '发表权',
          value: '1',
        },
        {
          label: '署名权',
          value: '2',
        },
        {
          label: '修改权',
          value: '3',
        },
        {
          label: '复制权',
          value: '4',
        },
        {
          label: '发行权',
          value: '5',
        },
        {
          label: '出租权',
          value: '6',
        },
        {
          label: '信息网络传播权',
          value: '7',
        },
        {
          label: '翻译权',
          value: '8',
        },
        {
          label: '应当由著作权人享有的其他权利',
          value: '9',
        },
      ],
      rightScopePart: [], // 权利范围详情
      errorRightScopePart: '', // 错误信息
    }
  },
  model: {
    prop: 'rightsScope',
    event: 'change'
  },
  props: {
    rightsScope: {
      type: String,
      default: ''
    },
    propsParams: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    /**
     * 单选框值
     */
    radioValue: {
      get() {
        return this.rightsScope
      },
      set() { },
    },
    /**
     * 必须选择全部
     */
    mustAll() {
      let flag = (this.propsParams.developMode === '1' && this.propsParams.rightObtainMode === '1')
      if (!flag) return false
      this.$emit('change', '1')
      this.rightScopePart = []

      this.rightScopeParts.forEach(item => {
        this.rightScopePart.push(item.value)
      })
      return flag
    },
    /**
     * 选择全部时触发
     */
    all() {
      return this.rightScopePart.length === this.rightScopeParts.length
    },
  },
  components: { hdRadio, hdCheckbox },
  methods: {
    init(rightScopePart) {
      this.rightScopePart = [...rightScopePart]
    },
    /**
     * 改变权利范围
     */
    handleRightsScopesChange(val) {
      this.errorRightScopePart = ''
      if (this.mustAll) return
      this.rightScopePart = []
      if (val === '1') this.rightScopeParts.forEach(item => this.rightScopePart.push(item.value))
      this.$emit('change', val)
    },
    /**
     * 单选框触发
     */
    handleCheckboxChange(val) {
      this.errorRightScopePart = ''
      if (this.all && this.radioValue === '2') this.handleRightsScopesChange('1')
      if (!this.all && this.radioValue === '1') this.handleRightsScopesChange('2')
    },
    /**
     * 验证
     */
    check(params) {
      let flag = true
      if (this.radioValue === '1') flag = false
      if (this.radioValue === '2' && this.rightScopePart.length > 0) flag = false
      flag ? this.errorRightScopePart = '请选择权利范围' : params.rightScopePart = [...this.rightScopePart]
      return flag
    },
  },
  watch: {
  },
  mounted() { },
  created() {
  },
}

</script>
<style lang='scss' scoped>
</style>