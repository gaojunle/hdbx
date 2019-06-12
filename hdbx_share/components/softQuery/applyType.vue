<template>
  <div class="apply-type">
    <div class="title">选择您的身份</div>
    <ul class="clearfix">
      <li v-for="(item, index) in applyTypes" :key="index">
        <hd-radio v-model="radioValue" :label="item.value" :name="'applyType'" @change="handleApplyType">{{ item.name }}</hd-radio>
      </li>
    </ul>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/applyType'

import hdRadio from '../hdRadio'
import { applyTypes } from '../../constants/queryOupsSoft'

export default {
  data() {
    return {
    }
  },
  computed: {
    // 单选框值
    radioValue: {
      get() {
        return this.applyType
      },
      set() { },
    },
  },
  model: {
    prop: 'applyType',
    event: 'change'
  },
  props: {
    applyType: {
      type: String,
      default: () => applyTypes[0].value
    }, // 查询人身份
    applyTypes: {
      type: Array,
      default: () => applyTypes
    }, // 查询人身份列表
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  components: { hdRadio },
  methods: {
    /**
     * 触发选择身份
     * @param value 选中项的值
     */
    handleApplyType(value) {
      this.$emit('change', value)
    }
  },
  mounted() {

  },
  watch: {},
  created() {
  }
}

</script>