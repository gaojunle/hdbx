<template>
    <div class="step step_0">
        <div class="mbox">
            <div class="person"
                 :class="{on:sdata.applyType=='1',disabled:(sdata.applyType!='1'&&isDisabled('applyType'))}"
                 @click="selOnwer(sdata.applyType!='1'&&isDisabled('applyType'))">
                <div class="s_icon s_per"></div>
                <div class="type">我是著作权人</div>
                <div class="desc">办理本人业务或以个人名义代理他人办理业务</div>
            </div>

            <div class="company"
                 :class="{on:sdata.applyType=='2',disabled:(sdata.applyType!='2'&&isDisabled('applyType'))}"
                 @click="selProxy(sdata.applyType!='2'&&isDisabled('applyType'))">
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
            selOnwer(flag) {
                if (!flag) {
                    this.stepNext(1)
                }
            },
            selProxy(flag) {
                if (!flag) {
                    this.sdata.applyType = 2;
                    this.showAuthPaper = true;
                }
            }
        },
        async created() {
            //首页获取回填数据，后面步骤从session中获取
            if (getCookie('webUserInfo') && !this.getSessionData() && this.flowNumber) {
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
                    sessionStorage.setItem('hdbx_reFillin_' + this.user.id, JSON.stringify(ret.data.reFillin))
                    this.setSessionData();
                    //location.reload();
                })
            }
        },
        mounted() {
            //console.log('this.user', JSON.parse(JSON.stringify(this.user)));
            //TODO 测试判断用户是否登录
            if (!getCookie('webUserInfo')) {
                this.$alert('<p style="text-align: center;color: red;padding: 10px 40px;">用户未登录，请先登录，并刷新</p>', '提示', {
                    dangerouslyUseHTMLString: true,
                    callback: action => {
                        if (this.$route.name != 'chooseIdentity') {
                            this.$router.push('/chooseIdentity');
                        }
                    }
                });

                return false;
            }
        }
    }
</script>