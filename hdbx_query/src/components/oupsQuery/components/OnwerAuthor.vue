<template>
    <el-form :model="sdata" :rules="rules">
        <!--权利归属-->
        <div class="f_box">
            <span class="title required">权利归属：</span>
            <el-radio-group @change="changeRightOwnType" v-model="sdata.rightOwnType"
                            :disabled="isDisabled('rightOwnType')">
                <el-radio-button
                        v-if="rightOwnTypeIns(item)"
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
                        <!--个人/机构选择-->
                        <div class="flex">
                            <el-radio-group v-model="item.applyType"
                                            @change="(val)=>{applyTypeChange(val,idx)}"
                                            :disabled="disableds.owner_applyType && idx==0">
                                <el-radio-button
                                        v-for="(_item,index) in options.options_applyType"
                                        :key="_item.val"
                                        :label="_item.val">
                                    {{_item.text}}
                                </el-radio-button>
                            </el-radio-group>
                        </div>
                        <!--国家/城市选择 -->
                        <div class="flex">
                            <CountryCitySelect
                                    ref="CC_owners"
                                    :countryDisabled="isDisabled('owners') || (disableds.country&&idx==0)"
                                    :cityDisabled="isDisabled('owners')"
                                    :country="item.country"
                                    :province="item.province"
                                    :city="item.city"
                                    :area="item.area"
                                    @countryCityChange="((param)=>{countryCityChange(param,item,'')})"
                            ></CountryCitySelect>
                        </div>
                        <!--身份类型/姓名-->
                        <div class="flex">
                            <el-form-item :prop="'owners.' + idx + '.peopleKind'"
                                          :rules="rules.peopleKind">
                                <el-select class="mr10"
                                           v-if="item.applyType=='1'"
                                           v-model="item.peopleKind"
                                           :disabled="isDisabled('owners')||(disableds.peopleKind&&idx==0)"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="it in options.options_peopleKind"
                                            v-if="it.type==item.applyType"
                                            value-key="val"
                                            :key="it.val"
                                            :label="it.text"
                                            :value="it.val">
                                    </el-option>
                                </el-select>
                                <el-select class="mr10"
                                           v-else-if="item.applyType=='2' && item.country!='中国大陆'"
                                           v-model="item.peopleKind"
                                           :disabled="true"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="it in options.options_peopleKind"
                                            v-if="it.type==item.applyType"
                                            value-key="val"
                                            :key="it.val"
                                            :label="it.text"
                                            :value="it.val">
                                    </el-option>
                                </el-select>
                                <el-select class="mr10"
                                           v-else
                                           v-model="item.peopleKind"
                                           :disabled="isDisabled('owners')||(disableds.peopleKind&&idx==0)"
                                           placeholder="请选择">
                                    <el-option
                                            v-for="it in options.options_peopleKind"
                                            v-if="it.type==item.applyType"
                                            value-key="val"
                                            :key="it.val"
                                            :label="it.text"
                                            :value="it.val">
                                    </el-option>
                                </el-select>
                            </el-form-item>

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
                        <!--证件类型/证件号-->
                        <div class="flex">
                            <el-form-item :prop="'owners.' + idx + '.idType'"
                                          :rules="rules.idType">
                                <el-select
                                        class="mr10"
                                        :disabled="isDisabled('owners') || (disableds.idType&&idx==0)"
                                        v-model="item.idType"
                                        placeholder="请选择证件类型">
                                    <el-option
                                            v-for="(it,idx) in options.options_idType[item.applyType][item.country]||options.options_idType[sdata.applyType]['海外其他各国']"
                                            value-key="val"
                                            :key="it.val"
                                            :label="it.text"
                                            :value="it.val">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item
                                    class="flex-1"
                                    :prop="'owners.' + idx + '.idNumber'"
                                    :rules="item.idType=='1'?rules.idNumberID:rules.idNumber">
                                <el-input
                                        :disabled="isDisabled('owners')||(disableds.idNumber&&idx==0)"
                                        placeholder="证件号码"
                                        v-model="item.idNumber"></el-input>
                            </el-form-item>
                        </div>
                        <!--手机件号-->
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
                        <!--是否设置为申请人-->
                        <!--<div class="flex">
                            <div class="el-radio-group">
                                <label role="radio" class="el-radio-button is-active">
                                    <input :checked="idx==0" @change="(val)=>{changeOnwer(val,idx)}"
                                           type="radio" tabindex="-1" class="el-radio-button__orig-radio">
                                    <span class="el-radio-button__inner">申请人</span>
                                </label>
                            </div>
                        </div>-->
                        <!--是否选择副本-->
                        <!--<div class="fuben" v-if="idx<0">
                            <span>申请证书副本：</span>
                            <el-radio-group :disabled="isDisabled('owners')"
                                            v-model="item.applyCopy" class="small">
                                <el-radio-button v-for="(item,idx) in options.options_applyCopy"
                                                 :key="idx"
                                                 :label="item.val">
                                    {{item.text}}
                                </el-radio-button>
                            </el-radio-group>
                        </div>-->
                    </div>
                    <div class="f_right">
                        <div class="copy_upload" v-if="['1','15','16','17'].indexOf(item.idType)>-1">
                            <!--大陆身份证，香港，澳门，台湾的所有证都做成正反面的，其他证件做成单面的-->
                            <FileUpload
                                    ref="UP_cardFront"
                                    :disabled="isDisabled('owners')||(disableds.cardFront&&idx==0)"
                                    @idcardFileSuccess="((params)=>{idcardFileSuccess(params,idx,'cardFront')})"
                                    theme="idcard"
                                    :path="sdata.owners[idx].cardFront"
                                    uptext="请上传证件正面"></FileUpload>
                            <FileUpload
                                    ref="UP_cardBack"
                                    :disabled="isDisabled('owners')||(disableds.cardBack&&idx==0)"
                                    @idcardFileSuccess="((params)=>{idcardFileSuccess(params,idx,'cardBack')})"
                                    theme="idcard"
                                    :path="sdata.owners[idx].cardBack"
                                    uptext="请上传证件反面"></FileUpload>
                        </div>
                        <div v-else>
                            <FileUpload
                                    ref="UP_cardFront"
                                    :disabled="isDisabled('owners')||(disableds.certificatePath&&idx==0)"
                                    @idcardFileSuccess="((params)=>{idcardFileSuccess(params,idx,'cardFront')})"
                                    theme="idcard"
                                    :path="sdata.owners[idx].cardFront"
                                    uptext="请上传证件"></FileUpload>
                        </div>
                    </div>
                    <div class="opts" v-if="!isDisabled('owners') && idx!=0">
                        <el-button type="text" @click="removeOwner(idx)">删除</el-button>
                        <el-button type="text" @click="clearOwner(idx)">清空</el-button>
                    </div>
                </div>
            </div>
            <el-button
                    v-if="!isDisabled('owners') && ownerNum>sdata.owners.length"
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
    </el-form>
