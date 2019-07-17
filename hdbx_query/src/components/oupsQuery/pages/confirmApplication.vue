<template>
    <div class="step step_3">
        <div class="f_box">
            <div class="info-title">作品信息</div>
            <div class="info-cont">
                <el-row>
                    <el-col :span="12">
                        <span class="label">作品名称：</span>
                        <span class="text">{{sdata.opusName}}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">作品类型：</span>
                        <span class="text">{{formatOptionData('options_opusType',sdata.opusType)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span class="label">创作性质：</span>
                        <span class="text">{{formatOptionData('options_opusInditeType',sdata.opusInditeType)}}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">创作方式：</span>
                        <span class="text">{{formatOptionData('options_rightOwnType',sdata.rightOwnType)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span class="label">发表状态：</span>
                        <span class="text">{{formatOptionData('options_publishStatus',sdata.publishStatus)}}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">作品性质：</span>
                        <span class="text">{{formatOptionData('options_opusNature',sdata.opusNature)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span class="label">创作日期：</span>
                        <span class="text">{{sdata.completeDate}}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">创作完成地点：</span>

                        <span class="text">{{sdata.completeCountry+formatNull(sdata.completeProvince)+formatNull(sdata.completeCity)}}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span class="label">首次发表日期：</span>
                        <span class="text">{{sdata.appearDate}}</span>
                    </el-col>
                    <el-col :span="12">
                        <span class="label">首次发表地点：</span>
                        <span class="text">{{sdata.appearCountry+formatNull(sdata.appearProvince)+formatNull(sdata.appearCity)}}</span>
                    </el-col>
                </el-row>
                <el-row class="sample flex-info" v-if="sdata.attachments.length>0 && sdata.attachments[0].attachmentList>0">
                    <span class="label">作品样本：</span>
                    <div class="sample-cont flex-1">
                        <div class="samples_multi" v-if="sdata.opusNature==1">
                            <div class="sample_list" style="padding: 0px;" v-if="idx%3==0"
                                 v-for="(_item,idx) in sdata.attachments[0].attachmentList">
                                <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                     v-for="(ufile,i) in sdata.attachments[0].attachmentList">
                                    <el-link type="primary" :href="ufile.path" target="_blank">
                                        {{ufile.attachmentName}}
                                    </el-link>
                                </div>
                            </div>
                        </div>
                        <div class="samples_multi" v-if="sdata.opusNature==2">
                            <div class="ibox" v-for="(item,index) in sdata.attachments">
                                <div class="multi-info">
                                    <span>第 {{index+1}} 件</span>
                                    <div>{{item.segmentName}}</div>
                                </div>
                                <div class="sample_list" v-if="idx%3==0"
                                     v-for="(_item,idx) in item.attachmentList">
                                    <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                         v-for="(ufile,i) in item.attachmentList">
                                        <el-link type="primary" :href="ufile.path" target="_blank">
                                            {{ufile.attachmentName}}
                                        </el-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-row>
            </div>
        </div>
        <div class="f_box">
            <div class="info-title">权属信息</div>
            <div class="info-cont">
                <el-row>
                    <el-col :span="3">
                        <span class="label">著作权人：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box" v-for="(item,idx) in sdata.owners">
                            <div class="owner-title">第 {{idx+1}} 位</div>
                            <div class="owner-info">
                                <div class="item">
                                    <p>{{formatOptionData('options_peopleKind',item.peopleKind)}}</p>
                                    <p>{{item.country}}</p>
                                    <p>{{formatOptionData('options_idType_all',item.idType)}}</p>
                                    <p>手机号码</p>
                                </div>
                                <div class="item">
                                    <p>{{item.name}}</p>
                                    <p>{{(item.province?item.province:'') + formatNull(item.city)}}</p>
                                    <p>{{item.idNumber}}</p>
                                    <p>{{item.mobile}}</p>
                                </div>
                                <div class="item card">
                                    <p v-if="item.cardFront"><img :src="item.cardFront" alt=""></p>
                                    <p v-if="item.cardBack"><img :src="item.cardBack" alt=""></p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span class="label">作者：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box" v-for="(item,idx) in sdata.authors">
                            <div class="owner-info">
                                <div class="item">
                                    <p>{{item.name}}</p>
                                </div>
                                <div class="item">
                                    <p>{{item.signature}}</p>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span class="label">权利归属方式：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box">
                            <div class="owner-info">
                                <div class="item" style="width: 100%">
                                    <p>{{formatOptionData('options_rightOwnType',sdata.rightOwnType)}}</p>
                                    <img class="up_img" :src="sdata.rightOwnTypeAttachment.path"
                                         alt="">
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span class="label">权利取得方式：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box">
                            <div class="owner-info">
                                <div class="item" style="width: 100%">
                                    <p>{{formatOptionData('options_obtainType',sdata.obtainType)}}</p>
                                    <div class="img-list">
                                        <img v-for="(item,idx) in sdata.obtainTypeAttachment" class="up_img"
                                             :src="item.path" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span class="label">权利拥有状况：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box">
                            <div class="owner-info">
                                <div class="item">
                                    <p>{{formatOptionData('options_rightScope',sdata.rightScope)}}</p>
                                    <div class="info-list">
                                               <span class="radio-text" v-for="(item,idx) in sdata.rightScopePart">
                                                    {{formatOptionData('options_rightScopePart',item)}}
                                                </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="3">
                        <span class="label">作品说明书：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box">
                            <div class="owner-info">
                                <div class="item">
                                    <img class="up_img" :src="sdata.opusDescriptionAttachment.path" alt="">
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-if="sdata.applyType=='2'">
                    <el-col :span="3">
                        <span class="label">授权委托书：</span>
                    </el-col>
                    <el-col :span="21">
                        <div class="owner-box">
                            <div class="owner-info">
                                <div class="item">
                                    <img class="up_img" :src="sdata.authAttachment.path" alt="">
                                </div>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="f_box sampleRetention">
            <div class="info-title">留存作品样本：</div>
            <el-row>
                <el-col :span="3">
                    <span class="label"><span class="tip">*</span>选择介质：</span>
                </el-col>
                <el-col :span="21">
                    <el-radio-group :disabled="isDisabled('sampleRetentionMedium')"
                                    v-model="sdata.sampleRetentionMedium">
                        <el-radio-button v-for="(item,idx) in options.options_sampleRetentionMedium"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
            <el-row style="padding-top: 20px">
                <el-col :span="3">
                    <span class="label"><span class="tip">*</span>是否附图盖章：</span>
                </el-col>
                <el-col :span="21">
                    <el-radio-group :disabled="isDisabled('needStamp')"
                                    v-model="sdata.needStamp">
                        <el-radio-button v-for="(item,idx) in options.options_needStamp"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row>
        </div>
        <div class="f_box sampleRetention">
            <div class="info-title">登记办理方式： <span class="tip">注意：在线申请后需要递交相关材料才可以完成办理</span></div>

            <el-radio-group :disabled="isDisabled('registrationMethod')"
                            v-model="sdata.registrationMethod" class="big">
                <el-radio-button v-for="(item,idx) in options.options_registrationMethod"
                                 :key="item.val"
                                 :label="item.val">
                    {{item.text}}
                </el-radio-button>
            </el-radio-group>

            <el-row>
                <WaysBox v-show="sdata.registrationMethod == 'TQ'"></WaysBox>
                <AddressBox v-show="sdata.registrationMethod == 'MAIL'"></AddressBox>
            </el-row>
        </div>
        <div class="f_box sampleRetention">
            <div class="info-title">证书领取方式：</div>

            <el-radio-group :disabled="isDisabled('certificateCollectionMethod')"
                            v-model="sdata.certificateCollectionMethod" class="big">
                <el-radio-button v-for="(item,idx) in options.options_certificateCollectionMethod"
                                 :key="item.val"
                                 :label="item.val">
                    {{item.text}}
                </el-radio-button>
            </el-radio-group>
            <WaysBox v-show="sdata.certificateCollectionMethod == 'TQ'"></WaysBox>
            <AddressBox
                    v-show="sdata.certificateCollectionMethod == 'MAIL'||sdata.certificateCollectionMethod == 'EMS'"></AddressBox>
        </div>
        <div class="step-btns big">
            <el-button @click="stepPrev($route.params.step)" class="big">上一步</el-button>
            <el-button type="primary" @click="stepNext($route.params.step)" class="big">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import '../components/index.less'
    import options from '../store/options'
    import store from '../store/index'
    import myMixin from '../store/mixin'
    import LoadMore from '../components/LoadMore'
    import WaysBox from '../components/WaysBox'
    import AddressBox from '../components/AddressBox'

    export default {
        components: {LoadMore, WaysBox, AddressBox},
        mixins: [myMixin],
        filters: {},
        data() {
            return {}
        },

        methods: {
            formatNull(val) {
                return val ? ('-' + val) : '';
            }
        }
    }
</script>
<style lang='less' scoped>
    .owner-info {
        .item {
            p {
                min-height: 24px;
            }
            &.card {
                img {
                    border-radius: 3px;
                    display: block;
                    background: whitesmoke;
                    width: 160px;
                    height: 106px;
                }
            }
        }
    }

</style>