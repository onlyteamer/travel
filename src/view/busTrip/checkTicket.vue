<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <van-swipe :autoplay="3000" style="height: 200px">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <!--<img :src="image" width="100px" height="100px"/>-->
                <div :style="{width: '100%',height: '100%',backgroundImage:'url('+image+')'}"></div>
            </van-swipe-item>
        </van-swipe>

        <div class="notice">
            <div>
                <van-notice-bar
                        color="#0BCA92"
                        background="#FFFFFF"
                        :left-icon="laba"
                        :scrollable="true"
                >
                    昌坤出行新版本与大家见面了！公告滚动循环！超出才会滚动
                </van-notice-bar>
            </div>
        </div>

        <div style="height: 10px;background: #FFFFFF;margin: 8px 0"></div>

        <div class="dateTime">2019年12月01日</div>

        <div class="btnStyle">马到成功</div>

        <div class="lineInfo">
            <van-row style="margin: 0 0 10px">
                <van-col span="6" style="font-weight: bold">线路：</van-col>
                <van-col span="18" style="color: #202020">昌坤出行3线</van-col>
            </van-row>

            <van-row style="margin: 10px 0">
                <van-col span="6" style="font-weight: bold">方向：</van-col>
                <van-col span="18" style="color: #202020">上河湾 → 西坝河</van-col>
            </van-row>
            <van-row style="margin: 10px 0">
                <van-col span="6" style="font-weight: bold">票号：</van-col>
                <van-col span="18" style="color: #202020">20191201030101</van-col>
            </van-row>
            <van-row style="margin: 10px 0">
                <van-col span="6" style="font-weight: bold">验证码：</van-col>
                <van-col span="18" style="color: #202020">2345</van-col>
            </van-row>
            <van-row style="margin: 10px 0 0">
                <van-col span="6" style="font-weight: bold">手机号：</van-col>
                <van-col span="18" style="color: #202020">13884997788</van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Tag, Divider,Swipe, SwipeItem ,NoticeBar } from 'vant'
    import backOne from './../../static/images/backOne.jpg'
    import backTwo from './../../static/images/backTwo.jpg'
    import laba from './../../static/images/laba.png'

    import request from '../../utils/request'

    export default {
        name: "checkTicket",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Tag.name]:Tag,
            [Divider.name]:Divider,
            [Swipe.name]:Swipe,
            [SwipeItem.name]:SwipeItem,
            [NoticeBar.name]:NoticeBar
        },
        data(){
            return{
                title:"验票",
                laba:laba,
                images: [
                    backOne,
                    backTwo
                ]
            }
        },

        methods: {
            onClickLeft() {
                this.$router.back(-1);
            }
        }
    }
</script>

<style scoped>
    .notice{
        background: #FFFFFF;
    }
    .dateTime{
        width: 88%;
        margin: 0 auto;
        background: #FFFFFF;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
    }

    .btnStyle{
        text-align: center;
        font-size: 34px;
        color: #FFFFFF;
        font-weight: bold;
        width: 88%;
        margin: 0 auto;
        background-image: linear-gradient(135deg,#41B3FF,#50EDE2,#0CC893);
        padding: 10px;
        margin-top: 10px;
    }

    .lineInfo{
        width: 88%;
        margin: 10px auto;
        padding: 15px 10px;
        font-size: 14px;
    }
</style>
