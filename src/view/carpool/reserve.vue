<template>
    <div class="contain">
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">预定座位数</van-col>
                <van-col span="18">
                    <van-col v-for="item in selectSeat" style="padding-bottom:5px " :key="item">
                        <van-tag :color="stroke.seatCount == item?'#0CC893':'#FFFFFF'"
                                 :text-color="stroke.seatCount == item?'#FFFFFF':'#202020'" class="seatTag"
                                 @click="changeSeat(item)">{{item}}座
                        </van-tag>
                    </van-col>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">剩余{{stroke.bookSeat}}座</van-col>
                <van-col span="14" style="color: #FF0200">每人限预定{{selectSeat}}座</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                v-model="stroke.startPlace"
                                placeholder="上车地点"
                                label=""
                                label-width="5px"
                                :left-icon="greenBar"
                        />
                    </div>
                </van-col>
                <van-col span="11" v-if="stroke.startPlace">
                    <van-button size="small">上次行程上车地点
                        <van-icon name="location" color="#0CC893"/>
                    </van-button>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                v-model="stroke.endPlace"
                                placeholder="下车地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </div>
                </van-col>
                <van-col span="11" v-if="stroke.endPlace">
                    <van-button size="small">上次行程下车地点
                        <van-icon name="location" color="#FF0200"/>
                    </van-button>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center">
                <van-col span="24">
                    <van-field v-model="stroke.riderNames" placeholder="乘客人姓名" label="" label-width="5px"
                               left-icon="user-circle-o" disabled/>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 0px 2px 12px">
                <van-col span="16">
                    <div>
                        <van-tag :color="stroke.riderIds === item.id?'#0CC893':'#FFFFFF'"
                                 :text-color="stroke.riderIds === item.id?'#FFFFFF':'#202020'"
                                 style="border: 1px solid #CFCFCF;min-width: 30px;width: fit-content;margin-bottom: 5px" class="contactTag"
                                 v-for="item in normalRiders" :key="item.id" @click="selectRider(item)">
                            {{item.passName}}
                        </van-tag>
                    </div>
                </van-col>
                <van-col span="8" align="right" @click="goPassenger" style="font-size: 13px">（常用联系人）</van-col>
            </van-row>


            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="大件行李——如有行李请备注"
                                label=""
                                label-width="5px"
                                left-icon="cart-circle"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <van-field v-model="stroke.phone" placeholder="乘客手机号" label="" label-width="5px"
                               left-icon="phone-circle-o"/>
                </van-col>
            </van-row>
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;">
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意<span
                            @click="goAgreement('1')">《免责协议和条款》</span>和<span @click="goAgreement('2')">《平台支付条款》</span>
                    </van-checkbox>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto" @click="reserveCar">
                        预定（{{stroke.price}}元/座）
                    </van-button>
                </van-col>
            </van-row>

            <van-row>
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto" @click="goMyStroke">
                        取消
                    </van-button>
                </van-col>
            </van-row>
        </div>
        <div class="footer">
            <div>
                <van-icon name="warning" color="#F55456"/>
                注意:
            </div>
            <div class="notice">
                1. 后台设置规则1；设置规则1；设置规则1； 1. 后台设置规则1设置规则1；设置规则1；； 1. 后台设置规则1；
            </div>

        </div>
        <van-popup v-model="showPassenger" position="bottom" :style="{ height: '30%' }">
            <van-picker :columns="passengerData" show-toolbar value-key="passName" @cancel="showPassenger = false"
                        :visible-item-count="3"
                        @confirm="onPassengerChange"/>
        </van-popup>
        <van-popup v-model="wxpay" :style="{height: '45%',width:'90%'}" style="background-color: white;">
            <div class="pay-title">拼车充值</div>
            <div class="func-wrap">
                <div class="func-title">
                    <van-field v-model="czje" type="number" :border=false
                               placeholder="充值金额"/>
                    <span style="color: #5E5E5E;font-size: 17px">元</span>
                </div>
                <div class="func-content">
                    <van-button style="width: 96%;height:40px;" color="#0CC893" type="default" @click="wxPay">
                        立即充值
                    </van-button>
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Icon, Checkbox, CheckboxGroup, Button, Tag, Field, Popup, Picker, Toast} from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import request from '../../utils/request'

    export default {
        name: "reserve",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Checkbox.name]: Checkbox,
            [CheckboxGroup.name]: CheckboxGroup,
            [Button.name]: Button,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [Toast.name]: Toast,
            [Popup.name]: Popup,
            [Picker.name]: Picker
        },
        data() {
            return {
                czje:'',
                wxData:{},
                wxpay: false,
                showPassenger: false,
                passengerData: [],
                redBar: redBar,
                greenBar: greenBar,
                checked: true,
                title: "预约",
                normalRiders: [],
                selectSeat:"",
                stroke: {
                    startPlace: "",
                    endPlace: "",
                    tripId: "",
                    riderNames: '',
                    riderIds: '',
                    phone: "",
                    seatCount: "",
                    price: "",
                    remark: "",
                    bookSeat: "",
                    totalSeats: ""
                }
            }
        },
        methods: {
            recharge() {
                // {payfor}
                //1、用户充值 2、拼车充值 3、班车充值 4、商城充值
                request.sendPost({
                    url: '/user/center/recharge/2',
                    params: {
                        number: this.czje
                    }
                }).then((res) => {
                    if(res.data.code===0){
                        this.wxpay = true;
                    }
                    Toast(res.data.msg);
                })
            },
            getWxConfig() {
                request.sendGet({
                    url:'/wx/pay/signature',
                    params:{
                        url:location.href
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
                        document.attachEvent('WeixinJSBridgeReady',  this.jsApiCall());
                        document.attachEvent('onWeixinJSBridgeReady',  this.jsApiCall());
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
                        "package":  this.wxData.package,
                        "signType": this.wxData.signType,
                        "paySign": this.wxData.paySign
                    },
                    function (res) {
                        // console.log(res.err_code + res.err_desc + res.err_msg);
                        if(res.err_msg === "get_brand_wcpay_request:ok" ){
                            this.recharge();
                            // 使用以上方式判断前端返回,微信团队郑重提示：
                            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        }else if(res.err_msg === 'get_brand_wcpay_request:fail'){
                            Toast("支付失败");
                        }
                    }
                );
            },

            wxPay() {
                if(!this.czje){
                    Toast("充值金额不能为空");
                    return;
                }
                request.sendGet({
                    url: '/wx/pay/create/order/2',
                    params: {
                        paynum: this.czje,
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

            onPassengerChange(picker, values) {
                this.stroke.riderNames = picker.passName;
                this.stroke.riderIds = picker.id;
                this.stroke.phone = picker.passPhone;
                this.showPassenger = false;
            },

            goAgreement(val) {
                this.$router.push({path: '/agreement', query: {name: '绿色出行用户协议', id: val}})
            },
            goPassenger() {
                this.showPassenger = true;
            },
            //预约
            reserveCar() {
                if (!this.checked) {
                    Toast.fail("请选协议后进行操作");
                    return;
                }

                if (!this.stroke.phone) {
                    Toast.fail("乘客手机号不能为空");
                    return;
                }
                if (!this.stroke.startPlace) {
                    Toast.fail("上车地点不能为空");
                    return;
                }
                if (!this.stroke.endPlace) {
                    Toast.fail("下车地点不能为空");
                    return;
                }

                if (!this.stroke.riderIds) {
                    Toast.fail("乘客不能为空");
                    return;
                }

                request.sendPost({
                    url: '/sharecar/pass/booktrip',
                    params: this.stroke
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.$router.push({path: '/myStroke'});
                    } else if (res.data.code === 100) {
                        this.wxpay = true;
                    } else {
                        Toast(res.data.msg);
                    }

                })

            },
            goMyStroke() {
                this.$router.push({path: '/myStroke'});
            },
            changeSeat(item) {
                if (item > this.stroke.bookSeat) {
                    return;
                }
                this.stroke.seatCount = item;
            },
            selectRider(data) {
                if(data.id == this.stroke.riderIds){
                    this.stroke.riderNames = "";
                    this.stroke.riderIds = "";
                    this.stroke.phone = "";
                }else {
                    this.stroke.riderNames = data.passName;
                    this.stroke.riderIds = data.id;
                    this.stroke.phone = data.passPhone;
                }
            },
            queryTrip() {
                request.sendPost({
                    url: '/sharecar/pass/booktripinfo/' + this.stroke.tripId,
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.normalRiders = res.data.data.passengerList;
                        if (this.normalRiders.length > 0) {
                            this.stroke.riderNames = this.normalRiders[0].passName;
                            this.stroke.riderIds = this.normalRiders[0].id;
                            this.stroke.phone = this.normalRiders[0].passPhone;
                        }
                        this.stroke.startPlace = res.data.data.startPlace;
                        this.stroke.endPlace = res.data.data.endPlace;
                        this.stroke.price = res.data.data.tripPrice;
                        this.stroke.bookSeat = res.data.data.bookSeat;
                        this.stroke.totalSeats = res.data.data.totalSeats;
                        this.selectSeat = this.stroke.totalSeats>4?4:this.stroke.totalSeats;
                    }
                })
            },
            initPassengerData() {
                request.sendGet({
                    url: '/sharecar/pass/list',
                    params: {
                        pageSize: 99,
                        pageNum: 1,
                    }
                }).then((res) => {
                    if(res.data.code===0){
                        if(res.data.rows&&res.data.rows.length>0){
                            this.passengerData = res.data.rows;
                        }else{
                            this.$router.push({path:'/passenger'});
                        }
                    }
                });
            },
        },
        created() {
            this.stroke.tripId = this.$route.query.id;
            this.queryTrip();
            this.initPassengerData();
            this.getWxConfig();
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

    .func-title {
        height: 47px;
        width: 96%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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

    .contain {
        background: #FFFFFF;
        font-size: 14px;
    }

    .contain .content {
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 0 auto ;
        color: #202020;
    }

    .contain .content .valStyle {
        color: #9E9E9E;
        font-size: 14px;
    }

    .seatTag {
        width: 30px;
        height: 20px;
        font-size: 16px;
        margin-left: 5px;
        justify-content: center;
        border: 1px solid #CFCFCF
    }

    .contactTag {
        width: 30px;
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        justify-content: center;
    }

    .van-cell {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
    }

    .footer {
        width: 90%;
        margin: 0 auto;
        padding: 5px 0;
    }

    .footer .notice {
        margin-top: 6px;
        line-height: 24px;
    }

</style>
