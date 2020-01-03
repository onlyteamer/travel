<template>
    <div>
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div style="margin-top: 0px;font-size: 14px">
            <div class="card">
                <div style="color: #5083ED;font-weight: bold">线路：{{busInfo.linename}}</div>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <van-row style="display: flex;align-items: center;justify-content: center">
                    <van-col span="8" align="center">
                        <div style="font-size: 16px;font-weight: bold;margin-bottom: 10px"><img
                                src="./../../static/images/greenTag.png"
                                style="width: 14px;height: 14px;display: inline-block"/>{{busInfo.startname}}
                        </div>
                        <div style="font-weight: bold">{{busInfo.starttime}}</div>
                    </van-col>
                    <van-col span="8" style="text-align: center;">
                        <img src="./../../static/images/busTrip/rightArrow.png" width="51px" height="25px">
                    </van-col>
                    <van-col span="8" align="center">
                        <div style="font-size: 16px;font-weight: bold;margin-bottom: 10px"><img
                                src="./../../static/images/redTag.png"
                                style="width: 14px;height: 14px;display: inline-block"> {{busInfo.endname}}
                        </div>
                        <div style="font-weight: bold">{{busInfo.endtime}}</div>
                    </van-col>
                </van-row>
            </div>

            <div class="card">
                <div style="color: #202020;font-weight: bold">购买明细</div>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <van-row style="display: flex;align-items: center;justify-content: center">
                    <van-col span="12" style="margin-left: 28px">张数</van-col>
                    <van-col span="12" align="right">
                        <div style="font-weight: bold;font-size: 22px;color: #0CC893;">{{num}}<span
                                style="font-weight: bold;font-size: 14px;color: #202020;margin-left: 5px">张</span></div>
                    </van-col>
                </van-row>
                <van-row style="display: flex;align-items: center;justify-content: center;margin-top: 15px">
                    <van-col span="12" style="margin-left: 28px">票价</van-col>
                    <van-col span="12" align="right">
                        <div style="font-weight: bold;font-size: 22px;color: #FF0200;"><span
                                style="font-weight: bold;font-size: 14px;">￥</span>{{amount}}
                        </div>
                    </van-col>
                </van-row>
            </div>

            <div class="card">
                <div style="color: #202020;font-weight: bold">支付方式</div>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <van-radio-group v-model="radio">
                    <van-cell-group>
                        <van-cell title="微信付款" :icon="wxChar" clickable @click="radio = '1'" :border="false">
                            <van-radio slot="right-icon" name="1" checked-color="#07c160"/>
                        </van-cell>
                        <van-cell title="余额付款" :icon="balance" clickable @click="radio = '2'" :border="false">
                            <van-radio slot="right-icon" name="2" checked-color="#07c160"/>
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </div>

        <div class="footer">
            <van-button type="primary" color="#0CC893" style="width: 100%" @click="wxPay">确认支付</van-button>
        </div>

        <div class="footerBar">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="car" to="/busIndex">预定巴士</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Button, Toast, Divider, RadioGroup, Radio, Cell, CellGroup, Tabbar, TabbarItem} from 'vant';
    import wxChar from './../../static/images/busTrip/wxchar.png'
    import balance from './../../static/images/busTrip/balance.png'
    import request from "../../utils/request";

    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import user from './../../static/images/busTrip/user.png'


    export default {
        name: "ticketPayment",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Toast.name]: Toast,
            [Divider.name]: Divider,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        },
        data() {
            return {
                active: "",
                title: "支付",
                radio: '1',
                num: 0,
                amount: 0,
                busid: '',
                lineid: '',
                dateStr: [],
                busInfo: {
                    busnumber: "",
                    endid: "",
                    endname: "",
                    endtime: "",
                    lineid: "",
                    linename: "",
                    startid: "",
                    startname: "",
                    starttime: "",
                    ticketPrice: ""
                },
                wxChar: wxChar,
                balance: balance,
                user: user,
                car: car,
                scan: scan,
                wxData:{}
            }
        },
        methods: {
            queryBus() {
                request.sendPost({
                    url: '/bus/selectLineInfo/' + this.busid,
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.busInfo = res.data.data;
                    }
                })
            },
            submitOrder(){
                request.sendPost({
                    url: '/bus/buyTicket',
                    params: {
                        busid: this.busid,
                        dateStr: this.chooseDate,
                        lineid: this.lineid,
                        payment: this.amount,
                        prepayId:this.wxData.prepayId,
                    }
                }).then((res)=>{
                    if (res.data.code === 0) {
                        this.$router.push({path:'/ticketList'});
                    } else {
                        Toast(res.data.msg);
                    }
                });

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
                        jsApiList: ['WeixinJSBridge'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
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
            cancelTicket(){
                request.sendPost({
                    url:'/bus/cancelTicket',
                    params:{
                        busid: this.busid,
                        dateStr: this.chooseDate,
                        lineid: this.lineid,
                    }
                }).then(res=>{
                    console.log(res);
                })
            },
            jsApiCall() {
                let me = this;
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
                        if (res.err_msg === "get_brand_wcpay_request:ok") {
                            Toast("支付成功");
                            me.submitOrder();
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        } else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                            Toast("支付失败");
                            me.$router.push({path:'/buyTicket'});
                            // me.cancelTicket();
                        }else if(res.err_msg === 'get_brand_wcpay_request:cancel'){
                            Toast("取消支付");
                            me.$router.push({path:'/buyTicket'});
                            // me.cancelTicket();
                        }
                    }
                );
            },

            buyTicketBefore(){
                request.sendPost({
                    url:'/bus/buyTicketBefore',
                    params:{
                        busid: this.busid,
                        dateStr: this.chooseDate,
                        lineid: this.lineid,
                    }
                }).then(res=>{
                    if(res.data.code===0){

                    }else{
                        Toast(res.data.msg);
                    }
                })
            },

            wxPay() {
                request.sendGet({
                    url: '/wx/pay/create/order/1',
                    params: {
                        paynum: this.amount,
                    }
                }).then((res) => {
                    if(res.data.code===0){
                        this.wxData = res.data.data;
                        this.callpay();
                    }else{
                        Toast(res.data.msg);
                    }
                })
            },

            onClickLeft() {
                this.$router.back(-1);
            }
        },
        created() {
            this.num = this.$route.query.num;
            this.amount = this.$route.query.amount;
            this.busid = this.$route.query.busid;
            this.lineid = this.$route.query.lineid;
            this.chooseDate = this.$route.query.dateStr;
            this.queryBus();
            this.getWxConfig();
        },
    }
</script>

<style scoped>

    .card {
        width: 88%;
        background: #FFFFFF;
        margin: 15px auto;
        padding: 15px 10px;
    }

    .van-icon__image {
        width: 1.6rem;
        height: 1.6rem;
    }

    .footer {
        position: fixed;
        bottom: 60px;
        width: 88%;
        left: 50%;
        transform: translateX(-50%);
    }

    .footerBar {
        width: 100%;
    }

</style>

