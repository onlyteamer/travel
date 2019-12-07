<template>
    <div>
        <div class="info-wrap">
            <van-row style="height: 40px">
                <van-col span="8" style="height: 40px">
                    <div><img src="../../static/images/left.png" style="width: 11px;height: 18px"/></div>
                </van-col>
                <van-col span="8" style="height: 40px;text-align: center"><span style="color: white;font-size: 16px;">充值提现</span>
                </van-col>
            </van-row>
            <div>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div style="width:100%;height:100%;border-bottom: 1px white dashed;">
                            <div style="font-size: 14px;color: white">总资产（元）</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">8000.00</div>
                        </div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div style="width:100%;height:100%;border-bottom: 1px white dashed;">
                            <div style="font-size: 14px;color: white">累计收益（元）</div>
                            <div style="font-size: 20px;color: white;font-weight: bold">200.00</div>
                        </div>
                    </van-col>
                </van-row>
                <van-row style="height: 69px">
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累计充值（元）</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">400.00</div>
                    </van-col>
                    <van-col span="12" class="item-col">
                        <div style="font-size: 14px;color: white">累计消费（元）</div>
                        <div style="font-size: 20px;color: white;font-weight: bold">200.00</div>
                    </van-col>
                </van-row>
            </div>
        </div>
        <div class="content">
            <div style="position: relative;top: -35px;">
                <van-row class="bag-wrap">
                    <van-col span="6" class="bag-col">
                        <div class="bag-wrap-item"><img src="../../static/images/user/wdzl.png"/></div>
                        <div class="bag-wrap-item">账单记录</div>
                    </van-col>
                    <van-col span="6" class="bag-col">
                        <div class="bag-wrap-item"><img src="../../static/images/user/wdzl.png"/></div>
                        <div class="bag-wrap-item">消费记录</div>
                    </van-col>
                    <van-col span="6" class="bag-col">
                        <div class="bag-wrap-item"><img src="../../static/images/user/wdzl.png"/></div>
                        <div class="bag-wrap-item">收益记录</div>
                    </van-col>
                    <van-col span="6" class="bag-col">
                        <div class="bag-wrap-item"><img src="../../static/images/user/wdzl.png"/></div>
                        <div class="bag-wrap-item">充值记录</div>
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
                            <van-field v-model="czje1" type="number" :border=false
                                       placeholder="最低提现金额100" label="余额提现"/>
                            <span style="color: #5E5E5E;font-size: 17px">元</span>
                    </div>
                    <div class="func-content">
                        <van-button style="width: 100%;height:40px" color="#5083ED" type="default">
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
    import {NavBar, Row, Col, Field, Button} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Field.name]: Field,
        },
        data() {
            return {
                czje: '',
                czje1: '',
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
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
        width: auto;
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