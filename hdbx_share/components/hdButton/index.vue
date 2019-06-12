<template>
  <div class="hd-button" ref="button" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  props: {
    width: {
      default: '150'
    }, // 宽度
    height: {
      default: '40'
    }, // 高度
    fontSize: {
      default: '14'
    }, // 字体大小
  },
  computed: {},
  components: {},
  methods: {
    init() {
      let hdButton = this.$refs.button
      hdButton.style.width = this.width + 'px'
      hdButton.style.height = this.height + 'px'
      hdButton.style.lineHeight = this.height + 'px'
      hdButton.style.fontSize = this.fontSize + 'px'
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
.hd-button {
  background-color: #fff;
  cursor: pointer;
  background-color: #005db8;
  border-radius: 5px;
  text-align: center;
  color: #fff;
  height: 40px;
  line-height: 40px;
}
</style>