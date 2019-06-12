<template>
  <div class="query-oups-item clearfix">
      <div class="register-number">
          <div class="title">登记号：</div>
          <hd-input v-model="registerNumber" placeholder="请输入登记号" width="200" height="30"></hd-input>
      </div>
      <div class="opus-name">
          <div class="title">作品名称：</div>
          <hd-input v-model="opusName" placeholder="请输入作品名称" width="200" height="30"></hd-input>
      </div>
      <div class="owner">
          <div class="title">著作权人：</div>
          <hd-input v-model="owner" placeholder="请输入著作权人" width="200" height="30"></hd-input>
      </div>
      <hd-button v-if="index !== 0" width="60" height="32" fontSize="14" @click="$emit('delete', opusBaseInfo.id)">删除</hd-button>
      <div class="error" v-if="opusBaseInfo.error" v-text="opusBaseInfo.error"></div>
  </div>
</template>

<script>
import '../../css/oupsQuery/queryOupsItem'

import hdInput from '../hdInput'
import hdButton from '../hdButton'

export default {
  data() {
    return {
    }
  },
  props: ['opusBaseInfo', 'index'],
  computed: {
    // 登记号
    registerNumber: {
      get() {
        return this.opusBaseInfo.registerNumber
      },
      set(value) {
          this.$emit('change', {registerNumber: value, id: this.opusBaseInfo.id})
      },
    },
    // 作品名称
    opusName: {
      get() {
        return this.opusBaseInfo.opusName
      },
      set(value) {
          this.$emit('change', {opusName: value, id: this.opusBaseInfo.id})
      },
    },
    // 著作权人
    owner: {
      get() {
        return this.opusBaseInfo.owner
      },
      set(value) {
          this.$emit('change', {owner: value, id: this.opusBaseInfo.id})
      },
    },
  },
  components: {hdInput, hdButton},
  methods: {},
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>