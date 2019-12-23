<template>
    <div>
        <div class="info-wrap">
            <van-row style="height: 40px">
                <van-col span="8" style="height: 40px" @click="onClickLeft">
                    <div><img src="../../static/images/left.png" style="width: 11px;height: 18px"/></div>
                </van-col>
                <van-col span="8" style="height: 40px;text-align: center"><span style="color: white;font-size: 16px;">充值提现</span>
                </van-col>
            </van-row>
            <div>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">总资产（元）</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">{{dataMain.balance}}</div>
                        </div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div class="item-col-wrap">
                            <div style="font-size: 14px;color: white">累计收益（元）</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">{{dataMain.income}}</div>
                        </div>
                    </van-col>
                </van-row>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累计充值（元）</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">{{dataMain.recharge}}</div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累计消费（元）</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">{{dataMain.consume}}</div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="content">
            <div style="position: relative;top: -35px;">
                <van-row class="bag-wrap">

                    <van-col span="6" class="bag-col" :value="1" @click="goDetail(0)">
                        <div class="bag-wrap-item"><img src="../../static/images/xfjl.png"/></div>
                        <div class="bag-wrap-item">消费</div>
                    </van-col>
                    <van-col span="6" class="bag-col" :value="2" @click="goDetail(1)">
                        <div class="bag-wrap-item"><img src="../../static/images/syjl.png"/></div>
                        <div class="bag-wrap-item">收益</div>
                    </van-col>
                    <van-col span="6" class="bag-col" :value="3" @click="goDetail(2)">
                        <div class="bag-wrap-item"><img src="../../static/images/txdx.png"/></div>
                        <div class="bag-wrap-item">充值</div>
                    </van-col>
                    <van-col span="6" class="bag-col" @click="goDetail(3)">
                        <div class="bag-wrap-item"><img src="../../static/images/zdjl.png"/></div>
                        <div class="bag-wrap-item">提现</div>
                    </van-col>
                </van-row>
                <div class="func-wrap">
                    <div class="func-title">
                        <van-field v-model="czje" type="number" :border=false
                                   placeholder="充值金额" label="余额充值"/>
                        <span style="color: #5E5E5E;font-size: 17px">元</span>
                    </div>
                    <div class="func-content">
                        <van-button style="width: 100%;height:40px" color="#0CC893" type="default">
                            立即充值
                        </van-button>
                    </div>
                </div>
                <div class="func-wrap">
                    <div class="func-title">
                        <van-field v-model="txje" type="number" :border=false
                                   placeholder="最低提现金额100" label="余额提现"/>
                        <span style="color: #5E5E5E;font-size: 17px">元</span>
                    </div>
                    <div class="func-content">
                        <van-button style="width: 100%;height:40px" color="#5083ED" type="default" @click="cashOut">
                            立即提现
                        </van-button>
                    </div>
                </div>
                <div class="func-wrap" style="padding-top:13px">
                    <div style="display: flex;align-items: center">
                        <img style="width: 16px;height: 16px" src="../../static/images/notice.png"/>
                        <span style="font-size: 14px;color: #202020;font-weight: bold">注意：</span>
                    </div>
                    <div style="font-size: 14px;color: #202020;margin-top: 3px">
                        1. 充值提现规则，后台设置，前端展示。
                    </div>
                    <div style="font-size: 14px;color: #202020;margin-top: 3px">
                        2. 充值提现规则，后台设置，前端展示。
                    </div>
                    <div style="font-size: 14px;color: #202020;margin-top: 3px">
                        3. 充值提现规则，后台设置，前端展示。
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<!--个人中心-充值提现-->
<script>
    import {NavBar, Row, Col, Field, Button, Toast} from 'vant';
    import request from "../../utils/request"
    import context from "../../utils/context";


    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Field.name]: Field,
            [Toast.name]: Toast
        },
        data() {
            return {
                dataMain: {
                    balance: 0,
                    recharge: 0,
                    income: 0,
                    cashout: 0,
                    consume: 0,
                },
                czje: '',
                txje: ''
            }
        },
        methods: {
            cashOut() {
                if (!this.txje || this.txje < 100) {
                    Toast("提现金额不能低于一百");
                    return;
                }
                if(this.txje>this.balance){
                    Toast("提现金额不能大于总资产");
                    return;
                }
                //提现
                request.sendPost({
                    url: '/user/center/cashout',
                    params: {
                        number: this.txje
                    }
                }).then((res)=>{
                    Toast(res.data.msg);
                })
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            goDetail(e) {
                this.$router.push({path: '/wealthDetail', query: {activeIndex: e}});
            },
            recharge() {
                // {payfor}
                //1、用户充值 2、拼车充值 3、班车充值 4、商城充值
                request.sendPost({
                    url: '/user/center/recharge/1',
                    params: {
                        number: this.czje
                    }
                }).then((res) => {

                })
            },
            wxPay(){
                var url = context.wxGetConfigUrl;
                request.sendGet({
                    url:url,
                    params:{}
                }).then(res =>{
                    var data = res.data.data;
                    wx.config({
                        beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
                        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                        timestamp: parseInt(data.timestamp,10), // 必填，生成签名的时间戳
                        nonceStr: data.nonceStr, // 必填，生成签名的随机串
                        signature: data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone','hideOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });

                })
            },
            initData() {
                request.sendGet({
                    url: '/user/center/finance',
                    params: {}
                }).then((res) => {
                    if (res.data.code === 0) {
                        this.dataMain = res.data.data;
                    }
                })
            },
        },
        created() {
            this.initData();
            this.wxPay();
        },
    }
</script>

<style scoped>
    .item-col-wrap {
        width: 100%;
        height: 100%;
        border-bottom: 1px white dashed;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .item-col {
        text-align: center;
        height: 69px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0 33px;
    }

    .content {
        background-color: white;
    }

    /deep/ .van-cell:not(:last-child)::after {
        border: none;
    }

    /deep/ .van-field__label {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #202020 !important;
    }

    .func-content {
        height: 62px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .bag-wrap-item img {
        height: 20px;
    }

    .bag-wrap-item div {
        font-size: 14px;
        color: #666666;
        margin-top: 12px;
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
        height: 47px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #BBBBBB;
    }

    .func-wrap {
        background-color: white;
        margin-top: 10px;
        min-height: 109px;
        height: auto;
        border-radius: 6px;
        padding: 0 11px;
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
        height: 220px;
        padding: 20px 15px 0 15px;
    }

</style>
