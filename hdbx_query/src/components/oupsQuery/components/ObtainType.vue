<template>
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

<style lang='less' scoped>

</style>