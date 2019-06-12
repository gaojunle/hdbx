<template>
  <div>
    <div class="table">
      <div class="title">
        <div class="one">
          <p>受理日期：<span class="hr"></span> </p>
        </div>
        <div class="one">
          <p>作品数量：<span class="hr"></span> </p>
        </div>
        <div class="two"></div>
      </div>
      <p class="h3">作品著作权登记申请表</p>
      <div class="th">
        <div class="td-one">作品信息</div>
        <div class="top">
          <div class="name">作品名称</div>
          <div class="name-detail">1111111</div>
        </div>
        <div class="bottom">
          <div class="name">作品类别</div>
          <div class="name-detail">
            <div v-for="(item,index) in option" :key="index">
              <input type="radio" :value='item.value' name="detail">{{item.title}}
            </div>
          </div>
        </div>
      </div>

      <div class="th1">
        <div class="td-one">著作权人</div>
        <div class="name">
          <div class="top">姓名或名称</div>
          <div class="bottom"></div>
        </div>
        <div class="category">
          <div class="top">类别</div>
          <div class="bottom"></div>
        </div>
        <div class="category">
          <div class="top">证件类型</div>
          <div class="bottom"></div>
        </div>
        <div class="category">
          <div class="top">证件号码</div>
          <div class="bottom br"></div>
        </div>
        <div class="category">
          <div class="top">国籍</div>
          <div class="bottom"></div>
        </div>
        <div class="category">
          <div class="top">省份</div>
          <div class="bottom"></div>
        </div>
        <div class="category">
          <div class="top">城市</div>
          <div class="bottom"></div>
        </div>
        <div class="category" style="border-right:none">
          <div class="top">副本</div>
          <div class="bottom"></div>
        </div>
      </div>


      <div class="th2">
        <div class="td-one">作品基本信息</div>
        <div class="name">
          <div class="top">作者姓名或名称</div>
          <div class="top1"></div>
          <div class="top">作品署名</div>
          <div class="top2"></div>
        </div>
        <div class="nature-box">
          <div class="nature">作品创作性质</div>
          <div class="nature-detail">
            <div v-for="(item,index) in list" :key="index">
              <input type="radio" :value='item.label' name="nature">{{item.name}}
            </div>
          </div>
        </div>
        <div class="name">
          <div class="top">创作完成日期</div>
          <div class="top1"></div>
          <div class="top">创作完成地点</div>
          <div class="top2"></div>
        </div>

        <div class="status-box">
          <div class="status">发表状态</div>
          <div class="status-detail">
            <div class="tops">
              <input type="radio"> 已发表&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input type="radio"> 未发表
            </div>
             <div class="titles">
              <div class="n">
                <p>首次发表日期：<span></span> </p>
              </div>
              <div class="n1">
                <p>发表地点：国家：<span>中国</span> 城市：<span></span></p>
              </div>
            </div>
          </div>
        </div>

        <div class="names">
          <div class="top">作品性质</div>
          <div class="top1"></div>
          <div class="top3">（最长）作品字数/时长</div>
          <div class="top2"></div>
        </div>
      </div>

      <div class="th3">
        <div class="td-one">权利状况说明</div>
        <div class="name">
          <div class="top">权利取得方式</div>
          <div class="top1">
            <div v-for="(item,index) in obtain" :key="index">
              <input type="radio" :value='item.label' name="nature">{{item.name}}
            </div>
          </div>
          <div class="top">权利取得日期</div>
          <div class="top2"></div>
        </div>
        <div class="nature-box">
          <div class="nature">权利归属方式</div>
          <div class="nature-detail">
            <div v-for="(item,index) in personal" :key="index">
              <input type="radio" :value='item.label' name="nature">{{item.name}}
            </div>
          </div>
        </div>
        

        <div class="status-box">
          <div class="status">权力拥有状况</div>
          <div class="status-detail">
            <div>
              <input type="radio">全部
            </div>
            <br>
            <div>
              <input type="radio">部分
            </div>
            <div class="box">
              <div v-for="(item,index) in have" :key="index">
                <input type="checkbox" :value='item.label' name="detail">{{item.name}}
              </div>
            </div>
          </div>
        </div>
      
      </div>

      <div class="th4">
          <div class="name">留存作品样本</div>
          <div class="name-detail">1111111</div>
      </div>
      <div class="th4">
          <div class="name">证书领取方式</div>
          <div class="name-detail">1111111</div>
      </div>
      <div class="th5">
          <div class="name">邮寄地址</div>
          <div class="category">
            <div class="top">类别</div>
            <div class="bottom"></div>
          </div>
          <div class="category">
            <div class="top">证件类型</div>
            <div class="bottom"></div>
          </div>
          <div class="category">
            <div class="top">证件号码</div>
            <div class="bottom br"></div>
          </div>
          <div class="category" style="border-right:none">
            <div class="top">国籍</div>
            <div class="bottom"></div>
          </div>
      </div>
    </div>
    <p class="ye">第1页/共2页</p>
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
    .fls {
        display: flex;
        flex-direction: row;
        width: 300px;
    }
</style>
<script>
import '../../css/application/ApplicationFormOupsMater'

export default {
  props: ['lists'],
  data() {
    return {
      list: [
                {
                    name: '原创',
                    label: '1'
                },
                {
                    name: '改编',
                    label: '2'
                },
                {
                    name: '翻译',
                    label: '3'
                },
                {
                    name: '汇编',
                    label: '4'
                },
                {
                    name: '注释',
                    label: '5'
                },
                {
                    name: '整理',
                    label: '6'
                },
                {
                    name: '其他',
                    label: '7'
                }
            ],
            have: [
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
                    name: '保护作品完整权',
                    label: '4'
                },
                {
                    name: '复制权',
                    label: '5'
                },
                {
                    name: '发行权',
                    label: '6'
                },
                {
                    name: '出租权',
                    label: '7'
                },
                {
                    name: '展览权',
                    label: '8'
                },
                {
                    name: '表演权',
                    label: '9'
                },
                {
                    name: '放映权',
                    label: '10'
                },
                {
                    name: '广播权',
                    label: '11'
                },
                {
                    name: '信息网络传播权',
                    label: '12'
                },
                {
                    name: '摄制权',
                    label: '13'
                },
                {
                    name: '改编权',
                    label: '14'
                },
                {
                    name: '编译权',
                    label: '15'
                },
                {
                    name: '汇编权',
                    label: '16'
                },
                {
                    name: '其他',
                    label: '17'
                }
            ],
            obtain:[
                {
                    name: '原始',
                    label: '1'
                },
                {
                    name: '继承',
                    label: '2'
                },
                {
                    name: '承受',
                    label: '3'
                },
                {
                    name: '其他',
                    label: '4'
                }
            ],
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
    console.log(this.lists)
  },
}
</script>