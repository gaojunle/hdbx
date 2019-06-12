<template>
    <div class="oups-query">
        <top-nav></top-nav>
        <breadcrumb :crumb="crumb"></breadcrumb>
        <StepsList :steps="steplist" :curStep="curStep"></StepsList>
        <div class="content">
            <div class="step step_0" v-show="curStep==0">
                <div class="mbox">
                    <div class="person" @click="sdata.applyType=1;curStep=1;">
                        <p>我是著作权人</p>
                        <p>我为自己创作的作品申请著作权</p>
                        <a class="btn btn_blue">立即申请</a>
                    </div>
                    <div class="company" @click="sdata.applyType=2;showAuthPaper=true">
                        <p>我是代理人</p>
                        <p>我为他人创作的作品申请著作权</p>
                        <a class="btn btn_blue">上传授权委托书协助申请</a>
                    </div>
                </div>
                <div class="pop-box upload_auth_paper" :class="{show:showAuthPaper}">
                    <div class="pop-cont">
                        <div class="pop-title">上传授权委托书</div>
                        <div class="pop-close" @click="showAuthPaper=false">X</div>
                        <div class="flex">
                            <FileUpload v-model="sdata.authAttachment.path"></FileUpload>
                            <div class="example">
                                <img src="../../assets/img/test.jpg" alt="">
                            </div>
                        </div>
                        <p class="tip">申请人委托代理人办理登记事宜，具体委托事项如下：</p>
                        <el-input placeholder="登记申请" v-model="sdata.authAttachment.remark"></el-input>
                        <div class="btn-box">
                            <el-button type="primary" @click="curStep=1">确 定</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="step step_1" v-show="curStep==1">
                <form action="#">
                    <div class="f_box">
                        <span class="title required">作品名称：</span>
                        <el-input v-model="sdata.opusName"></el-input>
                    </div>
                    <!--作品类型-->
                    <div class="f_box">
                        <span class="title required">作品类型：</span>
                        <div class="flex">
                            <el-select v-model="sdata.opusType" placeholder="请选择作品类型">
                                <el-option
                                        v-for="item in options.options_opusType"
                                        value-key="val"
                                        :key="item.val"
                                        :label="item.text"
                                        :value="item.val">
                                </el-option>
                            </el-select>
                            <el-input v-model="sdata.opusTypeDesc" placeholder="说明"></el-input>
                        </div>
                    </div>
                    <!--创作性质-->
                    <div class="f_box">
                        <span class="title required">创作性质：</span>
                        <el-radio-group v-model="sdata.opusInditeType">
                            <el-radio-button v-for="item in options.options_opusInditeType" :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--创作完成日期和地点-->
                    <div class="f_box flex">
                        <span class="title required">创作完成日期：</span>
                        <el-date-picker
                                v-model="sdata.completeDate"
                                type="date"
                                placeholder="年/月/日">
                        </el-date-picker>

                        <span class="title required">创作完成地点：</span>
                        <el-select v-model="sdata.completeCountry" placeholder="选择国家">
                            <el-option
                                    v-for="item in options.options_countrys"
                                    value-key="val"
                                    :key="item.val"
                                    :label="item.text"
                                    :value="item.val">
                            </el-option>
                        </el-select>
                        <el-cascader
                                placeholder="选择省份和城市"
                                :options="options.options_citys"
                                v-model="sdata.completeProvince"
                                @change="((city)=>{handleCityChange(city,11)})"
                                :separator="'/'"
                        >
                        </el-cascader>
                    </div>
                    <!--发表状态-->
                    <div class="f_box">
                        <span class="title required">发表状态：</span>

                        <el-radio-group v-model="sdata.publishStatus">
                            <el-radio-button v-for="item in options.options_publishStatus" :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <!--首次发表日期、地点-->
                    <div class="f_box flex">
                        <span class="title required">首次发表日期：</span>
                        <el-date-picker
                                v-model="sdata.appearDate"
                                type="date"
                                placeholder="年/月/日">
                        </el-date-picker>
                        <span class="title required">首次发表地点：</span>
                        <el-select v-model="sdata.appearCountry" placeholder="选择国家">
                            <el-option
                                    v-for="item in options.options_countrys"
                                    value-key="val"
                                    :key="item.val"
                                    :label="item.text"
                                    :value="item.val">
                            </el-option>
                        </el-select>
                        <el-cascader
                                placeholder="选择省份和城市"
                                :options="options.options_citys"
                                v-model="sdata.appearCity"
                                @change="((city)=>{handleCityChange(city,11)})"
                                :separator="'/'"
                        ></el-cascader>
                    </div>
                    <!--作品性质-->
                    <div class="f_box">
                        <span class="title required">作品性质：</span>
                        <el-radio-group v-model="sdata.opusNature">
                            <el-radio-button v-for="item in options.options_opusNature" :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                    </div>
                    <div class="f_box p_nums" v-model="sdata.opusInfo">
                        <span class="title required">最长作品字数/时长：</span>
                        <div class="flex" style="width:220px">
                            <el-input placeholder=""></el-input>
                            <span class="label">字</span>
                        </div>
                        <div class="flex" style="width:220px">
                            <el-input placeholder=""></el-input>
                            <span class="label">时</span>
                            <el-input placeholder=""></el-input>
                            <span class="label">分</span>
                            <el-input placeholder=""></el-input>
                            <span class="label">秒</span>
                        </div>
                    </div>
                    <!--作品样本-->
                    <div class="f_box sample">
                        <span class="title required">作品样本：</span>
                        <div class="samples_multi" v-if="sdata.opusNature==1">
                            <FileUpload @fileSuccess="onFileUploaded" theme="btn" uptext="上传"
                                        :splitor="'attachments[0].attachmentList'"></FileUpload>
                            <div class="sample_list" v-if="idx%3==0"
                                 v-for="(_item,idx) in sdata.attachments[0].attachmentList">
                                <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                     v-for="(ufile,i) in sdata.attachments[0].attachmentList">
                                    <span class="txt">{{ufile.attachmentName}}</span>
                                    <span class="del"
                                          @click="removeUploadFile('attachments[0].attachmentList',i)">删除</span>
                                </div>
                            </div>
                        </div>
                        <div class="samples_multi" v-if="sdata.opusNature==2">
                            <div class="ibox" v-for="(item,index) in sdata.attachments">
                                <div class="multi-info">
                                    <span>第 {{index+1}} 件</span>
                                    <div>
                                        <el-input v-model="item.segmentName" placeholder="请输入系列作品名称"></el-input>
                                    </div>
                                    <FileUpload @fileSuccess="onFileUploaded" theme="btn" uptext="上传"
                                                :splitor="'attachments['+index+'].attachmentList'"></FileUpload>
                                </div>
                                <div class="sample_list" v-if="idx%3==0" v-for="(_item,idx) in item.attachmentList">
                                    <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                         v-for="(ufile,i) in item.attachmentList">
                                        <span class="txt">{{ufile.attachmentName}}</span>
                                        <span class="del"
                                              @click="removeUploadFile('attachments['+index+'].attachmentList',i)">删除</span>
                                    </div>
                                </div>
                            </div>
                            <el-button class="btn" @click="addApus">+添加作品</el-button>
                        </div>
                    </div>
                </form>
                <div class="step-btns">
                    <a href="#" class="btn btn_blue" @click="curStep=2">下一步</a>
                </div>
            </div>
            <div class="step step_2" v-show="curStep==2">
                <form action="#">
                    <!--权利归属-->
                    <div class="f_box">
                        <span class="title required">权利归属：<span class="tip">注意：请您务必查看下载示例</span></span>
                        <el-radio-group v-model="sdata.rightOwnType">
                            <el-radio-button v-for="item in options.options_rightOwnType" :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                        <div class="flex">
                            <FileUpload v-if="sdata.rightOwnType>1" @fileSuccess="onFileUploaded"
                                        splitor="rightOwnTypeAttachment"></FileUpload>
                            <div class="examples">
                                <div class="item">
                                    <img src="../../assets/img/test.jpg" alt="">
                                    <span>示例1</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--著作权人-->
                    <div class="f_box copy_owner">
                        <span class="title required">著作权人：</span>
                        <div class="owner" v-for="(item,idx) in sdata.owners">
                            <div class="cont">
                                <div class="f_left">
                                    <p class="sub_title">第 {{idx+1}} 位</p>
                                    <div class="flex">
                                        <el-select v-model="item.peopleKind" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options.options_peopleKind"
                                                    value-key="val"
                                                    :key="item.val"
                                                    :label="item.text"
                                                    :value="item.val">
                                            </el-option>
                                        </el-select>
                                        <el-input v-model="item.name" placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                                    </div>
                                    <div class="flex">
                                        <el-select v-model="item.country" placeholder="选择国家">
                                            <el-option
                                                    v-for="item in options.options_countrys"
                                                    value-key="val"
                                                    :key="item.val"
                                                    :label="item.text"
                                                    :value="item.val">
                                            </el-option>
                                        </el-select>
                                        <el-cascader
                                                placeholder="选择省份和城市"
                                                :options="options.options_citys"
                                                v-model="item.city"
                                                @change="((city)=>{handleCityChange(city,11)})"
                                                :separator="'/'"
                                        ></el-cascader>
                                    </div>
                                    <div class="flex">
                                        <el-select v-model="item.idType" placeholder="请选择">
                                            <el-option
                                                    v-for="item in options.options_idType"
                                                    value-key="val"
                                                    :key="item.val"
                                                    :label="item.text"
                                                    :value="item.val">
                                            </el-option>
                                        </el-select>
                                        <el-input placeholder="证件号码" v-model="item.idNumber"></el-input>
                                    </div>
                                    <div class="flex">
                                        <div>
                                            <el-input placeholder="请输入电话号码" v-model="item.mobile">
                                                <template slot="prepend">手机号码</template>
                                            </el-input>
                                        </div>
                                    </div>
                                    <div class="fuben" v-if="item.applyCopy>0">
                                        <span>申请证书副本：</span>
                                        <el-radio-group v-model="item.applyCopy">
                                            <el-radio-button v-for="item in options.options_applyCopy"
                                                             :label="item.val">
                                                {{item.text}}
                                            </el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </div>
                                <div class="f_right">
                                    <div class="copy_upload">
                                        <FileUpload @fileSuccess="onFileUploaded" theme="idcard" uptext="上传人像面"
                                                    :splitor="'owners['+idx+'].cardFront'"></FileUpload>
                                        <FileUpload @fileSuccess="onFileUploaded" theme="idcard" uptext="上传国徽面"
                                                    :splitor="'owners['+idx+'].cardBack'"></FileUpload>
                                    </div>
                                </div>
                            </div>
                            <div class="opts">
                                <a href="">删除</a>
                                <a href="">清空</a>
                            </div>
                        </div>
                        <div class="btn btn_blue">+添加著作权人</div>
                    </div>
                    <!--作者-->
                    <div class="f_box author">
                        <span class="title required">作者：</span>
                        <div class="cont" v-for="(item,idx) in sdata.authors">
                            <p class="sub_title">第 {{idx+1}} 位</p>
                            <div class="flex">
                                <div class="flex">
                                    <el-input v-model="item.name" placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                                    <el-input v-model="item.signature" placeholder="作者署名：作者的笔名、别名等"></el-input>
                                </div>
                                <div class="opts">
                                    <a href="javascript:;" @click="removeAuthor(idx)">删除</a>
                                    <a href="javascript:;" @click="clearAuthor(idx)">清空</a>
                                </div>
                            </div>
                        </div>
                        <div class="btn btn_blue" @click="addAuthor">+添加作者</div>
                    </div>
                    <!--权利取得方式-->
                    <div class="f_box">
                        <span class="title required">权利取得方式：</span>
                        <el-radio-group v-model="sdata.obtainType">
                            <el-radio-button v-for="item in options.options_obtainType" :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                        <div class="upload-way" v-if="sdata.obtainType>1">
                            <FileUpload @fileSuccess="onFileUploaded"
                                        v-for="(item,idx) in sdata.obtainTypeAttachment"
                                        :splitor="'obtainTypeAttachment['+idx+'].filePath'">
                            </FileUpload>
                        </div>
                    </div>
                    <!--权利拥有状况-->
                    <div class="f_box">
                        <span class="title required">权利拥有状况：</span>
                        <el-radio-group v-model="sdata.rightScope">
                            <el-radio-button v-for="item in options.options_rightScope"
                                             :label="item.val"
                                             @change="rightScopeChange(item.val)"
                            >
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                        <div class="rightScopePart" v-if="sdata.rightScope==2">
                            <el-checkbox-group v-model="sdata.rightScopePart">
                                <el-checkbox-button v-for="item in options.options_rightScopePart"
                                                    :label="item.val"
                                                    :key="item.val">
                                    {{item.text}}
                                </el-checkbox-button>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <!--作品说明书-->
                    <div class="f_box">
                        <span class="title required">作品说明书：</span>
                        <FileUpload @fileSuccess="((params)=>{onFileUploaded(params,'123')})"
                                    splitor="opusDescriptionAttachment"></FileUpload>
                        <div class="examples">
                            <div class="item">
                                <img src="../../assets/img/test.jpg" alt="">
                                <span>示例</span>
                            </div>
                        </div>
                    </div>
                </form>
                <div class="step-btns">
                    <a href="#" class="btn" @click="curStep--">上一步</a>
                    <a href="#" class="btn btn_blue" @click="curStep++">下一步</a>
                </div>
            </div>
            <div class="step step_3" v-show="curStep==3">
                <div class="info-box">
                    <div class="info-title">作品信息</div>
                    <div class="info-cont">
                        <el-row>
                            <el-col :span="12">
                                <span class="label">作品名称：</span>
                                <span class="text">{{sdata.opusName}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="label">作品类型：</span>
                                <span class="text">{{formatOptionData('options_opusType',sdata.opusType)}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <span class="label">创作性质：</span>
                                <span class="text">{{formatOptionData('options_opusInditeType',sdata.opusInditeType)}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="label">创作方式：</span>
                                <span class="text">111这个没有值111</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <span class="label">发表状态：</span>
                                <span class="text">{{formatOptionData('options_publishStatus',sdata.publishStatus)}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="label">作品性质：</span>
                                <span class="text">{{formatOptionData('options_opusNature',sdata.opusNature)}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <span class="label">创作日期：</span>
                                <span class="text">{{sdata.completeDate}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="label">创作完成地点：</span>
                                <span class="text">{{sdata.completeCountry+'-'+sdata.completeProvince+'-'+sdata.completeCity}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <span class="label">首次发表日期：</span>
                                <span class="text">{{sdata.appearDate}}</span>
                            </el-col>
                            <el-col :span="12">
                                <span class="label">首次发表地点：</span>
                                <span class="text">{{sdata.appearCountry+'-'+sdata.appearProvince+'-'+sdata.appearCity}}</span>
                            </el-col>
                        </el-row>
                        <el-row class="sample">
                            <div class="samples_multi" v-if="sdata.opusNature==1">
                                <div class="sample_list" v-if="idx%3==0"
                                     v-for="(_item,idx) in sdata.attachments[0].attachmentList">
                                    <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                         v-for="(ufile,i) in sdata.attachments[0].attachmentList">
                                        <span class="txt">{{ufile.attachmentName}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="samples_multi" v-if="sdata.opusNature==2">
                                <div class="ibox" v-for="(item,index) in sdata.attachments">
                                    <div class="multi-info">
                                        <span>第 {{index+1}} 件</span>
                                        <div>{{item.segmentName}}</div>
                                    </div>
                                    <div class="sample_list" v-if="idx%3==0" v-for="(_item,idx) in item.attachmentList">
                                        <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                             v-for="(ufile,i) in item.attachmentList">
                                            <span class="txt">{{ufile.attachmentName}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-row>
                    </div>
                </div>
                <div class="info-box">
                    <div class="info-title">权属信息</div>
                    <div class="info-cont">
                        <el-row>
                            <el-col :span="4">
                                <span class="label">著作权人：</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="owner-line" v-for="(item,idx) in sdata.owners">
                                    <span>{{formatOptionData('options_peopleKind',item.peopleKind)}}</span>
                                    <span>{{item.name}}</span>
                                    <span>{{item.country}}</span>
                                    <span>{{item.province}}</span>
                                    <span>{{item.city}}</span>
                                    <span>{{formatOptionData('options_idType',item.idType)}}</span>
                                    <span>{{item.idNumber}}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4">
                                <span class="label">作者：</span>
                            </el-col>
                            <el-col :span="20">
                                <div class="owner-line" v-for="(item,idx) in sdata.authors">
                                    <span>{{item.name}}</span>
                                    <span>{{item.signature}}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <span class="label">权利归属方式：</span>
                                <span class="text">{{formatOptionData('options_rightOwnType',sdata.rightOwnType)}}</span>
                            </el-col>
                        </el-row>
                        <el-row>
                            <img class="up_img" :src="sdata.rightOwnTypeAttachment" alt="">
                        </el-row>
                    </div>
                </div>
                <div class="step-btns">
                    <a href="#" class="btn" @click="curStep--">上一步</a>
                    <a href="#" class="btn btn_blue" @click="curStep++">下一步</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import '@css/oupsQuery'
    import options from './components/options.js'
    import topNav from '@components/common/header'
    import breadcrumb from '@components/common/breadcrumb'
    import StepsList from './components/StepsList'
    import FileUpload from './components/FileUpload'

    export default {
        components: {topNav, breadcrumb, StepsList, FileUpload},
        data() {
            return {
                crumb: [
                    {
                        name: '申请作品登记查询'
                    }
                ],
                options: options,
                curStep: 2,
                steplist: [
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '选择办理身份'
                    },
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '作品创作信息'
                    },
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '作品权属信息'
                    },
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '确认信息'
                    },
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '打印材料'
                    },
                    {
                        imgUrl1: require('../../assets/img/progressNav/information_b.png'),
                        imgUrl2: require('../../assets/img/progressNav/information_h.png'),
                        name: '提交成功'
                    }
                ],
                showAuthPaper: false,
                sdata: {
                    "accountId": "133618064657874944",
                    "appearCity": "AppearCity",
                    "appearCountry": "AppearCountry",
                    "appearDate": "2018-12-12",
                    "appearProvince": "AppearProvince",
                    "applyType": -1,//申请者身份类型[1权利人，2代理人]
                    authAttachment: {//选择代理人时，授权委托书
                        relevantFileName: '授权委托书名称',//授权委托书名称
                        path: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg'
                    },

                    "attachments": [
                        {
                            "attachmentList": [
                                {
                                    "attachmentName": "attachmentList",
                                    "path": 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg'
                                }, {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                }, {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                }, {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                }, {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                },
                                {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                }
                            ],
                            "segmentName": "series1"
                        },
                        {
                            "attachmentList": [
                                {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                },
                                {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                },
                                {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                },
                                {
                                    "attachmentName": "attachmentList",
                                    "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                                }
                            ],
                            "segmentName": "series2"
                        }
                    ],
                    "authors": [
                        {"name": "张三", "signature": "漂流、自由"}, {"name": "李四", "signature": "啊偶"}
                    ],
                    "certificateCollectionMethod": "TQ",
                    "completeCity": "泉州",
                    "completeCountry": 1,
                    "completeDate": "2018-12-12",
                    "completeProvince": "福建",
                    "needStamp": "1",
                    "obtainType": 2,
                    "obtainTypeAttachment": [
                        {
                            relevantFileName: 'QLGS-0603',
                            path: 'path.png',
                            remark: 'remark'
                        }
                    ],
                    "opusDescriptionAttachment": {"path": "QLGS-07", "relevantFileName": "QLGS-07"},
                    "opusInditeType": 1,
                    "opusInfo": "11111",
                    "opusName": "TestOpus",
                    "opusNature": 2,
                    "opusType": 1,
                    "opusTypeDesc": "aaa",
                    "owners": [
                        {
                            "applyCopy": 0,
                            "cardBack": "back",
                            "cardFront": "font",
                            "country": "中国",
                            "idNumber": "1401111111",
                            "idType": 1,
                            "mobile": "130111111",
                            "name": "第一著作权人",
                            "peopleKind": 1,
                            "role": "PET"
                        }, {
                            "applyCopy": 1,
                            "cardBack": "back",
                            "cardFront": "font",
                            "country": "阿拉斯加",
                            "idNumber": "1501111111",
                            "idType": 1,
                            "mobile": "120111111",
                            "name": "第二著作权人",
                            "peopleKind": 2,
                            "role": "PET"
                        }],
                    "publishStatus": 1,
                    "registrationMethod": "MAIL",
                    "rightOwnType": 2,
                    rightOwnTypeAttachment: {//rightOwnType为1时没有附件
                        relevantFileName: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                        path: '',
                        remark: ''
                    },
                    "rightScope": 1,
                    rightScopePart: [1, 2],
                    "sampleRetentionMedium": 1
                },
            }
        },

        methods: {
            formatOptionData(option, val) {
                var ret = ''
                this.options[option].forEach((item) => {
                    if (item.val == val) {
                        ret = item.text;
                    }
                })
                return ret
            },
            removeUploadFile(splitor, idx) {
                let tmp = this._splitor(splitor);
                tmp.splice(idx, 1);
            },
            onFileUploaded(params, ref) {
                console.log(params, ref)
                let tmp = this._splitor(params.splitor);
                tmp.push({
                    attachmentName: params.fileName,
                    path: params.filePath
                });
            },

            //添加系列作品样本
            addApus(){
                this.sdata.attachments.push({
                    attachmentList:[],
                    segmentName:''
                })
            },

            addAuthor() {
                this.sdata.authors.push({
                    name: "",
                    signature: ""
                })
            },
            removeAuthor(idx) {
                this.sdata.authors.splice(idx, 1)
            },
            clearAuthor(idx) {
                this.sdata.authors.splice(idx, 1, {
                    name: "",
                    signature: ""
                })
            },
            rightScopeChange(val) {
                this.sdata.rightOwnType = val - 1;
            },

            handleCityChange(param, p) {
                console.log(param, p)
            },
            _splitor(splitor) {
                var tmp = null;
                splitor.split(/[\.(\[.\])]/).forEach((val, i, t) => {
                    if (val) {
                        tmp = (tmp ? tmp[val] : this.sdata[val]);
                    }
                })
                return tmp;
            }
        },
        mounted() {

        }
    }

</script>