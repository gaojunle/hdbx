<template>
  <div class="hd-alert" v-show="alertShow">
    <div class="alert-box" ref="alertBox">
      <div class="alert-top">
        <div class="title" v-text="title"></div>
        <div class="close" @click="alertShow = false"></div>
      </div>
      <div class="alert-content">
        <slot></slot>
        <div :class="['button', {'buttons': clearBtn}]">
          <template v-if="clearBtn">
            <hd-button width="160" height="36" fontSize="14" @click="$emit('handleConfirm')">{{confirmText}}</hd-button>
            <hd-button class="close" width="160" height="36" fontSize="14" @click="alertShow = false">取消</hd-button>
          </template>
          <template v-else>
            <hd-button width="514" height="46" @click="$emit('handleConfirm')">{{confirmText}}</hd-button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import hdButton from '../hdButton'

export default {
  data() {
    return {
      alertShow: false, // 弹出框是否显示
    }
  },
  props: {
    width: {
      default: 610
    }, // 宽度
    height: {
      default: 338
    }, // 高度
    title: {
      type: String,
      default: ''
    }, // 标题
    confirmText: {
      type: String,
      default: '确定'
    }, // 确定按钮文案
    clearBtn: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  components: { hdButton },
  methods: {
    /**
     * 主入口函数
     */
    init() {
      let alertBox = this.$refs.alertBox.style
      alertBox.width = this.width + 'px'
      alertBox.height = this.height + 'px'
    },
  },
  watch: {},
  mounted() {
    this.init()
  },
  created() {

  },
}

</script>
<style lang='scss' scoped>
.hd-alert {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 9999;
}
.hd-alert > .alert-box {
  width: 610px;
  height: 338px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 42px;
  margin: auto;
  background-color: #fff;
}

.alert-box > .alert-top {
  width: 100%;
  height: 50px;
  background-color: #f0f0f0;
  position: relative;
}

.alert-top > .title {
  width: 100%;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
}
.alert-top > .close {
  position: absolute;
  top: 15px;
  right: 24px;
  width: 20px;
  height: 20px;
  background-image: url("../../img/alert/alert_close.png");
  cursor: pointer;
}

.alert-box > .alert-content {
  padding: 0 48px;
}
.alert-content > .button {
  width: 514px;
  border-top: 1px solid #f2f2f2;
  margin: 0 auto;
  padding-top: 30px;
  zoom: 1;
}
.alert-content > .button:after {
  display: block;
  content: "";
  clear: both;
  overflow: visible;
}
.buttons > div {
  float: left;
}
.buttons > .close {
  float: right;
}
</style>