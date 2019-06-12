<template>
  <div>
    <div class="table-one">
      <div class="title">
        <div class="one">
          <p>受理号：<span class="hr"></span> </p>
        </div>
        <div class="one">
          <p>受理签字：<span class="hr"></span> </p>
        </div>
        <div class="one">
          <p>登记号：<span class="hr"></span> </p>
        </div>
        <div class="one">
          <p>申请签字：<span class="hr"></span> </p>
        </div>
        <div class="two"></div>
      </div>
      <p class="h3">计算机软件著作权登记申请表</p>
      <div class="th">
          <div class="td-one">软件基本信息</div>
          <div class="name">
            <div class="top">软件全称</div>
            <div class="top1">{{resultData.softFullName}}</div>
            <div class="top">版本号</div>
            <div class="top2">{{resultData.version}}</div>
          </div>
          <div class="short-box">
            <div class="short">软件简称</div>
            <div class="short-detail">{{resultData.softShortName}}</div>
          </div>

          <div class="status-box">
            <div class="status">软件作品说明</div>
            <div class="status-detail">
              <div class="tops">
                <input type="radio" name="original" v-model="resultData.developCharactor" value="1"> 原创&nbsp;&nbsp;&nbsp;
                <input type="radio" name="original" v-model="resultData.developCharactor" value="2"> 修改
                （含翻译软件、合成软件）
              </div>
              <div class="description">
                  <div>
                    <input type="checkbox" v-model="resultData.developRewriteExplain"> 修改软件须经原权利人授权
                  </div>
                  <p style="clear: both;"></p>
                  <div>
                      <input type="checkbox" v-model="resultData.developRewriteExplain"> 原有软件已经登记
                  </div>
                  <p style="clear: both;"></p>
                  <div>
                    <b>·</b> 原登记号：{{resultData.oriRegisterNum}}
                  </div>
                  <p style="clear: both;"></p>
                  <div>
                    <b>·</b> 修改（翻译或合成）软件作品说明：
                    {{resultData.oriSoftModifiedDescription}}
                  </div>
              </div>
            </div>
          </div>

      </div>
      <div class="date-box">
          <div class="date">开发完成日期</div>
          <div class="date-detail">{{resultData.completeDate}}</div>
      </div>
      <div class="publish-box">
          <div class="date">发表状态</div>
          <div class="date-detail">
              <div>
                  <input type="radio" v-model="resultData.publishStatus" value="1"> 已发表
              </div>
              <p style="clear: both;"></p>
              <div class="first-date">
                  <p>首次发表日期：<span class="hr">{{resultData.firstAppearDate}}</span> </p>
              </div>
              <p style="clear: both;"></p>
            <div class="first-date">
                  <p>首次发表地点：<span class="hr" style="width:300px">{{resultData.firstAppearCountry}}&nbsp;&nbsp;{{resultData.firstAppearProvince	}}&nbsp;&nbsp;{{resultData.firstAppearCity}}</span> </p>
              </div>
              <p style="clear: both;"></p>
              <div>
                  <input type="radio" v-model="resultData.publishStatus" value="0"> 未发表
              </div>
          </div>
      </div>
      <div class="date-box">
          <div class="date">开发方式</div>
          <div class="date-detail">
              <div v-for="(item,index) in way" :key="index" style="margin-right: 5px;">
                <input type="radio" :value='item.label' name="way">{{item.name}}
              </div>
          </div>
      </div>
      <div class="th1">
        <div class="td-one">著作权人</div>
        <div class="td-box">
          <div class="detail-title">
            <div class="detail-name">姓名或名称</div>
            <div class="item">类别</div>
            <div class="item">证件类型</div>
            <div class="item">证件号码</div>
            <div class="item">国籍</div>
            <div class="item">省份/城市</div>
            <div class="item" style="border:none">园区</div>
          </div>
          <div class="detail" v-for="(item,index) in resultData.ownerList" :key="index">
            <div class="detail-name">{{item.name}}</div>
            <div class="item">{{item.ownerType}}</div>
            <div class="item">{{item.idType}}</div>
            <div class="item">{{item.idNumber}}</div>
            <div class="item">{{item.country}}</div>
            <div class="item">{{item.province}}省 {{item.city}}市</div>
            <div class="item" style="border:none">{{item.park}}</div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
        </div>
      </div>
    </div>

    <p class="ye">第1页/共4页</p>

    <div class="table-two">
      <div class="th">
          <div class="td-one">权利说明</div>
          <div class="acquisition-box">
            <div class="status">权利取得方式</div>
            <div class="status-detail">
              <div class="top">
                <input type="radio" name="original" v-model="resultData.rightObtainMode" value="1"> 原始取得
              </div>
              <div class="top">
                <input type="radio" name="original" v-model="resultData.rightObtainMode" value="21"> 继承取得
                （<input type="radio" name="original" v-model="resultData.rightObtainMode" value="22"> 受让
                <input type="radio" name="original" v-model="resultData.rightObtainMode" value="23"> 承受
                <input type="radio" name="original" v-model="resultData.rightObtainMode" value="21"> 继承）
              </div>
              <div class="description">
                  <div>
                    <input type="checkbox" v-model="resultData.developRewriteExplain"> 该软件已登记（原登记号：<span>{{resultData.inheritanceSoftRegNum}}</span> ）
                  </div>
                  <p style="clear: both;"></p>
                  <div>
                      <input type="checkbox" v-model="resultData.developRewriteExplain"> 原登记做过变更或补充（变更或补充证明编号：<span>{{resultData.inheritanceSoftChangeNum}}</span> ）
                  </div>
                  
              </div>
            </div>
          </div>

          <div class="scope-box">
            <div class="status">权利范围</div>
            <div class="status-detail">
              <div class="top">
                <input type="radio" name="original" v-model="resultData.rightScope" value="1"> 全部
              </div>
              <div class="tops">
                <div style="margin-right: 20px;"> 
                  <input type="radio" name="original" v-model="resultData.rightScope" value="2" > 部分
                </div>
                
                <div v-for="(item,index) in section" :key="index">
                    <input type="checkbox" name="original" v-model="resultData.rightObtainMode" value="22"> {{item.name}}
                </div>
                
              </div>

            </div>
          </div>

      </div>
      <div class="date-box">
          <div class="date">开发完成日期</div>
          <div class="date-detail">{{resultData.completeDate}}</div>
      </div>
      <div class="publish-box">
          <div class="date">发表状态</div>
          <div class="date-detail">
              <div>
                  <input type="radio" v-model="resultData.publishStatus" value="1"> 已发表
              </div>
              <p style="clear: both;"></p>
              <div class="first-date">
                  <p>首次发表日期：<span class="hr">{{resultData.firstAppearDate}}</span> </p>
              </div>
              <p style="clear: both;"></p>
            <div class="first-date">
                  <p>首次发表地点：<span class="hr" style="width:300px">{{resultData.firstAppearCountry}}&nbsp;&nbsp;{{resultData.firstAppearProvince	}}&nbsp;&nbsp;{{resultData.firstAppearCity}}</span> </p>
              </div>
              <p style="clear: both;"></p>
              <div>
                  <input type="radio" v-model="resultData.publishStatus" value="0"> 未发表
              </div>
          </div>
      </div>
      <div class="date-box">
          <div class="date">开发方式</div>
          <div class="date-detail">
              <div v-for="(item,index) in way" :key="index" style="margin-right: 5px;">
                <input type="radio" :value='item.label' name="way">{{item.name}}
              </div>
          </div>
      </div>
      <div class="th1">
        <div class="td-one">著作权人</div>
        <div class="td-box">
          <div class="detail-title">
            <div class="detail-name">姓名或名称</div>
            <div class="item">类别</div>
            <div class="item">证件类型</div>
            <div class="item">证件号码</div>
            <div class="item">国籍</div>
            <div class="item">省份/城市</div>
            <div class="item" style="border:none">园区</div>
          </div>
          <div class="detail" v-for="(item,index) in resultData.ownerList" :key="index">
            <div class="detail-name">{{item.name}}</div>
            <div class="item">{{item.ownerType}}</div>
            <div class="item">{{item.idType}}</div>
            <div class="item">{{item.idNumber}}</div>
            <div class="item">{{item.country}}</div>
            <div class="item">{{item.province}}省 {{item.city}}市</div>
            <div class="item" style="border:none">{{item.park}}</div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
          <div class="detail">
            <div class="detail-name"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item" style="border:none"></div>
          </div>
        </div>
      </div>
    </div>









    <div class="table1">
      <div class="th6">
          <div class="name">申请办理方式</div>
          <div class="name-detail">1111111</div>
      </div>
      <div class="th3">
        <div class="td-one">申请人</div>
        <div class="name">
          <div class="top">姓名或名称</div>
          <div class="top1"></div>
          <div class="top">联系电话</div>
          <div class="top2"></div>
        </div>
        <div class="name" style="border:none">
          <div class="top">联系人</div>
          <div class="top1"></div>
          <div class="top">E-mail</div>
          <div class="top2"></div>
        </div>
      </div>

      <div class="th4">
        <div class="td-one">代理人</div>
        <div class="zi">11</div>
        <div class="name">
          <div class="top">姓名或名称</div>
          <div class="top1"></div>
          <div class="top">联系电话</div>
          <div class="top2"></div>
        </div>
        <div class="name" style="border:none">
          <div class="top">联系人</div>
          <div class="top1"></div>
          <div class="top">E-mail</div>
          <div class="top2"></div>
        </div>
      </div>

      <div class="th2">
        <div class="td-one">提交材料清单</div>
        
        <div class="nature-box">
          <div class="nature">材料名称</div>
          <div class="nature-detail">要求</div>
        </div>

        <div class="nature-box">
          <div class="nature">作品著作权登记申请表</div>
          <div class="nature-detail"></div>
        </div>

        <div class="nature-box">
          <div class="nature">作品样本</div>
          <div class="nature-detail"></div>
        </div>

        <div class="nature-box">
          <div class="nature">作品说明书</div>
          <div class="nature-detail"></div>
        </div>

        <div class="nature-box">
          <div class="nature">申请者身份证证明</div>
          <div class="nature-detail"></div>
        </div>

        <div class="nature-box" style="border:none">
          <div class="nature">代理授权委托书</div>
          <div class="nature-detail"></div>
        </div>
        
      </div>

      <div class="signature">
        <p>申请人认真阅读了填表说明，准确理解了所需填写的内容，保证所填写的内容真实。</p>
        <p class="zhu">著作权人签章：</p>
        <p class="data">2019年5月10日</p>
      </div>

    </div>
    
  </div>
