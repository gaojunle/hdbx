<template>
    <!--权利拥有状况-->
    <el-form :model="sdata" ref="form_rightScope" :rules="rules" class="f_box rightScope">
        <span class="title required">权利拥有状况：</span>
        <el-radio-group
                :disabled="isDisabled('rightScope')"
                @change="rightScopeChange"
                v-model="sdata.rightScope" class="small">
            <el-radio-button v-for="item in options.options_rightScope"
                             :key="item.val"
                             :label="item.val">
                {{item.text}}
            </el-radio-button>
        </el-radio-group>
        <el-form-item
                v-if="sdata.rightScope=='2'"
                class="rightScopePart"
                prop="rightScopePart"
                :rules="rules.rightScopePart">
            <el-checkbox-group :disabled="isDisabled('rightScopePart')"
                               v-model="sdata.rightScopePart">
                <el-checkbox-button v-for="item in options.options_rightScopePart"
                                    :label="item.val"
                                    :key="item.val">
                    {{item.text}}
                </el-checkbox-button>
            </el-checkbox-group>
        </el-form-item>
    </el-form>
</template>

<script>
    import '../components/index.less'
    import myMixin from '../store/mixin'

    export default {
        mixins: [myMixin],
        data() {
            return {}
        },
        methods: {
            //所有权切换
            rightScopeChange(val) {
                console.log(this.sdata.rightScope)
                //this.sdata.rightOwnType = val - 1;
            }
        },
        mounted() {
        }
    }
</script>

<style lang='less' scoped>

</style>