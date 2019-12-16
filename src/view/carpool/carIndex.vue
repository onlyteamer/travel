<template>
    <div class="contain">
        <div class="header">
            <van-nav-bar
                    title="共享拼车"
                    left-text=""
                    right-text=""
                    left-arrow
                    @click-left="onClickLeft"
            />
            <van-row type="flex" justify="center" gutter="30">
                <van-col span="6">
                    <div class="logo">
                        <van-image
                                width="60"
                                height="60"
                                :src="logo"
                        />
                    </div>
                </van-col>
                <van-col span="15">
                    <div class="tag">
                        <h3>昌坤出行</h3>
                        <p>让你省心、安心、放心！</p>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div class="notice">
            <van-notice-bar
                    color="#0BCA92"
                    background="#FFFFFF"
                    :left-icon="laba"
                    :scrollable="false"
            >
                昌坤出行新版本与大家见面了！公告滚动循环！
            </van-notice-bar>
        </div>
        <div class="travel">
            <van-cell title="常用路线选择:" is-link title-style="color:#0CC893" />
            <van-cell-group>
                <van-field
                        v-model="strokeInfo.startPlace"
                        placeholder="出发地点"
                        label=""
                        label-width="5px"
                        :left-icon="greenBar"
                />
            </van-cell-group>
            <van-divider style="width: 90%;margin: 0 auto" />
            <van-cell-group >
                <van-field
                        v-model="strokeInfo.endPlace"
                        placeholder="目的地点"
                        label=""
                        label-width="5px"
                        :left-icon="redBar"
                />
            </van-cell-group>
            <van-divider  style="width: 90%;margin: 0 auto"/>
            <van-cell-group >
                <van-field
                        v-model="strokeInfo.driveTime"
                        placeholder="乘车时间"
                        label=""
                        label-width="5px"
                        :left-icon="timeBar"
                        disabled
                        @click="showPop = true"
                />
            </van-cell-group>
            <div align="center" style="margin-bottom: 10px">
                <van-button @click="goCarList"  color="#0CC893" style="width: 95%">立即找车</van-button>
            </div>
        </div>

        <div class="listInfo">
            <van-list
                    v-model="loading"
                    :error.sync="error"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
                    :offset="10"
                    :immediate-check="false"
            >

            <div v-for="item in 10">
                <div class="card">
                    <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;padding: 8px 2px;">
                        <van-col span="16">
                            <span class="datetime">2019年12月04日 05:20</span>
                        </van-col>
                        <van-col span="8" style="text-align: right">
                            <span>座位:</span>
                            <span class="seatNum">3个</span>
                        </van-col>
                    </van-row>
                    <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center;">
                        <van-col span="16">
                            <p class="datetime"><i class="greenBar"></i>上河湾</p>
                            <p class="datetime"><i class="redBar"></i>安贞门</p>
                        </van-col>
                        <van-col span="8" style="text-align: right">
                            <div class="price">￥20</div>
                        </van-col>
                    </van-row>
                    <van-row style="padding: 0px 2px;display: flex;align-items: center;">
                        <van-col span="6">
                            <van-image
                                    width="60"
                                    height="60"
                                    :src="listImg"
                            />
                        </van-col>
                        <van-col span="10">
                            <p style="display: flex;align-items: center"><span style="color: #5083ED">【车主】</span> 加菲猫 <img src="../../static/images/sexTag.png" style="width: 13px;height: 13px;display: inline-block;margin-left: 5px"></p>
                            <p><span>【车型】</span> 大众速腾</p>
                        </van-col>
                    </van-row>
                </div>
            </div>
            </van-list>
        </div>


        <div class="footer">
            <van-tabbar v-model="active" active-color="#FF0200" inactive-color="#FFFFFF">
                <van-tabbar-item :icon="chengK" to="/carLine">我是乘客</van-tabbar-item>
                <van-tabbar-item :icon="xingC" to="/myStroke">我的行程</van-tabbar-item>
                <van-tabbar-item :icon="push" to="/pushStroke">发布行程</van-tabbar-item>
                <van-tabbar-item :icon="person" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>

        <van-popup
                v-model="showPop"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-datetime-picker
                    v-model="currentDate"
                    type="datetime"
                    :min-date="minDate"
                    @cancel="cancel"
                    @confirm="changeTimer"
            />
        </van-popup>
    </div>
</template>

