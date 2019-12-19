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
                        :text="notice"
                >

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

        <div class="lineTree">
            <van-row>
                <van-col span="24" style="color: #5083ED">
                    昌坤出行3线：上河湾 → 西坝河
                </van-col>
            </van-row>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <div class="info-wrap">
                <div>
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div  style="margin-left: 45px"><img :src="blueTime" width="13px" height="13px"><span
                                class="place" style="margin-left: 7px;margin-right: 13px">5:20</span></div>
                        <div  style="margin-left: 35px"><img :src="blueTime" width="13px" height="13px"><span class="place"
                                                                                   style="margin-left: 7px;">上河湾</span>
                        </div>
                    </div>
                    <div style="display: flex;height:35px;line-height: 35px">
                        <div style="margin-left: 45px"><img :src="redTime" width="13px" height="13px"><span class="place"
                                                                                  style="margin-left: 7px;margin-right: 13px">5:20</span>
                        </div>
                        <div style="margin-left: 35px"><img :src="redTime" width="13px" height="13px"><span class="place"
                                                                                  style="margin-left: 7px;">西坝河</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="item">
                <div class="tag-wrap">
                    <img :src="upTag">
                    <img :src="downTag">
                </div>
                <div class="list-wrap">
                    <van-list
                            :offset="10"
                            v-model="loading"
                            :finished="finished"
                            finished-text=""
                            @load="onLoad"
                            :immediate-check="false">
                        <div v-for="(item,index) in 20" :key="item.id"
                             :class='index==19?"item-li last-station":"item-li"'>
                            <div class="station-item">
                                <div class="name"><span style="margin-left: 5px">卧龙坡</span></div>
                                <span class="time">06:54</span>
                            </div>
                        </div>
                    </van-list>
                </div>
            </div>
            <div style="height: 42px; display: flex;align-items: center;justify-content: center">
                <img :src="down" width="11px" height="21px">
                <span style="color: #5E5E5E;font-size: 12px;margin: 0 14px">向下滑动查看更多站点</span>
                <img :src="down" width="11px" height="21px">
            </div>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Tag, Divider,Swipe, SwipeItem ,NoticeBar,List } from 'vant'
    import backOne from './../../static/images/backOne.jpg'
    import backTwo from './../../static/images/backTwo.jpg'
    import laba from './../../static/images/laba.png'
    import down from '../../static/images/busTrip/down.png'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

    import downTag from '../../static/images/busTrip/down-tag.png'
    import upTag from '../../static/images/busTrip/up-tag.png'

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
            [NoticeBar.name]:NoticeBar,
            [List.name]:List
        },
        data(){
            return{
                notice:"",
                blueTime: blueTime,
                redTime: redTime,
                down:down,
                downTag: downTag,
                upTag: upTag,
                loading: false,
                finished: false,
                laba:laba,
                images: [
                    backOne,
                    backTwo
                ],
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                isOneHttp: true,
            }
        },

        mounted(){
            this.initNotice();
            this.initData();
        },

        methods: {
            //通知
            initNotice(){
                request.sendGet({
                    url:"/common/notice/list",
                    params:{}
                }).then(res =>{
                    if(res.data.code == '0'){
                        let list = res.data.data;
                        list.forEach(e =>{
                            this.notice += e.title+"       ";

                        });
                    }
                })

            },

            onClickLeft() {
                this.$router.back(-1);
            },
            onLoad() {
                if (this.dataMain.total > this.dataMain.data.length) {
                    this.dataMain.pageNum += 1;
                    this.initData();
                }
            },
            initData() {
                request.sendGet({
                    url: '/sharecar/pass/list',
                    params: {
                        pageSize: this.dataMain.pageSize,
                        pageNum: this.dataMain.pageNum,
                    }
                }).then((res) => {
                    this.dataMain.total = res.data.total;
                    //判断是否是第一次请求数据
                    if (this.isOneHttp) {
                        this.dataMain.data = res.data.rows;
                        this.isOneHttp = false;
                    } else {
                        this.dataMain.data = this.dataMain.data.concat(res.data.rows);
                    }

                    if (this.dataMain.total === this.dataMain.data.length) {
                        this.finished = true;
                    }
                    this.loading = false;
                });
            },
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

    .lineTree{
        padding: 15px 10px;
        font-size: 14px;
    }

    .info-wrap {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 72px;
        border-bottom: 1px solid #ECECEC;
        overflow-y: auto;
    }

    .place {
        color: #202020;
        font-size: 16px;
        font-weight: bold;
    }

    .item {
        height: 200px;
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .tag-wrap {
        width: 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .tag-wrap img {
        width: 20px;
        height: 23px;
    }
    .list-wrap {
        flex: 1;
        height: 100%;
        width: 100%;
        overflow-x:hidden;
    }


    .station-item {
        padding-left: 7px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .item-li:after {
        top: 26px;
        left: 17px;
        content: '';
        position: absolute;
        border-right: 1px solid #0CC893;
        height: 10px;
    }

    .item-li {
        position: relative;
        margin-bottom: 10px;
        margin-right: 5%;
    }

    .last-station:after {
        content: '';
        border: none;
    }

    .last-station {
        margin-bottom: 0px;
    }

    .station-item .name {
        border: 1px solid #0CC893;
        height: 23px;
        line-height: 23px;
        padding: 0 12px 0 6px;
        border-radius: 13px;
        font-size: 12px;
        color: #0CC893;
    }

    .station-item > .name:before {
        content: '●';
        width: 7px;
        height: 7px;
        color: #0CC893;
    }

    .station-item .time {
        color: #202020;
        font-size: 12px;
    }
</style>
