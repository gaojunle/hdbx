<template>
    <uploader
            :options="options"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-error="onFileError"
            :headers="headers"
            :class="['uploader-box',theme,isDisabled?'disabled':'']">

        <!--按钮式上传-->
        <uploader-drop v-if="theme=='btn'" class="upload_btn">
            <uploader-btn :attrs="attrs" :class="{preview:filePath}">{{uptext}}</uploader-btn>
        </uploader-drop>

        <!--图卡式上传-->
        <div class="up-card" v-if="theme=='card'">
            <uploader-drop>
                <uploader-btn :attrs="attrs" class="upload_card" :class="{preview:filePath}">
                    <img src="../../../assets/img/steps/icon_upload.png" alt="">
                    <span class="uptxt">{{uptext||'点击上传'}}</span>
                </uploader-btn>
                <div v-if="filePath" class="preview-box">
                    <img class="filePath" :src="filePath" alt="已上传图片">
                </div>
            </uploader-drop>
            <div v-if="isError" class="error-tip">
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA5RUE2ODE5OTcxRjExRTlCRjdDRDdBQjg1RTAzQURGIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA5RUE2ODFBOTcxRjExRTlCRjdDRDdBQjg1RTAzQURGIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDlFQTY4MTc5NzFGMTFFOUJGN0NEN0FCODVFMDNBREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDlFQTY4MTg5NzFGMTFFOUJGN0NEN0FCODVFMDNBREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6keNNKAAABH0lEQVR42oxSXU7CQBhcTQgt9ACI7yT8JVyEJ56scgr+wgWMAqcAypNPXMRE0MR3fg5QbQkvQ2e167ZQcJNJNtOZ7fczAoBQWK/zaLeHKBY/kE7vJEqld3S7z9hsbnTtn2kyeYBpepI6hWz2C45jR43jcTPREMevWWC1uoVh+JJMpfaoVBZH4mr1TX7jPZP5ZtkCrdZICWq1V3ieiXp9rjjbdiRXLi8V1+kMBAqFz8jroZBm/a5rguEJVULc7PvGSRMRTPtaJB3gSpw7Z0ttNF7gutbRX4PdXh4O7zTrw+n1nn7SEi6e/TIp8Z7IhbNgEOQ6GIDp9P7fAZjN7qKRo5mvJRksyw1NUSPBIAf1y36YJoKp6fcfsd3mdO1BgAEAAG6l2TCpFr4AAAAASUVORK5CYII="
                     class="error-icon">
                <span class="error-txt">请您先上传图片</span>
            </div>
            <div v-if="examples" class="tip-box">
                <span style="color: red">注意：</span>
                <a href="#" class="cBlue"
                   @click.prevent="openExample">查看</a>
                <span class="cGray">示例，</span>
                <a :href="examples.exampleUrl"
                   target="_blank" class="cBlue">下载示例</a>
            </div>
        </div>

        <!--身份证上传-->
        <uploader-drop v-if="theme=='idcard'">
            <uploader-btn :attrs="attrs" class="upload_card" :class="{preview:filePath}">
                <img class="upbtn" src="../../../assets/img/steps/icon_upload_idcard.png" alt="">
                <span class="uptxt">{{uptext}}</span>
            </uploader-btn>
            <div v-if="filePath" class="preview-box">
                <img class="filePath" :src="filePath" alt="">
            </div>
        </uploader-drop>
    </uploader>
</template>

<script>
    import Vue from 'vue'
    import uploader from 'vue-simple-uploader'
    import {API_HOST} from '@share/api/config'

    Vue.use(uploader)

    export default {
        props: {
            isDisabled: {
                type: Boolean,
                default: false
            },
            uptext: {
                type: String,
                default: ''
            },
            path: {
                type: String,
                default: ''
            },
            examples: {
                type: Object,
                default() {
                    return null
                }
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
                        target: API_HOST + '/fileServer',
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
                filePath: this.path,
                headers: {
                    Authorization: 'Bearer ' + (getCookie() ? getCookie().authorization_token : ''),
                    authorization_token: getCookie() ? getCookie().authorization_token : '',
                    authorization_key: getCookie() ? getCookie().authorization_key : '',
                },
                isError: false
            }
        },
        watch: {
            path(val) {
                console.log(val);
                this.filePath = val;
            },
            filePath(val) {
                this.isError = !val
            }
        },
        methods: {
            onFileAdded(evt) {
                if (this.theme == 'card' || this.theme == 'idcard') {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        this.filePath = e.target.result;
                    }
                    reader.readAsDataURL(evt.file)
                }
            },
            onFileSuccess(rootFile, file, response, chunk) {
                let res = JSON.parse(response);
                //console.log(file);
                this.$emit('fileSuccess', {
                    filePath: res.data.filePath,
                    fileName: file.name
                })
                this.filePath = res.data.filePath
            },

            onFileError(rootFile, file, response, chunk) {
                //console.log(error)
            },

            //打开示例
            openExample() {
                this.$alert('<img src="' + this.examples.exampleUrl + '" style="width: 600px;height: 400px;">', '示例', {
                    dangerouslyUseHTMLString: true
                });
            },

            validate() {
                if (!this.filePath) {
                    this.isError = true;
                }
                return !!this.filePath;
            }
        }
    }
</script>

<style lang="less" rel="stylesheet/less">
    @borderColor: rgb(220, 228, 230);
    @blue: #0168b7;
    @cGrey: #999999;
    @cBlue: #0068b7;
    .uploader-box {
        font-size: 14px;
        position: relative;
        padding: 8px;
        &.disabled {
            .uploader-drop {
                position: relative;
                &:after {
                    content: ' ';
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .1);
                    border-radius: 5px;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    z-index: 1;
                }
            }

        }
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
        &.idcard {
            background-color: rgb(255, 255, 255);
            width: 169px;
            height: 107px;
            .uploader-drop {
                .uploader-btn {
                    &.upload_card {
                        flex-direction: column;
                        font-size: 14px;
                        color: rgb(102, 102, 102);
                        padding-top: 32px;
                        justify-content: flex-start;
                        .upbtn {
                            width: 35px;
                        }
                        .uptxt {
                            padding-top: 10px;
                            color: #0068b7;
                        }
                    }
                }
            }
        }
        .up-card {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }
        .uploader-drop {
            position: relative;
            overflow: hidden;
            border: 1px solid rgb(220, 228, 230);
            border-radius: 5px;
            background-color: white;
            height: 100%;
            box-sizing: border-box;
            padding: 0px;
            width: 160px;
            height: 220px;

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
                &:hover {
                    background-color: rgba(0, 0, 0, .02);
                }
                &.preview {
                    opacity: 0;
                }
                &.upload_card {
                    flex-direction: column;
                    font-size: 14px;
                    color: rgb(102, 102, 102);
                    justify-content: flex-start;
                    padding-top: 60px;
                    box-sizing: border-box;
                    .uptxt {
                        padding-top: 60px;
                    }
                }
            }
            .preview-box {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                .filePath {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
        }
        .uploader-list {
            display: none;
        }
        .tip-box {
            color: red;
            font-size: 14px;
            font-weight: normal;
            padding-top: 10px;
            .cGray {
                color: @cGrey;
            }
            .cBlue {
                color: @cBlue;
            }
        }
        .error-tip {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: red;
            padding-top: 10px;
            .error-txt {
                padding-left: 5px;
            }
        }
    }
</style>
