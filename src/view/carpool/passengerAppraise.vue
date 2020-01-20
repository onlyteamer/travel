<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->

        <div class="userInfo">
            <van-row style="display: flex;align-items: center;font-size: 14px">
                <van-col span="24">
                    <div style="display: flex;align-items: center">
                        <img :src="userInfo.headimageurl"
                             style="height: 52px;width: 52px;margin-right: 10px;border-radius: 50%">
                        <div>
                            <p style="margin: 5px 0">
                                <span style="color: #5E5E5E;font-weight: bold">{{userInfo.nickName}}</span>
                                <img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="userInfo.sex == '1'">
                                <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px" v-else>

                                <img src="./../../static/images/xin.png"
                                     style="width: 14px;height: 14px;margin-right: 5px;margin-left: 20px"/><span>{{userInfo.goodCount?userInfo.goodCount:'0'}}</span>
                                <img src="./../../static/images/unhapply.png"
                                     style="width: 14px;height: 14px;margin: 0 5px 0 20px"/> <span>{{userInfo.badCount?userInfo.badCount:'0'}}</span>
                            </p>
                            <p style="margin: 5px 0;display: flex;align-items: center">
                                <img src="../../static/images/userInfo.png"
                                     style="width: 14px;height: 16px;margin-right: 5px"/><span
                                    style="font-size: 14px;color: #5E5E5E">{{userInfo.realName}}</span>
                            </p>
                            <p style="margin: 5px 0">
                                <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                    style="font-size: 14px;color: #5E5E5E">{{userInfo.phone}}</span>
                            </p>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="assess">
            <div>
                <van-rate v-model="appraise.level" :size="25" color="#FF7E00"/>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <div class="assessTag">
                <van-tag round type="primary" size="large" v-for="(item,index) in tagList" :key="index" :color="item.flag != '0'?'#0CC893':'#5E5E5E'" plain class="tagStyle" @click="changeTag(item)">{{item.text}}</van-tag>
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
            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;margin-bottom: 10px" @click="pushAppraise">发布评论
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
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup,Tabbar, TabbarItem} from 'vant';
    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "passengerAppraise",
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
                userInfo:{},
                title: "乘客详情",
                appraise: {
                    driverId: "",
                    level: 3,
                    remark: "",
                    templateContext: "",
                    tripId: "",
                },
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                tagList: [
                    {
                        id: "1",
                        flag: '0',
                        text: "准时到达"
                    },
                    {
                        id: "2",
                        flag: '0',
                        text: "比较健谈"
                    },
                    {
                        id: "3",
                        flag: '0',
                        text: "付款及时"
                    },
                    {
                        id: "4",
                        flag: '0',
                        text: "迟到严重"
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
                        text: "车内吃东西"
                    },
                    {
                        id: "8",
                        flag: '0',
                        text: "不爱护车辆"
                    },
                    {
                        id: "9",
                        flag: '0',
                        text: "长时间打电话"
                    }
                ]
            }
        },
        mounted(){

            this.initUserInfo();
        },

        methods: {
            initUserInfo(){
                let passengerId = this.$route.query.passengerId;
                request.sendGet({
                    url:"/sharecar/pass/passenger/"+passengerId,
                    params: {}
                }).then(res =>{
                    if(res.data.code == '0'){
                        this.userInfo = res.data.data;
                    }
                })

            },


            pushAppraise(){
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
                this.appraise.tripId = this.$route.query.tripId;
                this.appraise.passengerId = this.$route.query.passengerId;
                this.appraise.type  = '2';//评价对象：1、车主 2、乘客

                request.sendPost({
                    url:"/sharecar/trip/doevaluate/"+this.appraise.tripId,
                    params: this.appraise
                }).then(res =>{
                    if(res.data.code == '0'){
                        Toast.success(res.data.msg);
                        this.$router.push({path:"/myStroke"});
                    }else {
                        Toast.fail(res.data.msg);
                    }
                })
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
            onClickLeft() {

            }
        }
    }
</script>

<style scoped>
    /deep/ .van-cell {
        padding: 0;
    }

    .userInfo {
        width: 85%;
        margin: 0px auto 15px;
        padding: 5px 10px;
        background: #FFFFFF;
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

    .assessTag {
        margin: 15px auto 55px;
    }

    .tagStyle {
        margin: 0.4rem 0.5rem;
    }
</style>
