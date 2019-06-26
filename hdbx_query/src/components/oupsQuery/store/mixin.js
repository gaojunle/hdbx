// 定义一个混入对象
import store from './index'

const myMixin = {
    created: function () {
        console.log(this.$router)
    },
    methods: {
        //上一步
        stepPrev(step, applyType) {
            step = parseInt(step);
            this.$router.push('/index/' + (--step))
        },
        //下一步
        stepNext(step, applyType) {
            if (!this.validate()) {
                return false
            }

            step = parseInt(step);
            console.log(step)
            switch (step) {
                case 0:
                    this.sdata.applyType = applyType;
                    this.$router.push('/index/' + (++step))
                    break;
                case 1:
                    this.$router.push('/index/' + (++step))
                    break;
                case 2:
                    this.$router.push('/index/' + (++step))
                    break;
                case 3:
                    this.$router.push('/index/' + (++step))
                    break;
                case 4:
                    this.$router.push('/index/' + (++step))
                    break;
                case 5:
                    this.$router.push('/index/' + (++step))
                    break;
                default:
                    this.$router.push('/index/0')
            }
        },

        //验证
        validate() {
            var flag = true;

            Object.values(this.$refs).forEach((ref) => {
                if (Array.isArray(ref)) {
                    var _flag = true;
                    ref.forEach((_ref) => {
                        if (!_ref.validate()) {
                            _flag = false;
                            return _flag;
                        }
                    })
                    if (!_flag) {
                        flag = false;
                        return flag;
                    }
                } else {
                    if (!ref.validate()) {
                        flag = false;
                        return flag;
                    }
                }
            })
            console.log(flag);
            return flag;
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
    }
}

export default myMixin;
