<template>
  <div class="results" v-if="queryData">
    <div class="results-div"></div>
    <p class="results-title">软件著作权登记概况查询结果</p>
    <p class="results-text">检索登记期间：2018年9月21日至2019年4月2日</p>

    <div class="results-table">
      <table class="results-table-tables">
        <tr>
          <td rowspan="2">
            <div class="vertical">
              软
              <br>件
              <br>名
              <br>称
              <br>
            </div>
          </td>
          <td>
            <div class="width360">
              <div class="results-table-tables-95">软件全称</div>
            </div>
          </td>
          <td>
            <div class="width330">
              <div class="results-table-tables-95">简称</div>
            </div>
          </td>
          <td>
            <div class="width70">
              <div class="results-table-tables-95">版本号</div>
            </div>
          </td>
        </tr>
        <tr v-for="item in queryData.regInfo">
          <td>
            <div class="width360">
              <div class="results-table-tables-95" v-text="item.softFullName"></div>
            </div>
          </td>
          <td>
            <div class="width330">
              <div class="results-table-tables-95" v-text="item.softShortName"></div>
            </div>
          </td>
          <td>
            <div class="width70">
              <div class="results-table-tables-95" v-text="item.version"></div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">软件著作权登记概况</div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">软件著作权人</div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">权利取得方式</div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">登记号</div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">登记日</div>
            </div>
          </td>
        </tr>

        <tr v-for="regInfo in queryData.regInfo">
          <td>
            <div class="width200">
              <div class="results-table-tables-95">
                <span v-for="(item,index) of regInfo.crOwner" :key="index">{{item}}，</span>
              </div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95" v-text="regInfo.rightObtainMode"></div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95" v-text="regInfo.registerNumber"></div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">{{regInfo.completeDate | formatDate}}</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804 bottom-border">
        <div class="results-table-tables-95">有大量相似软件登记信息；</div>
      </div>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">软件著作权合同登记概况</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.contractRegInfo[0].registerNumber">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.contractRegInfo[0].registerNumber">
            <span class="fl">&nbsp;有</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width300">
              <div class="results-table-tables-95">登记号</div>
            </div>
          </td>
          <td>
            <div class="width500">
              <div class="results-table-tables-95">合同类别（转让或专有许可）</div>
            </div>
          </td>
          <!-- <td>
             <div class="width200">
               <div class="results-table-tables-95">
                 登记日
               </div>
             </div>
          </td>-->
        </tr>

        <tr v-for="item in queryData.contractRegInfo">
          <td>
            <div class="width300">
              <div class="results-table-tables-95" v-text="item.registerNumber"></div>
            </div>
          </td>
          <td>
            <div class="width500">
              <div class="results-table-tables-95" v-text="item.type"></div>
            </div>
          </td>
          <!-- <td>
             <div class="width200">
               <div class="results-table-tables-95">
                 {{queryData.contractRegInfo[0].registerDate | formatDate}}
               </div>
             </div>
          </td>-->
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">变更或补充登记概况</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.changeInfo[0].items">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.changeInfo[0].items">
            <span class="fl">&nbsp;有</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width150">
              <div class="results-table-tables-95">变更或补充事项</div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95">变更或补充前</div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95">变更或补充后</div>
            </div>
          </td>
          <td>
            <div class="width150">
              <div class="results-table-tables-95">登记日</div>
            </div>
          </td>
        </tr>

        <tr v-for="item in queryData.changeInfo">
          <td>
            <div class="width150">
              <div class="results-table-tables-95" v-text="item.items"></div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95" v-text="item.beforeContent"></div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95" v-text="item.afterContent"></div>
            </div>
          </td>
          <td>
            <div class="width150">
              <div class="results-table-tables-95">{{item.completeDate | formatDate}}</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">软件著作权质权登记概况</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.impawnInfo[0].impawnFrom">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.impawnInfo[0].impawnFrom">
            <span class="fl">&nbsp;有</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width160">
              <div class="results-table-tables-95">出质人</div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95">质权人</div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95">出质权利</div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95">主债务履行期限</div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95">登记号</div>
            </div>
          </td>
        </tr>

        <tr v-for="item in queryData.impawnInfo">
          <td>
            <div class="width160">
              <div class="results-table-tables-95" v-text="item.impawnFrom"></div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95" v-text="item.impawnTo"></div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95" v-text="item.impawnRight"></div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95" v-html="dateSection(item.startDate, item.endDate)"></div>
            </div>
          </td>
          <td>
            <div class="width160">
              <div class="results-table-tables-95" v-text="item.serialNumber"></div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">软件著作权质权登记概况</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.revocationInfo.reason">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.revocationInfo.reason">
            <span class="fl">&nbsp;有&nbsp;&nbsp;</span>
            <span class="fl">（</span>
            <input type="checkbox" class="top3 fl" disabled="true">
            <span class="fl">自行撤销 &nbsp;</span>
            <input type="checkbox" class="top3 fl" disabled="true">
            <span class="fl">利害关系人）</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">撤销依据或理由</div>
            </div>
          </td>
          <td>
            <div class="width400">
              <div class="results-table-tables-95">{{queryData.revocationInfo.reason}}/{{queryData.revocationInfo.completeDate | formatDate}}</div>
            </div>
          </td>
          <td>
            <div class="width200">
              <div class="results-table-tables-95">撤销登记日</div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">法院查封概况</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.sealupInfo.reason">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.sealupInfo.reason">
            <span class="fl">&nbsp;有</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width150">
              <div class="results-table-tables-95">查封依据</div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95" v-text="queryData.sealupInfo.reason"></div>
            </div>
          </td>
          <td>
            <div class="width150">
              <div class="results-table-tables-95">查封期限</div>
            </div>
          </td>
          <td>
            <div class="width250">
              <div class="results-table-tables-95" v-html="dateSection(queryData.sealupInfo.startDate, queryData.sealupInfo.endDate)"></div>
            </div>
          </td>
        </tr>
      </table>

      <div class="status-left-right width804">
        <div class="results-table-tables-95">
          <div class="fl">法院查调档案或有权属争议</div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="!queryData.disputeInfo.summary">
            <span class="fl">&nbsp;无</span>
            <div style="clear:both"></div>
          </div>
          <div class="fl left-150">
            <input type="checkbox" class="top3 fl" disabled="true" :checked="queryData.disputeInfo.summary">
            <span class="fl">&nbsp;有</span>
            <div style="clear:both"></div>
          </div>
          <div style="clear:both"></div>
        </div>
      </div>

      <table class="results-table-tables">
        <tr>
          <td>
            <div class="width400">
              <div class="results-table-tables-95">存在权属争议简况</div>
            </div>
          </td>
          <td>
            <div class="width400">
              <div class="results-table-tables-95">查调档案日期</div>
            </div>
          </td>
        </tr>
        <tr>
          <td>
            <div class="width400">
              <div class="results-table-tables-95" v-text="queryData.disputeInfo.summary"></div>
            </div>
          </td>
          <td>
            <div class="width400">
              <div class="results-table-tables-95">{{queryData.disputeInfo.transferDate | formatDate}}</div>
            </div>
          </td>
        </tr>
      </table>
    </div>

    <div style="height:110px;width:100%"></div>
  </div>
</template>

<script>
import '../../css/queryresults/queryresultstable'
import Utils from '../../js/utils/utils'
export default {
  name: 'QueryResultsTable',
  props: {
    queryData: {
      type: Object,
      default: null
    },
  },
  methods: {
      /**
     * 获得时间区间
     * @param start 开始时间
     * @param end 结束时间
     */
      dateSection(start, end) {
        return Utils.formatDateTime(start) + '-' + Utils.formatDateTime(end)
      },
    },
}
</script>

<style lang="css" scoped>
.fl {
  float: left;
}
.vertical {
  text-align: center;
  width: 40px;
}
.results-table-tables-95 {
  width: 95%;
  margin: 0 auto;
}
.width70 {
  width: 70px;
}
.width150 {
  width: 150px;
}
.width160 {
  width: 160px;
}
.width200 {
  width: 200px;
}
.width250 {
  width: 250px;
}
.width300 {
  width: 300px;
}
.width330 {
  width: 330px;
}
.width360 {
  width: 360px;
}
.width400 {
  width: 400px;
}
.width500 {
  width: 500px;
}
.bottom-border {
  border-bottom: 1px solid #878787;
}
.top3 {
  margin-top: 3px;
}
.left-150 {
  margin-left: 150px;
}
</style>
