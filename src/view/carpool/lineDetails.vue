<template>
    <div class="contain">
        <div ref="scrollView" style="overflow-y: auto;">
            <div class="lineDetails" @click="goDriverDetail">
                <van-row style="display: flex;align-items: center">
                    <van-col span="12">
                        <div style="display: flex;align-items: center">
                            <img :src="driverInfo.headImageurl"
                                 style="height: 44px;width: 44px;margin-right: 10px;border-radius: 50%">
                            <div>
                                <p style="font-size: 14px;margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{driverInfo.nickName}}</span><img
                                        src="../../static/images/sexTag.png"
                                        style="width: 12px;height: 12px;margin-left: 5px" v-if="driverInfo.sex == '1'"> <img
                                        src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px"
                                        v-else></p>
                                <p style="font-size: 14px;margin: 5px 0">
                                    <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;">{{driverInfo.carNumber}}</span>
                                </p>
                            </div>
                        </div>
                    </van-col>
                    <van-col span="12">
                        <div style="padding: 3px 0">
                            <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                style="font-size: 14px;color: #5E5E5E">{{driverInfo.phone}}</span>
                        </div>
                        <div style="padding: 0px 5px;border-radius: 3px;border: 1px solid #CFCFCF;font-size: 14px;width: fit-content">
                            <span style="color: #CFCFCF;margin-right: 5px">好评数</span><img
                                src="./../../static/images/xin.png" style="width: 14px"><span
                                style="margin-left: 5px;color: #5E5E5E">{{driverInfo.goodCount}}</span>
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="content">

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">线路</van-col>
                    <van-col span="18">{{tripDetails.lineName}}</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">发车时间</van-col>
                    <van-col span="18">{{tripDetails.tripDateTime}}</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">出发地</van-col>
                    <van-col span="18">{{tripDetails.startName}}</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">目的地</van-col>
                    <van-col span="18">{{tripDetails.endIdName}}</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                    <van-col span="6">路线</van-col>
                    <van-col span="18">{{tripDetails.tripLine}}</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">座位数</van-col>
                    <van-col span="18">{{tripDetails.totalSeat}}位</van-col>
                </van-row>

                <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                    <van-col span="6">价格</van-col>
                    <van-col span="18">{{tripDetails.tripPrice}}元</van-col>
                </van-row>

                <van-row style="padding: 12px 2px">
                    <van-col span="6">备注</van-col>
                    <van-col span="18">{{tripDetails.remark}}</van-col>
                </van-row>
            </div>
        </div>
        <van-row style="position: fixed;bottom: 55px;width: 100%;">
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini"
                            @click="wxShare">分享
                </van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini"
                            @click="followUser">关注
                </van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini"
                            @click="contactCar">电话
                </van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini"
                            @click="reserveCar">预约
                </van-button>
            </van-col>
        </van-row>

        <div style="width: 100%">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>


        <van-popup v-model="guide" @click="guide=false">
            <div style="text-align:center;color:#fff;position: absolute;top: 80%;left: 0;right: 0;margin: auto;">
                点击右上角,选择分享到好友或朋友圈
            </div>
            <img :src="guideIcon"/>
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Cell, CellGroup,DatetimePicker,Row,Popup, Col,Icon,Picker ,Checkbox, CheckboxGroup ,Button,Dialog,Tabbar, TabbarItem } from 'vant';
    import wx from 'weixin-js-sdk'
    import request from '../../utils/request'
    import guideIcon from '../../static/images/guide.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "lineDetails",
        components: {
            Title,
            [Cell.name]: Cell,
            [Popup.name]:Popup,
            [CellGroup.name]: CellGroup,
            [DatetimePicker.name]: DatetimePicker,
            [Popup.name]: Popup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Picker.name]: Picker,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Button.name]: Button,
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },

        data() {
            return {
                active:"",
                guide: false,
                guideIcon: guideIcon,
                title: "行车信息",
                tripDetails: {
                    startName: ""
                },
                driverInfo: {
                    carNumber: "",
                    badCount: "",
                    phone: "",
                    goodCount: "",
                    carName: "",
                    nickName: "",
                    headImageurl: "",
                    sex: ""
                },
                tripId:"",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        mounted() {
            this.initData();
            this.$refs.scrollView.style.height=(window.innerHeight-55-30)+'px';
        },
        created(){
        },

        methods: {
            goDriverDetail(){
                this.$router.push({path: '/carOwnerDetails', query: {userId: this.driverInfo.driverId}});
            },
            wxConfig() {
                request.sendGet({
                    url: "/wx/pay/signature",
                    params: {
                        url: location.href
                    }
                }).then(res => {
                    wx.config({
                        beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
                        // debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp: parseInt(res.data.data.timestamp, 10), // 必填，生成签名的时间戳
                        nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
                        signature: res.data.data.signature,// 必填，签名，见附录1
                        //updateTimelineShareData分享到朋友圈,updateAppMessageShareData分享给朋友,
                        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
                    });


                    var ShareLink = location.protocol + "//" + location.hostname + "/#/lineDetails?tripId=" + this.tripId; //默认分享链接
                    var ShareImgUrl = "https://bitgeek.qhdsx.com/img/logo.jpg"; // 分享图标
                    var ShareTitle = "申坤出行"; // 分享标题
                    var ShareDesc = "申坤出行!"; // 分享描述
                    wx.ready(function () {
                        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                        wx.updateAppMessageShareData({
                            title: ShareTitle, // 分享标题
                            desc: ShareDesc, // 分享描述
                            link: ShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: ShareImgUrl, // 分享图标
                            success: function () {
                                // 设置成功
                            }
                        });
                        wx.updateTimelineShareData({
                            title: ShareTitle, // 分享标题
                            link: ShareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: ShareImgUrl, // 分享图标
                            success: function () {
                                // 设置成功
                            }
                        })
                    });
                    wx.error(function (res) {
                        console.log(res);
                    });
                })
            },
            initData() {
                this.tripId = this.$route.query.tripId;
                request.sendGet({
                    url: "/sharecar/pass/tripdetail/" + this.tripId,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        let driverinfo = res.data.data.driverinfo;
                        this.driverInfo = driverinfo;
                    }
                })


                request.sendGet({
                    url: "/sharecar/trip/select/" + this.tripId,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        this.tripDetails.startName = res.data.data.tripinfo.startPlace;
                        this.tripDetails.endIdName = res.data.data.tripinfo.endPlace;
                        this.tripDetails.lineName = res.data.data.lineinfo.lineName;
                        this.tripDetails.tripDateTime = res.data.data.tripinfo.tripDateTime;
                        this.tripDetails.tripLine = res.data.data.tripinfo.tripLine;
                        this.tripDetails.totalSeat = res.data.data.tripinfo.totalSeat;
                        this.tripDetails.tripPrice = res.data.data.tripinfo.tripPrice;
                        this.tripDetails.remark = res.data.data.tripinfo.remark;
                    }
                })

            },

            followUser() {
                request.sendPost({
                    url: "/user/center/follow",
                    params: {
                        followerId: "1"
                    }
                }).then(res => {
                    if (res.data.code == '0') {
                        this.$toast.success("关注用户");
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },

            reserveCar() {
                this.$router.push({path: '/declare', query: {id: this.tripId}});
            },

            contactCar() {
                if (this.driverInfo.phone) {
                    window.location.href = "tel:" + this.driverInfo.phone;
                } else {
                    this.$toast("暂无联系方式");
                }
            },

            wxShare() {
                this.guide = true;
            }
        }
    }
</script>

<style scoped>
    .lineDetails {
        width: 90%;
        margin: 15px auto 15px;
        background: #FFFFFF;
        padding: 10px 5px;
    }

    .collect {
        margin-left: 20px;
    }

    /deep/ .van-popup {
        background-color: transparent;
    }

    /deep/ .van-popup--center {
        top: 20%;
        height: 30%;
        width: 100%;
        text-align: right;
        padding-right: 15px;
    }

    .content {
        padding: 5px 15px;
        background: #FFFFFF;
        font-size: 14px;
        margin-bottom: 40px;
    }

</style>
