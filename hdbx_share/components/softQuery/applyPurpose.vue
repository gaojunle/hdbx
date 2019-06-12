<template>
  <div class="apply-purpose">
    <div class="title">选择您的查询用途</div>
    <ul class="clearfix">
      <li v-for="(item, index) in applyPurposes" :key="index">
        <hd-radio v-model="radioValue" :label="item.value" :name="'applyPurpose'" @change="handleApplyType">{{ item.name }}</hd-radio>
      </li>
    </ul>
    <div class="text-area" v-show="isTextArea">
      <textarea v-model="applyPurposeRemarks" placeholder="请输入其他用途..."></textarea>
      <div class="area-num" v-html="surplusShow"></div>
      <div class="error" v-show="errorFont" v-text="errorFont"></div>
    </div>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/applyPurpose'
import hdRadio from '../hdRadio'
import { applyPurposes } from '../../constants/queryOupsSoft'

export default {
  data() {
    return {
      isTextArea: false, // 是否显示文本框
      areaMaxNum: 150, // 文本框最大字数
      surplus: 150, // 剩余字数
      areaNum: 0, // 文本框字数
      applyPurposeRemarks: '', // 申请目的备注
      errorFont: '', // 申请目备注的错误提示
    }
  },
  model: {
    prop: 'applyPurpose',
    event: 'change'
  },
  props: {
    applyPurpose: {
      type: String,
      default: () => applyPurposes[0].value
    }, // 查询人身份
    applyPurposes: {
      type: Array,
      default: () => applyPurposes
    }, // 查询用途列表
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  computed: {
    // 单选框值
    radioValue: {
      get() {
        return this.applyPurpose
      },
      set() {},
    },
    surplusShow() {
      return `还可填写<span>${this.surplus}</span>个字`
    }
  },
  components: { hdRadio },
  methods: {
    /**
     * 触发选择用途
     * @param value 选中项的索引
     */
    handleApplyType(value) {
      value === '0' ? this.showTextArea() : this.hideTextArea()
      this.$emit('change', value)
    },
    /**
     * 显示文本框
     */
    showTextArea(text = '') {
      this.isTextArea = true
      if (text) this.applyPurposeRemarks = text
    },
    /**
     * 隐藏文本框
     */
    hideTextArea() {
      this.isTextArea = false
    },
    /**
     * 获取申请目的备注
     */
    getApplyPurposeRemarks() {
      if (!this.applyPurposeRemarks) this.errorFont = '请输入备注'
      return this.applyPurposeRemarks
    },
  },
  mounted() {
  },
  watch: {
    applyPurposeRemarks: {
      handler(newValue, oldValue) {
        this.errorFont = ''
        this.surplus = this.areaMaxNum - newValue.length
        if (this.surplus < 0) {
          this.surplus = 0
          this.applyPurposeRemarks = oldValue
        }
      },
      deep: true,
    },
  },
  created() {
  }
}

</script>