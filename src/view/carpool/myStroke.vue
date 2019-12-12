<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="tab">
            <van-tabs v-model="strokeType" color="#5083ED" title-active-color="#5083ED" title-inactive-color="#202020">
                <van-tab title="乘客行程"></van-tab>
                <van-tab title="车主行程"></van-tab>
            </van-tabs>
        </div>
        <div  style="margin-top: 105px">
            <div v-for="(item,index) in passTripList" :key="index" v-if="strokeType == '0'">
                <div class="listInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            2019年12月04日 05:20
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ 20
                        </van-col>
                        <van-col span="5" align="right" :style="{color:index == '1'?'#FF0200':'#202020'}">
                            {{index =='1'?'待完成':'已完成'}}
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：上河湾</span></p>
                            <p><span>座位：3/ 4个</span></p>
                            <p v-if="index == '1'"><span>待确认：1人</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：安贞门</span></p>
                            <p><span>车型：银色大众速腾</span></p>
                            <p v-if="index == '1'"><span>已确认：2人</span></p>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index == '1'">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">分享
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkCarPosition">车主位置
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">联系车主
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goCarFate" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">同车缘分
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index == '1'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">上车支付
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">取消行程
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0" v-if="index != '1'">
                        <van-col span="6">

                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="linkCarAppraise">行车评价
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="goCarFate">同车缘分
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">其他操作
                            </van-button>
                        </van-col>
                    </van-row>

                </div>
            </div>

            <div v-for="index in 3" v-if="strokeType != '0'" >
                <div class="listInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            2019年12月04日 05:20
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ 20
                        </van-col>
                        <van-col span="5" align="right" :style="{color:'#FF0200'}">
                            待出行
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：上河湾</span></p>
                            <p><span>座位：3/ 4个</span></p>
                            <p><span>待确认：1人</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：安贞门</span></p>
                            <p><span>车型：银色大众速腾</span></p>
                            <p><span>已确认：2人</span></p>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">分享
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">已发车
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">已到达
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button @click="goPassengerList" type="default" color="#0CC893"
                                        style="font-size: 14px;width: 96%;height: 28px" size="mini">乘客
                            </van-button>
                        </van-col>
                    </van-row>

                    <van-row style="margin: 10px 0">
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">调整座位
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">设为车满
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">修改行程
                            </van-button>
                        </van-col>
                        <van-col span="6">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini" @click="showPopup = true">取消行程
                            </van-button>
                        </van-col>
                    </van-row>
                </div>

            </div>
        </div>
        <van-popup
                v-model="showPopup"
                position="bottom"
                :style="{ height: '50%',background:'#F6F6F6' }"
        >
            <div v-for="index in 3">
                <div class="popInfo">
                    <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 2px">
                        <van-col span="14">
                            2019年12月04日 05:20
                        </van-col>
                        <van-col span="5" style="font-weight: bold">
                            ¥ 20
                        </van-col>
                        <van-col span="5" align="right" :style="{color:'#202020'}">
                            已完成
                        </van-col>
                    </van-row>

                    <van-row style="padding: 5px 2px">
                        <van-col span="12">
                            <p><span>发车地点：上河湾</span></p>
                            <p><span>座位：3/ 4个</span></p>
                        </van-col>
                        <van-col span="12">
                            <p><span>目的地：安贞门</span></p>
                            <p><span>车型：银色大众速腾</span></p>
                        </van-col>
                    </van-row>

                    <van-row>
                        <van-col span="6" offset="18">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 96%;height: 28px"
                                        size="mini">乘客
                            </van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-popup>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Tab, Tabs, Divider, Row, Col, Button, Popup} from 'vant';

    import request from '../../utils/request'

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
            [Popup.name]: Popup
        },
        data() {
            return {
                title: "我的行程",
                strokeType: "0",
                showPopup: false,
                passTripList:[]
            }
        },
        mounted(){
            //乘客列表
            this.initPassTripList();
        },

        methods: {

            initPassTripList(){
              request.sendGet({
                  url:"/sharecar/pass/triplist",
                  params:{}
              }).then(res =>{
                  if(res.data.code==0){
                      this.passTripList = res.data.rows;
                  }else{
                      //接口错误

                  }
              })
            },

            onClickLeft() {

                this.$router.back(-1)
            },
            goCarFate() {
                this.$router.push({path: '/carFate'});
            },
            goPassengerList() {
                this.$router.push({path: '/passengerList'});
            },
            linkCarPosition() {
                this.$router.push({path: '/carOwnPosition'});
            },
            linkCarAppraise() {
                this.$router.push({path: '/carOwnerAppraise'});
            }
        }
    }
</script>

<style scoped>
    body {
        background: #FFFFFF;
    }

    .contain {

    }

    .tab {
        border-top: 1px solid #ECECEC;
        margin-top: 46px;
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
    }

    .popInfo {
        width: 90%;
        margin: 0 auto;
        margin-top: 10px;
        background: #FFFFFF;
        padding: 5px 10px;
    }
</style>
