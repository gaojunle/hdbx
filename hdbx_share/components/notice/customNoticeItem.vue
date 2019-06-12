<template>
  <div class="page" v-if="noticeData">
    <div class="subpage">
      <!-- 头部 -->
      <div class="noticeHeader clearfix">
        <!--左侧信息  /邮编/地址/申请人/姓名/电话-->
        <div class="noticeHeaderLeft">
          <div v-text="noticeData.postCode"></div>

          <div class="indentation">
            <div v-if="noticeData.contactAddress" v-text="noticeData.contactAddress"></div>
            <div v-if="noticeData.applyPeople"  v-text="noticeData.applyPeople"></div>
            <div v-if="noticeData.handlePeople"  v-text="noticeData.handlePeople"></div>
            <div v-if="noticeData.handlePhone"  v-text="noticeData.handlePhone"></div>
          </div>

          <!--条形码块-->
          <div style="width: 98px;height: 48px;border: 1px solid saddlebrown"></div>
        </div>

        <!--右侧logo-->
        <div>
          <img src="../../img/notice/notice8.png">
        </div>
      </div>

      <div class="mainForm">
        <!--通知书标题-->
        <div class="noticeTitle">
          <div class="correctionTitle" v-text="title[noticeType]"></div>
        </div>

        <!--列表信息 /流水号/登记号/申请人/代理人/-->
        <div v-if="noticeType !== 'grantResult'">
          <div class="formLeft" v-if="noticeData.flowNumber">
            <span>流 水 号：</span>
            <div class="rowRight" v-text="noticeData.flowNumber"></div>
          </div>
          <div class="formLeft" v-if="noticeData.registerNumber">
            <span>登 记 号：</span>
            <div class="rowRight" v-text="noticeData.registerNumber"></div>
          </div>
          <div class="formLeft" v-if="noticeData.applyPeople">
            <span>申 请 人：</span>
            <div class="rowRight" v-text="noticeData.applyPeople"></div>
          </div>
          <div class="formLeft" v-if="noticeData.agentPeople">
            <span>代 理 人：</span>
            <div class="rowRight" v-text="noticeData.agentPeople"></div>
          </div>
        </div>
        <div class="formInfo">
          <template v-if="info[noticeType] && noticeType === 'acceptance' || noticeType === 'correction'">
            <p v-text="info[noticeType]"></p>
          </template>
          
          <!--不予办理通知书-->
          <template v-else-if="noticeType === 'unAcceptance'">
            <p>
              经审查,上述软件著作权登记档案查询申请文件,因 {{noticeData.rejectReason}}原因,据《计算机软件著作权登记档案查询法》第十四条的规定,不予力理。
            </p>
          </template>

          <!--查询结果发放通知-->
          <template v-else-if="noticeType === 'grantResult'">
            <p>
              您申请的流水号为:{{noticeData.flowNumber}}的查询结果,已于{{noticeData.createDate}}通过现场方式发放,领请注意核实。
            </p>
          </template>

          <!-- 软件著作权登记档案查询受理通知书 -->
          <template v-if="noticeType === 'acceptance'">
            <div class="acceptanceFlex clearfix">
              <div>受理号：{{noticeData.acceptNumber}}</div>
              <div>受理日期：{{noticeData.acceptDate}}</div>
            </div>
            <div class="acceptFooter copyrightDate">
              <div>中国版权保护中心软件登记部</div>
              <div class="infoDate">{{ noticeData.createDate | ymdDate }}</div>
            </div>
            <div class="acceptanceAttention">注意事项：查询人收到本通知书后，如需了解办理进度，请登录中国版权保护中心官网在"我的软件查询"中查看本流水号的状态，当显示为"发放环节"时，须持加盖公章的本通知书原件至大厅领取查询结果（仅限在大厅办理的查询人）。查询结果自生成之日起2个月内有效，查询结果失效则视为放弃并不予发放。</div>
          </template>

          <!-- 补证通知书 -->
          <template v-else-if="noticeType === 'correction'">
            <div v-for="(item,index) in correctionList" :key="index">{{item}}</div>
            <div class="infoFooter">
              以上缺陷，请提交符合要求的材料一式一份。
              <div>中国版权保护中心</div>
            </div>
            <div class="infoDate">{{noticeData.createDate}}</div>
          </template>

          <template v-else-if="noticeType === 'receiveResult'">
            <br>
            <div>您的软件著作权查询结果已出,请您于X个工作日后来中国版权保护中心大厅领取。</div>
            <br>
            <div>携带资料：</div>
            <div v-for="(item,index) in noticeData.fileList" :key="index">{{item}}</div>
          </template>

          <!-- 软件著作权登记档案不予办理通知书 -->
          <template v-else>
            <div class="acceptFooter copyrightDate">
              <div>中国版权保护中心</div>
              <div class="infoDate">{{noticeData.createDate | formatDate}}</div>
            </div>
          </template>
        </div>
      </div>

      <!--页脚-->
      <div class="footer" v-if="noticeType !== 'grantResult'">
        <div class="footerPhone clearfix">
          <div>审查员：{{noticeData.handlePeople}}</div>
          <div>电话：{{noticeData.handlePhone}}</div>
          <div>email地址：{{noticeData.handlePostCode || noticeData.handleEmail}}</div>
        </div>
        <div class="line"></div>
        <div class="footerAddress">
          通讯地址：北京市西城区天桥南大街1号天桥艺术大A座3层
          <span>邮编：100050</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import '../../css/notice/customNoticeItem'
import Utils from '../../js/utils/utils'


export default {
  props: {
    noticeType: { type: String, default: 'acceptance' },  //通知书类型
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
        acceptance: '软件著作权登记档案查询受理通知书',
        correction: '补证通知书',
        unAcceptance: '不予办理通知书',
        receiveResult: '领取结果通知',
        grantResult: '查询结果发放通知',
      }, // title文案
      info: {
        acceptance: '根据《计算机软件登记档案查询办法》的相关规定，查询人提出的上述软件著作权登记档案查询申请中国版权保护中心予以受理。',
        correction: '经审查，上述软件著作权登记档案查询申请文件存在下列缺陷。根据 《计算机软件著作权登记档案查询办法》的相关规定，查询人应于收到本通知之日起 30 日内予以补正，逾期未补正，查询将不予办理。',
        unAcceptance: '经审查,上述软件著作权登记档案查询申请文件,因 材料不符合要求不予受理,查询内容超出查询范围，据《计算机软件著作权登记档案查询法》第十四条的规定,不予力理。',
        receiveResult: '您的作品著作权查询结果已出,请您于X个工作日后来中国版权保护中心大厅领取。',
        grantResult: '您申请的流水号为:2018R110035795的查询结果,已于2019年3月25日通过现场方式发放,领请注意核实。',
      },
      correctionList: [
        '缺陷及须补正的内容如下：',
        '1.请补交登记证书原件。',
        '2.请补交著作权人营业执照副本复印件。'
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