<script>
    import {NavBar,Row,Col,Image,NoticeBar,Cell,CellGroup,Field,Divider,Button,Card,Tabbar, TabbarItem,Toast ,DatetimePicker,Popup,List } from 'vant';
    import logo from './../../static/images/logo.png'
    import laba from './../../static/images/laba.png'
    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'
    import timeBar from './../../static/images/timer.png'
    import listImg from './../../static/images/listImg.png'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    import request from '../../utils/request'
    import moment from 'moment'


    export default {
        name: "carIndex",
        components: {
            [NavBar.name]:NavBar,
            [Row.name]:Row,
            [Col.name]:Col,
            [Image.name]:Image,
            [NoticeBar.name]:NoticeBar,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Field.name]:Field,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Card.name]:Card,
            [Tabbar.name]:Tabbar,
            [TabbarItem.name]:TabbarItem,
            [Toast.name]:Toast,
            [DatetimePicker.name]:DatetimePicker,
            [Popup.name]:Popup,
            [List.name]:List
        },
        data(){
            return{
                error: false,
                loading: false,
                minDate: new Date(),
                currentDate:"",
                showPop:false,
                logo:logo,
                laba:laba,
                greenBar:greenBar,
                redBar:redBar,
                timeBar:timeBar,
                listImg:listImg,
                chengK:chengK,
                xingC:xingC,
                push:push,
                person:person,
                active: 0,
                strokeInfo:{
                    startPlace:"",
                    endPlace:"",
                    driveTime:"",
                    week:""
                }
            }
        },
        mounted(){
            //初始化列表
            this.initListData();
        },
        methods: {
            //列表
            initListData(){

            },

            cancel(){
                this.showPop = false
            },

            changeTimer(val){
                // let timer = this.formatTime(val.getTime());
                //
                // this.stroke.startDate = timer;
                var timer = moment(val).format("YYYY-MM-DD");
                this.strokeInfo.driveTime = timer;

                let week = moment(val).format('d');
                console.log(week);
                this.strokeInfo.week = week;
                this.showPop = false;

            },

            async  onLoad() {
                console.log(1111);
            },

            onClickLeft() {
                // Toast('返回');
                this.$router.back(-1);
            },
            goCarList(){
                console.log(this.strokeInfo)
                if(!this.strokeInfo.startPlace){
                    Toast.fail("请填写出发地点");
                    return;
                }
                if(!this.strokeInfo.endPlace){
                    Toast.fail("请填写目的地点");
                    return;
                }
                if(!this.strokeInfo.driveTime){
                    Toast.fail("请填写乘车时间");
                    return;
                }
                sessionStorage.removeItem("queryStroke");
                sessionStorage.setItem("queryStroke",JSON.stringify(this.strokeInfo));
                this.$router.push({path:'/carLine'});
            }
        },
        created(){
            let url = location.href;
            if(url.indexOf("?")!=-1 && !localStorage.getItem("openid")){
                let str = url.substr(url.indexOf("?")+1);
                let strs = str.split("&");
                let code = strs[0].split("=")[1];
                let state = strs[1].split("=")[1];
                request.sendGet({
                    url:'/wx/getopenid',
                    params:{
                        code:code
                    }
                }).then((res)=>{
                    if(res.data.code===0){
                        let openid = res.data.data.openid;
                        localStorage.setItem("openid",openid);
                        request.sendPost({
                            url:'/wx/login',
                            params: {
                                openid:openid
                            }
                        }).then((res)=>{
                            //TODO 判断登录状态
                            if(res.data.data.isLogin==="1"){
                                //登陆成功
                                localStorage.setItem("isLogin","1");
                            }else{
                                this.$router.push({path:'/register'})
                            }
                        })
                    }
                })
            }
        },
    }
</script>

<style scoped>

    .van-nav-bar {
        position: relative;
        height: 46px;
        line-height: 46px;
        text-align: center;
        background-color:transparent;
        -webkit-user-select: none;
        user-select: none;
    }
    .van-hairline--bottom::after {
        border-bottom-width: 0px;
    }

    .van-icon-arrow-left{
        color: #fff;
    }

    .van-nav-bar__title {
        max-width: 60%;
        margin: 0 auto;
        color: #fff;
        font-weight: 500;
        font-size: 16px;
    }

    .contain{
        background: #F6F6F6;
        overflow-x: hidden;
    }

    .notice{


    }

    .logo{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .header{
        background-image: linear-gradient(49deg, #05CF8A, #5C77FE);
        opacity:1;
    }

    .tag {
        color: #fff;
    }

    .travel{
        background: #fff;
        margin-bottom: 10px;
        border: 1px solid #f1f1f1;
    }
    .listInfo{
        margin-bottom: 60px;
        height: 300px;
    }

    .listInfo .card{
        width: 90%;
        margin: 0 auto;
        font-size: 14px;
        padding: 10px 5px;
        margin-bottom: 10px;
        background: #fff;
        border-radius: 5px;
    }

    .datetime{
        color: #5E5E5E;
        padding-left: 8px ;
    }

    .seatNum{
        font-weight: bold;
        margin-left: 8px;
    }

    .greenBar{
        border-radius: 50%;
        background: rgb(12, 200, 147);
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 5px;
    }

    .redBar{
        border-radius: 50%;
        background: rgb(255, 42, 35);
        width: 10px;
        height: 10px;
        display: inline-block;
        margin-right: 5px;
    }

    .price{
        height: 100%;
        width: 100%;
        font-size: 22px;
        color: red;
    }

    .footer{
        width: 100%;
    }

    .van-tabbar{
        background: #5083ED;
    }



</style>
