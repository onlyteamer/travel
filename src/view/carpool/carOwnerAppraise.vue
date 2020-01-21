<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->

        <div style="margin-top: 0px;padding: 15px 0px;position: relative;">
            <div class="userInfo">
                <van-row>
                    <van-col span="16">{{carOwnerInfo.tripDateTime}}</van-col>
                    <van-col span="8" align="right">已完成</van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                <van-row style="display: flex;align-items: center;font-size: 14px">
                    <van-col span="24">
                        <div style="display: flex;align-items: center">
                            <img :src="carOwnerInfo.headimgurl"
                                 style="height: 52px;width: 52px;margin-right: 10px;border-radius: 50%">
                            <div style="width: 100%">
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E;font-weight: bold">{{carOwnerInfo.nickname}}</span>
                                    <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="carOwnerInfo.sex == '1'">
                                    <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <img src="../../static/images/userInfo.png"
                                                 style="width: 14px;height: 16px;margin-right: 5px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{carOwnerInfo.realName}}</span>
                                        </van-col>
                                        <van-col span="12">
                                            <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{carOwnerInfo.phone}}</span>
                                        </van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0">
                                    <van-row>
                                        <van-col span="12">
                                            <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;margin-right: 10px">{{carOwnerInfo.carNumber}}</span>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center"><img
                                                src="./../../static/images/car.png"
                                                style="width: 18px;height: 18px"/><span
                                                style="font-size: 14px;color: #5E5E5E">{{carOwnerInfo.carName}}</span></van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12">
                                            <div><i class="startTag"></i>发车地点:{{carOwnerInfo.startPlace}}</div>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <div><i class="endTag"></i>目的地:{{carOwnerInfo.endPlace}}</div>
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

        <div style="width: 100%">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup,Tabbar,TabbarItem} from 'vant';

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'
    //乘客评价详情
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
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active:"",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                title: "车主详情",
                appraise: {
                    driverId: "",
                    level: 3,
                    remark: "",
                    templateContext: "",
                    tripId: "",
                },
                carOwnerInfo:{

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
                let tripId = this.$route.query.tripId;
                this.appraise.tripId = tripId;
                request.sendPost({
                    url: "/sharecar/pass/evaluate/" + tripId,
                    params: {}
                }).then(res => {
                    if(res.data.code =='0'){
                        this.carOwnerInfo = res.data.data;
                    }else{
                        this.$toast(res.data.msg);
                    }
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
                    this.$toast.fail("评论不能为空");
                    return false;
                }

                this.appraise.driverId = this.carOwnerInfo.driverId;
                this.appraise.type  = '1';//评价对象：1、车主 2、乘客

                request.sendPost({
                    url:"/sharecar/pass/doevaluate/"+this.appraise.tripId,
                    params: this.appraise
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.$toast.success(res.data.msg);
                        this.$router.push({path:"/myStroke"});
                    }else {
                        this.$toast.fail(res.data.msg);
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
        margin-bottom: 55px;
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
        margin: 15px auto 55px;
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

