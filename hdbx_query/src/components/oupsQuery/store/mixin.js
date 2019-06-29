// 定义一个混入对象
import store from './index'

const myMixin = {
    created: function () {

        if (this.getSessionData()) {
            this.sdata = this.getSessionData();
            store.sdata = this.getSessionData();
        }

        if (this.$route.query.clear == 1) {
            this.clearSessionData()
        }
        console.log(this.sdata.applyType, this.sdata.accountType)
    },
    methods: {
        //上一步
        stepPrev(step, applyType) {
            step = parseInt(step);
            this.$router.push('/index/' + (--step))
        },
        //下一步
        async stepNext(step, applyType) {
            var t = await this.validate();
            if (!t) {
                return false
            }

            step = parseInt(step);

            switch (step) {
                case 0:
                    //填报身份不一致时，清除缓存
                    console.log(this.sdata.applyType, applyType.toString())
                    if (this.sdata.applyType != applyType.toString()) {
                        this.clearSessionData()
                    }
                    this.sdata.applyType = applyType.toString();
                    this.$router.push('/index/' + (++step))
                    break;
                case 1:
                    this.$router.push('/index/' + (++step))
                    break;
                case 2:
                    this.$router.push('/index/' + (++step))
                    break;
                case 3:
                    //确认填写完成后，清掉缓存
                    this.clearSessionData()
                    this.$router.push('/index/' + (++step))
                    break;
                case 4:
                    this.$router.push('/index/' + (++step))
                    break;
                case 5:
                    this.$router.push('/index/' + (++step))
                    break;
                default:
                    this.clearSessionData()
                    this.$router.push('/index/0')
            }
            this.setSessionData();
        },

        //验证
        validate() {
            var flag = true;

            console.log(this.$refs)
            return new Promise((resolve, reject) => {
                Object.values(this.$refs).forEach((ref) => {
                    console.log(Array.isArray(ref))
                    if (Array.isArray(ref)) {
                        ref.forEach((_ref) => {
                            doValidate(_ref)
                        })
                    } else {
                        if (ref) {
                            doValidate(ref)
                        }
                    }
                })
                setTimeout(() => {
                    console.log('validate next:' + flag);
                    resolve(flag)
                }, 200)

                function doValidate(ref) {
                    //console.log('ref.$el.className' + ref.$el.className + (ref.$el.className == 'el-form'));
                    if (ref.$el.className == 'el-form') {
                        console.log(ref.validate())
                        ref.validate((val) => {
                            if (val == false) {
                                flag = false;
                                resolve(flag)
                            }
                        })
                    } else {
                        if (ref.validate() == false) {
                            flag = false;
                            resolve(flag)
                        }
                    }
                }
            })
        },

        //验证是否可编辑
        isDisabled(key) {
            return store.fdata.reFillin.indexOf(key) == -1;
        },

        //将select字段值转为text显示
        formatOptionData(option, val) {
            var ret = ''
            this.options[option].forEach((item) => {
                if (item.val == val) {
                    ret = item.text;
                }
            })
            return ret
        },

        //移除上传文件
        removeUploadFile(dataRef, idx) {
            console.log(dataRef)
            dataRef.splice(idx, 1);
        },

        //文件上传成功回调
        onFileUploaded(uploadedParams, dataRef, type) {
            console.log(uploadedParams, dataRef, type)
            let item = {
                attachmentName: uploadedParams.fileName,
                path: uploadedParams.filePath
            }
            if (type == 'multi') {
                dataRef.push(item);
            } else {
                dataRef = item;
            }
        },

        setSessionData() {
            sessionStorage.setItem('sdata', JSON.stringify(this.sdata))
        },
        getSessionData() {
            return JSON.parse(sessionStorage.getItem('sdata'))
        },
        clearSessionData() {
            store.sdata = store.sdata_init;
            this.sdata = store.sdata_init;
            sessionStorage.setItem('sdata', null)
        }
    }
}

export default myMixin;
