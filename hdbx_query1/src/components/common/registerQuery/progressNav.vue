<template>
  <div class="progressNav">
    <div class="query-crumbs">
        <ul>
          <li v-for="item in progress" :class="{'crumbs': item.step === currentPage, 'elastic': currentPage !== 1}">
            <div>
              <span class="crumbs-title">
                <span class="crumbs-img" v-if="item.step === 1">
                  <img v-if="item.step === currentPage && item.step === 1" :src="item.imgUrl1">
                  <img v-else :src="item.imgUrl2">
                </span>
                <span class="crumbs-img" v-else-if="item.step === 2">
                  <img v-if="item.step === currentPage && item.step === 2" :src="item.imgUrl1">
                  <img v-else :src="item.imgUrl2">
                </span>
                <span class="crumbs-img" v-else-if="item.step === 3">
                  <img v-if="item.step === currentPage && item.step === 3" :src="item.imgUrl1">
                  <img v-else :src="item.imgUrl2">
                </span>
                {{item.name}}
              </span>
            </div>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import '@css/common/registerQuery/progressNav'

export default {
  data() {
    return {
      progress: [
        {
          name: '1.申请登记查询',
          step: 1,
          imgUrl1 : require('../../../assets/img/progressNav/query_b.png'),
          imgUrl2 : require('../../../assets/img/progressNav/query_h.png'),
        },
        {
          name: '2.确认信息',
          step: 2,
          imgUrl1 : require('../../../assets/img/progressNav/information_b.png'),
          imgUrl2 : require('../../../assets/img/progressNav/information_h.png'),
        },
        {
          name: '3.打印材料',
          step: 3,
          imgUrl1 : require('../../../assets/img/progressNav/Printing_b.png'),
          imgUrl2 : require('../../../assets/img/progressNav/Printing_h.png'),
        },
      ], // 进度条
    }
  },
  props: ['currentPage'],
  components: {},
  methods: {
  },
  mounted() {

  },
  watch: {
  },
  created() {
  },
}
</script>