<template>
    <div class="wrap">
        <p class="titles">首页>Z11作品著作权登记申请</p>
        <div class="pross">
            <progress-nav :currentPage="2"></progress-nav>
        </div>
        <div class="inp">
            <div class="name">
                <span>*</span>
                <label for="name">作品名称：</label>
                <div class="input">
                    <hd-Input v-model='opusName'></hd-Input>
                </div>
            </div>
            <div class="name">
                <span>*</span>
                <label for="types">作品类型：</label>
                <el-select v-model="opusType" placeholder="请选择">
                    <el-option
                    v-for="item in option"
                    :key="item.value"
                    :label="item.title"
                    :value="item.value"
                    >
                    <p @click="types(item)">
                        <b>{{item.title}}</b>&nbsp;&nbsp;&nbsp;{{item.label}}
                    </p>
                    </el-option>
                </el-select>
                <div class="lei">
                    <hd-Input placeholder='说明类型' v-model="opusTypeDesc"></hd-Input>
                </div>
            </div>
            <form action="" method="get" class="form"> 
               <span>*</span> <label for="nature" class="natrue">创作性质：</label>
                <div class='div'>
                    <radio :label='item.label' name='nature' v-model="opusInditeType" v-for="(item,index) in list" :key="index"> {{item.name}} </radio>
                </div>
            </form>
            <div class="ri">
                <div class="qi">
                    <span class="span">*</span>
                    <label for="types">创作完成日期：</label>
                    <el-date-picker
                        v-model="completeDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                 <div class="qi">
                    <span class="span">*</span>
                    <label for="types">创作完成地点：</label>
                    <div class="addressEdit">
                        <address-edit></address-edit>
                    </div>
                </div>
            </div>
            <form action="" method="get" class="form"> 
                <span>*</span> <label for="status" class="natrue">发表状态：</label>
                <radio label='status1' name='status' v-model="publishStatus" @change="wei"> 未发表 </radio>
                <radio label='status2' name='status' v-model="publishStatus" @change="yi"> 已发表 </radio>
            </form>
            <!-- 首次发表日期 -->
            <div class="ri" v-show='show'>
                <div class="qi">
                    <span class="span">*</span>
                    <label for="types">首次发表日期：</label>
                    <el-date-picker
                        v-model="appearDate"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </div>
                 <div class="qi">
                    <span class="span">*</span>
                    <label for="types">首次发表地点：</label>
                    <div class="addressEdit">
                        <address-edit></address-edit>
                    </div>
                </div>
            </div>
            <!-- 作品性质 -->
            <form action="" method="get" class="form"> 
               <span>*</span> <label for="works" class="natrue">作品性质：</label>
               <!--  -->
                <radio label='works1' name='works' v-model="opusNature" @change='dan'> 单个作品 </radio>
                <!-- -->
                <radio label='works2' name='works' v-model="opusNature" @change='xi'> 系列作品 </radio>
            </form>
            <!-- 最长作品字数/时长 -->
            <div class="lang" v-show='lang'>
                <div class="qi">
                    <span class="span">*</span>
                    <label for="types">最长作品字数/时长：</label>
                </div>
                <div class='right'>
                    <!-- 字 -->
                    <div class='top' v-show="text">
                        <hd-Input :width='100'></hd-Input>
                        <span>字</span> 
                    </div>
                    <!-- 时长 -->
                    <div class='bottom' v-show="time">
                        <div>
                            <hd-Input :width='50'></hd-Input>
                            <span>时</span>
                        </div>
                        <div>
                            <hd-Input :width='50'></hd-Input>
                            <span>分</span>
                        </div>
                        <div>
                            <hd-Input :width='50'></hd-Input>
                            <span>秒</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 作品样本 -->
            <div class='work' v-show="sample">
                <span class="span">*</span>
                <label for="types">作品样本：</label>
                <!-- 系列作品 -->
                <div class='xi'> 
                    <!-- 第一件 -->
                    <div class='item'>
                        <div v-if="somes">
                            <span>第1件</span>
                            <div class='xis'>
                                <hd-Input placeholder="请输入系列作品名称" v-model="attachmentName"></hd-Input>
                            </div>
                        </div> 
                        <div class='uplod'>
                            <el-upload
                                class="upload-demo"
                                :action="host "
                                multiple
                                :limit="3"
                                >
                                <hd-button width='100' height='30'>上传</hd-button>
                            </el-upload>
                        </div>
                    </div>
                    <div class="adds">
                        <hd-button v-if="somes" @click="add" width='100' height='30'>+添加作品</hd-button>
                    </div>
                </div>
            </div>
            <hd-button class='next' @click='next'>下一步</hd-button>
        </div>
    </div>
