<template>
  <label v-if="Array.isArray(checkboxValue)" :class="['hd-checkbox', {'check': checkboxValue.some(value => value === name)}]">
    <input class="checkbox" type="checkbox" :value="label" :checked="checkboxValue === label" :id="label" :name="name" @change="handleCheckboxArray">
    <slot></slot>
  </label>
  <label v-else :class="['hd-checkbox', {'check': checkboxValue}]">
    <input class="checkbox" type="checkbox" :value="label" :checked="checkboxValue" :id="label" :name="name" @change="$emit('change', $event.target.checked)">
    <slot></slot>
  </label>
</template>

<script>

export default {
  data() {
    return {
    }
  },
  model: {
    prop: 'checkboxValue',
    event: 'change'
  },
  props: {
    checkboxValue: {
      default: () => []
    },
    label: {
      default: ''
    },
    name: {
      default: ''
    }
  },
  computed: {},
  components: {
  },
  methods: {
    /**
     * 多选框改变
     */
    handleCheckboxArray(event) {
      let value = event.target.name
      // let checked = event.target.checked
      let checkboxValue = [...this.checkboxValue]
      let checked = checkboxValue.some(item => item === value)
      if (checked) {
        let index = checkboxValue.findIndex(val => val === value)
        checkboxValue.splice(index, 1)
      } else {
        checkboxValue.push(value)
      }
      this.$emit('change', checkboxValue)
    }
  },
  watch: {},
  mounted() { },
  created() { },
}

</script>
<style lang='scss' scoped>
label {
  padding-left: 20px;
  min-height: 20px;
  background-color: #dddddd;
  background: url("../../img/checkbox/none.jpg") left center no-repeat;
  cursor: pointer;
}
.check {
  background-image: url("../../img/checkbox/check.jpg");
}
input {
  display: none;
}
</style>