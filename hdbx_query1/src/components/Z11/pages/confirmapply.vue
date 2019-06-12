<template>
    <div class="wrap">
        <div class="inpBox ownerShipBox">
            <p class="titles">首页>Z11作品著作权登记申请</p>
        
            <div class="pross">
                <progress-nav :currentPage="2"></progress-nav>
            </div>


            <!-- 作品信息 -->
            <div class="confirmItem cf">
                <h3>作品信息</h3>

                <div class="cf cont">
                    <div class="item w50 cf fl" v-for="(item,index) in list">
                        <span class="fl">{{item.name}}：</span>
                        <div class="ovh">{{item.cont}}</div>
                    </div>
                </div>
            </div>

            <!-- 权属信息 -->
            <div class="confirmItem cf">
                <h3>权属信息</h3>

                <div class="cf cont">
                    <div class="item cf">
                        <span class="fl">著作权人：</span>
                        <div class="ovh">
                            黄洁琳 中国北京市西城区 420***********6523 13800111138000<br/>
                            徐珍珍 中国北京市西城区 110***********6345 13800222138000
                        </div>
                    </div>

                    <div class="item cf">
                        <span class="fl">作者：</span>
                        <div class="ovh">
                            黄洁琳 上善若水<br/>
                            徐珍珍 珍珍老师
                        </div>
                    </div>

                    <div class="item cf">
                        <span class="fl">权利归属方式：</span>
                        <div class="ovh">
                            合作作品<br/><img src="/static/upload/example.png" />
                        </div>
                    </div>

                    <div class="item cf">
                        <span class="fl">权利取得方式：</span>
                        <div class="ovh">
                            继承取得<br/>
                            <img src="/static/upload/example.png" />
                            <img src="/static/upload/example.png" />
                            <img src="/static/upload/example.png" />
                            <img src="/static/upload/example.png" />
                        </div>
                    </div>

                    <div class="item cf">
                        <span class="fl">权利拥有状况：</span>
                        <div class="ovh">全部</div>
                    </div>

                    <div class="item cf">
                        <span class="fl">作品说明书：</span>
                        <div class="ovh">
                            <img src="/static/upload/example.png" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 授权委托书 -->
            <div class="confirmItem cf">
                <h3>授权委托书</h3>
                <div class="cf cont">
                    <div class="item cf">
                        <span class="fl">&nbsp;</span>
                        <div class="ovh">
                            <img src="/static/upload/example.png" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="confirmItem cf">
                <h3>留存作品样本</h3>
                <div class="cf cont">
                    <div class="item cf">
                        <span class="fl"><em class="red">*</em>选择介质</span>
                        <div class="ovh">
                            <hd-radio :label='item.label' name='sampleRetentionMedium' v-model="sampleRetentionMedium" v-for="(item,index) in medium" :key="index"> {{item.name}}</hd-radio>
                        </div>
                    </div>

                    <div class="item cf">
                        <span class="fl"><em class="red">*</em>是否附图盖章</span>
                        <div class="ovh">
                            <hd-radio v-model="needStamp" label="1" :name="'needStamp'">是</hd-radio>
                            <hd-radio v-model="needStamp" label="2" :name="'needStamp'">否</hd-radio>
                        </div>
                    </div>
                </div>
            </div>

            <div class="confirmItem cf">
                <h3>登记办理方式&emsp;&emsp;<span class="red">注意：在线申请后需要递交相关材料才可以完成办理</span></h3>
                <div class="cf cont">
                    <div class="item cf">
                        <div class="ovh">
                            <hd-radio :label='item.label' name='registrationMethod' v-model="registrationMethod" v-for="(item,index) in registration" :key="index"> {{item.name}}</hd-radio>
                        </div>
                    </div>
                </div>
            </div>

            <div class="confirmItem cf">
                <h3>证书领取方式</h3>
                <div class="cf cont">
                    <div class="item cf">
                        <div class="ovh">
                            <hd-radio :label='item.label' name='certificateCollectionMethod' v-model="certificateCollectionMethod" v-for="(item,index) in collection" :key="index"> {{item.name}}</hd-radio>
                        </div>
                    </div>
                </div>
            </div>


            <hd-button class='prev' @click='prev'>上一步</hd-button>
            <hd-button class='next' @click='next'>下一步</hd-button>
        </div>
    </div>
</template>
<script>
// import '@css/Z11/common'
import '@css/Z11/confirmapply'
import progressNav from '@components/common/registerQuery/progressNav'
import hdRadio from '@share/components/hdRadio'
import hdButton from '@share/components/hdButton'
export default {
    data() {
        return {
            list: [
                {
                    name: '作品名称',
                    cont:'清透水滴中的花朵',
                    label: '1',
                },
                {
                    name: '作品类型',
                    cont:'美术作品',
                    label: '2',
                },
                {
                    name: '创作性质',
                    cont:'原创',
                    label: '3',
                },
                {
                    name: '创作方式',
                    cont:'合作创作',
                    label: '4',
                },
                {
                    name: '发表状态',
                    cont:'已发表',
                    label: '5',
                },
                {
                    name: '作品性质',
                    cont:'系列作品',
                    label: '6',
                },
                {
                    name: '创作日期',
                    cont:'2016/06/01',
                    label: '7',
                },
                {
                    name: '创作完成地点',
                    cont:'中国 北京 北京',
                    label: '8',
                },
                {
                    name: '首次发表日期',
                    cont:'2017/06/05',
                    label: '9',
                },
                {
                    name: '首次发表地点',
                    cont:'中国 北京 北京',
                    label: '10',
                },
                {
                    name: '作品样本',
                    cont:'太行山行摄 舌尖',
                    label: '11',
                }

            ],

            medium: [
                {
                    name: '光盘',
                    label: '1',
                },
                {
                    name: 'A4纸',
                    label: '2',
                },
            ],

            collection:[
                {
                    name:'登记大厅自取',
                    label:'1',
                },
                {
                    name:'EMS到付',
                    label:'2',
                },
                {
                    name:'挂号信',
                    label:'3',
                },
                {
                    name:'中国版权保护中心版权登记大厅（天桥） 地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层',
                    label:'4',
                },
            ],

            registration:[
                {
                    name:'登记大厅现场办理',
                    label:'1',
                },
                {
                    name:'邮寄到中国版权保护中心办理',
                    label:'2',
                },
                {
                    name:'中国版权保护中心版权登记大厅（天桥） 地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层',
                    label:'3',
                },
            ],


            sampleRetentionMedium:'1',
            needStamp:'1',
            registrationMethod:'1',
            certificateCollectionMethod:'1',
        }
    },
    methods: {
       

        next() {
            setSession(this.getAll,'Z11')
            this.$router.push({path:'/submaterial'})
            console.log(this.getAll)
        },

        prev() {
            setSession(this.getAll,'Z11')
            this.$router.push({path:'/ownership'})
            console.log(this.getAll)
        },
    },
    components: {
        progressNav,
        hdRadio,
        hdButton,
    }
}
</script>
