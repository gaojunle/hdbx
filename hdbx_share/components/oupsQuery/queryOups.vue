<template>
  <div class="query-oups">
    <div class="title">
      {{queryTitle}}
      <template v-if="showTitleBtn">
        <hd-button fontSize="14" height="30" @click="handleOupsAddListAlert()">+添加作品</hd-button>
      </template>
    </div>
    <div class="query-oups-box">
      <div class="search clearfix" v-if="showSearch">
        <hd-input v-model.trim="search" placeholder="请输入登记号或作品名称，多关键词用空格隔开" width="400" height="40" @change="handleSearchChange"></hd-input>
        <div class="data">
          <span>登记日期：</span>
          <el-date-picker v-model="picker" type="daterange" value-format="timestamp" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
        </div>
        <hd-button fontSize="14" height="40" @click="handleSearch">查询</hd-button>
      </div>
      <ul class="opus-info">
        <li v-for="(item, index) in opusBaseInfoList" :key="item.id">
          <div class="num" v-text="index + 1">+</div>
          <div class="register-number">
            <div class="title">登记号：</div>
            <div class="content" v-text="item.registerNumber" :title="item.registerNumber"></div>
          </div>
          <div class="opus-name">
            <div class="title">作品名称：</div>
            <div class="content" v-text="item.opusName" :title="item.opusName"></div>
          </div>
          <div class="owner">
            <div class="title">著作权人：</div>
            <div class="content" v-text="item.owner" :title="item.owner"></div>
          </div>
          <div class="delete" @click="handleDeleteList(item)">删除</div>
        </li>
      </ul>
    </div>
    <div class="error" v-if="error" v-text="error"></div>
    <!-- 搜索作品弹出框 -->
    <hd-alert ref="hdAlert" width="1200" height="600" title="查询作品列表" confirmText="关闭" @handleConfirm="$refs.hdAlert.alertShow = false">
      <ul class="oups-search">
        <li v-for="(item, index) in opusCurrentList" :key="index">
          <div class="add" @click="handleAddOpusBaseInfoList(item)">+</div>
          <div class="register-number">
            <div class="title">登记号：</div>
            <div class="content" v-text="item.registerNumber" :title="item.registerNumber"></div>
          </div>
          <div class="opus-name">
            <div class="title">作品名称：</div>
            <div class="content" v-text="item.opusName" :title="item.opusName"></div>
          </div>
          <div class="owner">
            <div class="title">著作权人：</div>
            <div class="content" v-text="item.owner" :title="item.owner"></div>
          </div>
        </li>
      </ul>
      <el-pagination style="text-align: center" :current-page="pageNum" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" layout="prev, pager, next, jumper"></el-pagination>
    </hd-alert>
    <!-- 手动添加作品弹出框 -->
    <hd-alert ref="oupsAddList" width="1200" height="600" title="查询作品列表" @handleConfirm="handleOupsAddList">
      <ul class="oups-handle">
        <li v-for="(item, index) in oupsAddList" :key="item.id">
          <query-oups-item :opusBaseInfo="item" :index="index" @change="changeOpusAddList" @delete="deleteOpusAddList"></query-oups-item>
        </li>
        <hd-button fontSize="14" height="30" @click="handleAddList()">添加</hd-button>
      </ul>
    </hd-alert>
    <!-- 禁止修改 -->
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/oupsQuery/queryOups'
import '../../css/theme'

import Vue from 'vue'
import axios from '../../api/axios'
import { API_HOST, APIDOC_HOST } from '../../api/config'
import hdButton from '../hdButton'
import hdInput from '../hdInput'
import hdAlert from '../hdAlert'
import queryOupsItem from './queryOupsItem'
import { agentOupsType } from '../../constants/queryOupsSoft'

import {
  DatePicker,
  Pagination,
} from 'element-ui'

Vue.use(DatePicker)
Vue.use(Pagination)

