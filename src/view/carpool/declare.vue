<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->
        <div class="content">
            <div class="declareImg">
                <img src="./../../static/images/declare.png">
            </div>
            <div class="declare">免责条款说明</div>
            <div class="declareContent">
                友情提醒：本平台不对拼车过程中可能发生的人员伤亡或财产损失等承担任何赔偿责任，就拼车交通事故造成的人身伤害，在意外保险责任范围年内由保险公司进行赔偿，本平台和车主不再承担赔偿责任。
            </div>
        </div>

        <div class="fate">
            <div style="font-size: 16px;font-weight: bold">同车缘分</div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }"/>
            <div style="padding: 10px 0;display:flex;align-items: center;justify-content:flex-start;flex-wrap: wrap;border-bottom: 1px solid #ECECEC;"
                 v-if="carFateList.length>0">
                <div style="width: 50%" v-for="(item,index) in carFateList" :key="index">
                    <div class="left">
                        <img :src="item.headimgurl" style="height: 44px;width: 44px">
                        <div>
                            <p style="font-size: 12px;margin: 5px 0"><span>【{{item.tag == '0'?'乘客':'车主'}}】</span>
                                <span>{{item.nickname}}</span>
                                <img src="../../static/images/man.png"
                                     style="width: 13px;height: 13px;display: inline-block;margin-left: 5px"
                                     v-if="item.sex === 1">
                                <img src="../../static/images/sexTag.png"
                                     style="width: 13px;height: 13px;display: inline-block;margin-left: 5px" v-else>
                            </p>
                            <p style="color:#9E9E9E;font-size: 12px;margin: 5px 5px 0 ">同乘过{{item.passCount}}次</p>
                        </div>
                    </div>
                </div>
            </div>

            <!--            <van-row style="padding: 10px 0">-->
            <!--                <van-col span="12" v-for="(item,index) in downFateList" :key="index">-->
            <!--                    <div class="left">-->
            <!--                        <img src="../../static/images/userAvatar.png" style="height: 44px;width: 44px">-->
            <!--                        <div>-->
            <!--                            <p style="font-size: 12px;margin: 5px 0"><span>【{{item.tag == '0'?'乘客':'车主'}}】</span>-->
            <!--                                <span>{{item.nickname}}</span><img src="../../static/images/sexTag.png"-->
            <!--                                                                   style="width: 12px;height: 12px;margin-left: 5px"-->
            <!--                                                                   v-if="item.sex == '1'">-->
            <!--                                <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px"-->
            <!--                                     v-else></p>-->
            <!--                            <p style="color:#9E9E9E;font-size: 12px;margin: 5px 5px 0 ">同乘过{{item.passCount}}次</p>-->
            <!--                        </div>-->
            <!--                    </div>-->
            <!--                </van-col>-->
            <!--            </van-row>-->
        </div>


        <div class="footer">
            <div>
                <van-icon name="warning" color="#F55456"/>
                注意:
            </div>
            <div class="notice">
                <div>
                    1.婴幼儿(无论年龄和大小)均需单独预约位置。
                </div>
                <div>
                    2.车主确认前，或者确认后3分钟内，乘客均可无责取消。
                </div>
                <div>
                    3.如乘客迟到，需支付赔偿，且车主有权利不等。
                </div>
                <div>
                    4. 如余额不足，<span style="color: #05CF8A;" @click="goReCharge">请点击这里充值</span>，然后再预约。
                </div>
            </div>
        </div>

        <div class="bottomBar">
            <van-row>
                <van-col span="12">
                    <van-button @click="cancel" type="default" color="#9E9E9E"
                                style="width: 100%;margin: 0 auto;border: none;border-radius: unset">取消
                    </van-button>
                </van-col>
                <van-col span="12">
                    <van-button @click="goReserve" type="default" color="#0CC893"
                                style="width: 100%;margin: 0 auto;border: none;border-radius: unset">同意
                    </van-button>
                </van-col>
            </van-row>
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
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Cell, CellGroup, Row, Col, Button, Tag, Field, Divider, Icon, Tabbar, TabbarItem} from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        name: "declare",
        components: {
            Title,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [Divider.name]: Divider,
            [Icon.name]: Icon,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active: "",
                id: '',//行程id
                redBar: redBar,
                greenBar: greenBar,
                checked: true,
                title: "车辆预约",
                carFateList: [],
                upFateList: [],
                downFateList: [],
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person
            }
        },
        methods: {
            goReCharge(){
                this.$router.push({path: '/wealth'});
            },
            onClickLeft() {
                this.$router.back(-1);
            },
            cancel() {
                this.$router.back(-1);
            },
            goReserve() {
                this.$router.push({path: '/reserve', query: {id: this.id}});
            },

            initCarFate() {
                request.sendGet({
                    url: "/sharecar/pass/samecar/" + this.id,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        this.carFateList = res.data.rows;
                    }
                })
            }
        },
        created() {
            this.id = this.$route.query.id;

            //同车缘分
            this.initCarFate();
        },
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {
        font-size: 14px;
    }

    .contain .content {
        background: #FFFFFF;
        border-top: 1px solid #ECECEC;
        /*width: 90%;*/
        padding: 5px 20px;
        margin: 0px auto 0;
        color: #202020;
    }

    .contain .content .valStyle {
        color: #9E9E9E;
        font-size: 14px;
    }

    .contain .fate {
        margin-top: 10px;
        padding: 5px 10px;
        background: #ffffff;
    }

    .declareImg {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .seatTag {
        width: 30px;
        height: 20px;
        font-size: 16px;
        margin-left: 5px;
        justify-content: center;
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
        margin-top: 10px;
        padding: 10px;
        background: #FFFFFF;
        margin-bottom: 100px;
    }

    .footer .notice {
        margin-top: 6px;
        line-height: 24px;
    }

    .bottomBar {
        position: fixed;
        bottom: 55px;
        width: 100%;
    }

    .declareImg {
        margin-top: 16px;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .declareImg img {
        width: 80px;
        height: 80px;
    }

    .declareContent {
        line-height: 24px;
        font-size: 14px;
        color: #202020;
    }

    .declare {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .left {
        display: flex;
        align-items: center;
    }
</style>