</template>
<style lang="scss">
   
</style>
<script>
import '../../css/application/ApplicationFormSoftware'

export default {
    props: {
        resultData: {
            type: Object,
            default: () =>({})
        }
    },
  data() {
    return {
      section: [
        {
            name: '发表权',
            label: '1'
        },
        {
            name: '署名权',
            label: '2'
        },
        {
            name: '修改权',
            label: '3'
        },
        {
            name: '复制权',
            label: '4'
        },
        {
            name: '发行权',
            label: '5'
        },
        {
            name: '出租权',
            label: '6'
        },
        {
            name: '修改信息网络传播权权',
            label: '7'
        },
        {
            name: '翻译权',
            label: '8'
        },
        {
            name: '应当由著作权人享有的其他权利',
            label: '9'
        }
      ],
        way: [
            {
                name: '独立开发',
                label: '1'
            },
            {
                name: '合作开发',
                label: '2'
            },
            {
                name: '委托开发',
                label: '3'
            },
            {
                name: '下达任务开发',
                label: '4'
            }
        ], //开发方式
            personal: [
              {
                    name: '个人作品',
                    label: '1'
                },
                {
                    name: '合作作品',
                    label: '2'
                },
                {
                    name: '法人作品',
                    label: '3'
                },
                {
                    name: '职务作品',
                    label: '4'
                },
                {
                    name: '委托作品',
                    label: '5'
                }
            ],
       option: [{
                label: '插画、绘画、油画、雕塑等',
                title: '美术作品',
                value: 'F'
            }, {
                label: '人像摄影、记录摄影、艺术摄影、全息摄影、全景摄影、商业摄影等',
                title: '摄影作品',
                value: 'G'
            }, {
                label: '小说、论文、剧本、商业计划书、歌词等',
                title: '文字作品',
                value: 'A'
            }, {
                label: '小说、论文、剧本、商业计划书、歌词等',
                title: '口述作品',
                value: 'M'
            }, {
                label: '歌曲、器乐等',
                title: '音乐作品',
                value: 'B'
            }, {
                label: '话居、歌剧、地方戏剧、广播剧等',
                title: '戏剧作品',
                value: 'C'
            }, {
                label: '柔术、顶碗、走钢丝、变戏法、舞狮子、车技等',
                title: '杂技艺术',
                value: 'N'
            }, {
                label: '现代舞、民族舞、中国古典舞、爵士舞、肚皮舞、钢管舞等',
                title: '舞蹈作品',
                value: 'E'
            }, {
                label: '相声、大鼓、快书、评书等',
                title: '曲艺作品',
                value: 'D'
            }, {
                label: '平面模型、2D模型、3D模型等',
                title: '模型作品',
                value: 'P'
            }, {
                label: '民用建筑、工业建筑、农业建筑等',
                title: '建筑作品',
                value: 'O'
            }, {
                label: '平面设计图、立面图、剖面图、施工图、工业设计图纸、服装设计图纸等',
                title: '工程设计图、产品设计图',
                value: 'J'
            }, {
                label: '地图、桌面图、立体图等',
                title: '地图、示意图',
                value: 'K'
            }, {
                label: '记录电影、动画电影、动作电影、科幻电影、悬疑电影等',
                title: '电影作品',
                value: 'H'
            }, {
                label: '短片、录像、短视频等',
                title: '以类似摄制电影的方法创作的作品',
                value: 'I'
            }, {
                label: '法律、行政法规规定的其他作品',
                title: '其他作品',
                value: 'L'
            }
            ],
    }
  },
  mounted() {
  },
}
</script>