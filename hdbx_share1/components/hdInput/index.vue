<template>
  <div class="hd-input">
    <label>
      <div :class="['text', {'required': required}]" ref="text">
        <span>
          <slot></slot>
        </span>
      </div>
      <input ref="hdInput" :type="type" :placeholder="placeholder" :disabled="disabled" :value="inputValue" @change="$emit('change', $event.target.value)">
    </label>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  model: {
    prop: 'inputValue',
    event: 'change'
  },
  props: {
    inputValue: {
      default: ''
    }, // v-model绑定的值
    width: {
      default: '200'
    }, // 宽度
    height: {
      default: '30'
    }, // 高度
    type: {
      type: String,
      default: 'text'
    }, // 输入框类型
    placeholder: {
      type: String,
      default: ''
    }, // 默认内容
    disabled: {
      type: Boolean,
      default: false
    }, // 不可修改
    required: {
      type: Boolean,
      default: false
    }, // 必填
  },
  computed: {},
  components: {},
  methods: {
    init() {
      let hdInput = this.$refs.hdInput
      let text = this.$refs.text
      hdInput.style.width = this.width + 'px'
      hdInput.style.height = this.height + 'px'
      hdInput.style.lineHeight = this.height + 'px'
      text.style.height = this.height + 'px'
      text.style.lineHeight = this.height + 'px'
    },
  },
  watch: {},
  mounted() {
    this.init()
  },
  created() { },
}

</script>
<style lang='scss' scoped>
.hd-input > label {
  zoom: 1;
}
.hd-input > label:after {
  display: block;
  content: "";
  clear: both;
  overflow: visible;
}
.hd-input > label > .text {
  float: left;
}

.hd-input > label > .text > span {
  float: left;
  height: 100%;
  position: relative;
}

.hd-input > label > .required > span {
  padding-left: 14px;
}

.hd-input > label > .required > span:after {
  display: block;
  content: "*";
  position: absolute;
  color: red;
  top: 3px;
  left: 0;
}

.hd-input > label > input {
  float: left;
  margin-left: 10px;
  text-indent: 6px;
  border: 1px solid #d7d7d7;
}
</style>