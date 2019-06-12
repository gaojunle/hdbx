<template>
  <div class="file-upload">
    <el-upload class="avatar-uploader" ref="upload" :data-who="who" :show-file-list="false" :action="host" :auto-upload="autoUpload" :on-progress="handleProgress" :before-upload="handleBeforeUpload" :on-change="handleChange" :on-success="after" :on-error="fail" :headers="headers">
      <img v-show="file.img" :src="file.img" class="avatar" @click.stop>
      <div v-show="file.img" class="closeBtn" @click.stop="closeBtn"></div>
      <div class="uploading" v-show="file.starUpload" @click.stop>
        <div class="progress" ref="progress"></div>
        {{file.uploadFont}}
      </div>
      {{showFont}}
    </el-upload>
  </div>
</template>

<script>

import '../../css/theme'
import '../../css/common/fileUpload'

import Vue from 'vue'
import { API_HOST } from '../../api/config'
import { Upload } from 'element-ui'

Vue.use(Upload)

export default {
  data() {
    return {
      file: {
        img: '', // 封面图
        starUpload: false, // 开始上传中
        uploadFont: '', // 上传状态文案提示
      }, // 上传文件
      headers: {
        Authorization: 'Bearer ' + (getCookie() ? getCookie().authorization_token : ''),
        authorization_token: getCookie() ? getCookie().authorization_token : '',
        authorization_key: getCookie() ? getCookie().authorization_key : '',
      },
    }
  },
  props: {
    host: {
      type: String,
      default: API_HOST + '/fileServer'
    }, // 上传地址
    autoUpload: {
      type: Boolean,
      default: false
    }, // 是否自动上传
    uploadImg: {
      type: String,
      default: ''
    }, // 已上传的图片
    coverImg: {
      type: String,
      default: 'static/logo.png'
    }, // 封面图
    showFont: {
      type: String,
      default: '请上传图片'
    }, // 居中显示文案
    who: {
      type: String,
      default: ''
    }, // data中的字段名
    fileType: {
      type: String,
      default: 'img'
    }, // 需要上传的文件类型
  },
  components: {},
  methods: {
    /**
     * 添加初始化图片
     * @param url 图片链接
     */
    initFile(url) {
      this.file.img = url
    },
    /**
     * 改变上传图片时触发
     * @param file
     */
    handleChange(file, fileList) {
      let reader = '',
        _this = this,
        isImg = this.fileType === 'img'
      if (event.path.length < 1) return

      this.$emit('on-change', this.who)

      if (isImg && (file.raw.type === "image/png" || file.raw.type === "image/jpeg")) {
        reader = new FileReader()
        reader.readAsDataURL(file.raw)
        reader.onload = function () {
          _this.file.img = this.result
        }
      } else if (!isImg) {
        this.file.img = this.coverImg
      } else {
        this.$message({ message: '格式不正确', type: 'warning', center: true })
      }
    },
    /**
     * 关闭
     * @param imgName
     */
    closeBtn() {
      this.file.img = ''
      this.$refs.upload.clearFiles()
      this.$emit('on-close', this.who)
    },
    /**
     * 开始上传前
     */
    handleBeforeUpload(file) {
      this.file.starUpload = true
      this.file.uploadFont = '上传中_0%'
    },
    /**
     * 上传进度
     * @param event 当前文件上传状态
     * @param file 当前文件
     * @param list
     */
    handleProgress(event, file, list) {
      this.file.uploadFont = '上传中_' + parseInt(event.percent) + '%'
      this.$refs.progress.style.width = parseInt(event.percent) + '%'
    },
    /**
     * 上传失败的回调函数
     * @param err
     * @param file
     * @param fileList
     */
    fail(err, file, fileList) {
      this.file.uploadFont = '上传失败'
      this.$refs.progress.style.display = 'none'
      this.$message({ message: '上传失败', type: 'error', center: true })
      this.$emit('on-complete', this.who)
      setTimeout(() => {
        this.file.starUpload = false
      }, 2000)
    },
    /**
     * 上传成功后回调
     */
    after(res, file, list) {
      this.file.uploadFont = '上传成功'
      this.$refs.progress.style.display = 'none'
      this.$emit('on-complete', this.who, res.data.filePath)

      if (this.autoUpload) setTimeout(() => {
        this.file.starUpload = false
      }, 1000)
    },
    /**
     * 向外暴露的上传方法
     */
    submit() {
      this.$refs.upload.submit()
    }
  },
  mounted() {
  },
  watch: {},
  created() {
    this.file.img = this.uploadImg
  },
}

</script>