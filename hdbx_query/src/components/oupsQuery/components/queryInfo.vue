<template>
  <div class="query-info">
    <div class="title">请确认申请登记查询信息</div>
    <ul>
      <template v-if="params.opusQueryPeopleInfoVo.name">
        <li>
          <div class="trunk clearfix">
            <div class="title">著作权人：</div>
            <div class="content" v-text="params.opusQueryPeopleInfoVo.name"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">类型：</div>
            <div class="content">{{ params.opusQueryPeopleInfoVo.peopleType | accountType }}</div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">国籍：</div>
            <div class="content" v-text="params.opusQueryPeopleInfoVo.country"></div>
          </div>
          <div class="trunk clearfix" v-if="params.opusQueryPeopleInfoVo.peopleKind">
            <div class="title small-title">企业类型：</div>
            <div class="content" v-html="peopleKind()"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">证件类型：</div>
            <div class="content" v-html="idType()"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">证件号码：</div>
            <div class="content" v-text="params.opusQueryPeopleInfoVo.idNumber"></div>
          </div>
        </li>
      </template>
      <li class="clearfix">
        <div class="title">查询用途：</div>
        <div class="content">
          <div class="text" v-html="applyPurpose()"></div>
        </div>
      </li>
      <li class="title clearfix">
        <div class="title">查询作品：</div>
      </li>
      <li class="list clearfix" v-for="(item, index) in params.queryOpusBaseInfoEntityList" :key="index">
        <div class="trunk">
          <div class="title">登记号：</div>
          <div class="content register-number" :title="item.registerNumber" v-text="item.registerNumber"></div>
        </div>
        <div class="trunk">
          <div class="title">作品名称：</div>
          <div class="content opus-name" :title="item.opusName" v-text="item.opusName"></div>
        </div>
        <div class="trunk">
          <div class="title">著作权人：</div>
          <div class="content owner" :title="item.owner" v-text="item.owner"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>

import '@css/oupsQuery/queryInfo'

import { applyPurposesOups } from '@share/constants/queryOupsSoft'
import { papersStatus, mechanismStatus } from '@share/constants/realName'

export default {
  data() {
    return {
    }
  },
  props: ['params'],
  components: {},
  methods: {
    /**
     * 证件类型
     */
    idType() {
      let data = papersStatus.find(item => parseInt(item.value) === parseInt(this.params.opusQueryPeopleInfoVo.idType))
      return data.label
    },
    /**
     * 企业类型
     */
    peopleKind() {
      let data = mechanismStatus.find(item => parseInt(item.value) === parseInt(this.params.opusQueryPeopleInfoVo.peopleKind))
      return data.label
    },
    /**
     * 查询目的
     */
    applyPurpose() {
      let data = applyPurposesOups.find(item => parseInt(item.value) === parseInt(this.params.applyPurpose))
      return data.name
    },
  },
  mounted() {

  },
  watch: {},
  created() {
  }
}


</script>