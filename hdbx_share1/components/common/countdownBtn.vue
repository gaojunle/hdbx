<template>
  <div v-text="btnText" @click="codeBtnHandler" :class="['countdownBtn', {'unClick':!btnType}]"></div>
</template>

<script>

export default {
  data() {
    return {
      times: '', // 倒计时实例
      btnType: true, // 获取验证码按钮状态  true:可以点击  false:不能点击
      btnText: this.cdBeforText, // 按钮显示文案
    }
  },
  props: {
    cdBeforText: {
      type: String,
      default: '获取验证码'
    }, // 倒计时未开始文案
    cdAfterText: {
      type: String,
      default: '重新获取'
    }, // 倒计时开始后文案
    timeNum: {
      type: Number,
      default: 60
    }, // 倒计时时长
    params: {
      type: Object,
      default: null,
    }, // 传进来的参数
  },
  components: {},
  methods: {
    /**
     * 点击按钮
     */
    codeBtnHandler() {
      if (!this.btnType) return
      this.$emit('codeBtnHandler', this.codeCountDown, this.params)
    },
    /**
     * 获取验证码倒计时
     */
    codeCountDown() {
      let timenum = this.timeNum
      this.btnType = false
      this.btnText = this.cdAfterText + '(' + timenum + 's)'
      clearInterval(this.times)
      this.times = setInterval(() => {
        timenum--
        this.btnText = this.cdAfterText + '(' + timenum + 's)'
        if (timenum === 0) {
          timenum = 0
          this.btnText = this.cdBeforText
          clearInterval(this.times)
          this.btnType = true
        }
      }, 1000)
    },
  },
  mounted() {

  },
  watch: {},
  created() {

  }
}

</script>

<style scoped>
.countdownBtn {
  width: 102px;
  height: 36px;
  display: block;
  float: right;
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  cursor: pointer;
  color: #484848;
  background: #f0f0f0;
}
.unClick {
  pointer-events: none;
}
</style>
