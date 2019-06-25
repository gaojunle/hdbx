<template>
    <div class="content">
        <div class="nav-title">Z11 作品著作权登记申请</div>
        <StepsList :curStep="$route.params.step"></StepsList>
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
                                :path="sdata.authAttachment.path"
                                @fileSuccess="((params)=>{onFileUploaded(params,'authAttachment','single')})">
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
                    <el-input placeholder="登记申请" v-model="sdata.agentDesc"></el-input>
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
                    <CountryCitySelect :country="sdata.completeCountry"
                                       :province="sdata.completeProvince"
                                       :city="sdata.completeCity"
                                       :area="sdata.completeArea"
                                       @countryCityChange="((param)=>{countryCityChange(param,sdata,'complete')})"
                    ></CountryCitySelect>
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

                    <CountryCitySelect :country="sdata.appearCountry"
                                       :province="sdata.appearProvince"
                                       :city="sdata.appearCity"
                                       :area="sdata.appearArea"
                                       @countryCityChange="((param)=>{countryCityChange(param,sdata,'appear')})"
                    ></CountryCitySelect>
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
                        <FileUpload
                                @fileSuccess="((params)=>{onFileUploaded(params,'attachments[0].attachmentList','multi')})"
                                theme="btn"
                                uptext="上传">
                        </FileUpload>

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
                                        @fileSuccess="((params)=>{onFileUploaded(params,'attachments['+index+'].attachmentList','multi')})"
                                        theme="btn"
                                        uptext="上传"></FileUpload>
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
                                :path="sdata.rightOwnTypeAttachment.path"
                                @fileSuccess="((params)=>{onFileUploaded(params,'rightOwnTypeAttachment','single')})">
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
                                    <CountryCitySelect :country="item.country"
                                                       :province="item.province"
                                                       :city="item.city"
                                                       :area="item.area"
                                                       @countryCityChange="((param)=>{countryCityChange(param,item,'')})"
                                    ></CountryCitySelect>
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
                                    <FileUpload
                                            @fileSuccess="((params)=>{onFileUploaded(params,'owners['+idx+'].cardFront','single')})"
                                            theme="idcard"
                                            :path="sdata.owners[idx].cardFront.path"
                                            uptext="上传人像面"></FileUpload>
                                    <FileUpload
                                            @fileSuccess="((params)=>{onFileUploaded(params,'owners['+idx+'].cardBack','single')})"
                                            theme="idcard"
                                            :path="sdata.owners[idx].cardBack.path"
                                            uptext="上传国徽面"></FileUpload>
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
                                        @fileSuccess="((params)=>{onFileUploaded(params,'obtainTypeAttachment['+idx+'].filePath')})"
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
                    <FileUpload
                            :path="sdata.opusDescriptionAttachment.path"
                            @fileSuccess="((params)=>{onFileUploaded(params,'opusDescriptionAttachment')})">
                    </FileUpload>
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
                            <span class="text">{{formatOptionData('options_rightOwnType',sdata.rightOwnType)}}</span>
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
                    <WaysBox v-show="sdata.registrationMethod == 'TQ'"></WaysBox>
                    <AddressBox v-show="sdata.registrationMethod == 'MAIL'"></AddressBox>
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
                <WaysBox v-show="sdata.certificateCollectionMethod == 'TQ'"></WaysBox>
                <AddressBox v-show="sdata.certificateCollectionMethod == 'MAIL'||sdata.certificateCollectionMethod == 'EMS'"></AddressBox>
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
                        :class="{unfold:print_unfold_1}"
                        :data="printData_1"
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
                <LoadMore v-if="printData_1.length>4"
                          @triggerLoadMore="(unfold)=>{this.print_unfold_1 =!unfold}"></LoadMore>
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
                        :data="printData_2"
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
                <LoadMore v-if="printData_2.length>4"
                          @triggerLoadMore="(unfold)=>{this.print_unfold_2 =!unfold}"></LoadMore>
            </div>
            <div class="step-btns big">
                <el-button type="primary" @click="stepNext($route.params.step)" class="big">已打印，去递交材料</el-button>
            </div>
        </div>
        <div class="step step_5" v-show="$route.params.step==5">
            <div class="suc-box">
                <div class="info">
                    <div class="suc-title">
                        <img class="icon-suc"
                             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAmCAYAAACoPemuAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAEI0lEQVRYw82YX0xbdRTHP/0DCQgbjC0bwyZb7LYyGClMGddkce4u0WTOa3zSsFgNhgchZmY+zCmigWgwRjRDzQzMZIbIg5FcfDGRqy4xXKNbmTI3YZJpSPAPgWJoNge09eHeXmrpLb20Bb9P7e+c8/t97u+2v985x8YqJCjSPkAE7gV2Ay6gQDcHgQlgDBgCFFWUR6yuYbMAUwA0Ag3AXovrXAV6gA9UUQ5mBExQJCfQBLQAJVafPE7TQBvwrirKi6sGExRpF/AxsD9NoHhdAh5XRfm6mYM9CdRDwMUsQKHPeUlfI3UwQZHqgX5gQxagoioE+gVFOp7IuOxVCor0MPAp4MgiVKxCwKOqKA+YggmKtAf4Xn+atdQccI8qyqPRAeNV6v++3nWAQl+zV2f4LxjakZCNH3qq2g80R7/YwDg8fyX9cypdTQM7VFEORnesca2gaoorqSmuNDOX6CzGq2zINpANG8/c5aOrup2u6nYObRHMXBsAnIIiVWH97rMku83OC54mjpaKxtim3I1m7nsFRapyAoezCZVrz6Wt8nkObq41xi5Mfctnvw8mCxOdQF22oAqcd9BRdZrqogpjbGDyC94YfZ9wJJwstM4JlJtZbdi4b0sdN0O3+G7msiWoktxi3vK+zK6CncbY+d8+4ex4LxEiK4V7nECZmfXY9iOc8jQB0HOjj54bfSlBbc/byjveVynL2wZAhAhnrn9I38RASvFAmZMkJ32+I8/43LDzMQMwmdwFO+j0tlKSWwzAYiTEa9fO8PkfX1vZ8EKHy+dpweTCHg2OU17o5s78UgDj/BmevZJwNm9RBW97X6EoR0tK/gnd5sUrHXz115AVKICQw+XznADyE1nDkTBfTg2lBHdwcy0dVaeNXZ5bDHLyhzYuBn60CgUw63D5PPXAVjOPVOCOlh6mteI5cuw5AEzPB2j2t/Dz3PhqoAB+cbh8nvuBimReyeDKN7g5uacRu027RCZuTtLkf4mJW5OrhQK44HD5PC7ggZU8o3CeQjeuGLjaTV5selo3OjfOs5dbmbo9nQ4UQI8dUFL1XggvcGrkddRp/zKbPzBC83ALM/Oz6UIBKNG05ycs3Jc59hya3T4e3HaI+fACg39+w3vj51kIL2QC6qoqyhXRjPEc8KaVnesc66ZzrDsTIPE6B0tpz1m0JG29NaOzaGB62d6+3lRAW7SFEJvzd6FVyOulYZ0B+P+Ub0Hg7oTlG4BuOI5WhK6VQkB9LNQyMB1uAHhyjeBCwFPxVTgk6fYIivQI8BFLDblMKwg8oYpyfyLjSm2o3WhtqJoMQ/nR2lBjZg72ZNF64AHgBBDIAFBAn+tAMqgVdyxWgiJtBJ5Gq/vKU43TdQ2t1dmtivLfqQSkDBYHuQ84AggsNYejR8wcS81hFRhcTXP4XzYBTRSygafjAAAAAElFTkSuQmCC"
                             alt="">
                        <span>提交成功</span>
                    </div>
                    <div class="desc">您已提交 <span class="pro_num">10</span> 件作品的版权登记申请</div>
                    <div class="desc">请尽快向中国版权保护中心递交纸质申请材料</div>
                    <div class="tip-box">
                        <p>现场办理地址：</p>
                        <p>北京市西城区天桥南大街1号天桥艺术大厦A座一层</p>
                    </div>
                </div>
                <div class="split-line"></div>
                <div class="scode">
                    <div class="scode-box">
                        <img src="data:image/png;base64,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">
                        <p>扫一扫，预约登记</p>
                    </div>
                    <div class="tip-box">
                        <p>预约办理提醒：</p>
                        <p>您可以根据流水号在微信公众平台上进行预约</p>
                    </div>
                </div>
            </div>
            <div class="step-btns big">
                <el-button type="primary" @click="stepNext(-1)" class="big">继续登记</el-button>
                <el-button type="primary" @click="" class="big">查看已登记申请</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import '../components/index.less'
    import options from '../store/options'
    import StepsList from '../components/StepsList'
    import FileUpload from '../components/FileUpload'
    import CountryCitySelect from '../components/CountryCitySelect'
    import WaysBox from '../components/WaysBox'
    import AddressBox from '../components/AddressBox'
    import LoadMore from '../components/LoadMore'

    export default {
        components: {StepsList, FileUpload, CountryCitySelect, WaysBox, AddressBox, LoadMore},
        data() {
            return {
                receiveType: 'tq',
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
                printData_1: [
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
                print_unfold_1: false,
                printData_2: [
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    },
                    {
                        p_name: '计算机软件著作权查询申请表2',
                        p_require: '申请人签章处加盖XXXX公章'
                    }
                ],
                print_unfold_2: false,
                sdata: {
                    "accountId": "133618064657874944",
                    "appearCity": "沧州市",
                    "appearArea": "运河区",
                    "appearCountry": "中国大陆",
                    "appearDate": "2018-12-12",
                    "appearProvince": "河北",
                    "applyType": "2",//申请者身份类型[1权利人，2代理人]
                    "authAttachment": {//选择代理人时，授权委托书
                        "relevantFileName": "授权委托书名称",//授权委托书名称
                        "path": "http://img.mp.itc.cn/upload/20160502/37fe08b5f76e44629a097226fcaa7127.jpg"
                    },
                    "agentDesc": "agentDesc",
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
                    "completeCountry": "中国大陆",
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
                    "opusInfo": "opusInfo",
                    "opusName": "作品名称opusName",
                    "opusNature": "2",
                    "opusType": 'G',
                    "opusTypeDesc": "作品类型说明opusTypeDesc",
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
            //国家城市选择后回调处理方法
            countryCityChange(params, item, type) {
                if (type) {
                    item[type + 'Country'] = params.country
                    item[type + 'Province'] = params.province;
                    item[type + 'City'] = params.city;
                    item[type + 'Area'] = params.area;
                } else {
                    item['country'] = params.country;
                    item['province'] = params.province;
                    item['city'] = params.city;
                    item['area'] = params.area;
                }
            },
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
                this.$router.push('/index/' + (--step))
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
            onFileUploaded(uploadedParams, dataRef, type) {
                console.log(uploadedParams, dataRef, type)
                if (type == 'single') {
                    let refData = this._splitor(dataRef, type);
                    console.log(refData)
                    refData.attachmentName = uploadedParams.fileName;
                    refData.path = uploadedParams.filePath;
                    console.log(this.sdata)
                } else {
                    let tmp = this._splitor(dataRef);
                    tmp.push({
                        attachmentName: uploadedParams.fileName,
                        path: uploadedParams.filePath
                    });
                }
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

            //打印列表展示更多
            triggerLoadMorePrint(isFold, dataLabel) {

            },
            _splitor(splitor, type) {
                var tmp = null;
                console.log(splitor)
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

        }
    }
</script>