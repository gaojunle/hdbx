<template>

 <div class="box" v-if="noticeData">
   <header>
     <div class="left">
       <p>{{noticeData.flowNumber}}</p>
     </div>
     <div class="right">
       <img src="../../img/notice/notice8.png">
     </div>
   </header>
   <p class="h1" v-if="noticeType === 'receiveOupsResult'">领取结果通知书</p>
   <p class="h1" v-if="noticeType === 'correctionOups'">补正通知书</p>
   <p class="h1" v-if="noticeType === 'unOupsAcceptance'">不予办理通知书</p>
   <p class="h1" v-if="noticeType === 'grantOupsResult'">发放结果通知书</p>
   <!--列表信息 /流水号/登记号/申请人/代理人/-->
    <div >
      <div class="formLeft">
        <span>流 水 号：</span>
        <div class="rowRight">{{noticeData.flowNumber}}</div>
      </div>
      <div class="formLeft">
        <span>登 记 号：</span>
        <div class="rowRight">{{noticeData.registerNumber}}</div>
      </div>
      <div class="formLeft">
        <span>作品名称：</span>
        <div class="rowRight">{{noticeData.name}}</div>
      </div>
      <div class="formLeft">
        <span>著作权人：</span>
        <div class="rowRight">{{noticeData.owner}}</div>
      </div>
      <div class="formLeft">
        <span>查 询 人：</span>
        <div class="rowRight">{{noticeData.applyPeople}}</div>
      </div>
      <div class="formLeft">
        <span>代 理 人：</span>
        <div class="rowRight"></div>
        <!-- {{noticeData.agentPeople}} -->
      </div>
    </div>
    <!-- 领取通知书 -->
    <template v-if="noticeType === 'receiveOupsResult'">
      <div class="one">
        <p class="text1">您的作品发放结果已出，请您于X个工作日后来中国版权保护中心大厅领取。</p>
        <div class="list" v-for="(item,index) in receiveResultList" :key="index">
          <p>{{item}}</p>
        </div>
      </div>
    </template>
    
    <!-- 补正通知书 -->
    <template v-else-if="noticeType === 'correctionOups'">
      <div class="one">
        <p class="text1">经审查，上述著作权登记档案查询申请文件存在下列缺陷。根据《著作权登记档案查询办法》的相关规定，查询人应于收到本人通知之日起30日内予以补正，逾期未补正，查询将不予办理</p>
        <div class="list">
          <p>缺陷及须补正的内容如下：</p>
          <br>
          <p class="text2">1.请补交登记证书复印件。</p>
          <p>2.请补交著作权人营业执照副本复印件。</p>
        </div>
        <p class="text3">以上缺陷，请提交符合要求的材料一式一份</p>
      </div>
    </template> 
    <!-- 不予办理通知书 -->
   <template v-else-if="noticeType === 'unOupsAcceptance'">
        <div class="one">
          <p class="text1">经审查，上述著作权登记档案查询申请，因材料不符合要求不予受理，查询内容超过查询范围，根据《著作权登记档案查询办法》的规定，不予办理</p>
        </div>
    </template> 
    <!-- 发放结果通知书 -->
    <template v-else-if="noticeType === 'grantOupsResult'">
        <div class="one">
          <p class="text1">您申请的流水号为：{{noticeData.flowNumber}}   的作品著作权登记查询结果已于 {{noticeData.createDate | ymdDate}} 通过邮寄方式发放，快递单号：{{noticeData.gotMessage}}，请注意核实。</p>
        </div>
    </template>

    <div class="bao">
      <p>中国版权保护中心</p>
      <p v-if="noticeType !== 'unOupsAcceptance'">著作权登记部</p>
      <p>2019年04月04日</p>
    </div>
    
    <!--页脚-->
      <div class="footer" >
        <div class="footerPhone clearfix">
          <div>办理人：{{noticeData.handlePeople}}</div>
          <div>电话：{{noticeData.handlePhone}}</div>
          <div>email地址：{{noticeData.handleEmail}}</div>
        </div>
        <div class="line"></div>
        <div class="footerAddress">
          通讯地址：北京市西城区天桥南大街1号天桥艺术大A座3层
          <span>邮编：100050</span>
        </div>
      </div>
 </div>
</template>

<script>

import '../../css/notice/noticeofWorks'
import Utils from '../../js/utils/utils'
export default {
  props: {
    noticeType: { type: String, default: 'receiveOupsResult' },  //通知书类型
    noticeData: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      /*
    * 类型对应：
    *    correction 补证通知书
    *    acceptance 软件著作权登记档案查询受理通知书
    *    unAcceptance 不予办理通知书
    *    receiveResult 领取查询结果通知
    *    grantResult 查询结果发放通知
    */
      title: {
        acceptance: '作品著作权登记档案查询受理通知书',
        correction: '补证通知书',
        unAcceptance: '不予办理通知书',
        receiveResult: '领取结果通知',
        grantResult: '查询结果发放通知',
      }, // title文案
      info: {
        acceptance: '根据《计算机软件登记档案查询办法》的相关规定，查询人提出的上述软件著作权登记档案查询申请中国版权保护中心予以受理。',
        correction: '经审查，上述软件著作权登记档案查询申请文件存在下列缺陷。根据 《计算机软件著作权登记档案查询办法》的相关规定，查询人应于收到本通知之日起 30 日内予以补正，逾期未补正，查询将不予办理。',
        unAcceptance: '经审查,上述软件著作权登记档案查询申请文件,因 XXXXXXXXXXXXXXXXXX原因,据《计算机软件著作权登记档案查询法》第十四条的规定,不予力理。',
        receiveResult: '您的软件著作权查询结果已出,请您于X个工作日后来中国版权保护中心大厅领取。',
        grantResult: '您申请的流水号为:2018R110035795的查询结果,已于2019年3月25日通过现场方式发放,领请注意核实。',
      },
      correctionList: [
        '缺陷及须补正的内容如下：',
        '1.请补交登记证书原件。',
        '2.请补交著作权人营业执照副本复印件。',
        '3.请补交调档说明，A4纸打印，写清登记号、软件名称、著作权人名称、调档原因，盖公章。',
        '4.请写明需补发的副本数量。', '5.测试新建补正模版。'
      ], // 补证通知书列表展示信息
      receiveResultList: [
        '携带资料：',
        '1、',
        '2、',
        '3、',
      ], // 领取查询结果通知携带材料
    }
  },
  mounted() {
    // window.print();
  },
  created() {
  },
  // methods: {}
}
</script>

<style scoped>
  .reject_text {
    width: 90;
    margin: 0 auto;
    padding: 40px 0;
    font-size: 14px;
  }
</style>
