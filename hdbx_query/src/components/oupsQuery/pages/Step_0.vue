<template>
    <div class="step step_0">
        <div class="mbox">
            <div class="person" @click="stepNext($route.params.step,1)">
                <div class="s_icon s_per"></div>
                <div class="type">个人</div>
                <div class="desc">办理本人业务或以个人名义代理他人办理业务</div>
            </div>

            <div class="company" @click="sdata.applyType=2;showAuthPaper=true">
                <div class="s_icon s_paper"></div>
                <div class="type">机构</div>
                <div class="desc">办理本人所属机构业务或以本人所属机构名义代理他人办理业务</div>
            </div>
        </div>

        <!--上传弹层-->
        <el-form v-if="showAuthPaper" :model="sdata" ref="form_0" :rules="rules" class="pop-box upload_auth_paper"
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
                    <el-button type="primary" @click="stepNext($route.params.step,2)">确 定</el-button>
                </div>
            </div>
        </el-form>
    </div>
</template>
<script>
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
                rules: store.rules,
                fdata: store.fdata
            }
        },

        methods: {
        },
        mounted() {

        }
    }
</script>