<template>
    <div class="step step_2">
        <OnwerAuthor ref="form_onwer"></OnwerAuthor>
        <el-form :model="sdata" ref="form_2" :rules="rules">
            <!--权利取得方式-->
            <ObtainType ref="form_ObtainType"></ObtainType>
            <!--权利拥有状况-->
            <RightScope ref="form_RightScope"></RightScope>
            <!--作品说明书-->
            <OpusDescriptionAttachment ref="form_OpusDescriptionAttachment"></OpusDescriptionAttachment>
        </el-form>
        <div class="step-btns big">
            <el-button @click="stepPrev($route.params.step)" class="big">上一步</el-button>
            <el-button type="primary" @click="stepNext($route.params.step)" class="big">下一步</el-button>
        </div>
    </div>
</template>
<script>
    import '../components/index.less'
    import options from '../store/options'
    import store from '../store/index'
    import myMixin from '../store/mixin'
    import FileUpload from '../components/FileUpload'
    import CountryCitySelect from '../components/CountryCitySelect'
    import OnwerAuthor from '../components/OnwerAuthor'
    import ObtainType from '../components/ObtainType'
    import RightScope from '../components/RightScope'
    import OpusDescriptionAttachment from '../components/OpusDescriptionAttachment'

    export default {
        components: {FileUpload, CountryCitySelect, OnwerAuthor, ObtainType, RightScope, OpusDescriptionAttachment},
        mixins: [myMixin],
        methods: {}
    }
</script>