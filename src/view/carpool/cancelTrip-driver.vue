<template>
    <div>
        <div>
            <!--<van-nav-bar title="取消行程" :fixed="true" left-arrow @click-left="onClickLeft"/>-->
        </div>
        <div class="content">
            <div class="img-wrap">
                <van-image :src="imageURL" width="64px" height="64px"/>
                <div style="color: #202020;font-size: 18px;margin-top: 15px">确认要终止行程吗？</div>
            </div>
            <div class="info-wrap">
                <van-row>
                    <van-col span="8" style="height: 52px;line-height: 52px;text-align: center">
                        <span style="font-size: 14px;color: #202020;">座位：{{tripInfo.confirm}}/ {{tripInfo.seat}}个</span>
                    </van-col>
                    <van-col span="8" style="height: 52px;line-height: 52px;text-align: center">
                        <span style="font-size: 14px;color: #202020;">待确认：{{tripInfo.unconfig}} 人</span>
                    </van-col>
                    <van-col span="8" style="height: 52px;line-height: 52px;text-align: center">
                        <span style="font-size: 14px;color: #202020;">已确认：{{tripInfo.confirm}} 人</span>
                    </van-col>
                </van-row>
            </div>
            <div class="radio-wrap">
                <div style="height: 38px;line-height:38px;border-bottom: 1px solid #ECECEC">
                    <span class="tips" v-if="state">尚无已确认订单，无需赔偿</span>
                    <span class="tips" v-else>存在已确认订单，需赔偿乘客{{tripInfo.price}}元/人。</span>
                </div>
                <div class="radio-wrap-title">取消行程原因：</div>
                <van-radio-group v-model="reasonId" class="radio-wrap-content">
                    <van-radio :name="item.reasonId" checked-color="#07BD06" v-for="(item,index) in reasonList">{{item.reasonContext}}</van-radio>
                </van-radio-group>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                确认终止行程
            </van-button>
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
    import {NavBar, Button, Image, RadioGroup, Radio, Row, Col,Toast,Tabbar, Dialog,TabbarItem} from 'vant';
    import imageURL from '../../static/images/stop.png';

    import request from '../../utils/request'

    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Image.name]: Image,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Row.name]: Row,
            [Col.name]: Col,
            [Toast.name]:Toast,
            [Tabbar.name]: Tabbar,
            [Dialog.name]: Dialog,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                reasonId: 1,
                imageURL: imageURL,
                state:true,
                tripInfo:{

                },
                active:"",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                reasonList:[]
            }
        },

        mounted(){
            this.initReasonList();

            let tripId = this.$route.query.tripId;
            let seat = this.$route.query.seat;
            let confirm = this.$route.query.confirm;
            let unconfig = this.$route.query.unconfig;
            let price = this.$route.query.price;

            this.tripInfo.tripId = tripId;
            this.tripInfo.seat = seat;
            this.tripInfo.confirm = confirm;
            this.tripInfo.unconfig = unconfig;
            this.tripInfo.price = price;
        },
        methods: {
            //初始化理由列表
            initReasonList(){
                request.sendGet({
                    url:"/sharecar/trip/cancelreason",
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                       this.reasonList = res.data.rows;
                    }
                })
            },

            onClickLeft() {
                this.$router.back(-1);
            },
            submit() {
                let me = this;
                let tripId = this.$route.query.tripId;
                let reasonId = this.reasonId;
                    request.sendPost({
                        url:"/sharecar/trip/cancel/"+tripId+"/"+reasonId,
                        params:{}
                    }).then(res =>{
                        if(res.data.code == '0'){
                            Toast.success(res.data.msg)
                        }else if(res.data.code == '300'){
                            //有偿
                            Dialog.confirm({
                                title: '取消行程',
                                message: res.data.msg
                            }).then(() => {
                                // on confirm
                                //有偿
                                request.sendPost({
                                    url:"/sharecar/trip/paycancel/"+tripId+"/"+reasonId,
                                    params:{}
                                }).then(res =>{
                                    if(res.data.code == '0'){
                                        Toast.success(res.data.msg)
                                    }else {
                                        Toast.fail(res.data.msg)
                                    }
                                })
                            }).catch(() => {
                                me.$router.back(-1);
                                // on cancel
                            });
                        } else {
                            Toast.fail(res.data.msg)
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .tips {
        color: #5083ED;
        font-size: 14px
    }

    .info-wrap {
        background-color: white;
        margin-top: 15px;
        height: 52px;
    }

    .img-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        height: 124px;
    }

    .radio-wrap-content {
        margin-left: 33px;
        padding: 18px;

    }

    .radio-wrap-title {
        color: #FF7E00;
        font-size: 18px;
        font-weight: bold;
        margin-top: 10px;
    }

    /deep/ .van-radio {
        height: 40px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-radio__label {
        color: #202020;
        font-weight: bold;
        font-size: 16px;
    }

    .radio-wrap {
        background-color: white;
        padding: 0 12px;
        margin-top: 15px;
    }

    .content {
        background-color: #F6F6F6;
        padding: 15px;
        margin-bottom: 55px;
        /*margin-top: 46px;*/
    }
</style>
