<template>
    <div class="step step_2">
        <OnwerAuthor ref="form_onwer"></OnwerAuthor>
        <el-form :model="sdata" ref="form_2" :rules="rules">
            <!--&lt;!&ndash;著作权人&ndash;&gt;
            <div class="f_box copy_owner">
                <span class="title required">著作权人：</span>
                <div class="owner" v-if="ownerNum>idx" v-for="(item,idx) in sdata.owners">
                    <p class="sub_title" v-if="ownerNum>1">第 {{idx+1}} 位</p>
                    <div class="cont">
                        <div class="f_left">
                            <div class="flex">
                                <CountryCitySelect
                                        ref="CC_owners"
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
                                <el-select class="mr10"
                                           v-model="item.peopleKind"
                                           :disabled="isDisabled('owners')||(disableds.peopleKind&&idx==0)"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="item in options.options_peopleKind"
                                            value-key="val"
                                            :key="item.val"
                                            :label="item.text"
                                            :value="item.val"
                                            :disabled="peopleKindDisabledTypes.indexOf(item.type)>-1">
                                    </el-option>
                                </el-select>
                                <el-form-item
                                        class="flex-1"
                                        :prop="'owners.' + idx + '.name'"
                                        :rules="rules.ownerName">
                                    <el-input
                                            :disabled="isDisabled('owners') || (disableds.ownerName&&idx==0)"
                                            v-model="item.name"
                                            @change="(val)=>{ownerNameChange(val,idx)}"
                                            placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                                </el-form-item>
                            </div>

                            <div class="flex">
                                <el-select
                                        :disabled="isDisabled('owners')"
                                        v-model="item.idType"
                                        class="mr10"
                                        placeholder="请选择">
                                    <el-option
                                            v-for="item in options.options_idType"
                                            value-key="val"
                                            :key="item.val"
                                            :label="item.text"
                                            :value="item.val">
                                    </el-option>
                                </el-select>
                                <el-form-item
                                        class="flex-1"
                                        :prop="'owners.' + idx + '.idNumber'"
                                        :rules="rules.idNumber">
                                    <el-input :disabled="isDisabled('owners')" placeholder="证件号码"
                                              v-model="item.idNumber"></el-input>
                                </el-form-item>
                            </div>
                            <div class="flex">
                                <el-form-item
                                        class="flex-1"
                                        :prop="'owners.' + idx + '.mobile'"
                                        :rules="rules.mobile">
                                    <el-input :disabled="isDisabled('owners') || (disableds.mobile&&idx==0)"
                                              placeholder="请输入电话号码"
                                              v-model="item.mobile">
                                        <template slot="prepend">手机号码</template>
                                    </el-input>
                                </el-form-item>
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
                        <div class="f_right" v-if="item.idType=='1'">
                            <div class="copy_upload">
                                <FileUpload
                                        ref="UP_cardFront"
                                        :disabled="isDisabled('owners')"
                                        @fileSuccess="((params)=>{onFileUploaded(params,sdata.owners[idx].cardFront,'single')})"
                                        theme="idcard"
                                        :path="sdata.owners[idx].cardFront.path"
                                        uptext="上传人像面"></FileUpload>
                                <FileUpload
                                        ref="UP_cardBack"
                                        :disabled="isDisabled('owners')"
                                        @fileSuccess="((params)=>{onFileUploaded(params,sdata.owners[idx].cardBack,'single')})"
                                        theme="idcard"
                                        :path="sdata.owners[idx].cardBack.path"
                                        uptext="上传国徽面"></FileUpload>
                            </div>
                        </div>
                        <div class="opts" v-if="!isDisabled('owners') && idx!=0 && isOwnerAndDel">
                            <el-button type="text" @click="removeOwner(idx)">删除</el-button>
                            <el-button type="text" @click="clearOwner(idx)">清空</el-button>
                        </div>
                    </div>
                </div>
                <el-button
                        v-if="!isDisabled('owners') && ownerNum>sdata.owners.length && isOwnerAndDel"
                        type="text"
                        @click="addOwner">+添加著作权人
                </el-button>
            </div>
            &lt;!&ndash;作者&ndash;&gt;
            <div class="f_box author">
                <span class="title required">作者：</span>
                <div class="cont" v-if="authorNum>idx" v-for="(item,idx) in sdata.authors">
                    <p class="sub_title" v-if="authorNum>1">第 {{idx+1}} 位</p>
                    <div class="flex">
                        <div class="flex">
                            <el-form-item
                                    class="flex-1"
                                    :prop="'authors.' + idx + '.name'"
                                    :rules="rules.authorName">
                                <el-input :disabled="isDisabled('authors') || (disableds.authorName)"
                                          class="w400" v-model="item.name"
                                          placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                            </el-form-item>
                            <el-form-item
                                    class="flex-1">
                                <el-input :disabled="isDisabled('authors')"
                                          class="w400" v-model="item.signature"
                                          placeholder="作者署名：作者的笔名、别名等"></el-input>
                            </el-form-item>
                        </div>
                        <div class="opts" v-if="!isDisabled('authors') && idx!=0 && !disableds.authorDel">
                            <a href="javascript:;" @click="removeAuthor(idx)">删除</a>
                            <a href="javascript:;" @click="clearAuthor(idx)">清空</a>
                        </div>
                    </div>
                </div>
                <el-button
                        v-if="!isDisabled('authors') && authorNum>sdata.authors.length && !disableds.authorDel"
                        type="text" @click="addAuthor">
                    +添加作者
                </el-button>
            </div>-->
            <!--权利取得方式-->
            <ObtainType ref="form_ObtainType"></ObtainType>
            <!--权利拥有状况-->
            <RightScope ref="form_RightScope"></RightScope>
            <!--作品说明书-->
            <OpusDescriptionAttachment ref="form_OpusDescriptionAttachment"></OpusDescriptionAttachment>
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
    import OnwerAuthor from '../components/OnwerAuthor'
    import ObtainType from '../components/ObtainType'
    import RightScope from '../components/RightScope'
    import OpusDescriptionAttachment from '../components/OpusDescriptionAttachment'

    export default {
        components: {FileUpload, CountryCitySelect, OnwerAuthor, ObtainType, RightScope, OpusDescriptionAttachment},
        mixins: [myMixin],
        data() {
            return {
                options: options,
                user: store.user,
                sdata: store.sdata,
                rules: store.rules,
                fdata: store.fdata
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>