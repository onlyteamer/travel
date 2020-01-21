<template>
    <div class="contain">
        <div class="dateTag">
            <van-tabs type="card" v-model="active" :swipe-threshold="7" background="#FFFFFF" color="#5083ED"
                      title-active-color="#FFFFFF" title-inactive-color="#202020" @click="changeDate">
                <van-tab v-for="(item,index) in 7" :title="getWeek(index)" :name="getDate(index)"></van-tab>
                <!--                <van-tab title="周日"></van-tab>-->
                <!--                <van-tab title="周一"></van-tab>-->
                <!--                <van-tab title="周二"></van-tab>-->
                <!--                <van-tab title="周三"></van-tab>-->
                <!--                <van-tab title="周四"></van-tab>-->
                <!--                <van-tab title="周五"></van-tab>-->
                <!--                <van-tab title="周六"></van-tab>-->
            </van-tabs>

            <div class="placeTab">
                <van-tabs type="card" @click="changeDirection" color="#0CC893" title-active-color="#FFFFFF"
                          title-inactive-color="#0CC893">
                    <van-tab title="全部" name=""></van-tab>
                    <van-tab :title="'去'+startPlace" name="1"></van-tab>
                    <van-tab :title="'去'+endPlace" name="0"></van-tab>
                </van-tabs>
            </div>
        </div>
        <div class="content">
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
            >
                <div v-for="(item,index) in dataMain.data" :key="item.id">
                    <div class="carBar">
                        <div @click="linkStrokeDetails(item.tripId)">
                            <van-row>
                                <van-col span="6">
                                    <div style="display: flex;align-items: center;"><i
                                            style="width: 8px;height:8px;border-radius: 50%;background: #0CC893;margin-right: 5px"></i><span>{{item.startPlace}}</span>
                                    </div>

                                </van-col>
                                <van-col span="12">
                                    <div style="text-align: center;color: #FF0200">{{item.tripDateTime}}</div>
                                </van-col>
                                <van-col span="6">
                                    <div style="align-items: center;text-align: right"><i
                                            style="width: 8px;height:8px;border-radius: 50%;display:inline-block;background: #FF0200;margin-right: 5px"></i><span>{{item.endPlace}}</span>
                                    </div>
                                </van-col>
                            </van-row>
                            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }"/>
                            <van-row style="display: flex;align-items: center;">
                                <van-col span="20">
                                    <div style="display: flex;align-items: center">
                                        <img :src="item.headimgurl" style="height: 44px;width: 44px;border-radius: 50%"
                                             @click="linkUserDetails(item)">
                                        <div>
                                            <p style="font-size: 14px;margin: 5px 0"><span
                                                    style="color: #5083ED;font-weight: bold">【车主】</span><span
                                                    style="color: #5E5E5E">{{item.nickname}}</span>
                                                <img src="../../static/images/sexTag.png"
                                                     style="width: 12px;height: 12px;margin-left: 5px"
                                                     v-if="item.sex == '1'">
                                                <img src="../../static/images/man.png"
                                                     style="width: 12px;height: 12px;margin-left: 5px" v-else>
                                                <span class="collect"><img src="./../../static/images/xin.png"
                                                                           style="width: 14px">{{item.goodCount}}</span>
                                            </p>
                                            <p style="font-size: 14px;margin: 5px 0"><span
                                                    style="color: #202020;font-weight: bold">【车型】</span><span
                                                    style="color: #5E5E5E">{{item.carName}}</span></p>
                                        </div>
                                    </div>
                                </van-col>
                                <van-col span="4">
                                    <div style="font-size: 22px;font-weight: bold;color: #FF0200">￥{{item.tripPrice}}
                                    </div>
                                </van-col>
                            </van-row>
                            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                            <van-row>
                                <van-col span="24">
                                    <div style="margin: 0;word-break: break-all;">
                                        <span style="color:#202020;font-weight: bold;font-size: 14px;display: inline-block">路线：</span>
                                        <span style="font-size: 14px;color: #202020">{{item.tripLine}}</span>
                                    </div>
                                </van-col>
                            </van-row>
                            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                            <van-row style="color: #202020;font-weight: bold;font-size: 14px">
                                <van-col span="6">
                                    <div>剩余座位:</div>
                                </van-col>
                                <van-col span="18">
                                    <div>{{item.bookSeat}}</div>
                                </van-col>
                            </van-row>
                        </div>
                        <van-row style="color: #202020;font-weight: bold;font-size: 14px;margin: 10px 0">
                            <van-col span="8">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px"
                                            size="mini" @click="wxShare(item.tripId)">分享
                                </van-button>
                            </van-col>
                            <van-col span="8">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px"
                                            size="mini" @click="showMobile(item.driverPhone)">电话
                                </van-button>
                            </van-col>
                            <van-col span="8">
                                <van-button type="default" @click="goDeclare(item.tripId)" color="#0CC893"
                                            style="font-size: 14px;width: 95%;height: 34px" size="mini">马上预约
                                </van-button>
                            </van-col>
                        </van-row>

                    </div>
                </div>
            </van-list>
        </div>
        <van-popup v-model="guide" @click="guide=false">
            <div style="text-align:center;color:#fff;position: absolute;top: 80%;left: 0;right: 0;margin: auto;">
                点击右上角,选择分享到好友或朋友圈
            </div>
            <img :src="guideIcon"/>
        </van-popup>
        <div style="width: 100%">
            <van-tabbar v-model="footActive" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
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
    import {Tab, Tabs, Divider, Row, Popup, Col, Button, List, Dialog, Tabbar, TabbarItem} from 'vant';
    import request from "../../utils/request";
    import moment from 'moment'
    import guideIcon from '../../static/images/guide.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'
    import wx from 'weixin-js-sdk'

    export default {
        name: "carLine",
        components: {
            Title,
            [Popup.name]: Popup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Divider.name]: Divider,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [List.name]: List,
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                guide: false,
                footActive: "",
                title: "线路：北京←→密云",
                active: 1,
                isOneHttp: true,
                loading: false,
                finished: false,
                startPlace: "",
                endPlace: "",
                guideIcon: guideIcon,
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                lineInfo: {
                    direction: ''
                }
            }
        },
        mounted() {
            let info = JSON.parse(sessionStorage.getItem("queryStroke"));
            this.lineInfo = info;
            if (!this.lineInfo.startDate || !this.lineInfo.endDate) {
                this.lineInfo.startDate = moment().format("YYYY-MM-DD") + " " + '00:00:00';
                this.lineInfo.endDate = moment().format("YYYY-MM-DD") + " " + '23:59:59';
            }
            this.title = "线路：" + info.lineName;
            this.startPlace = info.startPlace;
            this.endPlace = info.endPlace;
            this.active = Number(info.week);
            this.initData();
            this.wxConfig();
        },

        methods: {
            getWeek(index) {
                return moment().locale("zh-cn").add(index, 'days').format("dddd").replace("星期", "周");
            },
            getDate(index) {
                return moment().locale("zh-cn").add(index, 'days').format("YYYY-MM-DD")
            },
            wxConfig() {
                let me = this;
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
                    wx.error(function (res) {
                        console.log(res);
                    });
                })
            },
            changeDate(name) {
                this.lineInfo.startDate = name + " " + '00:00:00';
                this.lineInfo.endDate = name + " " + '23:59:59';
                this.isOneHttp = true;
                this.loading = false;
                this.finished = false;
                this.dataMain.data = [];
                this.dataMain.pageNum = 1;
                this.dataMain.total = 0;
                this.initData();
            },
            changeDirection(name) {
                this.lineInfo.direction = name;
                this.isOneHttp = true;
                this.loading = false;
                this.finished = false;
                this.dataMain.data = [];
                this.dataMain.pageNum = 1;
                this.dataMain.total = 0;
                this.initData();
            },
            wxShareConfig(url){
                var ShareImgUrl = "https://bitgeek.qhdsx.com/img/logo.jpg"; // 分享图标
                var ShareTitle = "申坤出行"; // 分享标题
                var ShareDesc = "拼车详情!"; // 分享描述
                wx.ready(function () {
                    //自定义“分享给朋友”及“分享到QQ”按钮的分享内容
                    wx.updateAppMessageShareData({
                        title: ShareTitle, // 分享标题
                        desc: ShareDesc, // 分享描述
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: ShareImgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    });
                    wx.updateTimelineShareData({
                        title: ShareTitle, // 分享标题
                        link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: ShareImgUrl, // 分享图标
                        success: function () {
                            // 设置成功
                        }
                    })
                });
                wx.error(function (res) {
                    console.log(res);
                });
            },
            wxShare(item) {
                let  url = location.protocol + "//" + location.hostname +'/#/lineDetails?tripId='+item.tripId;
                this.wxShareConfig(url);
                this.guide = true;
            },

            linkUserDetails(val) {
                if (val.userId) {
                    this.$router.push({path: '/carOwnerDetails', query: {userId: val.userId}});
                }
            },

            //手机号
            showMobile(val) {
                if (val) {
                    window.location.href = "tel:" + val;
                } else {
                    this.$toast("暂无联系方式");
                }
            },

            //跳转详情页
            linkStrokeDetails(tripId) {
                this.$router.push({path: "/lineDetails", query: {tripId: tripId}})
            },

            goDeclare(id) {
                //车辆预约
                this.$router.push({path: '/declare', query: {id: id}});
            },
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initData();
                }
            },
            initData() {
                request.sendGet({
                    url: "/sharecar/pass/select/" + this.lineInfo.lineId,
                    params: {
                        startDate: this.lineInfo.startDate,
                        endDate: this.lineInfo.endDate,
                        lineId: this.lineInfo.lineId,
                        direction: this.lineInfo.direction,
                        pageNum: this.dataMain.pageNum,
                        pageSize: this.dataMain.pageSize
                    }
                }).then((res) => {
                    this.dataMain.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.isOneHttp) {
                        this.dataMain.data = res.data.rows;
                        this.isOneHttp = false;
                    } else {
                        this.dataMain.data = this.dataMain.data.concat(res.data.rows);
                    }

                    if (this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },
        },
        created() {

        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {

    }

    .content {
        margin-bottom: 55px;
        margin-top: 85px;
    }

    .dateTag {
        top: 0;
        width: 100%;
        position: fixed;
        z-index: 999;
        background-color: #F6F6F6;
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

    .placeTab {
        margin: 13px auto;
        width: 90%;
    }

    .carBar {
        width: 90%;
        margin: 0 auto;
    }

    .collect {
        display: inline-block;
        padding: 0 5px;
        margin-left: 25px;
        border: 1px solid #CFCFCF;
        border-radius: 2px;
    }

    .carBar {
        background: #FFFFFF;
        margin-bottom: 10px;
        padding: 5px 8px;
    }

    /deep/ .van-tabs__nav--card {
        box-sizing: border-box;
        height: 30px;
        margin: 0;
        border: 1px solid #ee0a24;
        border-radius: 2px;
    }

</style>

