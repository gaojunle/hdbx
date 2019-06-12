<template>
  <label :class="['hd-radio', {'check': radioValue === label}]">
    <input class="radio" type="radio" :value="label" :checked="radioValue === label" :id="label" :name="name"
    @change="$emit('change', $event.target.id)">
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
    prop: 'radioValue',
    event: 'change'
  },
  props: {
    radioValue: {
      default: ''
    },
    label: {
      default: ''
    },
    name: {
      default: ''
    }
  },
  computed: {},
  components: {},
  methods: {
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
  background: url('../../img/radio/none.png') left center no-repeat;
  cursor: pointer;
}
.check {
  background-image: url('../../img/radio/check.png')
}
input {
  display: none;
}
</style>