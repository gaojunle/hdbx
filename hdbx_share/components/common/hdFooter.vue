<template>
  <div class="hd-footer">
    <div class="w1200 clearfix">
      <div class="left">
        <div class="list clearfix">
          <ul>
            <li class="title">关于我们</li>
            <li v-for="(item, index) in about" :key="index" v-text="item.label" @click="handleClick(item.link)"></li>
          </ul>
          <ul>
            <li class="title">用户帮助</li>
            <li v-for="(item, index) in userAid" :key="index" v-text="item.label" @click="handleClick(item.link)"></li>
          </ul>
          <ul>
            <li class="title">友情链接</li>
            <li v-for="(item, index) in friendLink" :key="index" v-text="item.label" @click="handleClick(item.link)"></li>
          </ul>
        </div>
        <div class="bottom">
          <p class="p-mb">
            <span>版权中心：中国版权保护中心</span>
          </p>
          <p>
            <span>地址：北京市西城区天桥南大街1号天桥艺术大厦A座三层</span>
            <span>邮编：100050</span>
            <span>电话：（+86-10）68003887</span>
          </p>
        </div>
      </div>
      <ul class="right clearfix">
          <li class="li-mr">
            <img src="../../img/common/footer/ewm_wx.png" alt="">
            <p>中国版权服务下载APP下载</p>
          </li>
          <li>
            <img src="../../img/common/footer/ewm_wx.png" alt="">
            <p>中国版权服务微平台</p>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>

import '../../css/common/hdFooter'

export default {
  data() {
    return {
      about: [
        {
          label: '关于我们',
          link: '',
        },
        {
          label: '联系我们',
          link: '',
        },
        {
          label: '中心公告',
          link: '',
        },
      ], // 关于我们
      userAid: [
        {
          label: '用户协议',
          link: '',
        },
        {
          label: '账户管理',
          link: '',
        },
        {
          label: '实名认证',
          link: '',
        },
      ], // 用户帮助
      friendLink: [
        {
          label: '中国版权保护中心官网',
          link: '',
        },
        {
          label: '中国版权登记查询服务平台',
          link: '',
        },
        {
          label: '中华版权代理中公司官网',
          link: '',
        },
      ], // 友情链接
    }
  },
  props: [],
  computed: {},
  components: {},
  methods: {},
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>