<template>
  <div class="soft-info">
    <div class="title">软件信息</div>
    <!-- 软件全称/软件简称 -->
    <div class="trunks clearfix">
      <div class="trunks-left">
        <div class="left">软件全称：</div>
        <div class="right" v-text="params.softFullName"></div>
      </div>
      <div class="trunks-right" v-if="params.softShortName">
        <div class="left">软件简称：</div>
        <div class="right" v-text="params.softShortName"></div>
      </div>
    </div>
    <!-- 版本号/开发完成日期 -->
    <div class="trunks clearfix">
      <div class="trunks-left">
        <div class="left">版本号：</div>
        <div class="right" v-text="params.version"></div>
      </div>
      <div class="trunks-right">
        <div class="left">开发完成日期：</div>
        <div class="right">{{ params.completeDate | ymdDate }}</div>
      </div>
    </div>
    <!-- 发表状态 -->
    <div class="trunk clearfix">
        <div class="left">发表状态：</div>
        <div class="right" v-html="publishStatus(params.publishStatus)"></div>
    </div>
    <!-- 首次发表日期/首次发表地点 -->
    <div class="trunks clearfix" v-if="params.publishStatus === '1'">
      <div class="trunks-left">
        <div class="left">首次发表日期：</div>
        <div class="right">{{ params.firstAppearDate | ymdDate }}</div>
      </div>
      <div class="trunks-right">
        <div class="left">首次发表地点：</div>
        <div class="right" v-html="`${params.firstAppearCountry}&nbsp;&nbsp;&nbsp;&nbsp;${params.firstAppearProvince}&nbsp;&nbsp;&nbsp;&nbsp;${params.firstAppearCity}`"></div>
      </div>
    </div>
    <!-- 编程语言/源程序量 -->
    <div class="trunks clearfix">
      <div class="trunks-left">
        <div class="left">编程语言：</div>
        <div class="right" v-text="params.programLanguage"></div>
      </div>
      <div class="trunks-right">
        <div class="left">源程序量：</div>
        <div class="right" v-html="`${params.sourceCodeRow}行,&nbsp;&nbsp${params.sourceCodePage}页`"></div>
      </div>
    </div>
    <!-- 硬件环境 -->
    <div class="trunk clearfix">
        <div class="left">硬件环境：</div>
        <div class="right" v-text="params.hardwareEnv"></div>
    </div>
    <!-- 软件环境 -->
    <div class="trunk clearfix">
        <div class="left">软件环境：</div>
        <div class="right" v-text="params.softEnv"></div>
    </div>
    <!-- 创作目的 -->
    <div class="trunk clearfix">
        <div class="left">创作目的：</div>
        <div class="right" v-text="params.creationPurpose"></div>
    </div>
    <!-- 主要功能 -->
    <div class="trunk clearfix">
        <div class="left">主要功能：</div>
        <div class="right" v-text="params.mainFunction"></div>
    </div>
    <!-- 用途 -->
    <div class="trunk clearfix">
        <div class="left">用途：</div>
        <div class="right" v-text="params.purpose"></div>
    </div>
    <!-- 技术特点 -->
    <div class="trunk clearfix">
        <div class="left">技术特点：</div>
        <div class="right" v-text="params.specialty"></div>
    </div>
  </div>
</template>

<script>

import '@css/R11/softInfo'


export default {
  data() {
    return {
    }
  },
  props: ['params'],
  computed: {},
  components: {},
  methods: {
      publishStatus(publishStatus) {
          return publishStatus === '0' ? '未发表' : '已发表'
      },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>