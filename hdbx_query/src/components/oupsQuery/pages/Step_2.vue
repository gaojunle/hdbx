<template>
    <div class="step step_2">
        <el-form :model="sdata" ref="form_2" :rules="rules">
            <!--权利归属-->
            <div class="f_box">
                <span class="title required">权利归属：</span>
                <el-radio-group @change="changeRightOwnType" v-model="sdata.rightOwnType"
                                :disabled="isDisabled('rightOwnType')">
                    <el-radio-button
                            v-if="rightOwnTypeIns(item.ins)"
                            v-for="(item,idx) in options.options_rightOwnType"
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
            <!--作者-->
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
                                ref="UP_obtainTypeAttachment"
                                theme="card"
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
                                     @change="rightScopeChange(item.val)">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <el-form-item
                        v-if="sdata.rightScope==2"
                        class="rightScopePart"
                        prop="rightScopePart"
                        :rules="rules.rightScopePart">
                    <el-checkbox-group :disabled="isDisabled('rightScopePart')"
                                       v-model="sdata.rightScopePart">
                        <el-checkbox-button v-for="item in options.options_rightScopePart"
                                            :label="item.val"
                                            :key="item.val">
                            {{item.text}}
                        </el-checkbox-button>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <!--作品说明书-->
            <div class="f_box">
                <span class="title required">作品说明书：</span>
                <div class="flex">
                    <FileUpload
                            ref="UP_opusDescriptionAttachment"
                            theme="card"
                            uptext="作品说明书"
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
                user: store.user,
                sdata: store.sdata,
                rules: store.rules,
                fdata: store.fdata,
                ownerNum: 1,
                isOwnerAndDel: true,
                peopleKindDisabledTypes: [],//空为不限定
                authorNum: 1,
                isAuthorAndDel: true,
                disableds: {
                    peopleKind: false,
                    ownerName: false,
                    mobile: false,
                    ownerDel: false,
                    authorName: false,
                    authorDel: false,
                },
            }
        },
        computed: {
            typeGroup() {
                var applyType = this.sdata.applyType; //1是著作权人2是代理人，默认为空
                var accountType = this.sdata.accountType; //1是个人2是机构
                var rightOwnType = this.sdata.rightOwnType; //所迁权属类型 1个人作品、2合作作品、3法人作品、4职务作品、5委托作品
                var type = '' + applyType + accountType + rightOwnType;
                console.log('typeGroup:' + type)
                return type;
            }
        },
        methods: {
            //根据申请类型和登录人类型，显示对应的权利归属
            rightOwnTypeIns(ins) {
                var flag = false;
                ins.forEach((item) => {
                    if (item.applyType == this.sdata.applyType && item.accountType == this.sdata.accountType) {
                        flag = true;
                        return flag;
                    }
                })
                return flag;
            },


            //权限归属切换行为
            changeRightOwnType(val) {
                var applyType = this.sdata.applyType; //1是著作权人2是代理人，默认为空
                var accountType = this.sdata.accountType; //1是个人2是机构
                var rightOwnType = this.sdata.rightOwnType; //所迁权属类型 1个人作品、2合作作品、3法人作品、4职务作品、5委托作品

                this.ownerNum = 1;
                this.peopleKindDisabledTypes = []//限定个人
                this.authorNum = 1;
                if (this.sdata.owners.length == 0) {
                    this.addOwner();
                }
                if (this.sdata.owners.length > 1) {
                    this.sdata.owners = [this.sdata.owners[0]]
                }
                if (this.sdata.authors.length == 0) {
                    this.addAuthor();
                }
                if (this.sdata.authors.length > 1) {
                    this.sdata.authors = [this.sdata.authors[0]]
                }
                this.sdata.owners[0].peopleKind = '';
                this.sdata.owners[0].name = '';
                this.sdata.owners[0].mobile = '';
                this.sdata.authors[0].name = '';
                this.disableds = {
                    peopleKind: false,
                    ownerName: false,
                    mobile: false,
                    ownerDel: false,
                    authorName: false,
                    authorDel: false,
                }

                switch (this.typeGroup) {
                    case '111'://个人作品[1、1、1]
                        this.ownerNum = 1;
                        this.peopleKindDisabledTypes = ['1']//限定个人

                        this.sdata.owners[0].peopleKind = '1';
                        this.sdata.owners[0].name = this.user.userName;
                        this.sdata.owners[0].mobile = this.user.phone;
                        this.sdata.authors[0].name = this.user.userName;
                        this.disableds = {
                            peopleKind: true,
                            ownerName: !!this.user.userName,
                            mobile: !!this.user.phone,
                            ownerDel: true,
                            authorName: !!this.user.userName,

                        }
                        break;
                    case '123'://法人作品[1,2,3]
                        this.ownerNum = 1;
                        this.authorNum = 1;
                        this.peopleKindDisabledTypes = ['1']//限定机构,不能选择个人

                        this.sdata.owners[0].name = this.user.userName;
                        this.sdata.owners[0].mobile = this.user.phone;
                        this.sdata.authors[0].name = this.user.userName;
                        this.disableds = {
                            peopleKind: false,
                            ownerName: !!this.user.userName,
                            mobile: !!this.user.phone,
                            authorName: true
                        }
                        break;
                    case '124': //职务作品[1,2,4]
                        this.ownerNum = 1;
                        this.authorNum = 100;
                        this.peopleKindDisabledTypes = ['1']//限定机构,不能选择个人

                        this.sdata.owners[0].name = this.user.userName;
                        this.sdata.owners[0].mobile = this.user.phone;
                        this.sdata.authors[0].name = '';
                        this.disableds = {
                            peopleKind: false,
                            ownerName: !!this.user.userName,
                            mobile: !!this.user.phone,
                            authorName: false,
                        }
                        break;
                    case '112'://合作作品[1,1 ,2], [1,2,2]
                    case '122':
                        this.ownerNum = 100;
                        this.authorNum = 100;

                        this.peopleKindDisabledTypes = []//限定机构
                        this.isAuthorAndDel = false;

                        this.sdata.owners[0].name = this.user.userName;
                        this.sdata.owners[0].mobile = this.user.phone;
                        this.sdata.authors[0].name = this.user.userName;
                        this.disableds = {
                            peopleKind: true,
                            ownerName: !!this.user.userName,
                            mobile: !!this.user.phone,
                            authorName: true
                        }
                        this.addOwner();
                        break;
                    case '115'://委托作品 //[1,1 ,5], [1,2,5]
                    case '125':
                        this.ownerNum = 100;
                        this.authorNum = 100;

                        this.peopleKindDisabledTypes = []//限定机构

                        this.sdata.owners[0].peopleKind = '1';
                        this.sdata.owners[0].name = this.user.userName;
                        this.sdata.owners[0].mobile = this.user.phone;
                        this.sdata.authors[0].name = this.user.userName;
                        this.disableds = {
                            peopleKind: true,
                            ownerName: !!this.user.userName,
                            mobile: !!this.user.phone,
                            authorName: false
                        }
                        break;
                    case '211'://[2,1 ,1], [2,2,1]
                    case '221':
                        this.ownerNum = 1;
                        this.isOwnerAndDel = true; //是否显示删除
                        this.authorNum = 1; //作者数目
                        this.peopleKindDisabledTypes = ['2']//限定只能个人
                        this.sdata.owners[0].peopleKind = '1';
                        this.disableds = {
                            peopleKind: true,
                            ownerName: false,
                            mobile: false,
                            ownerDel: true
                        }
                        break;
                    case '212'://[2,1 ,2], [2,2,2]
                    case '222':
                        this.addOwner();
                        this.ownerNum = 100;//著作权人至少增加2位，可以是机构或个人，可新增、删除
                        this.isOwnerAndDel = true; //是否显示删除
                        this.authorNum = 100; //作者数目
                        this.peopleKindDisabledTypes = []//不限定
                        this.disableds = {
                            peopleKind: false,
                            ownerName: false,
                            mobile: false,
                            ownerDel: true,
                            authorName: true,
                            authorDel: true,
                        }
                        break;
                    case '213'://[2,1 ,3], [2,2,3]
                    case '223':
                        this.ownerNum = 1;//著作权人至少增加2位，可以是机构或个人，可新增、删除
                        this.authorNum = 1; //作者数目
                        this.peopleKindDisabledTypes = ['1']//限定只能机构，不能选择个人
                        this.disableds = {
                            peopleKind: false,
                            ownerName: false,
                            mobile: false,
                            ownerDel: true,
                            authorName: true,
                            authorDel: true,
                        }
                        break;
                    case '214'://[2,1 ,4], [2,2,4]
                    case '224':
                        this.ownerNum = 1;//著作权人至少增加2位，可以是机构或个人，可新增、删除
                        this.authorNum = 100; //作者数目
                        this.peopleKindDisabledTypes = ['1']//限定只能机构，不能选择个人
                        this.disableds = {
                            peopleKind: false,
                            ownerName: false,
                            mobile: false,
                            ownerDel: true,
                            authorName: false,
                            authorDel: false,
                        }
                        break;
                    case '215'://[2,1 ,5], [2,2,5]
                    case '225':
                        this.ownerNum = 100;//著作权人至少增加2位，可以是机构或个人，可新增、删除
                        this.authorNum = 100; //作者数目
                        this.isOwnerAndDel = true; //是否显示删除
                        this.peopleKindDisabledTypes = []//不限定
                        this.disableds = {
                            peopleKind: false,
                            ownerName: false,
                            mobile: false,
                            ownerDel: true,
                            authorName: false,
                            authorDel: false,
                        }
                        break;
                }
                //A.办理身份-我是著作权人，
                if (applyType == '1') {
                    if (accountType == '1') {//登录用户-个人  //权利归属只能选择个人作品、合作作品、委托作品
                        if (rightOwnType == '1') {//个人作品[1、1、1]

                        }
                    }
                    if (accountType == '2') {//登录用户-机构  //权利归属只能选择合作作品、法人作品、职务作品、委托作品
                        if (rightOwnType == '3') { //法人作品[1,2,3]

                        }
                        if (rightOwnType == '4') { //职务作品[1,2,4]

                        }
                    }

                    //著作权人，登录用户-个人或机构
                    if (rightOwnType == '2') {//合作作品[1,1 ,2], [1,2,2]

                    }
                    if (rightOwnType == '5') {


                    }
                }

                //D.我是代理人，登录用户-个人或机构 权利归属都可选择个人作品、合作作品、法人作品、职务作品、委托作品
                if (applyType == '2') {//[*,2,*]
                    if (rightOwnType == '1') {//个人作品

                    }
                    if (rightOwnType == '2') {//合作作品

                    }
                    if (rightOwnType == '3') {//法人作品

                    }
                    if (rightOwnType == '4') {//职务作品

                    }
                    if (rightOwnType == '5') {//职务作品

                    }
                }

                return false;
            },

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
                if (['212', '222'].indexOf(this.typeGroup) > -1 && this.sdata.owners.length == 2) {
                    this.$message.error('著作权人至少2位');
                    return false;
                }
                this.sdata.owners.splice(idx, 1)
            },
            //清空拥有者信息
            clearOwner(idx) {
                this.sdata.owners.splice(idx, 1, {
                    "applyCopy": '1',
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
                    "applyCopy": '1',
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "idNumber": "",
                    "idType": "1",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "",
                    "role": ""
                })

                if (['112', '122', '212', '222'].indexOf(this.typeGroup) > -1) {
                    this.addAuthor();
                    console.log(this.sdata.authors)
                }
            },
            //权属人名修改事件处理
            ownerNameChange(val, idx) {
                if (['112', '122', '121', '122', '211', '221', '212', '222', '213', '223'].indexOf(this.typeGroup) > -1) {
                    this.sdata.authors[idx].name = val;
                }
            },
        },
        mounted() {
        }
    }
</script>