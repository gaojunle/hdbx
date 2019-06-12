<template>

 <div class="box" v-if="noticeData">
   <header>
     <div class="left">
       <p>{{noticeData.flowNumber}}</p>
       <p v-if="noticeType === 'record'">{{noticeData.z11BaseInfoMap.flowNumber}}</p>
     </div>
     <div class="right">
       <p class="p1">中国版权保护中心</p>
       <p class="p2">WWW.CCOPYRIGHT>COM</p>
     </div>
   </header>
   <p class="h1" v-if="noticeType === 'payment'">作品著作权登记缴费通知书</p>
   <p class="h1" v-if="noticeType === 'correctionOups'">作品著作权登记补正通知书</p>
   <p class="h1" v-if="noticeType === 'notAccepted'">作品著作权登记不予办理通知书</p>
   <p class="h1" v-if="noticeType === 'record'">著作权登记受理通知书</p>
   <p class="h1" v-if="noticeType === 'receiveOupsResult'">作品著作权登记领取证书通知书</p>
   <!--列表信息 /流水号/登记号/申请人/代理人/-->
    <div v-if="noticeType === 'payment' || noticeType === 'correctionOups' || noticeType === 'notAccepted'">
      <div class="formLeft">
        <span>流 水 号：</span>
        <div class="rowRight">{{noticeData.flowNumber}}</div>
      </div>
      <div class="formLeft">
        <span>作品名称：</span>
        <div class="rowRight">{{noticeData.name}}</div>
      </div>
      <div class="formLeft">
        <span>登记类型：</span>
        <div class="rowRight">{{noticeData.registerType}}</div>
      </div>
      <div class="formLeft">
        <span>申 请 人：</span>
        <div class="rowRight">{{noticeData.applyPeople}}</div>
      </div>
    </div>
    <div v-if="noticeType === 'record'">
      <div class="formLeft">
        <span>流 水 号：</span>
        <div class="rowRight">{{noticeData.z11BaseInfoMap.flowNumber}}</div>
      </div>
      <div class="formLeft">
        <span>作品名称：</span>
        <div class="rowRight">{{noticeData.z11BaseInfoMap.opusName}}</div>
      </div>
      <div class="formLeft">
        <span>登记类型：</span>
        <div class="rowRight">{{noticeData.z11BaseInfoMap.opusType}}</div>
      </div>
      <div class="formLeft">
        <span>申 请 人：</span>
        <div class="rowRight">{{noticeData.z11BaseInfoMap.applicant}}</div>
      </div>
      <div class="formLeft" v-if="noticeType === 'record'">
        <span>账户余额：</span>
        <div class="rowRight">***元</div>
      </div>
    </div>
    <!-- 缴费通知书 -->
    <template v-if="noticeType === 'payment'">
      <div class="one">
        <p>上述作品著作权登记申请材料已收到，现已通过初步审核。为了及时受理您的提交作品著作权登记申请，请您按照下列方框“口” 中划 “√” 的项目交纳费用；</p>
        <div class="list">
          <div class="p">
              &nbsp;&nbsp;著作权登记费：{{noticeData.chargeListVo.registerFee}}
              <p class="kou">√</p>
          </div>
          <br>
          <div class="p">
              &nbsp;&nbsp;补办证书费：{{noticeData.chargeListVo.postage}}
              <p class="kou">√</p>
          </div>
          <br>
          <p>&nbsp;&nbsp;共计：{{noticeData.chargeListVo.amount}}</p>
        </div>
      </div>
      <p>费用可汇入专用账号，（请在汇款单中注明流水号）即：</p>
      <div class="pp">
            <p>&nbsp;&nbsp;单位名称：中国版权保护中心</p>
            <p>&nbsp;&nbsp;开户银行： 北京银行永定门支行（银行行号0368）</p>
            <p>&nbsp;&nbsp;账户名称：中国版权保护中心</p>
            <p>&nbsp;&nbsp;银行账户：01333i44924023940930</p>
      </div>
      <p>注意事项：</p>
      <div class="pp">
          <p>&nbsp;&nbsp;1.登记申请人、代理人在收到缴费通知书后，方可根据没分缴费通知书注明的金额和规定逐笔汇款，并逐笔在汇款凭证附言栏内注明登记流水号；</p>
          <p>&nbsp;&nbsp;2.汇款时必须在汇款凭证附言栏内注明发票抬头的纳税人识别号或统一社会信用代码，并与登记流水号形成有效区域分或间隔。未注明或未准确注明造成发票不能作为税收凭证的，后果自负；</p>
          <p>&nbsp;&nbsp;更多注意事项请见《关于规范作品著作权登记缴费及开票秩序的通告》</p>
          <p>&nbsp;&nbsp;http://www.ccopyright.com/index.php?optionid=998&auto_id=282</p>
      </div>
    </template>
    
    <!-- 补正通知书 -->
    <!-- <template v-else-if="noticeType === 'correctionOups'">
      <div class="one">
        <p class="hr">申请人或代理人<span>11111111</span>：</p>
          <p class="hr">&nbsp;&nbsp;关于流水号为 <span>11111111</span> 、作品名称为 <span>texts</span> 的申请<br>
          经检查，所提交的申请表存在下列缺陷。根据《作品自愿登记试行办法》规定，申请人应于收到本通知之日起60日内予以补正，逾期未补正，视为撤回申请。</p>
          <p>&nbsp;&nbsp;缺陷及需补正的内容如下：</p>
      </div>
    </template> --> 
    <!-- 不予办理通知书 -->
   <template v-else-if="noticeType === 'notAccepted'">
        <div class="one">
          <p class="hr">申请人或代理人<span>{{noticeType.adviceNoteRejectEntity.applyPeople}}</span>：</p>
          <p class="hr">&nbsp;&nbsp;关于流水号为 <span>{{noticeData.adviceNoteRejectEntity.flowNumber}}</span> 、作品名称为 <span>{{noticeData.name}}</span> 的申请。经检查，该申请存在不予受理的情况。根据《作品自愿登记试行办法》规定，将不予受理，特此通知。</p>
          <p>&nbsp;&nbsp;不予受理的情况如下：</p>
          <p>{{noticeData.adviceNoteRejectEntity.rejectReason}}</p>
        </div>
    </template> 
  <!-- 著作权登记受理通知书 -->
    <template v-else-if="noticeType === 'record'">
        <div class="one">
          <p>上述登记申请，所提交的申请文件符合受理条件，予以受理。其中账户余额可在下次办理业务时进行费用抵扣。</p>
          <div class="boxs">
            <div class="a">受理号</div>
            <div class="bs">{{noticeData.admissableNumber}}</div>
          </div>
        </div>
    </template> 
    <!-- 领取通知书 -->
    <template v-if="noticeType === 'receiveOupsResult'">
      <div class="one">
        <p class="text1">您的作品著作权登记证书已出，请您于X个工作日后来中国版权保护中心大厅领取。</p>
        <div class="list" v-for="(item,index) in receiveResultList" :key="index">
          <p>{{item}}</p>
        </div>
      </div>
    </template>
    <div class="bao">
      <p>中国版权保护中心著作权登记部</p>
      <!-- <p v-if="noticeType !== 'unOupsAcceptance'">著作权登记部</p> -->
      <p class="p" v-if="noticeType === 'payment' || noticeType === 'correctionOups' || noticeType === 'notAccepted'">{{this.format(noticeData.createDate)}}</p>
      <p class="p" v-if="noticeType == 'record'">{{this.format(noticeData.date)}}</p>
    </div>
   
    <!--页脚-->
      <div class="footer" >
        <div class="footerPhone clearfix">
        <p class="zu" v-if="noticeType == 'payment'">注：根据财务管理规定，发票名称与汇款人名称一致。</p>
        <p class="zu" v-if="noticeType == 'record'">注意事项：收到本通知后，如需询问有关事宜请告知流水号。</p>
          <div>办理人：{{noticeData.handlePeople}}</div>
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