export default {
  data() {
    return {
      isAgent: agentOupsType.some(item => item === this.params.applyIdentity), // 是否为代理人类型
      queryTitle: '', // 标题
      search: '', // 查询条件
      picker: null, // 登记日期
      pageNum: 1, // 当前页数
      pageSize: 50, // 每页数量
      total: 0, // 总条数
      realName: '', // 用户真实姓名
      opusCurrentList: [], // 当前查询出的作品列表
      oupsAddList: [], // 手动添加作品列表
      opusBaseInfoList: this.params.queryOpusBaseInfoEntityList ? this.params.queryOpusBaseInfoEntityList.map(item => item) : [], // 查询作品
      initoupsItem: {
        id: '0' + new Date().getTime(),
        registerNumber: '', // 登记号
        opusName: '', //作品名称
        owner: '', // 著作权人
        registerDate: '', // 登记日期
        error: '', // 错误提示
        baseId: '', // 作品信息关联id
      }, // 初始化手动添加作品内容
      error: '', // 错误提示文案
    }
  },
  props: {
    params: {
      type: Object,
      defalut: () => ({
        applyPurpose: '',
        applyIdentity: '',
        queryOpusBaseInfoEntityList: []
      }),
    },
    apiGetPerson: {
      type: String,
      // defalut: ''
      default: getCookie() ? API_HOST + '/userServer/person/getPerson/' + getCookie().personId : ''
    }, // 获取个人实名信息接口地址
    apiGetOpusQueryBaseInfo: {
      type: String,
      default: API_HOST + '/registerQueryOpusServer/opusQuery/SelectBaseInfo'
    }, // 获取个人实名信息接口地址
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
  },
  computed: {
    /**
     * 返回是否显示标题处添加按钮
     */
    showTitleBtn() {
      let flag = false
      if (this.isAgent) flag = true
      switch (parseInt(this.params.applyPurpose)) {
        case 1:
        case 5:
        case 7:
          flag = true
          break
        default:
          break
      }
      return flag
    },
    /**
     * 返回是否显示标题处添加按钮
     */
    showSearch() {
      let flag = false
      if (!this.isAgent) flag = true
      switch (parseInt(this.params.applyPurpose)) {
        case 1:
          if (['TEC', 'LCE'].some(item => item === this.params.applyIdentity)) flag = false
          break
        case 5:
          if (this.params.applyIdentity === 'PLE') flag = false
          break
        default:
          break
      }
      return flag
    },
    /**
     * 唯一的著作权人
     */
    ownerOnly() {
      if (this.realName) return this.realName
      return this.opusBaseInfoList[0] ?
        this.opusBaseInfoList[0].owner : this.oupsAddList[0].owner
    },
  },
  components: { hdButton, hdInput, queryOupsItem, hdAlert },
  methods: {
    /**
     * 查询作品列表
     */
    handleSearch() {
      let param = {
        t: {
          search: this.search,
          startDate: this.picker ? this.picker[0] : '',
          endDate: this.picker ? this.picker[1] : '',
          createUser: getCookie().id,
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      }

      axios(this.apiGetOpusQueryBaseInfo, param, { method: 'post' }).then(res => {
        if (res.data) {
          this.total = res.data.total
          this.opusCurrentList = [...res.data.list]
        }
      })


      this.$refs.hdAlert.alertShow = true
    },
    /**
     * 当前页面改变时会触发
     * @param val 当前页面的位置
     */
    handleCurrentChange(val) {
      this.pageNum = val
      this.handleSearch()
    },
    /**
     * 手动添加作品弹出框
     */
    handleOupsAddListAlert() {
      this.$refs.oupsAddList.alertShow = true
      this.oupsAddList = [Object.assign({}, this.initoupsItem)]
    },
    /**
     * 搜索框内容改变时触发
     */
    handleSearchChange(value) {
      this.search = this.search.replace(/^,*|,*$/g, '')
      this.search = this.search.replace(/^，*|，*$/g, '')
      this.search = this.search.replace(/\s*/g, "")

      //     ，阿萨德，奥术大师多，     
    },
    /**
     * 添加手动作品列表
     * @param item 加入的内容
     */
    handleAddList() {
      let initoupsItem = Object.assign({}, this.initoupsItem, { id: `${this.oupsAddList.length}${new Date().getTime()}` })
      this.oupsAddList.push(initoupsItem)
    },
    /**
     * 修改查询作品内容
     * @param item 修改的内容
     */
    changeOpusAddList(item) {
      let index = this.oupsAddList.findIndex(info => info.id === item.id)
      Object.assign(this.oupsAddList[index], item)
      if (item.owner && this.ownerOnly) this.oupsAddList[index].error = item.owner === this.ownerOnly ? '' : '著作权人必须唯一'
      if (item.opusName) this.oupsAddList[index].error = ''
    },
    /**
     * 删除查询作品内容
     * @param id 删除的id
     */
    deleteOpusAddList(id) {
      let index = this.oupsAddList.findIndex(info => info.id === id)
      this.oupsAddList.splice(index, 1)
      if (index === 0) this.oupsAddList.forEach(item => {
        item.error = item.owner === this.ownerOnly ? '' : '著作权人必须唯一'
      })
    },
    /**
     * 手动添加作品列表向作品列表添加作品
     */
    handleOupsAddList() {
      let flag = false
      this.oupsAddList.forEach(item => {
        item.error = item.owner === this.ownerOnly ? '' : '著作权人必须唯一'
        if (!item.opusName) item.error = '请填写作品名称'
        if (!item.owner) item.error = '请填写著作权人'
        if (item.error) flag = true
      })

      if (flag) return

      this.$refs.oupsAddList.alertShow = false

      this.addOpusBaseInfoList(this.oupsAddList)
    },
    /**
     * 搜索列表选中项向作品列表添加作品
     */
    handleAddOpusBaseInfoList(item) {
      item.baseId = item.id
      this.addOpusBaseInfoList([item], () => pageShowMsg('作品添加成功'))
    },
    /**
     * 添加到作品内容列表
     */
    addOpusBaseInfoList(list, callBack = () => { }) {
      if (this.opusBaseInfoList.length === 50) return pageShowMsg('添加作品已达到50个上限')
      list.forEach(item => {
        if (this.opusBaseInfoList.length === 50) return
        if (item.registerNumber && this.opusBaseInfoList.some(info => info.registerNumber === item.registerNumber)) return
        delete item.error
        item.id = `${this.opusBaseInfoList.length}${new Date().getTime()}`
        this.opusBaseInfoList.push(item)
        callBack()
      })
    },
    /**
     * 删除作品列表选中项
     * @aram item 当前选中项
     */
    handleDeleteList(item) {
      let index = this.opusBaseInfoList.findIndex(info => info.id === item.id)
      this.opusBaseInfoList.splice(index, 1)
    },
    /**
     * 验证填写内容是否正确
     */
    check() {
      if (this.opusBaseInfoList.length === 0) {
        this.error = '请添加需要查询的作品'
        return false
      }
      return true
    },
    /**
     * 设置作品列表内容
     */
    setOpusBaseInfoList(list) {
      list.forEach(item => {
        item.id = `${this.opusBaseInfoList.length}${new Date().getTime()}`
        this.opusBaseInfoList.push(item)
      })
    },
  },
  watch: {
    opusBaseInfoList: {
      handler(value) {
        this.error = ''
      },
      deep: true
    }
  },
  mounted() {
    // console.log(this.params.queryOpusBaseInfoEntityList)
  },
  created() {
    this.queryTitle = this.isAgent ? '填写您需要查询的作品' : '选择您需要查询的作品'
    if (!this.isAgent && this.apiGetPerson) axios(this.apiGetPerson).then(res => { if (res.data) this.realName = res.data.realName })
  },
}

</script>
<style lang='scss' scoped>
</style>