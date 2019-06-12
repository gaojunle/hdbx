<template>
  <div class="query-info">
    <div class="title">请确认申请登记查询信息</div>
    <ul>
      <template v-if="params.ownerType">
        <li v-for="(item, index) in params.ownerType" :key="index">
          <div class="trunk clearfix">
            <div class="title">著作权人：</div>
            <div class="content" v-text="params.owner[index]"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">类型：</div>
            <div class="content">{{ params.ownerType[index] | accountType }}</div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">国籍：</div>
            <div class="content" v-text="params.ownerCountry[index]"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">证件类型：</div>
            <div class="content" v-text="params.ownerIdType[index]"></div>
          </div>
          <div class="trunk clearfix">
            <div class="title small-title">证件号码：</div>
            <div class="content" v-text="params.ownerIdNumber[index]"></div>
          </div>
        </li>
      </template>
      <li class="clearfix" v-else>
        <div class="title">著作权人：</div>
        <div class="content">
          <div class="text clearfix" v-html="owners()"></div>
        </div>
      </li>
      <li class="clearfix">
        <div class="title">查询用途：</div>
        <div class="content">
          <div class="text" v-html="applyPurpose()"></div>
        </div>
      </li>
      <li class="clearfix">
        <div class="title">登记号：</div>
        <div class="content">
          <div class="text" v-text="params.registerNumber"></div>
          <div class="text" v-if="params.softname" v-text="params.softname"></div>
          <div class="text" v-else-if="params.opusname" v-text="params.opusname"></div>
        </div>
      </li>
      <li class="clearfix" v-if="params.bailee">
        <div class="title">受托人：</div>
        <div class="content">
          <div v-for="(bailee, index) in params.bailee" class="text" v-text="bailee.accountName" :key="index"></div>
        </div>
      </li>
    </ul>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/queryInfo'
import { applyPurposes } from '../../constants/queryOupsSoft'

export default {
  data() {
    return {
    }
  },
  props: {
    params: {
      type: Object
    },
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改],
  },
  components: {},
  methods: {
    /**
     * 著作权人
     */
    owners() {
      let html = ''
      let owner = this.params.copyrightOwner ? this.params.copyrightOwner : this.params.owner
      owner.forEach(owner => {
        html += `<span>${owner}</span>`
      })
      return html
    },
    /**
     * 查询目的
     */
    applyPurpose() {
      let item = applyPurposes.find(applyPurpose => applyPurpose.value === this.params.applyPurpose)
      let html = this.params.applyPurpose === '0' ?
        `<span>${item.name}（${this.params.applyPurposeRemarks}）</span>` :
        item.name
      return html
    },
  },
  mounted() {

  },
  watch: {},
  created() {
  }
}


</script>