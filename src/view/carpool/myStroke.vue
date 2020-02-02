<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div class="tab">
            <van-tabs v-model="strokeType" @change="changeTab" color="#5083ED" title-active-color="#5083ED"
                      title-inactive-color="#202020">
                <van-tab title="乘客行程"></van-tab>
                <van-tab title="车主行程"></van-tab>
            </van-tabs>
        </div>
        <div style="margin-top: 59px">
            <van-list
                    :offset="10"
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                    :immediate-check="false"
            >
                <div v-for="(item,index) in passTrip.data" :key="index" v-if="strokeType == '0'">
                    <div class="listInfo">
                        <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                            <van-col span="12">
                                {{item.tripDate}}
                            </van-col>
                            <van-col span="7" style="font-weight: bold">
                                ¥ {{item.tripPrice}} * {{item.passengerCount}} 人
                            </van-col>
                            <van-col span="5" align="right"
                                     :style="{color:item.tripState == '3'?'#202020':'#FF0200'}">
                                {{item.tripStateName}}
                            </van-col>
                        </van-row>
                        <van-row style="padding: 5px 2px" @click="linkLineDetails(item,'0')">
                            <van-col span="12">
                                <p><span>出发地：{{item.startPlace}}</span></p>
                                <p style="margin-bottom:0.5rem "><span>车牌：{{item.carNumber}}</span></p>
                                <!--<p v-if="index == '1'"><span>待确认：1人</span></p>-->
                            </van-col>
                            <van-col span="12">
                                <p><span>目的地：{{item.endPlace}}</span></p>
                                <p style="margin-bottom:0.5rem "><span>车型：{{item.carInfo}}</span></p>
                                <!--<p v-if="index == '1'"><span>已确认：2人</span></p>-->
                            </van-col>
                        </van-row>
                        <div style="padding: 0 2px;margin: 0">
                            <span>乘车人：{{item.passengers}}</span>
                        </div>
                        <van-row style="margin: 10px 0"
                                 v-if="item.tripState != '2' && item.tripState != '4'&&item.tripState != '3'">
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="wxShare(item)">分享
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkCarPosition(item.tripId)">车主位置
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="contactCar(item.driverPhone)">联系车主
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button @click="goCarFate(item.tripId)" :disabled="item.tripState == '0'"
                                            type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px" size="mini">同车缘分
                                </van-button>
                            </van-col>
                        </van-row>

                        <van-row style="margin: 10px 0"
                                 v-if="item.tripState != '2' &&item.tripState != '3'&&item.tripStateName!='已取消'&&item.tripStateName!='已拒绝'">
                            <van-col span="6">

                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="changeArrive(item.tripId)"
                                            :disabled="item.tripState == '0'">已到达
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="passengerPayment(item)"
                                            :disabled="item.tripState == '0'">上车支付
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkToCancel(item)" :disabled="item.tripState == '0'">
                                    取消行程
                                </van-button>
                            </van-col>
                        </van-row>

                        <van-row style="margin: 10px 0" v-if="item.tripState == '3'">
                            <van-col span="6">

                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkCarAppraise(item.tripId)">行车评价
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="goCarFate(item.tripId)">同车缘分
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkOpt(item)">其他操作
                                </van-button>
                            </van-col>
                        </van-row>

                    </div>
                </div>
                <div v-for="(item,index) in carOwnerTrip.data" :key="index" v-if="strokeType != '0'">
                    <div class="listInfo">
                        <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                            <van-col span="14">
                                {{item.tripDate}}
                            </van-col>
                            <van-col span="5" style="font-weight: bold">
                                ¥ {{item.tripPrice}}
                            </van-col>
                            <van-col span="5" align="right" :style="{color: item.tripState == '1'?'#202020':'#FF0200'}">
                                {{item.tripState =='1'?'已完成':(item.tripState =='0'?'待出行':(item.tripState ==
                                '2'?'已取消':(item.tripState =='3'?'已终止':(item.tripState =='4'?'已发车':'待确认'))))}}
                            </van-col>
                        </van-row>

                        <van-row style="padding: 5px 2px" @click="linkLineDetails(item,'1')">
                            <van-col span="12">
                                <p><span>发车地点：{{item.startPlace}}</span></p>
                                <p><span>座位：{{item.confirmSeats}}/ {{item.totalSeats}}个</span></p>
                                <p><span v-if="item.tripState != 1">待确认：{{item.unconfirmSeats}}人</span></p>
                            </van-col>
                            <van-col span="12">
                                <p><span>目的地：{{item.endPlace}}</span></p>
                                <p><span>车型：{{item.carName}}</span></p>
                                <p><span v-if="item.tripState != 1">已确认：{{item.confirmSeats}}人</span></p>
                            </van-col>
                        </van-row>

                        <van-row style="margin: 10px 0" v-if="item.tripState == '0'" type="flex" justify="end">
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="wxShare(item)">分享
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="startCar(item.tripId)">发车
                                </van-button>
                            </van-col>
                            <!--                            <van-col span="6">-->
                            <!--                                <van-button type="default" color="#0CC893"-->
                            <!--                                            style="font-size: 14px;width: 96%;height: 28px"-->
                            <!--                                            size="mini" @click="changeArrive(item.tripId)">已到达-->
                            <!--                                </van-button>-->
                            <!--                            </van-col>-->


                            <van-col span="6">
                                <van-button @click="goPassengerList(item.tripId,item.tripState)" type="default"
                                            color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px" size="mini">乘客
                                </van-button>
                            </van-col>

                        </van-row>

                        <van-row style="margin: 10px 0" v-if="item.tripState == '0'" type="flex" justify="end">
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="showSeat(item.tripId)">调整座位
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="fullSeat(item)">设为车满
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkUpdateStroke(item.tripId)">修改行程
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="linkToCancel(item)">取消行程
                                </van-button>
                            </van-col>
                        </van-row>

                        <van-row v-if="item.tripState != '0'" style="margin: 10px 0" type="flex" justify="end">
                            <van-col span="6" v-if="item.tripState === 4">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="finishTrip(item.tripId)">结束行程
                                </van-button>
                            </van-col>
                            <van-col span="6">
                                <van-button type="default" color="#0CC893"
                                            style="font-size: 14px;width: 96%;height: 28px"
                                            size="mini" @click="goPassengerList(item.tripId,item.tripState)">乘客
                                </van-button>
                            </van-col>
                        </van-row>


                        <!--<div class="cover" v-if="item.tripState == '3'||item.tripState == '2'"></div>-->
                    </div>

                </div>
            </van-list>
        </div>

        <div class="footer">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <van-dialog
                v-model="showSeatDialog"
                title="座位调整"
                show-cancel-button
                @confirm="updateSeat"
        >
            <van-field
                    v-model="changeSeatInfo.seatCount"
                    type="number"
                    label="座位数"
                    placeholder="请输入座位数"
                    required
            />
        </van-dialog>
        <van-popup v-model="wxpay" :style="{height: '45%',width:'90%'}"
                   style="background-color: white;border-radius: 10px">
            <div class="pay-title">拼车充值</div>
            <div class="func-wrap">
                <div class="func-title">
                    <div style="color: #5E5E5E;text-align: left;line-height: 35px">请输入充值金额:</div>
                    <div class="func-input-wrap">
                        <input v-model="czje" type="number" placeholder="100"/>
                        <span style="color: #5E5E5E;font-size: 17px;position: absolute;right: 10px">元</span>
                    </div>
                    <div class="czje-item">
                        <div @click="changeCzje(20)" :style="czje===20?{color:'#fff',backgroundColor:'#0CC893'}:{}">20
                        </div>
                        <div @click="changeCzje(30)" :style="czje===30?{color:'#fff',backgroundColor:'#0CC893'}:{}">30
                        </div>
                        <div @click="changeCzje(50)" :style="czje===50?{color:'#fff',backgroundColor:'#0CC893'}:{}">50
                        </div>
                        <div @click="changeCzje(100)" :style="czje===100?{color:'#fff',backgroundColor:'#0CC893'}:{}">
                            100
                        </div>
                    </div>
                </div>
                <div class="func-content">
                    <van-button style="width: 96%;height:40px;" color="#0CC893" type="default" @click="wxPay">
                        立即充值
                    </van-button>
                </div>
            </div>
        </van-popup>
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
    import {Tab, Tabs, Divider, Row, Col, Button, Popup, Dialog, Field, Tabbar, TabbarItem, List} from 'vant';
    import request from '../../utils/request'
    import wx from 'weixin-js-sdk'
    import moment from 'moment';

    import guideIcon from '../../static/images/guide.png'
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "myStroke",
        components: {
            Title,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Divider.name]: Divider,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Popup.name]: Popup,
            [Dialog.name]: Dialog,
            [Field.name]: Field,
            [Dialog.Component.name]: Dialog.Component,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
            [List.name]: List
        },
        data() {
            return {
                carPosition: {
                    lat: '',
                    lon: ''
                },
                loading: false,
                finished: false,
                isOneHttp: true,
                guide: false,
                guideIcon: guideIcon,
                czje: '',
                carLineList: [],
                wxData: {},
                wxpay: false,
                active: 1,
                showSeatDialog: false,
                changeSeatInfo: {
                    tripId: "",
                    seatCount: ""
                },
                title: "我的行程",
                strokeType: "0",
                passTrip: {
                    data: [],
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,

                },
                carOwnerTrip: {
                    data: [],
                    pageSize: 10,
                    pageNum: 1,
                    total: 0,
                },
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
            }
        },
        mounted() {
            let strokeType = sessionStorage.getItem("strokeType");
            if (strokeType) {
                this.strokeType = Number(strokeType);
            }
            this.changeTab(this.strokeType);
        },
        created() {
            this.getWxConfig();
        },
        methods: {
            finishTrip(tripId) {
                request.sendPost({
                    url: '/sharecar/trip/end/' + tripId,
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$toast.success(res.data.msg);
                        this.finished = false;
                        this.loading = true;
                        this.carOwnerTrip.data = [];
                        this.carOwnerTrip.pageNum = 1;
                        this.initCarOwnerTripList();
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                })
            },
            changeCzje(je) {
                this.czje = je;
            },
            wxShareConfig(url) {
                var ShareImgUrl = "https://bitgeek.qhdsx.com/img/logo.jpg"; // 分享图标
                var ShareTitle = "申坤出行"; // 分享标题
                var ShareDesc = "拼车详情"; // 分享描述
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
            //行程详情
            linkLineDetails(item, type) {
                sessionStorage.setItem("strokeType", type);
                this.$router.push({path: '/lineDetails', query: {tripId: item.tripId}});
            },


            recharge() {
                // {payfor}
                //1、用户充值 2、拼车充值 3、班车充值 4、商城充值
                request.sendPost({
                    url: '/user/center/recharge/2',
                    params: {
                        number: this.czje
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.wxpay = false;
                    }
                    this.$toast(res.data.msg);
                })
            },
            getWxConfig() {
                request.sendGet({
                    url: '/wx/pay/signature',
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
                        jsApiList: ['WeixinJSBridge', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'getLocation', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                });
            },

            callpay() {
                if (typeof WeixinJSBridge == "undefined") {
                    if (document.addEventListener) {
                        document.addEventListener('WeixinJSBridgeReady', this.jsApiCall(), false);
                    } else if (document.attachEvent) {
                        document.attachEvent('WeixinJSBridgeReady', this.jsApiCall());
                        document.attachEvent('onWeixinJSBridgeReady', this.jsApiCall());
                    }
                } else {
                    this.jsApiCall();
                }
            },
            jsApiCall() {
                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest',
                    {
                        "appId": this.wxData.appId,
                        "timeStamp": this.wxData.timeStamp,
                        "nonceStr": this.wxData.nonceStr,
                        "package": this.wxData.package,
                        "signType": this.wxData.signType,
                        "paySign": this.wxData.paySign
                    },
                    function (res) {
                        // console.log(res.err_code + res.err_desc + res.err_msg);
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            this.recharge();
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                            this.$toast("支付失败");
                        }
                    }
                );
            },

            wxPay() {
                if (!this.czje) {
                    this.$toast.fail("充值金额不能为空");
                    return;
                }
                this.czje = this.czje + "";
                if (this.czje.indexOf('.') > -1) {
                    this.$toast.fail('请输入整数');
                    return;
                }
                request.sendGet({
                    url: '/wx/pay/create/order/2',//拼车充值2
                    params: {
                        paynum: this.czje,
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.wxData = res.data.data;
                        this.callpay();
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            onLoad() {
                if (this.strokeType == '0') {
                    if (this.passTrip.total > this.passTrip.data.length) {
                        this.passTrip.pageNum += 1;
                        this.initPassTripList();
                    }
                } else {
                    if (this.carOwnerTrip.total > this.carOwnerTrip.data.length) {
                        this.carOwnerTrip.pageNum += 1;
                        this.initCarOwnerTripList();
                    }
                }
            },

            contactCar(val) {
                if (val) {
                    window.location.href = "tel:" + val;
                } else {
                    this.$toast("暂无联系方式");
                }
            },

            changeTab(val) {
                if (val == '0') {
                    //乘客
                    this.passTrip.data = [];
                    this.passTrip.pageNum = 1;
                    this.initPassTripList();
                } else {
                    //车主
                    this.carOwnerTrip.data = [];
                    this.carLineList = [];
                    this.carOwnerTrip.pageNum = 1;
                    this.initCarOwnerTripList();
                }
            },

            updateSeat() {
                if (!this.changeSeatInfo.seatCount) {
                    this.$toast.fail("请填写座位数");
                    return;
                }

                request.sendPost({
                    url: "/sharecar/trip/updateseat/" + this.changeSeatInfo.seatCount,
                    params: {
                        tripId: this.changeSeatInfo.tripId
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$toast.success(res.data.msg);
                        this.finished = false;
                        this.loading = true;
                        this.carOwnerTrip.data = [];
                        this.carOwnerTrip.pageNum = 1;
                        this.initCarOwnerTripList();
                    } else {
                        this.$toast.fail(res.data.msg)
                    }

                })
            },

            showSeat(val) {
                this.showSeatDialog = true;
                this.changeSeatInfo.tripId = val;
            },
            fullSeat(val) {
                Dialog.confirm({
                    title: '设置车满',
                    message: val.unconfirmSeats + '人待确定，' + val.confirmSeats + '人已确定，剩余' + (val.totalSeats - val.confirmSeats - val.unconfirmSeats) + '个座位  是否设置为车满'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/trip/full/" + val.tripId,
                        params: {}
                    }).then(res => {
                        if (res.data.code === 0) {
                            this.$toast.success(res.data.msg);
                            this.finished = false;
                            this.loading = true;
                            this.carOwnerTrip.data = [];
                            this.carOwnerTrip.pageNum = 1;
                            this.initCarOwnerTripList();
                        } else {
                            this.$toast.fail(res.data.msg)
                        }
                    })
                })
            },

            //上车支付
            passengerPayment(val) {
                Dialog.confirm({
                    title: '上车支付',
                    message: '确认已经上车,支付给车主该行程费用' + val.tripPrice + '元'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/pass/pay/" + val.tripId,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            this.$toast.success(res.data.msg);
                            this.finished = false;
                            this.loading = true;
                            this.passTrip.data = [];
                            this.passTrip.pageNum = 1;
                            this.initPassTripList();
                            this.changeSeatInfo.seatCount = "";
                        } else if (res.data.code === 100) {
                            this.wxpay = true;
                        } else {
                            this.$toast.fail(res.data.msg)
                        }
                    })
                })
            },

            initCarOwnerTripList() {
                let me = this;
                request.sendGet({
                    url: "/sharecar/trip/list",
                    params: {
                        pageNum: this.carOwnerTrip.pageNum,
                        pageSize: this.carOwnerTrip.pageSize
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.carOwnerTrip.total = res.data.total;
                        if (res.data.rows.length > 0) {
                            this.carOwnerTrip.data = this.carOwnerTrip.data.concat(res.data.rows);
                            //上传位置信息定时器
                            for (let i = 0; i < this.carOwnerTrip.data.length; i++) {
                                let tripId = this.carOwnerTrip.data[i].tripId;
                                let end_date = moment(this.carOwnerTrip.data[i].tripDate, "YYYY-MM-DD HH:mm");
                                let start_date = moment(new Date(), "YYYY-MM-DD HH:mm");
                                let flag = end_date.diff(start_date, "hours") < 1 ? true : false;
                                //tripState 行程状态：0 待出行 1 已完成 2 已取消 3 已终止 4 已发车 5 待确认
                                if (flag && (this.carOwnerTrip.data[i].tripState === 0 || this.carOwnerTrip.data[i].tripState === 4 || this.carOwnerTrip.data[i].tripState === 5)) {
                                    if (JSON.stringify(this.$timer).indexOf(tripId)<0) {
                                        let timer = setInterval(me.updateDriverPosition(tripId), 2 * 60 * 1000);
                                        let obj = {};
                                        obj[tripId] = timer;
                                        this.$timer.push(obj);
                                    }
                                } else {
                                    if (JSON.stringify(this.$timer).indexOf(tripId)>0) {
                                        for(let k in this.$timer){
                                            clearInterval(this.$timer[k][tripId]);
                                        }
                                    }
                                }
                            }
                        }

                        if (!this.carOwnerTrip.data || this.carOwnerTrip.total === this.carOwnerTrip.data.length) {
                            this.finished = true;
                        }
                        this.loading = false;

                        //获取待出行的记录  定时器

                    }
                })
            },

            initPassTripList() {
                request.sendGet({
                    url: "/sharecar/pass/triplist",
                    params: {
                        pageNum: this.passTrip.pageNum,
                        pageSize: this.passTrip.pageSize
                    }
                }).then(res => {
                    if (res.data.code == 0) {
                        this.passTrip.total = res.data.total;
                        if (res.data.rows.length > 0) {
                            this.passTrip.data = this.passTrip.data.concat(res.data.rows);
                        }
                        if (!this.passTrip.data || this.passTrip.total === this.passTrip.data.length) {
                            this.finished = true;
                        }
                        this.loading = false;
                    }
                })
            },
            //已发车
            startCar(val) {
                Dialog.confirm({
                    title: '已发车',
                    message: '是否开始行程？确认后将通知乘客！'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/trip/tripstart/" + val,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            this.$toast.success(res.data.msg);
                            this.finished = false;
                            this.loading = true;
                            this.carOwnerTrip.data = [];
                            this.carOwnerTrip.pageNum = 1;
                            this.initCarOwnerTripList();
                        } else {
                            this.$toast.fail(res.data.msg)
                        }
                    })
                }).catch(() => {
                    //取消

                });

            },
            //已到达
            changeArrive(val) {
                //乘客
                Dialog.confirm({
                    title: '已到达',
                    message: '通知车主，已到达指定地点等候'
                }).then(() => {
                    // 确定
                    request.sendPost({
                        url: "/sharecar/pass/arrive/" + val,
                        params: {}
                    }).then(res => {
                        if (res.data.code == '0') {
                            this.$toast.success(res.data.msg);
                        } else {
                            this.$toast.fail(res.data.msg)
                        }
                    })
                }).catch(() => {
                    //取消

                });
            },

            onClickLeft() {
                this.$router.back(-1)
            },
            goCarFate(val) {
                sessionStorage.setItem("strokeType", "0");
                this.$router.push({path: '/carFate', query: {tripId: val}});
            },
            goPassengerList(val, tripState) {
                sessionStorage.setItem("strokeType", "1");
                this.$router.push({path: '/passengerList', query: {tripId: val, tripState: tripState}});
            },
            linkCarPosition(val) {
                sessionStorage.setItem("strokeType", "0");
                this.$router.push({path: '/carOwnPosition', query: {tripId: val}});
            },
            //行车评价
            linkCarAppraise(val) {
                sessionStorage.setItem("strokeType", "0");
                this.$router.push({path: '/carOwnerAppraise', query: {tripId: val}});
            },


            linkOpt(val) {
                sessionStorage.setItem("strokeType", "0");
                this.$router.push({path: '/otherOpt', query: {tripId: val.tripId}})
            },
            linkUpdateStroke(val) {
                sessionStorage.setItem("strokeType", "1");
                this.$router.push({path: '/updateStroke', query: {tripId: val}})
            },

            //跳转取消
            linkToCancel(val) {
                if (this.strokeType == '0') {
                    sessionStorage.setItem("strokeType", "0");
                    this.$router.push({path: '/cancelTrip-passenger', query: {tripId: val.tripId, bookid: val.bookId}})
                } else {
                    sessionStorage.setItem("strokeType", "1");
                    this.$router.push({
                        path: '/cancelTrip-driver',
                        query: {
                            tripId: val.tripId,
                            seat: val.totalSeats,
                            confirm: val.confirmSeats,
                            unconfig: val.unconfirmSeats,
                            price: val.tripPrice
                        }
                    })
                }
            },

            wxShare(item) {
                let url = location.protocol + "//" + location.hostname + '/#/lineDetails?tripId=' + item.tripId;
                this.wxShareConfig(url);
                this.guide = true;
            },
        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .func-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
    }

    .contain {

    }

    .tab {
        border-top: 1px solid #ECECEC;
        /*margin-top: 46px;*/
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 999;
    }

    .listInfo {
        width: 90%;
        margin: 10px auto;
        background: #FFFFFF;
        padding: 5px 10px;
        font-size: 14px;
        position: relative;
    }

    .cover {
        position: absolute;
        background: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .popInfo {
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        background: #FFFFFF;
        padding: 5px 10px;
    }

    .footer {
        width: 100%;
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

    .czje-item {
        margin-top: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around
    }

    .czje-item div {
        font-size: 14px;
        height: 25px;
        width: 50px;
        padding: 0 5px;
        line-height: 25px;
        color: #202020;
        background-color: #fff;
        border: 1px solid #cecece;
    }

    .func-input-wrap {
        text-align: left;
        display: flex;
        align-items: center;
        position: relative
    }

    .func-input-wrap input {
        padding: 0 5px;
        flex: 1;
        height: 30px;
        border-radius: 6px;
        border: 1px solid #cecece
    }

    .func-title {
        padding-bottom: 15px;
        width: 96%;
        border-bottom: 1px solid #BBBBBB;
    }

    .func-wrap {
        background-color: white;
        border-radius: 6px;
        /*padding: 10px 11px;*/
        height: 84%;
        position: relative;
        display: flex;
        flex-direction: column;
        text-align: center;
        align-items: center;
    }

    .pay-title {
        background-color: white;
        width: 100%;
        height: 15%;
        font-size: 20px;
        color: #202020;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #CECECE
    }
</style>
