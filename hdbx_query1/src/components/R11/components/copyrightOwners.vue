<template>
  <div class="copyright-owners">
    <ul>
      <li v-for="(item, index) in ownerList" :key="item.id">
        <div class="edit" v-show="item.edit">
          <!-- 头部 -->
          <div class="title clearfix">
            <div class="left" v-text="'第' + (index + 1) + '位'"></div>
            <div class="right">
              <span @click="handleSave(item, index)">保存</span>
              <span class="delete" v-if="index > 0" @click="handleDelete(item.id)">删除</span>
            </div>
          </div>
          <owner :index="index" :ref="'owner' + item.id"></owner>
          <div v-if="item.needRegisterCopy" class="need-register-copy clearfix">
            <div class="left">申请证书副本：</div>
            <ul class="right">
              <li>
                <hd-radio v-model="item.needRegisterCopy" label="0" :name="'needRegisterCopy'">否</hd-radio>
              </li>
              <li>
                <hd-radio v-model="item.needRegisterCopy" label="1" :name="'needRegisterCopy'">是</hd-radio>
              </li>
            </ul>
          </div>
          <div class="error" v-show="item.error" v-text="item.error"></div>
        </div>
        <div class="static" v-show="!item.edit">
          <!-- 头部 -->
          <div class="title clearfix">
            <div class="left" v-text="'第' + (index + 1) + '位'"></div>
            <div class="right">
              <span @click="handleEdit(item)">编辑</span>
              <span class="delete" v-if="index > 0" @click="handleDelete(item.id)">删除</span>
            </div>
          </div>
          <div class="content">
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
          </div>
        </div>
      </li>
    </ul>
    <hd-button v-show="addBtnShow" class="addOwner" width="100" height="30" @click="handleAddOwner">+添加著作权人</hd-button>
  </div>
</template>

<script>
import '@css/R11/copyrightOwners'

import api from '@api'
import owner from './owner'
import hdButton from '@share/components/hdButton'
import hdRadio from '@share/components/hdRadio'

export default {
  data() {
    return {
      ownerList: [{
        ownerType: 'person', // 人员类型
        name: '', // 名称
        country: '', // 国家
        enterpriseType: '', // 机构类型
        park: '', // 园区
        idType: '', // 证件类型
        idNumber: '',	// 证件号
        edit: true, // 编写模式
        error: '', // 错误提示
        id: new Date().getTime() + 0,
      }], // 著作权人
      selfOwner: {
        ownerType: 'person', // 人员类型
        name: '', // 名称
        country: '', // 国家
        enterpriseType: '', // 机构类型
        park: '', // 园区
        idType: '', // 证件类型
        idNumber: '',	// 证件号
      },
    }
  },
  props: ['propsParams'],
  computed: {
    /**
     * 判断添加按钮显示
     */
    addBtnShow() {
      let flag = !(this.propsParams.developMode === '1' && this.propsParams.rightObtainMode === '1')
      if (!flag) this.ownerList.splice(1, this.ownerList.length - 1)
      return flag
    }
  },
  components: { owner, hdRadio, hdButton },
  methods: {
    /**
     * 主入口函数
     */
    init(ownerList) {
      if (ownerList && ownerList.length < 1) return
      this.ownerList = [...ownerList]
      this.$nextTick(() => {
        this.ownerList.forEach(item => {
          let ref = 'owner' + item.id
          this.$refs[ref][0].setInit(item)
        })
      })
    },
    /**
     * 著作权人类型
     */
    applyPersonTypeOwner() {
      let userInfo = getCookie()
      let isCompany = parseInt(userInfo.accountType) === 1
      let apiName = isCompany ? 'companyAndPeople' : 'getPerson'
      let id = isCompany ? userInfo.id : userInfo.personId
      api[apiName](id).then(res => {
        if (res.data) isCompany ? this.initOwner('enterprise', res.data.company) : this.initOwner('person', res.data)
      })
    },
    initOwner(ownerType, data) {
      let firstOwner = this.ownerList[0]
      this.selfOwner.ownerType = ownerType
      if (data.realName) this.selfOwner.name = data.realName
      if (data.companyName) this.selfOwner.name = data.companyName
      this.selfOwner.country = data.country
      if (data.companyType) this.selfOwner.enterpriseType = data.companyType
      if (firstOwner.park) this.selfOwner.park = firstOwner.park
      this.selfOwner.idType = data.cardType
      this.selfOwner.idNumber = data.cardNumber
      Object.assign(firstOwner, this.selfOwner)
      this.ownerList.splice(0, 1, firstOwner)
      this.$refs['owner' + firstOwner.id][0].setInit(firstOwner)
    },
    /**
     * 添加著作权人
     */
    handleAddOwner() {
      let obj = {
        ownerType: 'person', // 人员类型
        name: '', // 名称
        country: '', // 国家
        enterpriseType: '', // 机构类型
        park: '', // 园区
        idType: '', // 证件类型
        idNumber: '',	// 证件号
        needRegisterCopy: '0', // 是否需要副本
        edit: true, // 编写模式
        error: '', // 错误提示
        id: new Date().getTime() + this.ownerList.length,
      }
      this.ownerList.push(obj)
    },
    /**
     * 验证实名认证
     */
    handleSave(item, index) {
      let ref = 'owner' + item.id
      let selfOwner = null
      if (index === 0 && this.propsParams.applyPersonType === 1) selfOwner = this.selfOwner
      if (this.$refs[ref][0].check(selfOwner)) return

      let owner = { ...this.$refs[ref][0].params }

      api.R11RealNameCheck(owner).then(res => {
        if (res.data) {
          item.accountId = res.data
          item.error = ''
          item.edit = false
          Object.assign(item, owner)
        }
      })
    },
    /**
     * 打开到编辑模式
     */
    handleEdit(item) {
      item.edit = true
    },
    /**
     * 删除项
     */
    handleDelete(id) {
      let index = this.ownerList.findIndex(item => item.id === id)
      if (index > 0) this.ownerList.splice(index, 1)
    },
    /**
     * 展示是否需要副本
     */
    showNeedRegisterCopy(needRegisterCopy) {
      return needRegisterCopy === '0' ? '否' : '是'
    },
    /**
     * 验证
     */
    check(params) {
      let flag = false
      this.ownerList.forEach(item => {
        if (!item.edit) return
        flag = true
        item.error = '请先保存填写项'
      })
      if (!flag) params.ownerList = [...this.ownerList]
      return flag
    },
  },
  watch: {},
  mounted() { },
  created() {
    if (this.propsParams.applyPersonType === 1) this.applyPersonTypeOwner()
  },
}

</script>
<style lang='scss' scoped>
</style>