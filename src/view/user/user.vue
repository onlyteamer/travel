<template>
    <div>
        <div class="info-wrap">
            <!--<van-row>-->
                <!--<van-col span="8">-->
                    <!--<div @click="onClickLeft"><img src="../../static/images/left.png" style="width: 11px;height: 18px"/>-->
                    <!--</div>-->
                <!--</van-col>-->
                <!--<van-col span="8" style="text-align: center"><span style="color: white;font-size: 16px;">个人中心</span>-->
                <!--</van-col>-->
            <!--</van-row>-->
            <div style="display: flex;align-items: center;justify-content: space-between;margin-top: 20px">
                <van-image round width="61px" height="61px" :src="listImg"/>
                <div>
                    <span style="font-size: 14px;color: white;margin-right: 3px;font-weight: bold">加菲猫</span>
                    <img style="width: 13px;height: 13px;" src="../../static/images/woman.png"/>
                </div>
                <div>
                    <img style="width: 20px;height: 14px;margin-right: 3px" src="../../static/images/idCard.png"/>
                    <span class="real_name">实名认证</span>
                </div>
                <div @click="goSetting">
                    <img style="width: 22px;height: 22px;float: right;margin-right: 7px"
                         src="../../static/images/set.png"/>
                </div>
            </div>
        </div>
        <div class="content">
            <div style="position: relative;top: -35px;">
                <van-row class="bag-wrap">
                    <van-col span="8" class="bag-col">
                        <div class="bag-wrap-item" style="font-size: 14px;color: #242424">余额</div>
                        <div class="bag-wrap-item" style="font-size: 20px;color: #FF0200">50.05</div>
                    </van-col>
                    <van-col span="8" class="bag-col">
                        <div class="bag-wrap-item" style="font-size: 14px;color: #242424">积分</div>
                        <div class="bag-wrap-item" style="font-size: 20px;color: #FF7E00">20000</div>
                    </van-col>
                    <van-col span="8" class="bag-col">
                        <div class="bag-wrap-item" style="font-size: 14px;color: #242424">优惠券</div>
                        <div class="bag-wrap-item" style="font-size: 20px;color: #242424">0</div>
                    </van-col>
                </van-row>
                <div class="func-wrap">
                    <div class="func-title"><span>我的行程</span></div>
                    <div class="func-content">
                        <div class="func-content-item" @click="goTicketList"><img
                                src="../../static/images/user/bc.png"/><span>班车</span></div>
                        <div class="func-content-item" @click="goMyStroke"><img
                                src="../../static/images/user/pc.png"/><span>拼车</span></div>
                    </div>
                </div>
                <div class="func-wrap">
                    <div class="func-title"><span>我的账户</span></div>
                    <div class="func-content">
                        <div class="func-content-item" @click="goWealth"><img
                                src="../../static/images/user/cztx.png"/><span>充值提现</span></div>
                        <div class="func-content-item" @click="goSetting"><img src="../../static/images/user/wdzl.png"/><span>我的资料</span>
                        </div>
                        <div class="func-content-item"><img src="../../static/images/user/qhlx.png"/><span>切换路线</span>
                        </div>
                        <div class="func-content-item" @click="goIntegral"><img
                                src="../../static/images/user/wdjf.png"/><span>我的积分</span>
                        </div>
                        <div class="func-content-item" @click="goCoupon"><img
                                src="../../static/images/user/yhq.png"/><span>优惠券</span>
                        </div>
                        <div class="func-content-item" @click="goBlackList"><img
                                src="../../static/images/user/hmd.png"/><span>黑名单</span>
                        </div>
                        <div class="func-content-item" @click="goComplain"><img
                                src="../../static/images/user/wdts.png"/><span>我的投诉</span>
                        </div>
                    </div>
                </div>
                <div class="func-wrap">
                    <div class="func-title"><span>乘车服务</span></div>
                    <div class="func-content">
                        <div class="func-content-item" @click="goPassenger"><img
                                src="../../static/images/user/ccr.png"/><span>乘车人</span>
                        </div>
                        <div class="func-content-item" @click="goMyLike"><img
                                src="../../static/images/user/wdgz.png"/><span>我的关注</span>
                        </div>
                    </div>
                </div>
                <div class="func-wrap">
                    <div class="func-title"><span>车主服务</span></div>
                    <div class="func-content">
                        <div class="func-content-item" @click="goOwnerCertification"><img
                                src="../../static/images/user/czrz.png"/><span>车主认证</span></div>
                        <div class="func-content-item" @click="goVehicleManagement"><img
                                src="../../static/images/user/clgl.png"/><span>车辆管理</span>
                        </div>
                        <div class="func-content-item" @click="goMyFans"><img
                                src="../../static/images/user/wdfs.png"/><span>我的粉丝</span>
                        </div>
                    </div>
                </div>
                <div class="func-wrap">
                    <div class="func-title"><span>其他服务</span></div>
                    <div class="func-content">
                        <div class="func-content-item"><img src="../../static/images/user/jfsc.png"/><span>积分商城</span>
                        </div>
                        <div class="func-content-item"><img src="../../static/images/user/lxkf.png"/><span>联系客服</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="footer" v-if="flag == '0'">
            <van-tabbar v-model="footerActive" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF">
                <van-tabbar-item :icon="car" to="/busIndex">预定班车</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user?flag=0">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <div class="footer" v-else>
            <van-tabbar v-model="carActive" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import {Row, Col, Image, Toast,Tabbar,TabbarItem} from 'vant';
    import listImg from "./../../static/images/listImg.png";

    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import user from './../../static/images/busTrip/user.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    import request from '../../utils/request'
    import axios from 'axios';
    import qs from 'querystring'
    import context from "../../utils/context";

    export default {
        components: {
            [Row.name]: Row,
            [Col.name]: Col,
            [Image.name]: Image,
            [Toast.name]: Toast,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem
        },
        data() {
            return {
                listImg: listImg,
                footerActive:2,
                carActive:3,
                car: car,
                scan: scan,
                user: user,
                flag:0,
                chengK:chengK,
                xingC:xingC,
                push:push,
                person:person,
            }
        },
        methods: {
            goMyStroke() {
                //拼车
                this.$router.push({path: '/myStroke'});
            },
            goBlackList() {
                //黑名单
                this.$router.push({path: '/blacklist'});
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            goVehicleManagement() {
                //车辆管理
                this.$router.push({path: '/vehicleManagement'});
            },
            goSetting() {
                //我的资料
                this.$router.push({path: '/setting'});
            },
            goComplain() {
                //我的投诉
                this.$router.push({path: '/complain'});
            },
            goPassenger() {
                //乘车人管理
                this.$router.push({path: '/passenger'});
            },
            goWealth() {
                //    充值提现
                this.$router.push({path: '/wealth'});
            },
            goCoupon() {
                //优惠券
                this.$router.push({path: '/coupon'});
            },
            goOwnerCertification() {
                //车主认证
                this.$router.push({path: '/ownerCertification'});
            },
            goIntegral() {
                //我的积分
                this.$router.push({path: '/integral'});
            },
            goMyFans() {
                //我的粉丝
                this.$router.push({path: '/myFans'});
            },
            goMyLike() {
                //我的关注
                this.$router.push({path: '/myLike'});
            },
            goTicketList() {
                //班车
                this.$router.push({path: '/ticketList'});
            }
        },
        created() {
            let flag = this.$route.query.flag;
            if(flag){
                this.flag = flag;
            }
            let url = location.href;
            if (url.indexOf("code") != -1) {
                let str = url.substr(url.indexOf("?") + 1);
                let strs = str.split("&");
                let code = strs[0].split("=")[1];
                let url2 = "/wx/getopenid?" + qs.stringify({code: code});
                request.axios.get(url2).then(res => {
                    if (res.data.code === 0) {
                        let openid = res.data.data.openid;
                        localStorage.setItem("openid", openid);
                        request.axios.post(
                            '/wx/login', qs.stringify({openid: openid})).then((res) => {
                            if (res.data.code === 0) {
                                if (res.data.data.isLogin === "1") {
                                    //登陆成功
                                    localStorage.setItem("isLogin", "1");
                                    window.location.href = "https://"+location.hostname + "/#/user";
                                }
                            } else if(res.data.code === 2){
                                window.location.href = "https://"+location.hostname + "/#/register";
                            }else{
                                Toast(res.data.msg);
                            }
                        })
                    }else if(res.data.code === 2){
                        window.location.href = "https://"+location.hostname + "/#/register";
                    }else{
                        Toast(res.data.msg);
                    }
                }).catch(error => {
                        console.log(error);
                    });
            }
        },

    }
</script>

<style scoped>
    .content {
        background-color: white;
    }

    .func-content {
        height: auto;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
    }

    .func-content-item {
        width: 25%;
        height: 80px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .func-content-item img {
        width: 22px;
        height: 22px;
    }

    .func-content-item span {
        font-size: 14px;
        color: #666666;
        padding-top: 8px;
    }

    .func-title {
        height: 43px;
        line-height: 43px;
        width: 100%;
        border-bottom: 1px solid #BBBBBB;
    }

    .func-title span {
        color: #242424;
        font-size: 15px;
        margin-left: 18px;
    }

    .func-wrap {
        background-color: white;
        margin-top: 10px;
        min-height: 123px;
        height: auto;
        width: 100%;
        border-radius: 6px;
    }

    .bag-wrap-item {
        height: 50%;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .bag-wrap .bag-col:last-child {
        border: none;
    }

    .bag-col {
        height: 100%;
        border-right: 1px #CFCFCF dashed;
    }

    .bag-wrap {
        height: 43px;
        padding-top: 17px;
        padding-bottom: 17px;
        background-color: white;
        width: 100%;
        border-radius: 6px;
    }

    .content {
        background-color: #F6F6F6;
        padding: 0 15px;
        position: relative;
    }

    .info-wrap {
        background-image: -webkit-linear-gradient(-49deg, #5C77FE, #05CF8A);
        background-image: linear-gradient(-49deg, #5C77FE, #05CF8A);
        height: 146px;
        padding: 20px 15px 0 15px;
    }

    .real_name {
        color: white;
        font-size: 14px;
        line-height: 20px;
        border: white 1px solid;
        border-radius: 3px;
    }
    .footer {
        width: 100%;
    }

    .van-tabbar {
        background: #5083ED;
    }
</style>
