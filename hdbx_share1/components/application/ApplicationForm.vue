<template>
  <div>
    <div class="formback">
      <div class="formheader">
        <div style="height:70px;width:100%"></div>
        <div class="formtime">
          <div class="formtime_s">
            <div style="height:20px;width:100%"></div>
            <div>
              <span>受理人 :</span>
              <input class="formtime_s_time">
            </div>
            <div style="height:36px;width:100%"></div>
            <div>
              <span>查询人 :</span>
              <input class="formtime_s_time">
            </div>
          </div>

          <div class="formtime_e">
            <div style="height:20px;width:100%"></div>
            <div>
              <span>受理日期 :</span>
              <input class="formtime_s_time">
            </div>
            <div style="height:36px;width:100%"></div>
            <div>
              <span>查询日期 :</span>
              <input class="formtime_s_time">
            </div>
          </div>

          <div class="bar_code"></div>

          <div style="clear:both"></div>
          <div class="formtime_hr"></div>
          <div class="from_title">软件著作权登记档案查询申请</div>
        </div>
        <div class="form_table">
          <table style="width:100%">
            <!-- 查询基本信息 -->
            <tr class="tr_buttom">
              <td class="form_table_000 fz400">查询基本信息</td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">查询人性质</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">&nbsp;</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">登记号</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">2018SR1000002</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">软件全称</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">软件-2</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">软件简称</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">软件简称</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">版本号</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">V1.0</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">著作权人</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">{{list.owner}}</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">权利取得方式</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">原始取得</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">查询目的</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">转让 转让</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <tr class="tr_buttom">
              <td class="form_table_td_right block_td">
                <div class="form_table_td_title">申请方式</div>
              </td>
              <td class="form_table_td_right_text block_td width696 left_th">
                <div class="form_table_td_title width696">由代理人办理</div>
              </td>
              <td style="clear:both"></td>
            </tr>
            <!-- 查询人信息 -->
            <template v-if="list.softQueryPeopleInfo.owner.length > 0">
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">查询人信息</td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">名称或姓名</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].name}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">证件号码</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].idNumber}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].contactPerson}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">传真</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">&nbsp;</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人电话</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].phone}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">E-mail</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].email}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">通信地址</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].address}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">邮编</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.owner[0].postCode}}</div>
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
            <template v-if="list.softQueryPeopleInfo.agent">
              <tr class="tr_buttom">
                <td class="form_table_000 fz400">代理人信息</td>
              </tr>

              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">名称或姓名</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.name}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">证件号码</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.idNumber}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.contactPerson}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">传真</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">&nbsp;</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">联系人电话</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.phone}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">E-mail</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.email}}</div>
                </td>
              </tr>
              <tr class="tr_buttom">
                <td class="form_table_td_right block_td">
                  <div class="form_table_td_title">通信地址</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.address}}</div>
                </td>
                <td class="form_table_td_right block_td left_th">
                  <div class="form_table_td_title">邮编</div>
                </td>
                <td class="people_text1 block_td left_th">
                  <div class="form_table_td_title">{{list.softQueryPeopleInfo.agent.postCode}}</div>
                </td>
              </tr>
            </template>

            <tr class="tr_buttom">
              <td class="form_table_000">
                <div class="wt_text">提交证明材料：1.查询申请表，2.登记证书复印件，3.查询人执照副本或身份证复印件， 4，联系人身份证复印件等。如委托代理人办理的，除上述材料外，另需提交代理人身份证明文件（执照副本）和联系人身份证 复印件。如果是复印原始档案，另需提交登记证书原件及调档说明。（以上文件均需签章）</div>
              </td>
            </tr>
            <tr class="br_no">
              <td class="form_table_000">
                <div class="wt_text">查询人认真阅读了填表说明，准确理解了所需填写的内容，保证所填写的内容真实。此申请表需在线打印，请勿擅自更改表格格式。</div>
                <div style="height:5px;width:100%"></div>
                <div>
                  <div class="chapter">查询人签章：</div>
                  <div style="clear:both"></div>
                </div>
                <div style="height:5px;width:100%"></div>
                <div>
                  <div class="chapter_time">
                    <span>年</span>
                    <input class="chapter_time_">
                    <span>月</span>
                    <input class="chapter_time_">
                    <span>日</span>
                    <input class="chapter_time_">
                  </div>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../css/application/applicationfrom'

export default {
  props: {
    list: Object,
  },
  mounted() {
  },
}
</script>