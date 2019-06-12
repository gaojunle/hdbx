<template>
  <div class="ownership-info">
    <div class="title">权属信息</div>
    <div class="trunk clearfix">
      <div class="left">著作权人：</div>
      <ul class="right">
        <li v-for="(item, index) in params.ownerList" :key="index">
          <div class="trunk clearfix">
            <div class="left">著作权人</div>
            <div class="right" v-text="item.name"></div>
          </div>
          <div class="trunk clearfix">
            <div class="left">国籍</div>
            <div class="right" v-text="item.country"></div>
          </div>
          <div class="trunk clearfix" v-if="item.province">
            <div class="left">省份/城市</div>
            <div class="right" v-html="`${item.province}&nbsp;&nbsp;&nbsp;&nbsp;${item.city}`"></div>
          </div>
          <div class="trunk clearfix" v-if="item.enterpriseType">
            <div class="left">机构类型</div>
            <div class="right">{{ item.enterpriseType | companyCardType }}</div>
          </div>
          <div class="trunk clearfix" v-if="item.park">
            <div class="left">园区选择</div>
            <div class="right" v-text="item.park"></div>
          </div>
          <div class="trunk clearfix">
            <div class="left">证件类型</div>
            <div class="right">{{ item.idType | personCardType }}</div>
          </div>
          <div class="trunk clearfix">
            <div class="left">证件号码</div>
            <div class="right" v-text="item.idNumber"></div>
          </div>
          <div class="trunk clearfix" v-if="item.needRegisterCopy">
            <div class="left">申请证书副本</div>
            <div class="right" v-html="showNeedRegisterCopy(item.needRegisterCopy)"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="trunk clearfix">
      <div class="left">开发方式：</div>
      <div class="right">
        <p v-html="developMode(params.developMode)"></p>
        <ul>
          <li v-if="params.developContract">
            <img :src="params.developContract" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="trunk clearfix">
      <div class="left">权利取得方式：</div>
      <div class="right">
        <p v-html="rightObtainMode(params.rightObtainMode)"></p>
        <p v-if="params.inheritanceSoftRegNum" v-text="'原软件登记号：' + params.inheritanceSoftRegNum"></p>
        <p v-if="params.inheritanceSoftChangeNum" v-text="'原软件变更或补充证明编号：' + params.inheritanceSoftChangeNum"></p>
        <ul>
          <li v-if="params.copyRightTransferContract">
            <img :src="params.copyRightTransferContract" alt="">
          </li>
          <li v-if="params.enterpriseChangeProve">
            <img :src="params.enterpriseChangeProve" alt="">
          </li>
          <li v-if="params.creditorDecision">
            <img :src="params.creditorDecision" alt="">
          </li>
          <li v-if="params.inheritanceContract">
            <img :src="params.inheritanceContract" alt="">
          </li>
          <li v-if="params.liquidationReport">
            <img :src="params.liquidationReport" alt="">
          </li>
          <li v-if="params.relationshipProve">
            <img :src="params.relationshipProve" alt="">
          </li>
          <li v-if="params.ancesterDeathProof">
            <img :src="params.ancesterDeathProof" alt="">
          </li>
          <li v-if="params.ancesterTestament">
            <img :src="params.ancesterTestament" alt="">
          </li>
          <li v-if="params.courtFile">
            <img :src="params.courtFile" alt="">
          </li>
        </ul>
      </div>
    </div>
    <div class="trunk clearfix">
      <div class="left">权利范围：</div>
      <div class="right">
        <p v-if="parseInt(params.rightScope) === 1">全部</p>
        <ul v-else>
          <li v-for="(item, index) in params.rightScopePart" :key="index" v-html="rightScopePart(item)"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import '@css/R11/ownershipInfo'

export default {
  data() {
    return {
    }
  },
  props: ['params'],
  computed: {},
  components: {},
  methods: {
    /**
     * 展示是否需要副本
     */
    showNeedRegisterCopy(needRegisterCopy) {
      return needRegisterCopy === '0' ? '否' : '是'
    },
    /**
     * 开发方式
     */
    developMode(developMode) {
      switch (parseInt(developMode)) {
        case 1:
          return '独立开发'
        case 2:
          return '合作开发'
        case 3:
          return '委托开发'
        case 4:
          return '下达任务开发'
        default:
          return
      }
    },
    /**
     * 权利取得方式
     */
    rightObtainMode(rightObtainMode) {
      switch (parseInt(rightObtainMode)) {
        case 1:
          return '原始'
        case 22:
          return '受让'
        case 23:
          return '承受'
        case 21:
          return '继承'
        default:
          return
      }
    },
    /**
     * 权利范围详情
     */
    rightScopePart(rightScopePart) {
      switch (parseInt(rightScopePart)) {
        case 1:
          return '发表权'
        case 2:
          return '署名权'
        case 3:
          return '修改权'
        case 4:
          return '复制权'
        case 5:
          return '发行权'
        case 6:
          return '出租权'
        case 7:
          return '信息网络传播权'
        case 8:
          return '翻译权'
        case 9:
          return '应当由著作权人享有的其他权利'
        default:
          return
      }
    },
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
</style>