<template>
    <div class="material-upload">
        <div class="title">请您按照要求上传电子材料</div>
        <ul>
            <li v-for="(value, key) in uploadObj" :key="key">
                <span v-if="key === 'upload1'">原登记证书</span>
                <span v-else>著作权人身份证明</span>
                <file-upload :ref="key" :who="key"
                             class="left" :showFont="value.showFont"
                             @on-change="onChange" @on-complete="onComplete"
                             @on-close="onClose"></file-upload>
                <div class="error" v-show="error[value.who]" v-text="error[value.who]"></div>
            </li>
        </ul>
    </div>
</template>

<script>

    import '@css/common/registerQuery/materialUpload'
    import fileUpload from '@share/components/common/fileUpload'

    export default{
        data (){
            return {
                params: {
                    exCertificate: '', // 原登记证书
                    identity: [], // 身份证明
                }, // 需要上传的数据
                paramData: {
                    exCertificate: '', // 原登记证书
                }, // 上传后的文件地址
                error: {
                    exCertificate: '', // 原登记证书
                }, //错误信息提示
                uploadObj: {
                    upload1: {
                        url: false,
                        who: 'exCertificate',
                        showFont: '请上传原登记证书',
                    }, // 原登记证书
                }, // 上传的状态
                imgLenAll: 0, // 需要上传的图片总数量
                imgLen: 0, // 已上传的图片数量
                imgAllSuccess: false, // 所有图片上传成功
            }
        },
        components: {fileUpload},
        methods: {
            /**
             * 添加图片时触发
             * @param who
             */
            onChange(who) {
                let data = this.uploadObj[who]['who']
                this.uploadObj[who]['url'] = true
                this.error[data] = ''
            },
            /**
             * 删除图片时触发
             * @param who
             */
            onClose(who) {
                let data = this.uploadObj[who]['who']
                this.uploadObj[who]['url'] = false
                this.paramData[data] = ''
            },
            /**
             * 上传图片/文件
             */
            imgUpload() {
                if (!this.checkUpload()) return this.$emit('upLoadError')
                this.imgAllSuccess = true
                let keys = Object.keys(this.$refs)
                this.imgLenAll = keys.length
                keys.forEach(key => {
                    if (key.includes('upload')) {
                        this.needSubmit(key)
                    } else {
                        this.imgLenAll--
                    }
                })
            },
            /**
             * 查看有没有没有上传的图片
             */
            checkUpload() {
                let flag = true
                Object.values(this.uploadObj).forEach(upload => {
                    if (!upload.url) {
                        this.error[upload.who] = upload.showFont
                        flag = false
                    }
                })
                return flag
            },
            /**
             * 需要上传的图片
             * @param key
             */
            needSubmit(key) {
                let data = this.uploadObj[key]['who']
                if (this.paramData[data]) {
                    this.imgLenAll--
                    if (this.imgLenAll === 0) this.upload()
                } else {
                    this.$refs[key][0].submit()
                }
            },
            /**
             * 上传成功或失败后调用
             * @param who
             * @param url
             */
            onComplete(who, url) {
                if (url) {
                    let data = this.uploadObj[who]['who']
                    this.paramData[data] = url
                } else {
                    this.imgAllSuccess = false
                }

                this.imgLen++

                if (this.imgLen === this.imgLenAll) {
                    this.imgLen = 0
                    if (this.imgAllSuccess) {
                        this.upload()
                    }else {
                        this.$emit('upLoadError')
                    }
                }
            },
            /**
             * 全部上传成功
             */
            upload() {
                this.params.exCertificate = this.paramData.exCertificate
                this.params.identity = Object.values(this.paramData).map(item => item)
                this.params.identity.shift()
                if(this.params.identity.length === 0) delete this.params.identity
                this.$emit('upLoadSuccess', this.params)
            },
            /**
             * 更新需要上传身份证明的数量
             * @param owners需要上传身份证明的数量
             */
            updataUploadObj(owners) {
                let upload1 = Object.assign({}, this.uploadObj.upload1)
                let exCertificate = this.paramData.exCertificate
                this.uploadObj = {upload1}
                owners.forEach((owner, index) => {
                    let num = index + 2
                    this.$set(this.uploadObj, 'upload' + num, {
                        url: false,
                        who: 'identity' + num,
                        showFont: '请上传著作权人身份证明',
                    })
                })

                this.params.identity = []
                this.paramData = {exCertificate}
                this.error = {exCertificate: ''}
            },
            /**
             * 设置需要上传的信息
             * @param data
             */
            setParams(data) {
                if (!data.exCertificate) return
                this.params.exCertificate = data.exCertificate
                this.paramData.exCertificate = data.exCertificate
                this.uploadObj.upload1.url = true
                this.$refs.upload1[0].initFile(data.exCertificate)

                if (!data.identity) return
                if (data.identity.length === 0) return
                this.params.identity = data.identity
                data.identity.forEach((item, index) => {
                    let num = index + 2
                    this.paramData['identity' + num] = item
                    this.$set(this.uploadObj, 'upload' + num, {
                        url: true,
                        who: 'identity' + num,
                        showFont: '请上传著作权人身份证明',
                    })
                    this.$nextTick(() => {
                        this.$refs['upload' + num][0].initFile(item)
                    })
                })
            },
        },
        mounted(){

        },
        watch: {},
        created() {

        }
    }

</script>