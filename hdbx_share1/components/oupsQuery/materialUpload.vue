<template>
  <div class="material-upload">
    <div class="title">请您按照要求上传电子材料</div>
    <ul>
      <li v-for="(item, index) in uploadObj" :key="index">
        <span v-text="item.title"></span>
        <file-upload :ref="item.who" :who="item.who" class="left" @on-change="onChange" @on-complete="onComplete" @on-close="onClose"></file-upload>
        <div class="error" v-show="item.error" v-text="item.error"></div>
      </li>
    </ul>
    <div class="disabled" v-if="disabled"></div>
  </div>
</template>

<script>

import '../../css/softQuery/materialUpload'
import fileUpload from '../common/fileUpload'

export default {
  data() {
    return {
      uploadObj: [], // 需要上传的文件
      imgLenAll: 0, // 需要上传的图片总数量
      imgLen: 0, // 已上传的图片数量
      imgAllSuccess: false, // 所有图片上传成功
    }
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }, // 是否可修改
    uploadFile: {
      type: Array,
      default: () => []
    }, // 需要上传的内容
  },
  components: { fileUpload },
  computed: {
  },
  methods: {
    /**
     * 添加图片时触发
     * @param who
     */
    onChange(who) {
      let index = this.uploadObj.findIndex(item => item.who === who)
      let data = this.uploadObj[index]
      data.img = true
      data.url = ''
      data.error = ''
      this.uploadObj.splice(index, 1, data)
    },
    /**
     * 删除图片时触发
     * @param who
     */
    onClose(who) {
      let index = this.uploadObj.findIndex(item => item.who === who)
      let data = this.uploadObj[index]
      data.img = false
      data.url = ''
      this.uploadObj.splice(index, 1, data)
    },
    /**
     * 上传图片/文件
     */
    imgUpload() {
      if (this.check()) return
      this.imgAllSuccess = true
      let keys = Object.keys(this.$refs)
      this.imgLenAll = keys.length
      keys.forEach(key => this.needSubmit(key))
    },
    /**
     * 查看有没有没有上传的图片
     */
    check() {
      let flag = false
      this.uploadObj.forEach((item, index) => {
        if (!item.img) {
          this.uploadObj[index].error = '请上传' + item.title
          flag = true
        }
      })
      return flag
    },
    /**
     * 需要上传的图片
     * @param key
     */
    needSubmit(key) {
      let index = this.uploadObj.findIndex(item => item.who === key)
      if (this.uploadObj[index].url) {
        this.imgLenAll--
        if (this.imgLenAll === 0) this.$emit('success', this.uploadObj)
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
        let index = this.uploadObj.findIndex(item => item.who === who)
        this.uploadObj[index].url = url
      } else {
        this.imgAllSuccess = false
      }

      this.imgLen++

      if (this.imgLen === this.imgLenAll) {
        this.imgLen = 0
        if (this.imgAllSuccess) this.$emit('success', this.uploadObj)
      }
    },
    /**
     * 渲染图片
     */
    initFile() {
      this.uploadObj.forEach(item => {
        if (item.url) this.$refs[item.who][0].initFile(item.url)
      })
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initFile()
    })
  },
  watch: {
    uploadFile: {
      handler(value) {
        this.uploadObj = []
        value.forEach(item => {
          let obj = {
            title: item.value,
            img: Boolean(item.url),
            who: item.key,
            url: item.url,
            error: '',
          }
          this.uploadObj.push(obj)
        })
      },
      deep: true
    }
  },
  created() {
    this.uploadFile.forEach(item => {
      let obj = {
        title: item.value,
        img: Boolean(item.url),
        who: item.key,
        url: item.url,
        error: '',
      }
      this.uploadObj.push(obj)
    })
  }
}

</script>