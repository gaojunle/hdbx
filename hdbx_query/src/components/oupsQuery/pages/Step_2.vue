<template>
    <div class="step step_2">
        <el-form :model="sdata" ref="form_2" :rules="rules">
            <!--权利归属-->
            <div class="f_box">
                <span class="title required">权利归属：</span>
                <el-radio-group v-model="sdata.rightOwnType" :disabled="isDisabled('rightOwnType')">
                    <el-radio-button v-for="(item,idx) in options.options_rightOwnType"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <div v-if="sdata.rightOwnType>1" class="flex ptb20">
                    <FileUpload
                            ref="UP_rightOwnTypeAttachment"
                            theme="card"
                            :uptext="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].text"
                            :path="sdata.rightOwnTypeAttachment.path"
                            :examples="{exampleUrl:options.exampleUrl}"
                            :disabled="isDisabled('rightOwnType')"
                            @fileSuccess="((params)=>{onFileUploaded(params,sdata.rightOwnTypeAttachment,'single')})">
                    </FileUpload>
                </div>
            </div>
            <!--著作权人-->
            <div class="f_box copy_owner">
                <span class="title required">著作权人：</span>
                <div class="owner" v-for="(item,idx) in sdata.owners">
                    <p class="sub_title">第 {{idx+1}} 位</p>
                    <div class="cont">
                        <div class="f_left">
                            <div class="flex">
                                <el-select class="mr10"
                                           v-model="item.peopleKind"
                                           :disabled="isDisabled('owners')"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in options.options_peopleKind"
                                            value-key="val"
                                            :key="item.val"
                                            :label="item.text"
                                            :value="item.val">
                                    </el-option>
                                </el-select>
                                <el-input
                                        :disabled="isDisabled('owners')"
                                        v-model="item.name" placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                            </div>
                            <div class="flex">
                                <CountryCitySelect
                                        :countryDisabled="isDisabled('owners')"
                                        :cityDisabled="isDisabled('owners')"
                                        :country="item.country"
                                        :province="item.province"
                                        :city="item.city"
                                        :area="item.area"
                                        @countryCityChange="((param)=>{countryCityChange(param,item,'')})"
                                ></CountryCitySelect>
                            </div>
                            <div class="flex">
                                <el-select
                                        :disabled="isDisabled('owners')"
                                        v-model="item.idType"
                                        class="mr10" style="width: 225px"
                                        placeholder="请选择">
                                    <el-option
                                            v-for="item in options.options_idType"
                                            value-key="val"
                                            :key="item.val"
                                            :label="item.text"
                                            :value="item.val">
                                    </el-option>
                                </el-select>
                                <el-input :disabled="isDisabled('owners')" placeholder="证件号码" v-model="item.idNumber"></el-input>
                            </div>
                            <div class="flex">
                                <div>
                                    <el-input :disabled="isDisabled('owners')" placeholder="请输入电话号码" v-model="item.mobile">
                                        <template slot="prepend">手机号码</template>
                                    </el-input>
                                </div>
                            </div>
                            <div class="fuben" v-if="idx>0">
                                <span>申请证书副本：</span>
                                <el-radio-group :disabled="isDisabled('owners')"
                                                v-model="item.applyCopy" class="small">
                                    <el-radio-button v-for="(item,idx) in options.options_applyCopy"
                                                     :key="idx"
                                                     :label="item.val">
                                        {{item.text}}
                                    </el-radio-button>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="f_right">
                            <div class="copy_upload">
                                <FileUpload
                                        :disabled="isDisabled('owners')"
                                        @fileSuccess="((params)=>{onFileUploaded(params,sdata.owners[idx].cardFront,'single')})"
                                        theme="idcard"
                                        :path="sdata.owners[idx].cardFront.path"
                                        uptext="上传人像面"></FileUpload>
                                <FileUpload
                                        :disabled="isDisabled('owners')"
                                        @fileSuccess="((params)=>{onFileUploaded(params,sdata.owners[idx].cardBack,'single')})"
                                        theme="idcard"
                                        :path="sdata.owners[idx].cardBack.path"
                                        uptext="上传国徽面"></FileUpload>
                            </div>
                        </div>
                        <div class="opts" v-if="!isDisabled('owners')">
                            <el-button type="text" @click="removeOwner(idx)">删除</el-button>
                            <el-button type="text" @click="clearOwner(idx)">清空</el-button>
                        </div>
                    </div>
                </div>
                <el-button v-if="!isDisabled('owners')" type="text" @click="addOwner">+添加著作权人</el-button>
            </div>
            <!--作者-->
            <div class="f_box author">
                <span class="title required">作者：</span>
                <div class="cont" v-for="(item,idx) in sdata.authors">
                    <p class="sub_title">第 {{idx+1}} 位</p>
                    <div class="flex">
                        <div class="flex">
                            <el-input :disabled="isDisabled('authors')"
                                      class="w400" v-model="item.name"
                                      placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                            <el-input :disabled="isDisabled('authors')"
                                      class="w400" v-model="item.signature"
                                      placeholder="作者署名：作者的笔名、别名等"></el-input>
                        </div>
                        <div class="opts" v-if="!isDisabled('authors')">
                            <a href="javascript:;" @click="removeAuthor(idx)">删除</a>
                            <a href="javascript:;" @click="clearAuthor(idx)">清空</a>
                        </div>
                    </div>
                </div>
                <el-button v-if="!isDisabled('authors')" type="text" @click="addAuthor">+添加作者</el-button>
            </div>
            <!--权利取得方式-->
            <div class="f_box obtainType">
                <span class="title required">权利取得方式：</span>
                <el-radio-group :disabled="isDisabled('obtainType')"
                                v-model="sdata.obtainType" class="small">
                    <el-radio-button v-for="(item,idx) in options.options_obtainType"
                                     :key="idx"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <!--继承-->
                <div class="upload-way" v-if="sdata.obtainType>1" :class="{other:sdata.obtainType=='4'}">
                    <p style="padding-top: 20px" v-if="sdata.obtainType=='4'">
                        权利取得日期：
                        <el-date-picker
                                :disabled="isDisabled('obtainType')"
                                v-model="sdata.ownObtainDate"
                                type="date"
                                placeholder="年/月/日">
                        </el-date-picker>
                    </p>
                    <div class="ptb20"
                         v-for="(item,idx) in options.options_obtainTypeAttachment[parseInt(sdata.obtainType)-2]"
                         :key="idx">
                        <FileUpload
                                ref="UP_obtainTypeAttachment_'+idx+'"
                                theme="card"
                                :uptext="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].text"
                                :path="sdata.obtainTypeAttachment[idx].path"
                                :examples="{exampleUrl:options.exampleUrl}"
                                :disabled="isDisabled('obtainType')"
                                @fileSuccess="((params)=>{onFileUploaded(params,sdata.obtainType,'single')})">
                        </FileUpload>
                    </div>
                </div>
            </div>
            <!--权利拥有状况-->
            <div class="f_box rightScope">
                <span class="title required">权利拥有状况：</span>
                <el-radio-group
                        :disabled="isDisabled('rightScope')"
                        v-model="sdata.rightScope" class="small">
                    <el-radio-button v-for="item in options.options_rightScope"
                                     :key="item.val"
                                     :label="item.val"
                                     @change="rightScopeChange(item.val)"
                    >
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <div class="rightScopePart" v-if="sdata.rightScope==2">
                    <el-checkbox-group :disabled="isDisabled('rightScopePart')"
                                       v-model="sdata.rightScopePart">
                        <el-checkbox-button v-for="item in options.options_rightScopePart"
                                            :label="item.val"
                                            :key="item.val">
                            {{item.text}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </div>
            </div>
            <!--作品说明书-->
            <div class="f_box">
                <span class="title required">作品说明书：</span>
                <div class="flex">
                    <FileUpload
                            ref="UP_opusDescriptionAttachment"
                            theme="card"
                            :uptext="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].text"
                            :path="sdata.opusDescriptionAttachment.path"
                            :examples="{exampleUrl:options.exampleUrl}"
                            :disabled="isDisabled('opusDescriptionAttachment')"
                            @fileSuccess="((params)=>{onFileUploaded(params,sdata.opusDescriptionAttachment,'single')})">
                    </FileUpload>
                </div>
            </div>
        </el-form>
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
    import FileUpload from '../components/FileUpload'
    import CountryCitySelect from '../components/CountryCitySelect'

    export default {
        components: {FileUpload, CountryCitySelect},
        mixins: [myMixin],
        data() {
            return {
                options: options,
                sdata: store.sdata,
                rules: store.rules,
                fdata: store.fdata
            }
        },

        methods: {
            //添加作者
            addAuthor() {
                this.sdata.authors.push({
                    name: "",
                    signature: ""
                })
            },
            //移除作者
            removeAuthor(idx) {
                this.sdata.authors.splice(idx, 1)
            },
            //清空作者信息
            clearAuthor(idx) {
                this.sdata.authors.splice(idx, 1, {
                    name: "",
                    signature: ""
                })
            },
            //所有权切换
            rightScopeChange(val) {
                this.sdata.rightOwnType = val - 1;
            },
            //移除拥有者
            removeOwner(idx) {
                this.sdata.owners.splice(idx, 1)
            },
            //清空拥有者信息
            clearOwner(idx) {
                this.sdata.owners.splice(idx, 1, {
                    "applyCopy": '',
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "idNumber": "",
                    "idType": "",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "",
                    "role": ""
                })
            },
            //添加拥有者
            addOwner() {
                this.sdata.owners.push({
                    "applyCopy": '',
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "idNumber": "",
                    "idType": "",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "",
                    "role": ""
                })
            },

            stepNext() {
                if (this.validate()) {
                    this.sdata.applyType = "2";
                    this.$router.push('/index/' + 3)
                }
            },

            //验证
            validate() {
                return this.$refs.UP_rightOwnTypeAttachment.validate() && this.$refs.form_2.validate()
            }
        },
        mounted() {

        }
    }
</script>