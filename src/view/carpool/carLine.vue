<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="dateTag">
            <van-tabs type="card" background="#FFFFFF" color="#5083ED"  title-active-color="#FFFFFF" title-inactive-color="#202020">
                <van-tab title="周日"></van-tab>
                <van-tab title="周一"></van-tab>
                <van-tab title="周二"></van-tab>
                <van-tab title="周三"></van-tab>
                <van-tab title="周四"></van-tab>
                <van-tab title="周五"></van-tab>
                <van-tab title="周六"></van-tab>
            </van-tabs>
        </div>

        <div class="placeTab">
            <van-tabs type="card"  color="#0CC893"  title-active-color="#FFFFFF" title-inactive-color="#0CC893" >
                <van-tab title="全部"></van-tab>
                <van-tab title="去北京"></van-tab>
                <van-tab title="去密云"></van-tab>
            </van-tabs>
        </div>
        <div class="content">
            <div v-for="index in 3" :key="index">
                <div class="carBar">
                    <van-row>
                        <van-col span="6">
                            <div style="display: flex;align-items: center;"> <i style="width: 8px;height:8px;border-radius: 50%;background: #0CC893;margin-right: 5px"></i><span>上河湾</span></div>

                        </van-col>
                        <van-col span="12">
                            <div style="text-align: center;color: #FF0200">12月04日 05:20</div>
                        </van-col>
                        <van-col span="6" >
                            <div style="align-items: center;text-align: right"> <i style="width: 8px;height:8px;border-radius: 50%;display:inline-block;background: #FF0200;margin-right: 5px"></i><span>安贞门</span></div>
                        </van-col>
                    </van-row>
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" />
                    <van-row style="display: flex;align-items: center;">
                        <van-col span="20">
                            <div style="display: flex;align-items: center">
                                <img src="../../static/images/userAvatar.png" style="height: 44px;width: 44px">
                                <div>
                                    <p style="font-size: 14px;margin: 5px 0"><span style="color: #5083ED;font-weight: bold">【乘客】</span><span style="color: #5E5E5E">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px"> <span class="collect"><img src="./../../static/images/xin.png" style="width: 14px">231</span> </p>
                                    <p style="font-size: 14px;margin: 5px 0"><span style="color: #202020;font-weight: bold">【车型】</span><span style="color: #5E5E5E">大众速腾</span></p>
                                </div>
                            </div>
                        </van-col>
                        <!--<van-col span="4">-->
                            <!--<div style="text-align: center;color: #5E5E5E;border: 1px solid #CFCFCF;border-radius: 2px;font-size: 14px;display: flex;align-items: center"><img src="./../../static/images/xin.png" style="width: 14px">231</div>-->
                        <!--</van-col>-->
                        <van-col span="4" >
                            <div style="">￥20</div>
                        </van-col>
                    </van-row>
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" />
                    <van-row style="color: #202020;font-weight: bold;font-size: 14px">
                        <van-col span="6">
                            <div>剩余座位:</div>
                        </van-col>
                        <van-col span="18">
                            <div >4</div>
                        </van-col>
                    </van-row>

                    <van-row style="color: #202020;font-weight: bold;font-size: 14px;margin: 10px 0">
                        <van-col span="8">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 95%;height: 34px" size="mini">分享</van-button>
                        </van-col>
                        <van-col span="8">
                            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 95%;height: 34px" size="mini">电话</van-button>
                        </van-col>
                        <van-col span="8">
                            <van-button type="default" @click="goDeclare" color="#0CC893" style="font-size: 14px;width: 95%;height: 34px" size="mini">马上预约</van-button>
                        </van-col>
                    </van-row>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {  Tab, Tabs,Divider,Row, Col,Button   } from 'vant';

    export default {
        name: "carLine",
        components:{
            Title,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Divider.name]:Divider,
            [Row.name]:Row,
            [Col.name]:Col,
            [Button.name]:Button
        },
        data(){
            return{
                title:"线路：北京←→密云"
            }
        },
        methods: {
            onClickLeft(){
                this.$router.back(-1);
            },
            goDeclare(){
                //车辆预约
                this.$router.push({path:'/declare'});
            }
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{

    }

    .dateTag{
        margin-top: 48px;
    }
    .placeTab{
        width: 90%;
        margin: 10px auto;
    }

    .carBar{
        width: 90%;
        margin: 0 auto;
    }

    .collect{
        display: inline-block;
        padding: 0 5px;
        margin-left: 25px;
        border: 1px solid #CFCFCF;
        border-radius: 2px;
    }
    .carBar{
        background: #FFFFFF;
        margin-bottom: 10px;
        padding: 5px 8px;
    }

</style>

<style>
    .van-tabs__nav--card{
        box-sizing: border-box;
        height: 30px;
         margin: 0;
        border: 1px solid #ee0a24;
        border-radius: 2px;
    }
</style>
