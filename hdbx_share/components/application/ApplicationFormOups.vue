<template>
  <div>
    <div class="formback">
      <div class="formheader">
        <div class="formtime">
          <div class="formtime_hr"></div>
          <div class="from_title">著作权登记档案查询申请表</div>
        </div>
        <div class="form_table">
          <table style="width:100%">
            <!-- 查询基本信息 -->
            <tr class="tr_buttom">
              <td class="form_table_000 fz400">查询基本信息</td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">查询目的</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696 fls">
                    <div>
                        <input type="checkbox" name="a" id=""> 合同备案
                    </div>
                     <div>
                        <input type="checkbox" name="a" id=""> 质权登记
                    </div>
                     <div>
                        <input type="checkbox" name="a" id=""> 质权注销
                    </div>
                     <div>
                        <input type="checkbox" name="a" id=""> 变更
                    </div>
                     <div>
                        <input type="checkbox" name="a" id=""> 撤销
                    </div>
                    <div>
                        <input type="checkbox" name="a" id=""> 补换发
                    </div>
                    <div>
                        <input type="checkbox" name="a" id=""> 公司上市
                    </div>
                    <div>
                        <input type="checkbox" name="a" id=""> 司法或行政管理机关
                    </div>
                </div>
              </td>
              <td style="clear:both"></td>
            </tr>
           
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">查询人身份</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                  <div class="form_table_td_title width696">{{list.applyIdentity}}</div>
              </td>
              <td style="clear:both"></td>
            </tr>
           
            <!-- 查询人信息 -->
             <template >
                <!-- v-if="list.softQueryPeopleInfo.agent" -->
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">查询人信息</td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">名称或姓名</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title" v-for="(item,index) in list.opusInfo" :key="index">{{item.opusName}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">联系人电话</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.phone}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">证件类型</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.idType}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">传真</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.fax}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">证件号码</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.idNumber}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">E-mail</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.email}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.contractPerson}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">邮编</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.applyPeople.postcode}}</div>
                </td>
              </tr>
               <tr class="tr_buttom">
                    <td class="form_table_td_right block_td">
                        <div class="form_table_td_title">联系地址</div>
                    </td>
                    <td class="people_text1 block_td left_th">
                        <div class="form_table_td_title">{{list.applyPeople.address}}</div>
                    </td>
                </tr>
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">代理委托信息</td>
              </tr>

              <tr class="tr_buttom">
                <td class="form_table_000">
                  <div>查询人委托下述代理人办理登记事宜，具体委托事项如下：</div>
                  <div class="wt_text">委托 张三全权负责本软件著作权登记档案查询的相关事宜，授权期限： 20191231</div>
                </td>
              </tr>
            </template>
            <!-- 代理人信息 -->
            <template >
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">代理人信息</td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">姓名或名称</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title" v-for="(item,index) in list.opusInfo" :key="index">{{item.opusName}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">联系人电话</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.phone}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">证件类型</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.idType}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">传真</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.fax}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">证件号码</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.idNumber}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">E-mail</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.email}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.contractPerson}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">邮编</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.agentPeople.postcode}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                  <td class="form_table_td_right block_td">
                      <div class="form_table_td_title">联系地址</div>
                  </td>
                  <td class="people_text1 block_td left_th">
                      <div class="form_table_td_title">{{list.agentPeople.address}}</div>
                  </td>
              </tr>
            </template>
              <!-- 查询作品信息 -->
             <template >
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">查询作品信息</td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">序号</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">作品名称</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">登记号</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">著作权人</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title"></div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">&nbsp;</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">&nbsp;</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">&nbsp;</div>
                </td>
              </tr>
             
            </template>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
    .fls {
        display: flex;
        flex-direction: row;
        width: 300px;
        
    }
</style>
<script>
import '../../css/application/applicationfromOups'

export default {
  props: {
    list: Object,
  },
  mounted() {
  },
}
</script>