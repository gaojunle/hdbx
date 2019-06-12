<template>
    <uploader
            :options="options"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-error="onFileError"
            class="uploader-box"
            :class="theme">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
            <uploader-btn :attrs="attrs" :class="{preview:previeImgPath}">{{uptext}}</uploader-btn>
            <div v-if="previeImgPath" class="preview-box">
                <img class="previeImgPath" :src="previeImgPath" alt="">
            </div>
        </uploader-drop>
        <uploader-list></uploader-list>
    </uploader>
    <!--
    <el-upload
            class="upload-box single"
            list-type="picture-card"
            :accept="uploadAccept"
            :show-file-list="false"
            :action="uploadUrl"
            :before-upload="((file)=>{handleBeforeUpload(file, 'authAttachment.path')})"
            :on-success="handleUploadSuccess"
            :limit="1">
        <div v-if="previeImgPath" class="preview-box">
            <img class="previeImgPath" :src="previeImgPath" alt="">
        </div>
        <i class="el-icon-plus"></i>
    </el-upload>
    -->
</template>

<script>
    import Vue from 'vue'
    import uploader from 'vue-simple-uploader'

    Vue.use(uploader)

    export default {
        props: {
            uptext: {
                type: String,
                default: '+'
            },
            splitor: {
                type: String,
                default: ''
            },
            theme: {
                type: String,
                default: 'card'
            },
            options: {
                type: Object,
                default() {
                    return {
                        // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
                        target: '//localhost:3000/upload',
                        fileParameterName: 'file', //上传文件时文件的参数名，默认file
                        testChunks: false,
                        singleFile: true,
                    }
                }
            },
        },
        data() {
            return {
                attrs: {
                    accept: 'image/*'
                },
                previeImgPath: ''
            }
        },
        methods: {
            onFileAdded(evt) {
                this.$emit('fileSuccess', {
                    splitor: this.splitor,
                    filePath: evt.name,
                    fileName: evt.name
                })
                if (this.theme == 'card') {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.previeImgPath = e.target.result;
                    }
                    reader.readAsDataURL(evt.file)
                }
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);

                //Bus.$emit('fileSuccess', res);
                console.log('上传成功');
            },

            onFileError(rootFile, file, response, chunk) {
                //console.log(error)
            },
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    .img-upload {
        > .img-thumbnail {
            margin-bottom: 10px;
            margin-right: 10px;
            position: relative;

            .btn {
                display: none;
                position: absolute;
                top: 0;
                right: 0;
            }

            &:hover .btn {
                display: block;
            }
        }
    }

    .uploader-box {
        width: 160px;
        height: 220px;
        font-size: 14px;
        border: 1px solid rgba(0, 0, 0, .1);
        border-radius: 5px;
        &.btn {
            width: 80px;
            height: 30px;
            border: none;

            .uploader-drop {
                width: 100%;
                height: 100%;
                background-color: #0168b7;
                border: none;
                border-radius: 3px;
                .uploader-btn {
                    font-size: 14px;
                    color: white;
                    border: none;
                }
            }

        }
        .uploader-drop {
            position: relative;
            overflow: hidden;
            border: 1px dashed #ccc;
            background-color: #f5f5f5;
            height: 100%;
            box-sizing: border-box;
            padding: 0px;

            .uploader-btn {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border: none;
                font-size: 30px;
                padding: 0px;
                position: absolute;
                left: 0px;
                top: 0px;
                z-index: 1;
                &.preview {
                    opacity: 0;
                }
            }
            .preview-box {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .previeImgPath {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }

        .uploader-list {
            display: none;
        }
    }
</style>