import '../../css/notice/inspectionWorks'
import Utils from '../../js/utils/utils'
export default {
  props: {
    noticeType: { type: String, default: 'payment' },  //通知书类型
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
    * 
    */
    receiveResultList: [
        '携带资料：',
        '1、',
        '2、',
        '3、',
      ], // 领取查询结果通知携带材料
    }
  },
  methods: {
    add0(m) {
      return m<10?'0'+m:m 
    },
    format(chuo) {
      var time = new Date(chuo)
      var y = time.getFullYear()
      var m = time.getMonth()+1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y+'年'+this.add0(m)+'月'+this.add0(d)+'日'
    },
  },
  mounted() {
    // window.print();
  },
  created() {
    console.log(this.noticeData)
  },
  // methods: {}
}
</script>

<style scoped lang='scss'>
  .reject_text {
    width: 90;
    margin: 0 auto;
    padding: 40px 0;
    font-size: 14px;
  }
  .boxs {
    width: 300px;
    height: 30px;
    border: 1px solid #000;
    margin-top: 40px;
    margin-left: 200px;
    div {
        height: 100%;
        border-right: 1px solid #000;
        text-align: center;
        line-height: 35px;
        float: left;
      }
      .a {
        width: 100px;
      }
      .bs {
        width: 199px;
        border: none;
        text-align: center;
        line-height: 30px;
      }
  }
</style>
