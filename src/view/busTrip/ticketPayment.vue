<template>
    <div>
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div style="margin-top: 55px;font-size: 14px">
            <div class="card">
                <div style="color: #5083ED;font-weight: bold">线路：{{busInfo.linename}}</div>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <van-row style="display: flex;align-items: center;justify-content: center">
                    <van-col span="8" align="center" >
                        <div style="font-size: 16px;font-weight: bold;margin-bottom: 10px"><img src="./../../static/images/greenTag.png" style="width: 14px;height: 14px;display: inline-block"/>{{busInfo.startname}}</div>
                        <div style="font-weight: bold">{{busInfo.starttime}}</div>
                    </van-col>
                    <van-col span="8" style="text-align: center;">
                        <img src="./../../static/images/busTrip/rightArrow.png" width="51px" height="25px">
                    </van-col>
                    <van-col span="8" align="center">
                        <div style="font-size: 16px;font-weight: bold;margin-bottom: 10px"><img src="./../../static/images/redTag.png" style="width: 14px;height: 14px;display: inline-block"> {{busInfo.endname}}</div>
                        <div style="font-weight: bold">{{busInfo.endtime}}</div>
                    </van-col>
                </van-row>
            </div>

            <div class="card">
                <div style="color: #202020;font-weight: bold">购买明细</div>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <van-row style="display: flex;align-items: center;justify-content: center">
                    <van-col span="12" style="margin-left: 28px">张数</van-col>
                    <van-col span="12" align="right"><div style="font-weight: bold;font-size: 22px;color: #0CC893;">{{num}}<span style="font-weight: bold;font-size: 14px;color: #202020;margin-left: 5px">张</span></div></van-col>
                </van-row>
                <van-row style="display: flex;align-items: center;justify-content: center;margin-top: 15px">
                    <van-col span="12" style="margin-left: 28px">票价</van-col>
                    <van-col span="12" align="right"><div style="font-weight: bold;font-size: 22px;color: #FF0200;"><span style="font-weight: bold;font-size: 14px;">￥</span>{{amount}}</div></van-col>
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
                        <van-cell title="支付宝付款"  :icon="zhifubao" clickable @click="radio = '2'" :border="false">
                            <van-radio slot="right-icon" name="2" checked-color="#07c160" />
                        </van-cell>
                    </van-cell-group>
                </van-radio-group>
            </div>
        </div>

        <div class="footer">
            <van-button type="primary"  color="#0CC893" style="width: 100%" @click="submitOrder">确认支付</van-button>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Icon, Checkbox, CheckboxGroup, Button, Tag, Field, Toast, Divider,RadioGroup, Radio,Cell, CellGroup } from 'vant';
    import wxChar from './../../static/images/busTrip/wxchar.png'
    import zhifubao from './../../static/images/busTrip/zhifubao.png'
    import request from "../../utils/request";

    export default {
        name: "ticketPayment",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Toast.name]: Toast,
            [Divider.name]: Divider,
            [RadioGroup.name]:RadioGroup,
            [Radio.name]:Radio,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup
        },
        data() {
            return {
                title: "支付",
                radio:'1',
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
                wxChar:wxChar,
                zhifubao:zhifubao
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
                    }
                }).then((res)=>{
                    console.log(res.data);
                });
                this.$router.push({path:'/ticketList'});
            },
            onClickLeft() {
                this.$router.back(-1);
            }
        },
        created(){
            this.num = this.$route.query.num;
            this.amount = this.$route.query.amount;
            this.busid = this.$route.query.busid;
            this.lineid = this.$route.query.lineid;
            this.chooseDate = this.$route.query.dateStr;
            this.queryBus();
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

    .footer{
        position: fixed;
        bottom: 10px;
        width: 88%;
        left: 50%;
        transform: translateX(-50%);
    }
</style>

