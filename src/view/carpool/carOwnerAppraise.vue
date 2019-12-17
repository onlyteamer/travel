<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div style="margin-top: 46px;padding: 15px 0px;position: relative;">
            <div class="userInfo">
                <van-row>
                    <van-col span="16">2019年12月04日 05:20</van-col>
                    <van-col span="8" align="right">已完成</van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                <van-row style="display: flex;align-items: center;font-size: 14px">
                    <van-col span="24">
                        <div style="display: flex;align-items: center">
                            <img src="../../static/images/userAvatar.png"
                                 style="height: 52px;width: 52px;margin-right: 10px">
                            <div style="width: 100%">
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img
                                        src="../../static/images/sexTag.png"
                                        style="width: 12px;height: 12px;margin-left: 5px">
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <img src="../../static/images/userInfo.png"
                                                 style="width: 14px;height: 16px;margin-right: 5px"/><span
                                                style="font-size: 14px;color: #5E5E5E">张**</span>
                                        </van-col>
                                        <van-col span="12">
                                            <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                                style="font-size: 14px;color: #5E5E5E">13884997727</span>
                                        </van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0">
                                    <van-row>
                                        <van-col span="12">
                                            <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;margin-right: 10px">京A***99</span>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center"><img
                                                src="./../../static/images/car.png"
                                                style="width: 18px;height: 18px"/><span
                                                style="font-size: 14px;color: #5E5E5E">大众15款速腾</span></van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12">
                                            <div><i class="startTag"></i>发车地点:上河湾</div>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <div><i class="endTag"></i>目的地:安贞门</div>
                                        </van-col>
                                    </van-row>
                                </p>
                            </div>
                        </div>
                    </van-col>
                </van-row>
            </div>
            <div style="width: 100%;height: 100%;position: absolute;top: 0;background:rgba(0, 0, 0, 0.3);"></div>
        </div>
        <div class="assess">
            <div>
                <van-rate v-model="appraise.level" :size="25" color="#FF7E00"/>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <div class="assessTag">

                <van-tag round type="primary" size="large" v-for="(item,index) in tagList" :key="index"
                         :color="item.flag != '0'?'#0CC893':'#5E5E5E'" plain class="tagStyle" @click="changeTag(item)">
                    {{item.text}}
                </van-tag>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <van-cell-group>
                <van-field
                        v-model="appraise.remark"
                        rows="4"
                        autosize
                        type="textarea"
                        placeholder="手写评价"
                />
            </van-cell-group>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;margin-bottom: 10px"
                        @click="pushAppraise">发布评论
            </van-button>
        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup,Toast} from 'vant';

    import request from '../../utils/request'

    export default {
        name: "carOwnerAppraise",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Rate.name]: Rate,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Toast.name]:Toast
        },
        data() {
            return {
                title: "车主详情",
                appraise: {
                    driverId: "",
                    level: 3,
                    remark: "",
                    templateContext: "",
                    tripId: "",
                    userId: ""
                },
                tagList: [
                    {
                        id: "1",
                        flag: '0',
                        text: "车辆准时"
                    },
                    {
                        id: "2",
                        flag: '0',
                        text: "司机健谈"
                    },
                    {
                        id: "3",
                        flag: '0',
                        text: "危险驾驶"
                    },
                    {
                        id: "4",
                        flag: '0',
                        text: "司机迟到"
                    },
                    {
                        id: "5",
                        flag: '0',
                        text: "态度好有礼貌"
                    },
                    {
                        id: "6",
                        flag: '0',
                        text: "车内吸烟"
                    },
                    {
                        id: "7",
                        flag: '0',
                        text: "车内有异味"
                    },
                    {
                        id: "8",
                        flag: '0',
                        text: "态度恶劣"
                    },
                    {
                        id: "9",
                        flag: '0',
                        text: "车辆宽敞整洁"
                    },
                    {
                        id: "10",
                        flag: '0',
                        text: "驾驶平稳"
                    }
                ]
            }
        },
        mounted() {
            this.initData();
        },

        methods: {
            initData() {
                // let tripId = this.$route.query.tripId;
                let tripId = "20191215142813071";
                this.appraise.tripId = tripId;
                request.sendPost({
                    url: "/sharecar/pass/evaluate/" + tripId,
                    params: {}
                }).then(res => {
                    console.log(res);
                })
            },

            onClickLeft() {

            },

            changeTag(val) {
                let flag = "0";
                if(val.flag == '0'){
                    flag = "1";
                }
                this.tagList.forEach(e => {
                    if (e.id == val.id) {
                        e.flag = flag;
                    }
                })
            },

            //发布评论
            pushAppraise() {
                let arr = [];
                this.tagList.forEach(e =>{
                    if(e.flag == '1'){
                       arr.push(e.text);
                    }
                })
                this.appraise.templateContext = arr.join(",");

                if(!this.appraise.remark){
                    Toast.fail("评论不能为空");
                    return false;
                }

                this.appraise.driverId = "1";
                this.appraise.userId = "";

                request.sendPost({
                    url:"/sharecar/pass/doevaluate/"+this.appraise.tripId,
                    params: this.appraise
                }).then(res =>{
                    if(res.data.code == '0'){
                        Toast.success("发布成功");
                        this.$router.push({path:"/myStroke"});
                    }else {
                        Toast.fail("发布失败");
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .userInfo {
        width: 85%;
        margin: 0px auto;
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .assess {
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card {
        padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }

    /deep/ .van-cell {
        padding: 0;
    }

    .assessTag {
        margin: 15px auto;
    }

    .tagStyle {
        margin: 0.4rem 0.5rem;
    }

    .startTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #0CC893;
        border-radius: 50%;
        margin-right: 5px;
    }

    .endTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #FF0200;
        border-radius: 50%;
        margin-right: 5px;
    }
</style>

