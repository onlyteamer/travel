<template>
    <div class="contain">
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="8">剩余{{stroke.bookSeat}}座可预约</van-col>
                <van-col span="16">
                    <van-col v-for="item in stroke.bookSeat" style="padding-bottom:5px " :key="item">
                        <van-tag :color="stroke.seatCount == item?'#0CC893':'#FFFFFF'"
                                 :text-color="stroke.seatCount == item?'#FFFFFF':'#202020'" class="seatTag"
                                 @click="changeSeat(item)">{{item}}座
                        </van-tag>
                    </van-col>
                </van-col>
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
                    <van-field v-model="stroke.riderNames2.toString()" placeholder="乘客人姓名" label="" label-width="5px"
                               left-icon="user-circle-o" disabled/>
                </van-col>
            </van-row>
            <div style="border-bottom: 1px solid #ECECEC;padding: 0px 2px 12px">
                <van-row style="display: flex;align-items: center;">
                    <van-col span="16">
                        <div>
                            <van-tag :color="stroke.riderIds2.indexOf(item.id)>-1?'#0CC893':'#FFFFFF'"
                                     :text-color="stroke.riderIds2.indexOf(item.id)>-1?'#FFFFFF':'#202020'"
                                     class="contactTag"
                                     v-for="item in normalRiders" :key="item.id" @click="selectRider(item)">
                                {{item.passName}}
                            </van-tag>
                        </div>
                    </van-col>

                </van-row>
                <div style="display: flex;align-items: center;justify-content: flex-end">
                    <van-button type="default" color="#0CC893"  @click="goPassenger" size="mini" style="font-size: 13px">常用联系人</van-button>
                    <van-button type="default" color="#0CC893"  @click="goAdd" size="mini" style="font-size: 13px">新增</van-button>
                </div>

            </div>


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

        <div style="width: 100%">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="chengK" to="/carIndex">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user?flag=1">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <van-popup v-model="showPassenger" position="bottom" :style="{ height: '30%',width:'94%',padding:'0 3%'}">
            <van-checkbox-group v-model="result" :max="stroke.seatCount" @change="changePassenger">
                <van-checkbox :name="item.id" v-for="item in passengerData" :key="item.id"
                              style=" border-bottom: 1px solid #ECECEC;">
                    <div class="item-li">
                        <div class="item-li-flex" style="align-items: flex-start">
                            <div>
                                <span style="color:#202020;font-size: 16px;margin-right: 8px;font-weight: bolder">{{item.passName}}</span>
                            </div>
                            <div style="display:flex;align-items: center;margin-top: 5px">
                                <img src="../../static/images/tel.png"
                                     style="width: 14px;height:14px;margin-right: 9px"/>
                                <span>{{item.passPhone}}</span>
                            </div>
                        </div>
                    </div>
                </van-checkbox>
            </van-checkbox-group>
        </van-popup>
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
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {
        Row,
        Col,
        Icon,
        Checkbox,
        CheckboxGroup,
        Button,
        Tag,
        Field,
        Popup,
        Picker,
        Toast,
        Tabbar,
        TabbarItem
    } from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import request from '../../utils/request'
    import wx from 'weixin-js-sdk'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

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
            [Picker.name]: Picker,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                result: [],
                active: "",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                czje: 50,
                wxData: {},
                wxpay: false,
                showPassenger: false,
                passengerData: [],
                redBar: redBar,
                greenBar: greenBar,
                checked: true,
                title: "预约",
                normalRiders: [],
                selectSeat: "",
                stroke: {
                    startPlace: "",
                    endPlace: "",
                    tripId: "",
                    riderNames: [],
                    riderIds: [],
                    riderNames2: [],
                    riderIds2: [],
                    phone: "",
                    seatCount: 0,
                    price: "",
                    remark: "",
                    bookSeat: "",
                    totalSeats: ""
                }
            }
        },
        methods: {
            goAdd() {
                this.$router.push({path: '/passenger-edit'});
            },
            changePassenger(value) {
                if (this.stroke.seatCount === 0) {
                    Toast("请先选择座位数");
                    return;
                }
                this.stroke.riderNames2 = [];
                this.stroke.riderIds2 = [];
                for (let j = 0; j < value.length; j++) {
                    for (let i = 0; i < this.passengerData.length; i++) {
                        if (this.passengerData[i].id === value[j]) {
                            this.stroke.riderNames2.push(this.passengerData[i].passName);
                            this.stroke.riderIds2.push(this.passengerData[i].id);
                            this.stroke.phone = this.passengerData[i].passPhone;
                            continue;
                        }
                    }
                }
            },
            changeCzje(je) {
                this.czje = je;
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
                    Toast(res.data.msg);
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
                            Toast("支付失败");
                        }
                    }
                );
            },

            wxPay() {
                if (!this.czje) {
                    Toast("充值金额不能为空");
                    return;
                }
                this.czje = this.czje + "";
                if (this.czje.indexOf('.') > -1) {
                    Toast('请输入整数');
                    return;
                }
                request.sendGet({
                    url: '/wx/pay/create/order/2',//拼车充值
                    params: {
                        paynum: this.czje,
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.wxData = res.data.data;
                        this.callpay();
                    } else {
                        Toast(res.data.msg);
                    }
                })
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

                if (!this.stroke.riderIds2) {
                    Toast.fail("乘客不能为空");
                    return;
                }
                if (this.stroke.riderIds2.length !== this.stroke.seatCount) {
                    Toast.fail("请添加全部乘车人");
                    return;
                }
                this.stroke.riderIds = this.stroke.riderIds2.toString();
                this.stroke.riderNames = this.stroke.riderNames2.toString();
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
                let index = this.stroke.riderIds2.indexOf(data.id);
                if (index > -1) {
                    let index2 = this.stroke.riderNames2.indexOf(data.passName);
                    this.stroke.riderNames2.splice(index2, 1);
                    this.stroke.riderIds2.splice(index, 1);
                } else {
                    if (this.stroke.seatCount > this.stroke.riderIds2.length) {
                        this.stroke.riderNames2.push(data.passName);
                        this.stroke.riderIds2.push(data.id);
                    }
                }
                this.result = this.stroke.riderIds2;
            },
            queryTrip() {
                request.sendPost({
                    url: '/sharecar/pass/booktripinfo/' + this.stroke.tripId,
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.normalRiders = res.data.data.passengerList;
                        if (this.normalRiders.length > 0) {
                            for (let i = 0; i < this.normalRiders.length; i++) {
                                if (this.normalRiders[i].isLastPassanger === 1) {
                                    this.stroke.riderNames2.push(this.normalRiders[i].passName);
                                    this.stroke.riderIds2.push(this.normalRiders[i].id);
                                    this.stroke.phone = this.normalRiders[i].passPhone;
                                }
                            }

                            this.stroke.seatCount = this.stroke.riderIds2.length;
                        }
                        this.result = this.stroke.riderIds2;
                        this.stroke.startPlace = res.data.data.startPlace;
                        this.stroke.endPlace = res.data.data.endPlace;
                        this.stroke.price = res.data.data.tripPrice;
                        this.stroke.bookSeat = res.data.data.bookSeat;
                        this.stroke.totalSeats = res.data.data.totalSeats;
                    } else {
                        Toast(res.data.msg);
                        this.$router.go(-2);
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
                    if (res.data.code === 0) {
                        if (res.data.rows && res.data.rows.length > 0) {
                            this.passengerData = res.data.rows;
                        } else {
                            this.$router.push({path: '/passenger'});
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

    /deep/ .van-checkbox__label {
        flex: 1;
    }

    .item-li {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 15px;
    }

    .item-li-flex {
        display: flex;
        flex-direction: column;
        justify-content: center;
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

    .func-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        bottom: 10px;
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

    .contain {
        background: #FFFFFF;
        font-size: 14px;
    }

    .contain .content {
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 0 auto;
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
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        justify-content: center;
        border: 1px solid #CFCFCF;
        min-width: 30px;
        width: auto;
        padding: 0 5px;
        margin-bottom: 5px
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
        margin: 0 auto 55px;
        padding: 5px 0;
    }

    .footer .notice {
        margin-top: 6px;
        line-height: 24px;
    }

</style>
