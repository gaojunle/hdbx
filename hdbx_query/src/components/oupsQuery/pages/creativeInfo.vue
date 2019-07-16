<template>
    <div class="step step_1">
        <el-form :model="sdata" ref="form_1" :rules="rules">
            <!--作品名称-->
            <div class="f_box">
                <span class="title required">作品名称：</span>
                <el-form-item prop="opusName">
                    <el-input :disabled="isDisabled('opusName')"
                              v-model="sdata.opusName"
                              placeholder="请输入作品名称"
                              class="w100"></el-input>
                </el-form-item>
            </div>
            <!--作品类型-->
            <div class="f_box opusType">
                <span class="title required">作品类型：</span>
                <div class="flex">
                    <el-select class="mr10" style="width: 450px"
                               v-model="sdata.opusType"
                               :disabled="isDisabled('opusType')"
                               placeholder="请选择作品类型">
                        <el-option
                                v-for="item in options.options_opusType"
                                value-key="val"
                                :key="item.val"
                                :label="item.text"
                                :value="item.val">
                            <span style="float: left">{{ item.text }}</span>
                            <span style="float: left; padding-left:12px;color: #8492a6; font-size: 12px">{{ item.sub }}</span>
                        </el-option>
                    </el-select>
                    <el-form-item prop="opusTypeDesc" class="flex-1" v-if="sdata.opusType=='L'">
                        <el-input :disabled="isDisabled('opusTypeDesc')" v-model="sdata.opusTypeDesc"
                                  placeholder="说明"></el-input>
                    </el-form-item>
                </div>
            </div>
            <!--创作性质-->
            <div class="f_box">
                <span class="title required">创作性质：</span>
                <el-radio-group v-model="sdata.opusInditeType" :disabled="isDisabled('opusInditeType')">
                    <el-radio-button v-for="item in options.options_opusInditeType"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <!--创作完成日期和地点-->
            <div class="f_box completeDate">
                <span class="title required">创作完成日期：</span>
                <el-date-picker
                        :disabled="isDisabled('completeDate')"
                        v-model="sdata.completeDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        placeholder="年/月/日">
                </el-date-picker>

                <span class="title required">创作完成地点：</span>
                <CountryCitySelect
                        ref="CC_completeCountry"
                        :countryDisabled="isDisabled('completeCountry')"
                        :cityDisabled="isDisabled('completeCity')"
                        :country="sdata.completeCountry"
                        :province="sdata.completeProvince"
                        :city="sdata.completeCity"
                        :area="sdata.completeArea"
                        @countryCityChange="((param)=>{countryCityChange(param,sdata,'complete')})"
                ></CountryCitySelect>
            </div>
            <!--发表状态-->
            <div class="f_box">
                <span class="title required">发表状态：</span>

                <el-radio-group
                        :disabled="isDisabled('publishStatus')"
                        v-model="sdata.publishStatus">
                    <el-radio-button v-for="item in options.options_publishStatus"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <!--首次发表日期、地点-->
            <div class="f_box completeDate" v-if="sdata.publishStatus=='1'">
                <span class="title required">首次发表日期：</span>
                <el-date-picker
                        :disabled="isDisabled('appearDate')"
                        v-model="sdata.appearDate"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="timestamp"
                        placeholder="年/月/日">
                </el-date-picker>
                <span class="title required">首次发表地点：</span>
                <CountryCitySelect
                        ref="CC_appearCountry"
                        :countryDisabled="isDisabled('appearCountry')"
                        :cityDisabled="isDisabled('appearProvince')"
                        :country="sdata.appearCountry"
                        :province="sdata.appearProvince"
                        :city="sdata.appearCity"
                        :area="sdata.appearArea"
                        @countryCityChange="((param)=>{countryCityChange(param,sdata,'appear')})"
                ></CountryCitySelect>
            </div>
            <!--作品性质-->
            <div class="f_box">
                <span class="title required">作品性质：</span>
                <el-radio-group
                        :disabled="isDisabled('opusNature')"
                        v-model="sdata.opusNature">
                    <el-radio-button v-for="item in options.options_opusNature"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
            </div>
            <!--
            1、【文字作品A】需填写字数，单个作品填写作品字数，系列作品填写最长作品字数
            2、【电影作品H和以类似摄制电影的方法创作的作品I】需填写时长，单个作品填写作品时长，系列作品填写最长作品时长
            3、【文字作品A，摄影作品G】需要上传作品样本
            -->
            <div class="f_box p_nums" v-if="'AMIH'.indexOf(sdata.opusType)>-1">
                <div class="title required">
                    <span v-if="sdata.opusNature=='2'">最长</span><span
                        v-if="'AM'.indexOf(sdata.opusType)>-1">作品字数：</span><span
                        v-if="'IH'.indexOf(sdata.opusType)>-1">作品时长：</span>
                </div>
                <div class="flex" v-if="'AM'.indexOf(sdata.opusType)>-1">
                    <el-form-item prop="opusInfo" :rules="rules.opusInfo">
                        <el-input :disabled="isDisabled('opusInfo')"
                                  v-model.number="sdata.opusInfo"
                                  class="w220"></el-input>
                    </el-form-item>
                    <span class="label">字</span>
                </div>
                <div class="flex" v-if="sdata.opusType=='H'||sdata.opusType=='I'">
                    <el-form-item prop="opusInfo" :rules="[{validator: checkOpusInfo, trigger: 'blur'}]">
                        <el-input :disabled="isDisabled('opusInfo')"
                                  v-model.number="timeLength.h" max="60" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">时</span>

                        <el-input :disabled="isDisabled('opusInfo')"
                                  v-model.number="timeLength.m" max="59" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">分</span>

                        <el-input :disabled="isDisabled('opusInfo')"
                                  v-model.number="timeLength.s" max="59" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">秒</span>
                    </el-form-item>
                </div>
            </div>
            <!--作品样本-->
            <div class="f_box sample" v-if="sdata.opusType=='A'||sdata.opusType=='G'">
                <span class="title required">作品样本：</span>
                <div class="samples_multi" v-if="sdata.opusNature==1">
                    <FileUpload
                            ref="FU_attachments"
                            v-if="!isDisabled('attachments')"
                            :path="sdata.attachments[0].attachmentList.length>0?sdata.attachments[0].attachmentList[0].path:''"
                            @fileSuccess="((params)=>{onFileUploaded(params,sdata.attachments[0].attachmentList,'multi')})"
                            theme="btn"
                            uptext="上传">
                    </FileUpload>

                    <div class="sample_list" v-if="idx%3==0"
                         v-for="(_item,idx) in sdata.attachments[0].attachmentList">
                        <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                             v-for="(ufile,i) in sdata.attachments[0].attachmentList">
                            <span class="txt">{{ufile.attachmentName}}</span>
                            <span
                                    v-if="!isDisabled('attachments')"
                                    class="del"
                                    @click="removeUploadFile(sdata.attachments[0].attachmentList,i)">删除</span>
                        </div>
                    </div>
                </div>
                <div class="samples_multi" v-if="sdata.opusNature==2">
                    <div class="samples_multi_list" v-for="(item,index) in sdata.attachments">
                        <div class="ibox">
                            <div class="multi-info">
                                <span>第 {{index+1}} 件</span>
                                <el-form-item
                                        :prop="'attachments.' + index + '.segmentName'"
                                        :rules="rules.segmentName"
                                        class="serial">
                                    <el-input
                                            :disabled="isDisabled('attachments')"
                                            v-model="item.segmentName" placeholder="请输入系列作品名称"></el-input>
                                </el-form-item>
                            </div>

                            <div class="sample_list" v-if="idx%3==0" v-for="(_item,idx) in item.attachmentList">
                                <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                     v-for="(ufile,i) in item.attachmentList">
                                    <span class="txt">{{ufile.attachmentName}}</span>
                                    <span class="del"
                                          v-if="!isDisabled('attachments')"
                                          @click="removeUploadFile(sdata.attachments[index].attachmentList,i)">删除</span>
                                </div>
                            </div>

                            <FileUpload
                                    ref="FU_attachments"
                                    v-if="!isDisabled('attachments')"
                                    style="margin-top: 20px;"
                                    :path="sdata.attachments[0].attachmentList.length>0?sdata.attachments[0].attachmentList[0].path:''"
                                    @fileSuccess="((params)=>{onFileUploaded(params,sdata.attachments[index].attachmentList,'multi')})"
                                    theme="btn"
                                    uptext="上传"></FileUpload>
                        </div>
                        <el-button v-if="!isDisabled('attachments') && sdata.attachments.length!=1"
                                   type="text" @click="delteApus(index)">删除
                        </el-button>
                    </div>
                    <el-button v-if="!isDisabled('attachments')"
                               type="text" @click="addApus">+添加作品
                    </el-button>
                </div>
            </div>
        </el-form>
        <div class="step-btns">
            <el-button @click="stepPrev($route.params.step)" class="big">上一步</el-button>
            <el-button type="primary" class="big" @click="stepNext($route.params.step)">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import '../components/index.less'
    import options from '../store/options'
    import store from '../store/index'
    import myMixin from '../store/mixin'
    import FileUpload from '../components/FileUpload'
    import CountryCitySelect from '../components/CountryCitySelect'

    export default {
        components: {FileUpload, CountryCitySelect},
        mixins: [myMixin],
        data() {
            return {
                completeDate: '1563272801989',
                timeLength: {
                    h: '',
                    m: '',
                    s: ''
                }
            }
        },

        methods: {
            //添加系列作品样本
            addApus() {
                this.sdata.attachments.push({
                    attachmentList: [],
                    segmentName: ''
                })
            },
            //添加系列作品样本
            delteApus(idx) {
                this.sdata.attachments.splice(idx, 1)
            },
            checkOpusInfo(rule, value, callback) {
                console.log(this.sdata)
                //输入文字
                if ('A'.indexOf(this.sdata.opusType) > -1) {
                    if (!value) {
                        callback(new Error('请输入字数'));
                    }
                    if (!Number.isInteger(value)) {
                        callback(new Error('请输入数字值'));
                    }
                }
                //输入时长
                else if ('IH'.indexOf(this.sdata.opusType) > -1) {
                    if (!Number.isInteger(this.timeLength.h) || !Number.isInteger(this.timeLength.m || !Number.isInteger(this.timeLength.s))) {
                        callback(new Error('请输入数字值时长'));
                    }
                    if (!this.timeLength.h || !this.timeLength.m || !this.timeLength.s) {
                        callback(new Error('请输入完整时长'));
                    }
                    callback();
                }
                else {
                    callback();
                }
                callback();
            }
        },
        mounted() {
            if ('IH'.indexOf(this.sdata.opusType) > -1 && this.sdata.opusInfo) {
                var mss = parseInt(this.sdata.opusInfo);
                this.timeLength = {
                    h: parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    m: parseInt((mss % (1000 * 60 * 60)) / (1000 * 60)),
                    s: parseInt((mss % (1000 * 60)) / 1000)
                }
            }
        },
        watch: {
            //时分秒填写
            'timeLength.h'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
            'timeLength.m'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
            'timeLength.s'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
        }
    }
</script>