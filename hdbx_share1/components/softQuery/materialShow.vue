<template>
  <div class="material-show">
    <div class="title">请确认上传材料</div>
    <ul>
      <li class="clearfix" v-for="(item, index) in imgData" :key="index">
        <div class="name" v-text="item.title"></div>
        <img :src="item.url" alt>
      </li>
    </ul>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/materialShow'

export default {
  data() {
    return {}
  },
  props: {
    imgData: {
      type: Array,
      defauls: () => []
    }, // 展示列表
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  components: {},
  methods: {},
  mounted() {

  },
  watch: {},
  created() {

  }
}

</script>