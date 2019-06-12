<template>
  <ul class="send-phone">
    <li v-for="(owner, index) in owners" class="clearfix" :key="owner.ownerPhone">
      <div class="owner" v-text="owner.owner"></div>
      <input type="text" placeholder="请输入验证码" v-model="codes[index]" @blur="clearError(index)">
      <countdown-btn :ref="'countdownBtn' + index" :params="owner" @codeBtnHandler="codeBtnHandler"></countdown-btn>
      <div class="error" v-show="errors[index]" v-text="errors[index]"></div>
    </li>
  </ul>
</template>

<script>

import '@css/common/registerQuery/softSendPhone'

import countdownBtn from '@share/components/common/countdownBtn'
import api from '@api'

export default {
  data() {
    return {
      owners: [], // 著作权人
      codes: [], // 验证码
      errors: [], // 错误
    }
  },
  components: { countdownBtn },
  methods: {
    /**
     * 显示著作权人授权码弹出框
     * @param owners
     */
    sendSMS(owners) {
      this.owners = [...owners]
      this.$nextTick(() => {
        owners.forEach((owner, index) => {
          this.codes.push('')
          this.errors.push('')
          this.$refs['countdownBtn' + index][0].codeBtnHandler()
        })
      })
    },
    /**
     * 点击发送短信
     * @param codeCountDown 倒计时方法
     * @param owner 著作权人信息
     */
    codeBtnHandler(codeCountDown, owner) {
      let phoneNumber = owner.ownerPhone,
        type = 'UD'
      api.sendSMS({ phoneNumber, type }).then(res => {
        if (res) codeCountDown()   // 开始倒计时
      })
    },
    /**
     * 清除错误信息
     * @param index 第几项
     */
    clearError(index) {
      if (this.codes[index]) this.errors.splice(index, 1, '')
    },
    /**
     * 确定
     */
    handleConfirm() {
      let flag = true
      let params = {}
      this.codes.forEach((code, index) => {
        params[this.owners[index].ownerPhone] = code
        if (!code) {
          this.errors.splice(index, 1, '请输入验证码')
          flag = false
        }
      })
      if (!flag) return

      api.validate(params).then(res => {
        if (res.data) res.data.length > 0 ? this.errorCode(res.data) : this.$emit('codeSuccess')
      })
    },
    /**
     * 验证码错误
     * @param errors 错误的验证码
     */
    errorCode(errors) {
      errors.forEach(errorPhone => {
        this.owners.find((owner, index) => {
          if (parseInt(owner.ownerPhone) === parseInt(errorPhone)) return this.errors.splice(index, 1, '验证码错误')
        })
      })
    },
  },
  mounted() {

  },
  watch: {},
  created() {
  }
}

</script>