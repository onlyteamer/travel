<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div class="lineDetails">
            <van-row style="display: flex;align-items: center">
                <van-col span="12" >
                    <div style="display: flex;align-items: center">
                        <img :src="driverInfo.headImageurl" style="height: 44px;width: 44px;margin-right: 10px;border-radius: 50%">
                        <div>
                            <p style="font-size: 14px;margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">{{driverInfo.nickName}}</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px" v-if="driverInfo.sex == '1'"> <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px"  v-else></p>
                            <p style="font-size: 14px;margin: 5px 0">
                                <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;">{{driverInfo.carNumber}}</span>
                            </p>
                        </div>
                    </div>
                </van-col>
                <van-col span="12">
                    <div style="padding: 3px 0">
                        <img src="./../../static/images/tel.png" style="width: 14px" /><span style="font-size: 14px;color: #5E5E5E">{{driverInfo.phone}}</span>
                    </div>
                    <div style="padding: 0px 5px;border-radius: 3px;border: 1px solid #CFCFCF;font-size: 14px;width: fit-content">
                        <span style="color: #CFCFCF;margin-right: 5px">好评数</span><img src="./../../static/images/xin.png" style="width: 14px"><span style="margin-left: 5px;color: #5E5E5E">{{driverInfo.goodCount}}</span>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="content">

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">线路</van-col>
                <van-col span="18">{{tripDetails.lineName}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">发车时间</van-col>
                <van-col span="18">{{tripDetails.tripDateTime}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">出发地</van-col>
                <van-col span="18">{{tripDetails.startName}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">目的地</van-col>
                <van-col span="18">{{tripDetails.endIdName}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">路线</van-col>
                <van-col span="18">{{tripDetails.tripLine}}</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">座位数</van-col>
                <van-col span="18">{{tripDetails.totalSeat}}位</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">价格</van-col>
                <van-col span="18">{{tripDetails.tripPrice}}元</van-col>
            </van-row>

            <van-row style="padding: 12px 2px">
                <van-col span="6">备注</van-col>
                <van-col span="18">{{tripDetails.remark}}</van-col>
            </van-row>
        </div>

        <van-row style="position: fixed;bottom: 0;width: 100%;">
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini" @click="wxShare">分享</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini" @click="followUser">关注</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini" @click="contactCar">电话</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini" @click="reserveCar">预约</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Cell, CellGroup,DatetimePicker,Popup,Row, Col,Icon,Picker ,Checkbox, CheckboxGroup ,Button,Toast ,Dialog } from 'vant';

    import request from '../../utils/request'

    export default {
        name: "lineDetails",
        components:{
            Title,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [DatetimePicker.name]:DatetimePicker,
            [Popup.name]:Popup,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
            [Picker.name]:Picker,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [Button.name]:Button,
            [Toast.name]:Toast,
            [Dialog.name]: Dialog,
        },
        data(){
            return{
                title:"行车信息",
                tripDetails:{
                    startName:""
                },
                driverInfo:{
                    carNumber: "",
                    badCount: "",
                    phone: "",
                    goodCount: "",
                    carName: "",
                    nickName: "",
                    headImageurl: "",
                    sex: ""
                },
                tripId:""
            }
        },
        mounted(){
            this.initData();
        },

        methods:{
            initData(){
                this.tripId = this.$route.query.tripId;
                request.sendGet({
                    url:"/sharecar/pass/tripdetail/"+this.tripId,
                    params: {}
                }).then(res =>{
                    if(res.data.code == '0'){
                        let driverinfo = res.data.data.driverinfo;
                        this.driverInfo = driverinfo;
                    }
                })


                request.sendGet({
                    url:"/sharecar/trip/select/" + this.tripId,
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        console.log(res.data)
                        this.tripDetails.startName = res.data.data.lineinfo.startName;
                        this.tripDetails.endIdName = res.data.data.lineinfo.endIdName;
                        this.tripDetails.lineName = res.data.data.lineinfo.lineName;
                        this.tripDetails.tripDateTime = res.data.data.tripinfo.tripDateTime;
                        this.tripDetails.tripLine = res.data.data.tripinfo.tripLine;
                        this.tripDetails.totalSeat = res.data.data.tripinfo.totalSeat;
                        this.tripDetails.tripPrice = res.data.data.tripinfo.tripPrice;
                        this.tripDetails.remark = res.data.data.tripinfo.remark;
                        console.log(this.tripDetails)
                    }
                })

            },

            followUser(){
                request.sendPost({
                    url:"/user/center/follow",
                    params: {
                        followerId:"1"
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        Toast.success("关注用户");
                    }else {
                        Toast.fail(res.data.msg);
                    }
                })
            },

            reserveCar(){
                this.$router.push({path: '/declare',query:{id:this.tripId}});
            },

            contactCar(){
                let mobile = "";
                // if(val){
                //     mobile = val;
                // }

                Dialog.alert({
                    message: '手机号:'+mobile
                }).then(() => {
                    // on close
                });
            },
            onClickLeft(){

            },
            wxShare(){
                var url = 'http://gstpapi.huntauto.com.cn//wx/redirect/wxfe42689b9e435f72/signature?url=http://gstpapi.huntauto.com.cn/wx/travel/demo.html';
                request.sendGet({
                    url:url,
                    params:{

                    }
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
                    var ShareLink = "http://gstpapi.huntauto.com.cn/wx/travel/demo.html"; //默认分享链接
                    var ShareImgUrl = "http://bitgeek.qhdsx.com/img/logo.jpg"; // 分享图标
                    var ShareTitle = "申坤出行"; // 分享标题
                    var ShareDesc = "申坤出行!"; // 分享描述
                    wx.ready(function(){
                        // 获取"分享到朋友圈"按钮点击状态及自定义分享内容接口
                        wx.onMenuShareTimeline({
                            title: ShareTitle, // 分享标题
                            link:ShareLink,
                            desc: ShareDesc,
                            imgUrl:ShareImgUrl // 分享图标
                        });

                        // 获取"分享给朋友"按钮点击状态及自定义分享内容接口
                        wx.onMenuShareAppMessage({
                            title: ShareTitle, // 分享标题
                            desc: ShareDesc, // 分享描述
                            link:ShareLink,
                            imgUrl:ShareImgUrl // 分享图标
                        });
                        // 分享到QQ
                        wx.onMenuShareQQ({
                            title: ShareTitle, // 分享标题
                            desc: ShareDesc, // 分享描述
                            link:ShareLink,
                            imgUrl:ShareImgUrl // 分享图标
                        });
                        // 分享到QQ空间
                        wx.onMenuShareQZone({
                            title: ShareTitle, // 分享标题
                            desc: ShareDesc, // 分享描述
                            link:ShareLink,
                            imgUrl:ShareImgUrl // 分享图标
                        });
                        // wx.hideOptionMenu();  // 用户中心 隐藏微信菜单
                    });
                    wx.error(function(res){
                        console.log(res);
                    });
                })


            }
        }
    }
</script>

<style scoped>
    .lineDetails{
        width: 90%;
        margin: 55px auto 15px;
        background: #FFFFFF;
        padding: 10px 5px;
    }

    .collect{
        margin-left: 20px;
    }

    .content{
        padding: 5px 15px;
        background: #FFFFFF;
        font-size: 14px;
        margin-bottom: 40px;
    }

</style>