</template>

<script>
    import api from '../../../api'
    import '../components/index.less'
    import myMixin from '../store/mixin'
    import FileUpload from '../components/FileUpload'
    import CountryCitySelect from '../components/CountryCitySelect'

    export default {
        components: {FileUpload, CountryCitySelect},
        mixins: [myMixin],
        data() {
            return {
                accountType: '1',
                ownerNum: 1,
                authorNum: 1,
                disableds: {
                    owner_applyType: false, //著作人类型（个人、机构）
                    country: false,         //著作人国家
                    peopleKind: false,      //著作人身份类型
                    ownerName: false,       //著作人名
                    idType: false,          //著作人证件类型
                    idNumber: false,        //著作人证件号码
                    mobile: false,          //著作人手机号
                    ownerDel: false,        //著作人删除按钮
                    authorName: false,      //作者名
                    authorDel: false,       //作者删除按钮
                },
            }
        },
        computed: {
            typeGroup() {
                var applyType = this.sdata.applyType; //申请类型，1是著作权人2是代理人，默认为空
                var accountType = this.getUserAccountType(); //1是个人2是机构
                this.accountType = accountType;
                //权利属性默认值
                if (!this.flowNumber && applyType == '1' && accountType == '2' && this.sdata.rightOwnType == '1') {
                    this.sdata.rightOwnType = '2';
                }
                var rightOwnType = this.sdata.rightOwnType; //所迁权属类型 1个人作品、2合作作品、3法人作品、4职务作品、5委托作品
                var type = '' + applyType + accountType + rightOwnType;

                console.info('[applyType,accountType,rightOwnType]=' + type)
                return type;
            }
        },
        methods: {
            getUserAccountType() {
                return (parseInt(this.user.accountType) + 1).toString();
            },
            //代理人申请时，设置哪著作人为申请人；将点击著作人提到第一位
            changeOnwer(val, idx) {
                var temp = this.sdata.owners.splice(idx, 1);
                this.sdata.owners.unshift(...temp);
            },
            //根据申请类型和登录人类型，显示对应的权利归属
            rightOwnTypeIns(rightOwnTypeItem) {
                var flag = false;
                rightOwnTypeItem.ins.forEach((item) => {
                    if (item.applyType == this.sdata.applyType && item.accountType == this.accountType) {
                        flag = true;
                        if (!this.sdata.rightOwnType) {
                            this.sdata.rightOwnType = rightOwnTypeItem.val;
                        }
                        return flag;
                    }
                })
                return flag;
            },

            applyTypeChange(val, idx) {
                var item = this.sdata.owners[idx];
                if (item.country != '中国大陆' && item.applyType == '2') {
                    item.peopleKind = '4'
                } else {
                    item.peopleKind = val.toString()
                }
                item.idType = ''
            },

            //权限归属切换行为
            changeRightOwnType() {
                //console.log('this.$route.query', this.$route.query)
                this.sdata.rightOwnTypeAttachment.relevantFileName = this.options.options_rightOwnType[this.sdata.rightOwnType - 1].relevantFileName;
                //如果没有flowNumer参数并且是非编辑状态，表示非回填，则初始化数据
                if (!this.flowNumber && !this.getSessionData()) {
                    this._initData();
                }
                switch (this.typeGroup) {
                    case '111'://个人作品[1、1、1]
                        this._applyOwnerInfo({
                            applyType: '1'
                        })

                        this.disableds = {
                            owner_applyType: true,
                            country: !!this.ownerInfo.country,
                            peopleKind: true,
                            ownerName: true,
                            idType: !!this.ownerInfo.idType,
                            idNumber: !!this.ownerInfo.idNumber,
                            cardFront: !!this.ownerInfo.cardFront,
                            cardBack: !!this.ownerInfo.cardBack,
                            certificatePath: !!this.ownerInfo.certificatePath,
                            ownerDel: true,
                        }
                        break;
                    case '123'://法人作品[1,2,3]
                        this._applyOwnerInfo({
                            peopleKind: '2',
                            applyType: this.getUserAccountType()
                        })

                        this.disableds = {
                            owner_applyType: true,
                            country: !!this.ownerInfo.country,
                            peopleKind: true,
                            ownerName: true,
                            idType: !!this.ownerInfo.idType,
                            idNumber: !!this.ownerInfo.idNumber,
                            cardFront: !!this.ownerInfo.cardFront,
                            cardBack: !!this.ownerInfo.cardBack,
                            certificatePath: !!this.ownerInfo.certificatePath,
                        }
                        break;
                    case '124': //职务作品[1,2,4]
                        this._applyOwnerInfo({
                            authorNum: 100,
                            applyType: this.getUserAccountType()
                        })
                        this.sdata.authors[0].name = '';
                        this.disableds = {
                            owner_applyType: true,
                            country: !!this.ownerInfo.country,
                            peopleKind: true,
                            ownerName: true,
                            idType: !!this.ownerInfo.idType,
                            idNumber: !!this.ownerInfo.idNumber,
                            cardFront: !!this.ownerInfo.cardFront,
                            cardBack: !!this.ownerInfo.cardBack,
                            certificatePath: !!this.ownerInfo.certificatePath,
                        }
                        break;
                    case '112'://合作作品[1,1 ,2], [1,2,2]
                    case '122':
                        this._applyOwnerInfo({
                            ownerNum: 100,
                            authorNum: 100,
                            applyType: this.getUserAccountType()
                        })

                        this.disableds = {
                            owner_applyType: true,
                            country: !!this.ownerInfo.country,
                            peopleKind: !!this.ownerInfo.peopleKind,
                            ownerName: true,
                            idType: !!this.ownerInfo.idType,
                            idNumber: !!this.ownerInfo.idNumber,
                            cardFront: !!this.ownerInfo.cardFront,
                            cardBack: !!this.ownerInfo.cardBack,
                            certificatePath: !!this.ownerInfo.certificatePath,
                            ownerDel: true,
                            authorName: true,
                            authorDel: true,
                        }
                        this.addOwner();
                        break;
                    case '115'://委托作品 //[1,1 ,5], [1,2,5]
                    case '125':
                        this._applyOwnerInfo({
                            ownerNum: 100,
                            authorNum: 100,
                            applyType: this.getUserAccountType()
                        })
                        this.sdata.authors[0].name = '';
                        this.disableds = {
                            owner_applyType: true,
                            country: !!this.ownerInfo.country,
                            peopleKind: true,
                            ownerName: true,
                            idType: !!this.ownerInfo.idType,
                            idNumber: !!this.ownerInfo.idNumber,
                            cardFront: !!this.ownerInfo.cardFront,
                            cardBack: !!this.ownerInfo.cardBack,
                            certificatePath: !!this.ownerInfo.certificatePath,
                        }
                        break;
                    case '211'://[2,1 ,1], [2,2,1]
                    case '221':
                        this._applyOwnerInfo({}, true)
                        this.disableds = {
                            owner_applyType: true,
                            authorName: true
                        }
                        break;
                    case '212'://[2,1 ,2], [2,2,2]
                    case '222':
                        this._applyOwnerInfo({
                            ownerNum: 100,
                            authorNum: 100
                        }, true)

                        this.addOwner();
                        this.disableds = {
                            authorName: true,
                            authorDel: true,
                        }
                        break;
                    case '213'://[2,1 ,3], [2,2,3]
                    case '223':
                        this._applyOwnerInfo({
                            applyType: '2',
                            peopleKind: '2'
                        }, true)
                        this.disableds = {
                            owner_applyType: true,
                            authorName: true,
                            authorDel: true,
                        }
                        break;
                    case '214'://[2,1 ,4], [2,2,4]
                    case '224':
                        this._applyOwnerInfo({
                            applyType: '2',
                            peopleKind: '2',
                            authorNum: 100
                        }, true)
                        this.disableds = {
                            owner_applyType: true,
                            ownerDel: true,
                        }
                        break;
                    case '215'://[2,1 ,5], [2,2,5]
                    case '225':
                        this._applyOwnerInfo({
                            ownerNum: 100,
                            authorNum: 100
                        }, true)
                        this.disableds = {
                            ownerDel: true,
                        }
                        break;
                }

                return false;

            },
            _initData() {
                console.log('_initData', this.sdata.owners)
                this.ownerNum = 1;
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

                this.disableds = {
                    peopleKind: false,
                    ownerName: false,
                    mobile: false,
                    ownerDel: false,
                    authorName: false,
                    authorDel: false,
                    owner_applyType: false,
                }
                this.sdata.owners[0].peopleKind = '';
                this.sdata.owners[0].name = '';
                this.sdata.owners[0].mobile = '';
                this.sdata.authors[0].name = '';
            },
            _applyOwnerInfo(opts, owner0) {
                if (!this.flowNumber) {
                    this.sdata.owners = this.sdata.owners.splice(0, 1)
                    this.sdata.authors = this.sdata.authors.splice(0, 1)
                }
                this.ownerNum = opts.ownerNum || 1;
                this.authorNum = opts.authorNum || 1;
                this.sdata.owners[0].applyType = opts.applyType || '1';

                if (!owner0) {
                    this.sdata.owners[0].country = this.ownerInfo.country;
                    this.sdata.owners[0].peopleKind = this.ownerInfo.peopleKind;
                    this.sdata.owners[0].name = this.ownerInfo.name;
                    this.sdata.owners[0].idNumber = this.ownerInfo.idNumber;
                    this.sdata.owners[0].mobile = this.user.phone;
                    this.sdata.owners[0].cardFront = this.ownerInfo.cardFront||this.ownerInfo.certificatePath;
                    this.sdata.owners[0].cardBack = this.ownerInfo.cardBack;
                    this.sdata.authors[0].name = this.ownerInfo.name;

                    setTimeout(() => {
                        //受著作人类型个人/机构影响
                        this.sdata.owners[0].idType = this.ownerInfo.idType;
                    }, 100)
                }
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

            idcardFileSuccess(param, idx, type) {
                this.sdata.owners[idx][type] = param.filePath;
            },

            //所有权切换
            rightScopeChange(val) {
                this.sdata.rightOwnType = val - 1;
            },
            //移除拥有者
            removeOwner(idx) {
                if (['112', '122', '212', '222'].indexOf(this.typeGroup) > -1 && this.sdata.owners.length == 2) {
                    this.$message.error('著作权人至少2位');
                    return false;
                }
                this.sdata.owners.splice(idx, 1)
                this.sdata.authors.splice(idx, 1)
            },
            //清空拥有者信息
            clearOwner(idx) {
                this.sdata.owners.splice(idx, 1, {
                    "applyType": "1",
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
                    "applyType": "1",
                    "applyCopy": "0",
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "province": "",
                    "city": "",
                    "idNumber": "",
                    "idType": "",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "1",
                    "role": "OWN"
                })

                if (['112', '122', '212', '222'].indexOf(this.typeGroup) > -1) {
                    this.addAuthor();
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
            if (!this.flowNumber) {//获取著作权人信息
                api.ownerInfo({
                    "applyType": "1",//"申请类型 固定为1：著作权人申请，（代理人申请的时候著作权人信息由用户填写）",
                    "rightOwnType": "1",//"权力归属方式（1：个人作品 2：合作作品 3：法人作品 4：职务作品 5： 委托作品）",
                    "accountId": this.user.id
                }).then(ret => {
                    this.ownerInfo = ret.data;
                    console.log('this.ownerInfo', JSON.parse(JSON.stringify(this.ownerInfo)))
                    this.changeRightOwnType();
                })
            } else {
                this.changeRightOwnType();
            }

        }
    }
</script>

<style lang='less' scoped>

</style>