<template>
    <div class="content">
        <div class="nav-title">Z11 作品著作权登记申请</div>
        <StepsList :curStep="$route.params.step"></StepsList>
        <receiveMode v-model="sdata.receiveType"></receiveMode>
        <fileUpload :autoUpload="true"></fileUpload>
        <div class="step step_0" v-show="$route.params.step==0">
            <div class="mbox">
                <div class="person" @click="stepNext($route.params.step,1)">
                    <div class="s_icon s_per"></div>
                    <div class="type">个人</div>
                    <div class="desc">办理本人业务或以个人名义代理他人办理业务</div>
                </div>
                <div class="company" @click="sdata.applyType=2;showAuthPaper=true">
                    <div class="s_icon s_paper"></div>
                    <div class="type">机构</div>
                    <div class="desc">办理本人所属机构业务或以本人所属机构名义代理他人办理业务</div>
                </div>
            </div>
            <div class="pop-box upload_auth_paper" :class="{show:showAuthPaper}">
                <div class="pop-cont">
                    <div class="pop-title">上传授权委托书</div>
                    <div class="pop-close" @click="showAuthPaper=false">X</div>
                    <div class="upbox">
                        <FileUpload
                                theme="card"
                                uptext="点击上传"
                                @fileSuccess="onFileUploaded"
                                splitor="sdata.authAttachment.path">
                        </FileUpload>
                        <div class="tip ptb20">
                            <span style="color: red">注意：</span>
                            <a href="#" class="cBlue"
                               @click.prevent="openExample(options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].exampleUrl)">查看</a>
                            <span class="cGray">示例，</span>
                            <a :href="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].exampleUrl"
                               target="_blank" class="cBlue">下载示例</a>
                        </div>
                    </div>
                    <p class="desc">申请人委托代理人办理登记事宜，具体委托事项如下：</p>
                    <el-input placeholder="登记申请" v-model="sdata.authAttachment.remark"></el-input>
                    <div class="step-btns">
                        <el-button type="primary" @click="stepNext($route.params.step,2)">确 定</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="step step_1" v-show="$route.params.step==1">
            <form action="#">
                <div class="f_box">
                    <span class="title required">作品名称：</span>
                    <el-input v-model="sdata.opusName" class="w100"></el-input>
                </div>
                <!--作品类型-->
                <div class="f_box opusType">
                    <span class="title required">作品类型：</span>
                    <div class="flex">
                        <el-select class="mr10" style="width: 350px" v-model="sdata.opusType" placeholder="请选择作品类型">
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
                        <el-radio-button v-for="item in options.options_opusInditeType"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <!--创作完成日期和地点-->
                <div class="f_box completeDate">
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
                        <el-radio-button v-for="item in options.options_publishStatus"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <!--首次发表日期、地点-->
                <div class="f_box completeDate">
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
                        <el-radio-button v-for="item in options.options_opusNature"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                </div>
                <!--
                1、【文字作品A】需填写字数，单个作品填写作品字数，系列作品填写最长作品字数
                2、【电影作品H和以类似摄制电影的方法创作的作品I】需填写时长，单个作品填写作品时长，系列作品填写最长作品时长
                3、【文字作品A，摄影作品G】需要上传作品样本
                -->
                <div class="f_box p_nums" v-if="'AIH'.indexOf(sdata.opusType)>-1">
                        <span class="title required">
                            <span v-if="sdata.opusNature=='2'">最长</span><span v-if="'A'.indexOf(sdata.opusType)>-1">作品字数：</span><span
                                v-if="'IH'.indexOf(sdata.opusType)>-1">作品时长：</span>
                        </span>
                    <div class="flex" v-if="sdata.opusType=='A'">
                        <el-input v-model="sdata.opusInfo" type="number" class="w220" placeholder=""></el-input>
                        <span class="label">字</span>
                    </div>
                    <div class="flex" v-if="sdata.opusType=='H'||sdata.opusType=='I'">
                        <el-input v-model="timeLength.h" max="60" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">时</span>
                        <el-input v-model="timeLength.m" max="59" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">分</span>
                        <el-input v-model="timeLength.s" max="59" class="w220" type="number"
                                  placeholder=""></el-input>
                        <span class="label">秒</span>
                    </div>
                </div>
                <!--作品样本-->
                <div class="f_box sample" v-if="sdata.opusType=='A'||sdata.opusType=='G'">
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
                                <div class="serial">
                                    <el-input v-model="item.segmentName" placeholder="请输入系列作品名称"></el-input>
                                </div>
                            </div>
                            <div class="sample_list" v-if="idx%3==0" v-for="(_item,idx) in item.attachmentList">
                                <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                     v-for="(ufile,i) in item.attachmentList">
                                    <span class="txt">{{ufile.attachmentName}}</span>
                                    <span class="del"
                                          @click="removeUploadFile('attachments['+index+'].attachmentList',i)">删除</span>
                                </div>
                            </div>
                            <FileUpload style="margin-top: 20px;"
                                        @fileSuccess="onFileUploaded"
                                        theme="btn"
                                        uptext="上传"
                                        :splitor="'attachments['+index+'].attachmentList'"></FileUpload>
                        </div>
                        <el-button type="text" @click="addApus">+添加作品</el-button>
                    </div>
                </div>
            </form>
            <div class="step-btns">
                <el-button type="primary" class="big" @click="stepNext($route.params.step)">下一步</el-button>
            </div>
        </div>
        <div class="step step_2" v-show="$route.params.step==2">
            <form action="#">
                <!--权利归属-->
                <div class="f_box">
                    <span class="title required">权利归属：</span>
                    <el-radio-group v-model="sdata.rightOwnType">
                        <el-radio-button v-for="(item,idx) in options.options_rightOwnType"
                                         :key="item.val"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                    <div v-if="sdata.rightOwnType>1">
                        <FileUpload
                                theme="card"
                                class="ptb20"
                                :uptext="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].text"
                                @fileSuccess="onFileUploaded"
                                splitor="rightOwnTypeAttachment">
                        </FileUpload>
                        <div class="tip ">
                            <span style="color: red">注意：</span>
                            <a href="#" class="cBlue"
                               @click.prevent="openExample(options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].exampleUrl)">查看</a>
                            <span class="cGray">示例，</span>
                            <a :href="options.options_relevantFileName[parseInt(sdata.rightOwnType)-2].exampleUrl"
                               target="_blank" class="cBlue">下载示例</a>
                        </div>
                    </div>
                </div>
                <!--著作权人-->
                <div class="f_box copy_owner">
                    <span class="title required">著作权人：</span>
                    <div class="owner" v-for="(item,idx) in sdata.owners">
                        <p class="sub_title">第 {{idx+1}} 位</p>
                        <div class="cont">
                            <div class="f_left">
                                <div class="flex">
                                    <el-select class="mr10" v-model="item.peopleKind" placeholder="请选择">
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
                                    <el-select class="mr10" style="width: 165px" v-model="item.country"
                                               placeholder="选择国家">
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
                                            style="width: 454px;"
                                    ></el-cascader>
                                </div>
                                <div class="flex">
                                    <el-select class="mr10" style="width: 225px" v-model="item.idType"
                                               placeholder="请选择">
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
                                <div class="fuben" v-if="idx>0">
                                    <span>申请证书副本：</span>
                                    <el-radio-group v-model="item.applyCopy" class="small">
                                        <el-radio-button v-for="(item,idx) in options.options_applyCopy"
                                                         :key="idx"
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
                            <div class="opts">
                                <el-button type="text" @click="removeOwner(idx)">删除</el-button>
                                <el-button type="text" @click="clearOwner(idx)">清空</el-button>
                            </div>
                        </div>
                    </div>
                    <el-button type="text" @click="addOwner">+添加著作权人</el-button>
                </div>
                <!--作者-->
                <div class="f_box author">
                    <span class="title required">作者：</span>
                    <div class="cont" v-for="(item,idx) in sdata.authors">
                        <p class="sub_title">第 {{idx+1}} 位</p>
                        <div class="flex">
                            <div class="flex">
                                <el-input class="w400" v-model="item.name"
                                          placeholder="著作权人姓名名名称，与身份证明文件保持一致"></el-input>
                                <el-input class="w400" v-model="item.signature"
                                          placeholder="作者署名：作者的笔名、别名等"></el-input>
                            </div>
                            <div class="opts">
                                <a href="javascript:;" @click="removeAuthor(idx)">删除</a>
                                <a href="javascript:;" @click="clearAuthor(idx)">清空</a>
                            </div>
                        </div>
                    </div>
                    <el-button type="text" @click="addAuthor">+添加作者</el-button>
                </div>
                <!--权利取得方式-->
                <div class="f_box obtainType">
                    <span class="title required">权利取得方式：</span>
                    <el-radio-group v-model="sdata.obtainType" class="small">
                        <el-radio-button v-for="(item,idx) in options.options_obtainType"
                                         :key="idx"
                                         :label="item.val">
                            {{item.text}}
                        </el-radio-button>
                    </el-radio-group>
                    <!--继承-->
                    <div class="upload-way" v-if="sdata.obtainType>1" :class="{other:sdata.obtainType=='4'}">
                        <p style="padding-top: 20px" v-if="sdata.obtainType=='4'">
                            权利取得日期：
                            <el-date-picker
                                    v-model="sdata.ownObtainDate"
                                    type="date"
                                    placeholder="年/月/日">
                            </el-date-picker>
                        </p>
                        <div v-for="(item,idx) in options.options_obtainTypeAttachment[parseInt(sdata.obtainType)-2]"
                             :key="idx">
                            <FileUpload class="ptb20"
                                        theme="card"
                                        @fileSuccess="onFileUploaded"
                                        :path="sdata.obtainTypeAttachment[idx].path ? sdata.obtainTypeAttachment[idx].path:''"
                                        :uptext="item.text"
                                        :splitor="'obtainTypeAttachment['+idx+'].filePath'">
                            </FileUpload>
                            <div class="tip">
                                <span style="color: red">注意：</span>
                                <a href="#" class="cBlue">查看</a>
                                <span class="cGray">示例，</span>
                                <a href="#" class="cBlue">下载示例</a>
                            </div>
                        </div>
                    </div>
                </div>
                <!--权利拥有状况-->
                <div class="f_box rightScope">
                    <span class="title required">权利拥有状况：</span>
                    <el-radio-group v-model="sdata.rightScope" class="small">
                        <el-radio-button v-for="item in options.options_rightScope"
                                         :key="item.val"
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
                    <div class="tip">
                        <span style="color: red">注意：</span>
                        <a href="#" class="cBlue">查看</a>
                        <span class="cGray">示例，</span>
                        <a href="#" class="cBlue">下载示例</a>
                    </div>
                </div>
            </form>
            <div class="step-btns big">
                <el-button @click="stepPrev($route.params.step)" class="big">上一步</el-button>
                <el-button type="primary" @click="stepNext($route.params.step)" class="big">下一步</el-button>
            </div>
        </div>
        <div class="step step_3" v-show="$route.params.step==3">
            <div class="f_box">
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
                    <el-row class="sample flex-info">
                        <span class="label">作品样本：</span>
                        <div class="sample-cont flex-1">
                            <div class="samples_multi" v-if="sdata.opusNature==1">
                                <div class="sample_list" v-if="idx%3==0"
                                     v-for="(_item,idx) in sdata.attachments[0].attachmentList">
                                    <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                         v-for="(ufile,i) in sdata.attachments[0].attachmentList">
                                        <el-link type="primary" :href="ufile.path" target="_blank">
                                            {{ufile.attachmentName}}
                                        </el-link>
                                    </div>
                                </div>
                            </div>
                            <div class="samples_multi" v-if="sdata.opusNature==2">
                                <div class="ibox" v-for="(item,index) in sdata.attachments">
                                    <div class="multi-info">
                                        <span>第 {{index+1}} 件</span>
                                        <div>{{item.segmentName}}</div>
                                    </div>
                                    <div class="sample_list" v-if="idx%3==0"
                                         v-for="(_item,idx) in item.attachmentList">
                                        <div class="item" v-if="(i>=idx)&&i<(idx+3)"
                                             v-for="(ufile,i) in item.attachmentList">
                                            <el-link type="primary" :href="ufile.path" target="_blank">
                                                {{ufile.attachmentName}}
                                            </el-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-row>
                </div>
            </div>
            <div class="f_box">
                <div class="info-title">权属信息</div>
                <div class="info-cont">
                    <el-row>
                        <el-col :span="3">
                            <span class="label">著作权人：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box" v-for="(item,idx) in sdata.owners">
                                <div class="owner-title">第 {{idx+1}} 位</div>
                                <div class="owner-info">
                                    <div class="item">
                                        <p>{{formatOptionData('options_peopleKind',item.peopleKind)}}</p>
                                        <p>{{item.country}}</p>
                                        <p>居民身份证</p>
                                        <p>手机号码</p>
                                    </div>
                                    <div class="item">
                                        <p>{{item.name}}</p>
                                        <p>{{item.province + '-' + item.city}}</p>
                                        <p>{{formatOptionData('options_idType',item.idType)}}</p>
                                        <p>{{item.idNumber}}</p>
                                    </div>
                                    <div class="item card">
                                        <p><img :src="item.cardFront" alt=""></p>
                                        <p><img :src="item.cardBack" alt=""></p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span class="label">作者：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box" v-for="(item,idx) in sdata.authors">
                                <div class="owner-info">
                                    <div class="item">
                                        <p>{{item.name}}</p>
                                    </div>
                                    <div class="item">
                                        <p>{{item.signature}}</p>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span class="label">权利归属方式：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box">
                                <div class="owner-info">
                                    <div class="item" style="width: 100%">
                                        <p>{{formatOptionData('options_rightOwnType',sdata.rightOwnType)}}</p>
                                        <img class="up_img" :src="sdata.rightOwnTypeAttachment.relevantFileName"
                                             alt="">
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span class="label">权利取得方式：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box">
                                <div class="owner-info">
                                    <div class="item" style="width: 100%">
                                        <p>{{formatOptionData('options_obtainType',sdata.obtainType)}}</p>
                                        <div class="img-list">
                                            <img v-for="(item,idx) in sdata.obtainTypeAttachment" class="up_img"
                                                 :src="item.path" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span class="label">权利拥有状况：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box">
                                <div class="owner-info">
                                    <div class="item">
                                        <p>{{formatOptionData('options_rightScope',sdata.rightScope)}}</p>
                                        <div class="info-list">
                                               <span class="radio-text" v-for="(item,idx) in sdata.rightScopePart">
                                                    {{formatOptionData('options_rightScopePart',item)}}
                                                </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="3">
                            <span class="label">作品说明书：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box">
                                <div class="owner-info">
                                    <div class="item">
                                        <img class="up_img" :src="sdata.opusDescriptionAttachment.path" alt="">
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="sdata.applyType=='2'">
                        <el-col :span="3">
                            <span class="label">授权委托书：</span>
                        </el-col>
                        <el-col :span="21">
                            <div class="owner-box">
                                <div class="owner-info">
                                    <div class="item">
                                        <img class="up_img" :src="sdata.authAttachment.path" alt="">
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="f_box sampleRetention">
                <div class="info-title">留存作品样本：</div>
                <el-row>
                    <el-col :span="3">
                        <span class="label"><span class="tip">*</span>选择介质：</span>
                    </el-col>
                    <el-col :span="21">
                        <el-radio-group v-model="sdata.sampleRetentionMedium">
                            <el-radio-button v-for="(item,idx) in options.options_sampleRetentionMedium"
                                             :key="item.val"
                                             :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
                <el-row style="padding-top: 20px">
                    <el-col :span="3">
                        <span class="label"><span class="tip">*</span>是否附图盖章：</span>
                    </el-col>
                    <el-col :span="21">
                        <el-radio-group v-model="sdata.needStamp">
                            <el-radio-button v-for="(item,idx) in options.options_needStamp"
                                             :key="item.val"
                                             :label="item.val">
                                {{item.text}}
                            </el-radio-button>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </div>
            <div class="f_box sampleRetention">
                <div class="info-title">登记办理方式： <span class="tip">注意：在线申请后需要递交相关材料才可以完成办理</span></div>

                <el-radio-group v-model="sdata.registrationMethod" class="big">
                    <el-radio-button v-for="(item,idx) in options.options_registrationMethod"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <el-row>
                    <div class="way-box">
                        <div class="way-check-box"
                             :class="{on:(idx+1)==parseInt(sdata.certificateCollectionAddress)}"
                             v-for="(item,idx) in options.options_registrationMethod_TQ"
                             @click="select_registrationMethod_TQ(idx+1)">
                            <div class="w-title">{{item.name}}</div>
                            <div class="w-info">{{item.addr}}</div>
                        </div>
                    </div>
                    <LoadMore v-if="options.options_registrationMethod_TQ.length>3"
                              dataLabel="'options.options_registrationMethod_TQ'"></LoadMore>
                </el-row>
            </div>
            <div class="f_box sampleRetention">
                <div class="info-title">证书领取方式：</div>

                <el-radio-group v-model="sdata.certificateCollectionMethod" class="big">
                    <el-radio-button v-for="(item,idx) in options.options_certificateCollectionMethod"
                                     :key="item.val"
                                     :label="item.val">
                        {{item.text}}
                    </el-radio-button>
                </el-radio-group>
                <div class="ways">
                    <div class="way-box">
                        <div class="way-check-box on">
                            <div class="w-title">中国版权保护中心版权登记大厅（天桥）</div>
                            <div class="w-info">北京市西城区天桥南大街1号天桥艺术大厦A座三层302</div>
                        </div>
                        <div class="way-check-box">
                            <div class="w-title">雍和版权登记大厅</div>
                            <div class="w-info">北京市东城区安定门东大街28号雍和大厦西楼一层</div>
                        </div>
                        <div class="way-check-box">
                            <div class="w-title">雍和版权登记大厅</div>
                            <div class="w-info">成都市高新区益州大道中段1858号</div>
                        </div>
                    </div>
                    <div class="icon-more on">展开更多 <img src="../../../assets/img/steps/icon_down.png"></div>
                </div>
                <el-row v-if="sdata.certificateCollectionMethod!='MAIL'">
                    <p>地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层</p>
                    <p>邮编：10000</p>
                </el-row>
                <el-row v-else>
                    <p>地址：北京市西城区天桥南大街1号天桥艺术大厦A座一层</p>
                    <p>邮编：10000</p>
                </el-row>

            </div>
            <div class="step-btns big">
                <el-button @click="stepPrev($route.params.step)" class="big">上一步</el-button>
                <el-button type="primary" @click="stepNext($route.params.step)" class="big">下一步</el-button>
            </div>
        </div>
        <div class="step step_4" v-show="$route.params.step==4">
            <div class="f_box">
                <div class="info-title">
                    <span>请递交以下申请材料，并按要求签字或盖章</span>
                    <div class="print-all">
                        <img src="../../../assets/img/steps/icon-print.png" alt="">
                        <span>打印全部</span>
                    </div>
                </div>
                <el-table
                        class="print-table"
                        :data="printData"
                        align="center"
                        header-align="center"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="p_name"
                            label="材料名称"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="p_require"
                            label="要求"
                            width="408">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    @click="doDetail()" style="color: #666666;margin-right: 10px">查看
                            </el-button>
                            <el-button
                                    type="text"
                                    @click="doDetail()">打印
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="icon-more" style="justify-content: center">展开更多 <img
                        src="../../../assets/img/steps/icon_down.png"></div>
            </div>
            <div class="f_box">
                <div class="info-title">
                    <span>请按以下要求准备作品样本</span>
                    <div class="print-all">
                        <img src="../../../assets/img/steps/icon-print.png" alt="">
                        <span>打印全部</span>
                    </div>
                </div>
                <el-table
                        class="print-table"
                        :data="printData"
                        align="center"
                        header-align="center"
                        style="width: 100%">
                    <el-table-column
                            type="index"
                            label="序号"
                            width="110">
                    </el-table-column>
                    <el-table-column
                            prop="p_name"
                            label="材料名称"
                            width="350">
                    </el-table-column>
                    <el-table-column
                            prop="p_require"
                            label="要求"
                            width="408">
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <el-button
                                    type="text"
                                    @click="doDetail()" style="color: #666666;margin-right: 10px">查看
                            </el-button>
                            <el-button
                                    type="text"
                                    @click="doDetail()">打印
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="icon-more" style="justify-content: center">展开更多 <img
                        src="../../../assets/img/steps/icon_down.png"></div>
            </div>
            <div class="step-btns big">
                <el-button type="primary" @click="stepNext($route.params.step)" class="big">已打印，去递交材料</el-button>
            </div>
        </div>
        <div class="step step_5" v-show="$route.params.step==5">
            您已提交作品版权登记申请，请尽快向中国版权保护中心递交纸质申请材料
            <div class="step-btns big">
                <el-button type="primary" @click="stepNext(-1)" class="big">继续登记</el-button>
                <el-button type="primary" @click="" class="big">查看已登记申请</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import '@css/oupsQuery'
    import options from '../components/options.js'
    import StepsList from '../components/StepsList'
    import FileUpload from '../components/FileUpload'
    import LoadMore from '../components/LoadMore'
    import fileUpload from '@share/components/common/fileUpload'
    import receiveMode from '@share/components/softQuery/receiveMode'

    export default {
        components: {StepsList, FileUpload, LoadMore, receiveMode,fileUpload},
        data() {
            return {
                crumb: [
                    {
                        name: '申请作品登记查询'
                    }
                ],
                options: options,
                showAuthPaper: false,
                timeLength: {
                    h: '',
                    m: '',
                    s: ''
                },
                printData: [
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表',
                        p_require: '申请人签章处加盖XXXX公章'
                    }
                ],
                sdata: {
                    "accountId": "133618064657874944",
                    "appearCity": "AppearCity",
                    "appearCountry": "AppearCountry",
                    "appearDate": "2018-12-12",
                    "appearProvince": "AppearProvince",
                    "applyType": "2",//申请者身份类型[1权利人，2代理人]
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
                    "certificateCollectionAddress": '1',
                    "completeCity": "泉州",
                    "completeCountry": "中国",
                    "completeDate": "2018-12-12",
                    "completeProvince": "福建",
                    "needStamp": "1",
                    "obtainType": "2",
                    "obtainTypeAttachment": [
                        {
                            relevantFileName: 'QLGS-0603',
                            path: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                            remark: 'remark'
                        },
                        {
                            relevantFileName: 'QLGS-0601',
                            path: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                            remark: 'remark'
                        },
                        {
                            relevantFileName: 'QLGS-0602',
                            path: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                            remark: 'remark'
                        },
                        {
                            relevantFileName: 'QLGS-0605',
                            path: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                            remark: 'remark'
                        }
                    ],
                    "ownObtainDate": "2019-10-19",
                    "opusDescriptionAttachment": {
                        "path": 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                        "relevantFileName": "QLGS-07"
                    },
                    "opusInditeType": "1",
                    "opusInfo": "11111",
                    "opusName": "TestOpus",
                    "opusNature": "2",
                    "opusType": 'H',
                    "opusTypeDesc": "作品描述xxx",
                    "owners": [
                        {
                            "applyCopy": "0",
                            "cardBack": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg",
                            "cardFront": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg",
                            "country": "中国",
                            "province": "省",
                            "city": "城市",
                            "idNumber": "1401111111",
                            "idType": "1",
                            "mobile": "130111111",
                            "name": "第一著作权人",
                            "peopleKind": "1",
                            "role": "PET"
                        }, {
                            "applyCopy": "1",
                            "cardBack": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg",
                            "cardFront": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg",
                            "country": "阿拉斯加",
                            "province": "省",
                            "city": "城市",
                            "idNumber": "1501111111",
                            "idType": "1",
                            "mobile": "120111111",
                            "name": "第二著作权人",
                            "peopleKind": "2",
                            "role": "PET"
                        }],
                    "publishStatus": "1",
                    "registrationMethod": "MAIL",
                    "rightOwnType": "2",
                    rightOwnTypeAttachment: {//rightOwnType为1时没有附件
                        relevantFileName: 'http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg',
                        path: '',
                        remark: ''
                    },
                    "rightScope": "2",
                    rightScopePart: ["1", "2"],
                    "sampleRetentionMedium": "1"
                },
                fdata: {
                    "msg": "Operate success",
                    "data": {
                        "z11RegisterApplyInfoVo": {
                            "accountId": "账户Id",
                            "applyType": "申请方式",
                            "authAttachment": {
                                "attachmentId": "附件Id",
                                "flowNumber": "流水号",
                                "segmentName": "系列名称",
                                "attachmentName": "附件名称",
                                "relevantFileName": "附件类型，系列作品附件附件类型为null",
                                "path": "路径",
                                "remark": "备注",
                                "createTime": "创建时间",
                                "updateTime": "修改时间",
                                "baseId": null
                            },
                            "opusName": "作品名称",
                            "opusType": "作品类型",
                            "opusTypeDesc": "作品类型说明",
                            "opusInditeType": "创作性质",
                            "completeDate": "创作完成日期",
                            "completeCountry": "创作完成国家",
                            "completeProvince": "创作完成省份",
                            "completeCity": "创作完成城市",
                            "publishStatus": "发表状态",
                            "appearDate": "首次发表日期",
                            "appearCountry": "首次发表国家",
                            "appearProvince": "首次发表省份",
                            "appearCity": "首次发表城市",
                            "opusNature": "首次发表作品性质",
                            "opusInfo": "最长作品字数/时长（传入字数或秒数字符串）",
                            "attachments": [],
                            "rightOwnType": "权利归属",
                            "rightOwnTypeAttachment": "权利归属附件",
                            "owners": [
                                {
                                    "id": "ID",
                                    "flowNumber": "流水号",
                                    "role": "用户角色",
                                    "name": "用户名称",
                                    "peopleKind": "人员类别",
                                    "enterpriseType": "企业类型",
                                    "idType": "证件类型",
                                    "idNumber": "证件id",
                                    "country": "国家",
                                    "province": "省",
                                    "city": "城市",
                                    "park": "园区",
                                    "address": "详细地址",
                                    "phone": "电话号码",
                                    "mobile": "手机号码",
                                    "postcode": "邮编",
                                    "fax": "传真",
                                    "email": "邮箱",
                                    "contactPerson": "联系人",
                                    "applyType": "申请类型",
                                    "sign": "",
                                    "opusRightType": "",
                                    "applyPeople": "申请人",
                                    "opusSign": "",
                                    "cnName": "中文名",
                                    "enName": "英文名",
                                    "impawnType": "",
                                    "legalPeople": "",
                                    "unitCode": "",
                                    "unitName": "",
                                    "applyCopy": "是否申请副本",
                                    "busType": "",
                                    "linkmannum": "",
                                    "updateTime": "修改时间",
                                    "createTime": "创建时间",
                                    "source": "数据来源",
                                    "cardFront": "身份证正面地址",
                                    "cardBack": "身份证反面地址",
                                    "realId": "",
                                    "baseId": ""
                                }
                            ],
                            "authors": "作者信息",
                            "obtainType": "权利取得方式",
                            "obtainTypeAttachment": "权利取得方式附件，与上面authAttachment字段相同",
                            "rightScope": "权利拥有状况（如果权利拥有状况为全部，此项为空即可；如果是部分，各个权利id为string类型）",
                            "rightScopePart": "权利拥有状况详细",
                            "opusDescriptionAttachment": "作品说明书附件，与上面authAttachment字段相同",
                            "sampleRetentionMedium": "选择介质",
                            "needStamp": "是否附图盖章",
                            "registrationMethod": "登记办理方式",
                            "certificateCollectionMethod": "证书领取方式",
                            "certificateCollectionAddress": "证书领取地址"
                        },
                        "reFillin": [
                            "accountId",
                            "applyType",
                            "authAttachment",
                            "opusName",
                            "opusType",
                            "opusTypeDesc",
                            "opusInditeType",
                            "completeDate",
                            "completeCountry",
                            "completeProvince",
                            "completeCity",
                            "publishStatus",
                            "appearDate",
                            "appearCountry",
                            "appearProvince",
                            "appearCity",
                            "opusNature",
                            "opusInfo",
                            "attachments",
                            "rightOwnType",
                            "rightOwnTypeAttachment",
                            "owners",
                            "authors",
                            "obtainType",
                            "obtainTypeAttachment",
                            "rightScope",
                            "rightScopePart",
                            "opusDescriptionAttachment",
                            "sampleRetentionMedium",
                            "needStamp",
                            "registrationMethod",
                            "certificateCollectionMethod",
                            "certificateCollectionAddress"
                        ]
                    },
                    "returnCode": "SUCCESS"
                }
            }
        },

        methods: {
            stepNext(step, applyType) {
                step = parseInt(step);
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
            stepPrev(step, applyType) {
                step = parseInt(step);
                switch (step) {
                    case 0:
                        this.sdata.applyType = applyType;
                        this.$router.push('/index/' + (++step))
                        break;
                }
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
            removeUploadFile(splitor, idx) {
                let tmp = this._splitor(splitor);
                tmp.splice(idx, 1);
            },
            //文件上传成功回调
            onFileUploaded(params, ref) {
                console.log(params, ref)
                let tmp = this._splitor(params.splitor);
                tmp.push({
                    attachmentName: params.fileName,
                    path: params.filePath
                });
            },
            //打开示例
            openExample(url) {
                this.$alert('<img src="' + url + '" style="width: 600px;height: 400px;">', '示例', {
                    dangerouslyUseHTMLString: true
                });
            },
            //添加系列作品样本
            addApus() {
                this.sdata.attachments.push({
                    attachmentList: [],
                    segmentName: ''
                })
            },
            //添加作者
            addAuthor() {
                this.sdata.authors.push({
                    name: "",
                    signature: ""
                })
            },
            //移除作者
            removeAuthor(idx) {
                this.sdata.authors.splice(idx, 1)
            },
            //清空作者信息
            clearAuthor(idx) {
                this.sdata.authors.splice(idx, 1, {
                    name: "",
                    signature: ""
                })
            },
            //所有权切换
            rightScopeChange(val) {
                this.sdata.rightOwnType = val - 1;
            },
            //移除拥有者
            removeOwner(idx) {
                this.sdata.owners.splice(idx, 1)
            },
            //清空拥有者信息
            clearOwner(idx) {
                this.sdata.owners.splice(idx, 1, {
                    "applyCopy": '',
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "idNumber": "",
                    "idType": "",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "",
                    "role": ""
                })
            },
            //添加拥有者
            addOwner() {
                this.sdata.owners.push({
                    "applyCopy": '',
                    "cardBack": "",
                    "cardFront": "",
                    "country": "",
                    "idNumber": "",
                    "idType": "",
                    "mobile": "",
                    "name": "",
                    "peopleKind": "",
                    "role": ""
                })
            },
            select_registrationMethod_TQ(idx) {
                this.sdata.certificateCollectionAddress = idx;
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
        watch: {
            //时分秒填写
            'timeLength.h'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
            'timeLength.m'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
            'timeLength.s'(newVal) {
                this.sdata.opusInfo = (this.timeLength.h * 60 * 60 + this.timeLength.m * 60 + this.timeLength.s) * 1000
            },
        },
        mounted() {
            console.log(this.$route)
        }
    }
</script>