<template>
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