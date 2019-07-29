<template>
    <div class="step step_0">
        <div class="mbox">
            <div class="person" :class="{on:sdata.applyType=='1'}" @click="stepNext(1)">
                <div class="s_icon s_per"></div>
                <div class="type">我是著作权人</div>
                <div class="desc">办理本人业务或以个人名义代理他人办理业务</div>
            </div>

            <div class="company" :class="{on:sdata.applyType=='2'}" @click="sdata.applyType=2;showAuthPaper=true">
                <div class="s_icon s_paper"></div>
                <div class="type">我是代理人</div>
                <div class="desc">办理本人所属机构业务或以本人所属机构名义代理他人办理业务</div>
            </div>
        </div>

        <!--上传弹层-->
        <el-form v-if="showAuthPaper"
                 :model="sdata" ref="form_0"
                 :rules="rules"
                 class="pop-box upload_auth_paper"
                 :class="{show:showAuthPaper}">
            <div class="pop-cont">
                <div class="pop-title">上传授权委托书</div>
                <div class="pop-close" @click="showAuthPaper=false">X</div>
                <div class="upbox">
                    <FileUpload
                            ref="UP_AuthAttachment"
                            theme="card"
                            uptext="点击上传"
                            :path="sdata.authAttachment.path"
                            :examples="{exampleUrl:options.exampleUrl}"
                            :disabled="isDisabled('authAttachment')"
                            @fileSuccess="((params)=>{onFileUploaded(params,sdata.authAttachment)})">
                    </FileUpload>
                </div>
                <p class="desc">申请人委托代理人办理登记事宜，具体委托事项如下：</p>
                <el-form-item prop="agentDesc">
                    <el-input :disabled="isDisabled('agentDesc')" placeholder="登记申请"
                              v-model="sdata.agentDesc"></el-input>
                </el-form-item>
                <div class="step-btns">
                    <el-button type="primary" @click="stepNext(2)">确 定</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
    import api from '../../../api'
    import '../components/index.less'
    import options from '../store/options'
    import store from '../store/index'
    import myMixin from '../store/mixin'
    import FileUpload from '../components/FileUpload'

    export default {
        components: {FileUpload},
        mixins: [myMixin],
        data() {
            return {
                options: options,
                showAuthPaper: false,
                sdata: store.sdata,
                rules: store.rules
            }
        },

        methods: {
            //设置用户真实信息
            setUserInfo() {
                this.user = getCookie('webUserInfo') || {};
                store.user = this.user;
                this.sdata.accountId = this.user.id;
                store.sdata.accountId = this.user.id;
                this.sdata.accountType = (parseInt(this.user.accountType) + 1);//accountType：用户类型，0：个人、1：机构
                store.sdata.accountType = (parseInt(this.user.accountType) + 1).toString();
            }
        },
        async created() {
            //TODO 登录后，调用setUser方法，此外测试用户登录后刷新即可；
            autoToLogin()
            this.setUserInfo();

            //console.log('this.user', JSON.parse(JSON.stringify(this.user)));
            //TODO 测试判断用户是否登录
            if (!getCookie('webUserInfo')) {
                this.$alert('<p style="text-align: center;color: red;padding: 10px 40px;">用户未登录，请先登录，并刷新</p>', '提示', {
                    dangerouslyUseHTMLString: true
                });
                return false;
            }

            //获取是否回显标记；
            this.flowNumber = this.$route.query.flowNumber;

            //如果本地有数据，优先使用session数据（用户编辑数据），然后判断是否是回填数据；
            if (this.getSessionData()) {
                store.sdata = this.getSessionData();
                this.sdata = store.sdata;
            } else {
                if (this.flowNumber) {
                    await api.z11InfoAndReFillInfo({flowNumber: this.flowNumber}).then((ret) => {
                        var _sdata = ret.data.z11RegisterApplyInfoVo;
                        if (!_sdata.authAttachment) {
                            _sdata.authAttachment = {//选择代理人时，授权委托书
                                "attachmentId": "",
                                "flowNumber": "",
                                "segmentName": "",
                                "attachmentName": "",
                                "relevantFileName": "",
                                "path": "",
                                "remark": "",
                                "createTime": "",
                                "updateTime": "",
                                "baseId": null
                            }
                        }
                        if (!_sdata.rightOwnTypeAttachment) {
                            _sdata.rightOwnTypeAttachment = {//rightOwnType为1时没有附件
                                relevantFileName: '',
                                path: '',
                                remark: ''
                            }
                        }
                        if (!_sdata.rightScopePart) {
                            _sdata.rightScopePart = [];
                        }
                        this.sdata = _sdata;
                        store.sdata = _sdata;
                        store.reFillin = ret.data.reFillin;
                        this.setSessionData();
                        //location.reload();
                    })
                }
            }

            console.log('this.sdata', JSON.parse(JSON.stringify(this.sdata)))
        },
        mounted() {
            //获取登记方式
            api.getRegistrationMethod({}).then(ret => {
                options.options_registrationMethod = [];
                ret.data.forEach((item, idx) => {
                    if (item.parent == 'HALL') {
                        options.options_registrationMethod.push({
                            val: item.code,
                            name: item.value,
                            addr: item.description
                        })
                    }
                });
            })
        }
    }
</script>