</template>
<script>
import '@css/Z11/information'
import '@share/js/utils/utils'
import api from '@api'
import tab from '@components/common/breadcrumb'
import hdButton from '@share/components/hdButton'
import hdInput from '@share/components/hdInput'
import radio from '@share/components/hdRadio'
import hdAlert from '@share/components/hdAlert'
import hdSelect from '@share/components/hdSelect'
import fileUpload from '@share/components/common/fileUpload'
import progressNav from '@components/common/registerQuery/progressNav'
import addressEdit from '@components/common/address/addressEdit'
import { API_HOST } from '@share/api/config'
export default {
    data () {
        return {
            host: API_HOST+ '/fileServer',
            opusName: '',//作品名称
            opusType: '',//作品类型
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
            value: '',
            opusTypeDesc: '', //作品类型说明
            opusInditeType: '1', //创作性质
            completeDate: '',//创作完成日期
            completeCountry: '',//创作完成国家
            completeProvince: '',// 创作完成省份
            completeCity: '',//创作完成城市
            publishStatus: 'status1', //发表状态
            appearDate: '',//首次发表日期
            appearCountry: '',//首次发表国家
            appearProvince: '',//首次发表省份
            appearCity: '',//首次发表城市
            opusNature: 'works1', //首次发表作品性质
            opusInfo: '', //最长作品字数/时长（传入字数或秒数字符串）
            attachmentName: '', //上传作品名称
            status: 'status1',  //状态
            value1: '',   //完成创作日期
            first: '',// 首次发表日期
            works: 'works1', //作品性质
            show: false,
            some: true, //单个作品
            somes: false, //系列作品
            lang: false, //最长作品字数/时长
            text: false, //字
            time: false, //时分秒
            sample: false, //作品样本
        }
    },
    components: {
        progressNav,
        hdInput,
        radio,
        hdSelect,
        hdButton,
        addressEdit
    },
    methods: {
        add () {
            // this.
        },
        types(item) {
            switch (item.value) {
                case 'A' || 'M':
                this.lang = true
                this.text = true
                break
                case 'I':
                this.text = false
                this.time = true
                break
                case 'G' || 'A':
                this.sample = true
                break
                default:
                this.lang = false
                this.text = false
                this.time = false
                this.sample = false
            }
        },
        wei() {
            this.show = false
        },
        yi() {
            this.show = true
        },
        dan() {
            this.somes = false
        },
        xi() {
            this.somes = true
        },
        // 点击下一步
        next() {
            setSession(this.getAll,'Z11')
            this.$router.push({path:'/ownership'})
            console.log(this.getAll)
        },
        handleClick() {
            alert('button click');
        },
    },
    computed: {
        getAll() {
            var date = new Date(this.completeDate);
            var time = date.getTime(date);
            let obj =new Object()
            obj.opusName = this.opusName
            obj.opusType = this.opusType
            obj.opusTypeDesc = this.opusTypeDesc
            obj.opusInditeType = this.opusInditeType
            obj.completeDate = time
            obj.completeCountry = this.completeCountry
            obj.completeProvince = this.completeProvince
            obj.completeCity = this.completeCity
            obj.publishStatus = this.publishStatus
            obj.appearDate = this.appearDate
            obj.appearCountry = this.appearCountry
            obj.appearProvince = this.appearProvince
            obj.appearCity = this.appearCity
            obj.opusNature = this.opusNature
            obj.opusInfo = this.opusInfo
            obj.attachmentName = this.attachmentName
            return obj
        },
    },
    created() {
    },
}
</script>
<style lang="scss">
</style>