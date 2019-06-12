<template>
    <div class="wrap">
        <p class="titles">首页>Z11作品著作权登记申请</p>
        <div class="pross">
            <progress-nav :currentPage="2"></progress-nav>
        </div>
        <!-- 权利归属 -->
        <div class="attribution">
            <span class="star">*</span> <label for="nature" class="natrue">权利归属：</label>
            <div class='div'>
                <radio :label='item.label' name='nature' v-model="rightOwnType" v-for="(item,index) in list" :key="index" class="radio"> {{item.name}} </radio>
            </div>
            <div class="load">
                <div class="dian">点击上传</div>
                <div class="li">示例</div>
            </div>
        </div>
        <!-- 著作权人 -->
        <div class="copyright">
            <span class="star">*</span> <label for="nature" class="natrue">著作权人：</label>
            <div class="one">
                <div class="name">
                    <span class="s1">第1位</span>
                    <span class="s2">删除</span>
                    <span class="s3">清空</span>
                </div>
                <!-- 自然人 -->
                <div class="peo">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <el-select v-model="cards" placeholder="请选择">
                        <el-option
                        v-for="item in card"
                        :key="item.cards"
                        :label="item.labels"
                        :value="item.cards">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='证件号码' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <el-select v-model="card" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='著作权人所在省份和城市' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <!-- <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <hd-input placeholder='手机号码                                                     |著作权人手机号，请确保真实有效' width='650' class="is"></hd-input>
                </div>
            </div>
            <br>
            <div class="one">
                <div class="names">
                    <span class="s1">第2位</span>
                    <span class="s2">删除</span>
                    <span class="s3">清空</span>
                </div>
                <!-- 自然人 -->
                <div class="peo">
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <el-select v-model="cards" placeholder="请选择">
                        <el-option
                        v-for="item in card"
                        :key="item.cards"
                        :label="item.labels"
                        :value="item.cards">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='证件号码' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <el-select v-model="card" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <hd-input placeholder='著作权人所在省份和城市' width='320' class="i"></hd-input>
                </div>
                <div class="peo">
                    <!-- <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select> -->
                    <hd-input placeholder='手机号码                                                     |著作权人手机号，请确保真实有效' width='650' class="is"></hd-input>
                </div>
            </div>
            <div class="application">
                <p>申请证书副本：</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <radio v-model="yes" name='1' label='1'>是</radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <radio v-model="yes" name='1' label='2'>否</radio>
            </div>
            <hd-button class="btn">+添加著作权人</hd-button>
        </div>
        <!-- 作者 -->
        <div class="copyright">
            <span class="star">*</span> <label for="nature" class="natrue">作者：</label>
            <div class="one">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="name">
                    <span class="s1">第1位</span>
                    <span class="s2">删除</span>
                    <span class="s3">清空</span>
                </div>
                <!-- 自然人 -->
                <div class="peo">
                    <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                    <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                </div>
            </div>
            <br>
            <div class="one">
                <div class="names">
                    <span class="s1">第2位</span>
                    <span class="s2">删除</span>
                    <span class="s3">清空</span>
                </div>
                <!-- 自然人 -->
                <div class="peo">
                   <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                    <hd-input placeholder='著作权人姓名或名称，与身份证明文件保持一致' width='320' class="i"></hd-input>
                </div>
            </div>
            <hd-button class="btn">+添加作者</hd-button>
        </div>

        <!-- 权利取得方式 -->
        <div class="obtain">
            <span class="star">*</span> <label for="natures" class="natrue">权利取得方式：</label>
            <div class='div'>
                <radio :label='item.label' name='natures' v-model="obtainType" v-for="(item,index) in obtain" :key="index" class="radio"> {{item.name}} </radio>
            </div>
        </div>
        <owner></owner>
        <!-- <check :label='item.label' name='natures' v-model="obtainType" v-for="(item,index) in obtain" :key="index">11111</check>
        <check :label='item.label' name='natures' v-model="obtainType" v-for="(item,index) in obtain" :key="index">11111</check>
        <check :label='item.label' name='natures' v-model="obtainType" v-for="(item,index) in obtain" :key="index">11111</check> -->
       
        <input type="checkbox">1111
    </div>
</template>
<script>
import '@css/Z11/ownership'
import '@share/js/utils/utils'
import api from '@api'
import progressNav from '@components/common/registerQuery/progressNav'
import radio from '@share/components/hdRadio'
import { API_HOST } from '@share/api/config'
// import tab from '@components/common/breadcrumb'
import hdButton from '@share/components/hdButton'

import hdInput from '@share/components/hdInput'
import owner from '@share/components/oupsQuery/oupsOwner'
// import hdAlert from '@share/components/hdAlert'
// import hdSelect from '@share/components/hdSelect'
// import fileUpload from '@share/components/common/fileUpload'
import addressEdit from '@components/common/address/addressEdit'
export default {
    data() {
        return {
            // 权利归属
            list: [
                {
                    name: '个人作品',
                    label: '1'
                },
                {
                    name: '合作作品',
                    label: '2'
                },
                {
                    name: '法人作品',
                    label: '3'
                },
                {
                    name: '职务作品',
                    label: '4'
                },
                {
                    name: '委托作品',
                    label: '5'
                }
            ],
            rightOwnType: '1',
            // 权利取得方式
            obtain: [
                {
                    name: '原始',
                    label: '1'
                },
                {
                    name: '继承',
                    label: '2'
                },
                {
                    name: '承受',
                    label: '3'
                },
                {
                    name: '其他',
                    label: '4'
                }
            ],
            obtainType: '1',
            yes: '1',
            // 自然人
            options: [
                {
                    value: '选项1',
                    label: '自然人'
                }, {
                    value: '选项2',
                    label: '法人'
                }, {
                    value: '选项3',
                    label: '其他组织'
                }],
                value: '选项1',
                // 身份证
                card: [
                    {
                        cards: '1',
                        labels: '二代身份证'
                    }, {
                        cards: '2',
                        labels: '军官证'
                    }
                ],
                cards: '1'
            }
    },
    methods: {
        
    },
    components: {
        progressNav,
        radio,
        hdInput,
        hdButton,
        owner,
    }
}
</script>
