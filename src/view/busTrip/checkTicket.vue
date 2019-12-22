<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <van-swipe :autoplay="3000" style="height: 200px;margin-top: 46px">
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

        <div class="dateTime">{{ticketInfo.dateStr}}</div>

        <!--<div class="btnStyle" @click="checkTicket" id="showTitleBox">{{ticketInfo.showcode}}</div>-->
        <div class="btnStyle" @click="checkTicket" id="showTitleBox">
            <span v-for="(item,index) in charList" :key="index">{{item}}</span>
        </div>


        <div style="padding: 15px;">
            <div class="lineInfo">
                <van-row style="margin: 0 0 10px">
                    <van-col span="6" style="font-weight: bold">线路：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.linename}}</van-col>
                </van-row>

                <van-row style="margin: 10px 0">
                    <van-col span="6" style="font-weight: bold">方向：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.startname}} → {{ticketInfo.endname}}</van-col>
                </van-row>
                <van-row style="margin: 10px 0">
                    <van-col span="6" style="font-weight: bold">票号：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.ticketid}}</van-col>
                </van-row>
                <van-row style="margin: 10px 0">
                    <van-col span="6" style="font-weight: bold">验证码：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.checkcode}}</van-col>
                </van-row>
                <van-row style="margin: 10px 0 0">
                    <van-col span="6" style="font-weight: bold">手机号：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.userphone}}</van-col>
                </van-row>
            </div>
        </div>

        <div style="padding: 15px;background-color: white;">
            <div class="lineTree">
                <van-row>
                    <van-col span="24" style="color: #5083ED;font-weight: bold;font-size: 14px">
                        {{ticketInfo.linename}}：{{ticketInfo.startname}} → {{ticketInfo.endname}}
                    </van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                <div class="info-wrap">
                    <div style="width: 90%">
                        <div style="display: flex;height:35px;line-height: 35px">
                            <div style="margin-left: 45px;width: 25%"><img :src="blueTime" width="13px"
                                                                           height="13px"><span
                                    class="place"
                                    style="margin-left: 7px;margin-right: 13px">{{ticketInfo.starttime}}</span></div>
                            <div style="margin-left: 10px"><img :src="blueTime" width="13px" height="13px"><span
                                    class="place"
                                    style="margin-left: 7px;">{{ticketInfo.startname}}</span>
                            </div>
                        </div>
                        <div style="display: flex;height:35px;line-height: 35px">
                            <div style="margin-left: 45px;width: 25%"><img :src="redTime" width="13px"
                                                                           height="13px"><span class="place"
                                                                                               style="margin-left: 7px;margin-right: 13px">{{ticketInfo.endtime}}</span>
                            </div>
                            <div style="margin-left: 10px"><img :src="redTime" width="13px" height="13px"><span
                                    class="place"
                                    style="margin-left: 7px;">{{ticketInfo.endname}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="item">

                    <div class="list-wrap">
                        <!--<div class="tag-wrap">-->
                        <!--<img :src="upTag" style="position: absolute;top: 0px;width: 20px;height: 23px">-->
                        <!--<img :src="downTag" style="position: absolute;bottom: 0px">-->
                        <!--</div>-->
                        <!--<van-list-->
                        <!--:offset="10"-->
                        <!--v-model="loading"-->
                        <!--:finished="finished"-->
                        <!--finished-text=""-->
                        <!--@load="onLoad"-->
                        <!--:immediate-check="false">-->
                        <div v-for="(item,index) in lineDetailsList" :key="index"
                             :class='index==(listSize-1)?"item-li last-station":"item-li"'>
                            <img :src="upTag" style="position: absolute;top: 0px;width: 20px;height: 23px"
                                 v-if="index == '0'">
                            <img :src="downTag" style="position: absolute;top: 0px;width: 20px;height: 23px"
                                 v-if="index == (listSize-1)">
                            <div class="station-item">
                                <div class="name"><span style="margin-left: 5px">{{item.stationname}}</span></div>
                                <span class="time">{{item.starttime}}</span>
                            </div>
                        </div>
                        <!--</van-list>-->
                    </div>
                </div>
                <div style="height: 42px; display: flex;align-items: center;justify-content: center">
                    <img :src="down" width="11px" height="21px">
                    <span style="color: #5E5E5E;font-size: 12px;margin: 0 14px">向下滑动查看更多站点</span>
                    <img :src="down" width="11px" height="21px">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Tag, Divider, Swipe, SwipeItem, NoticeBar, List, Toast} from 'vant'
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
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Tag.name]: Tag,
            [Divider.name]: Divider,
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            [NoticeBar.name]: NoticeBar,
            [List.name]: List,
            [Toast.name]: Toast
        },
        data() {
            return {
                id: '',
                title: "验票",
                notice: "",
                blueTime: blueTime,
                redTime: redTime,
                down: down,
                downTag: downTag,
                upTag: upTag,
                loading: false,
                finished: false,
                laba: laba,
                images: [
                    backOne,
                    backTwo
                ],
                lineDetailsList: [],
                listSize: "",
                dataMain: {
                    data: [],
                    pageSize: 6,
                    pageNum: 1,
                    total: 0
                },
                charList: [],
                ticketInfo: {},
                isOneHttp: true,
            }
        },

        mounted() {
            this.initNotice();
            this.initData();

            this.initAdvList();

        },

        methods: {

            initAdvList() {
                //1-拼车 2-班车 3-班车验票
                let positionId = 3;
                request.sendGet({
                    url: "/common/advertlist/" + positionId,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        this.images = res.data.rows;
                    }
                })
            },

            //通知
            initNotice() {
                request.sendGet({
                    url: "/common/notice/list",
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        let list = res.data.data;
                        list.forEach(e => {
                            this.notice += e.title + "       ";

                        });
                    }
                })

            },

            onClickLeft() {
                this.$router.back(-1);
            },

            //验票
            checkTicket() {
                request.sendPost({
                    url: "/bus/driverChecking",
                    params: {
                        isdriver: 0,
                        checkcode: this.ticketInfo.checkcode
                    }
                }).then(res => {
                    if (res.data.code == '0') {
                        Toast.success("验票成功")
                    } else {
                        Toast.fail(res.data.msg)
                    }
                })
            },

            onLoad() {

            },
            initData() {
                let id = this.id || 51;
                request.sendPost({
                    url: "/bus/selectTicketInfo/" + id,
                    params: {
                        id: id
                    }
                }).then(res => {
                    if (res.data.code == '0') {
                        this.ticketInfo = res.data.data;
                        if (this.ticketInfo.date) {
                            let date = this.ticketInfo.date.slice(0, 11);
                            let arr = date.split("-");
                            let str = "";
                            arr.forEach((e, index) => {
                                str += e.trim() + (index == '0' ? '年' : (index == '1' ? '月' : '日'));
                            });
                            this.ticketInfo.dateStr = str;
                        }
                        if (this.ticketInfo.showcode) {
                            let size = this.ticketInfo.showcode.length;
                            for (let i = 0; i < size; i++) {
                                this.charList.push(this.ticketInfo.showcode.charAt(i));
                            }
                        }


                        this.queryLineDetailsList(this.ticketInfo.busid);
                    }
                })
            },

            queryLineDetailsList(busid) {
                if (busid) {
                    request.sendGet({
                        url: "/bus/lineDetailList",
                        params: {
                            id: busid
                        }
                    }).then(res => {
                        if (res.data.code == '0') {
                            this.lineDetailsList = res.data.rows;
                            this.listSize = res.data.total;
                        }
                    })
                }
            }
        },
        created() {
            this.id = this.$route.query.id;
        }
    }
</script>

<style scoped>
    .notice {
        background: #FFFFFF;
    }

    .dateTime {
        width: 88%;
        margin: 0 auto;
        background: #FFFFFF;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
    }

    @keyframes blink {
        33% {
            color: #41B3FF;
        }
        33% {
            color: #50EDE2;
        }
        33% {
            color: #0CC893;
        }
    }

    #showTitleBox span:nth-child(1) {
        animation: blink 2s steps(1, start) 0.33s infinite;
    }

    #showTitleBox span:nth-child(2) {
        animation: blink 2s steps(1, start) 0.66s infinite;
    }

    #showTitleBox span:nth-child(3) {
        animation: blink 2s steps(1, start) 0.33s infinite;
    }

    #showTitleBox span:nth-child(4) {
        animation: blink 2s steps(1, start) 0.66s infinite;
    }

    .btnStyle {
        text-align: center;
        font-size: 34px;
        color: #FFFFFF;
        font-weight: bold;
        width: 88%;
        margin: 0 auto;
        background-image: linear-gradient(135deg, #41B3FF, #50EDE2, #0CC893);
        padding: 10px;
        margin-top: 10px;
    }

    .lineInfo {
        margin: auto;
        padding: 15px 10px;
        font-size: 14px;
        background-color: white;
    }

    .lineTree {
        /*padding: 15px 10px;*/
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
        /*height: 100%;*/
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
        overflow-x: hidden;
        position: relative;
    }


    .station-item {
        padding-left: 7px;
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 20px;
    }

    .item-li:after {
        top: 26px;
        left: 17px;
        content: '';
        position: absolute;
        border-right: 1px solid #0CC893;
        height: 10px;
        margin-left: 20px;
    }

    .item-li {
        position: relative;
        margin-bottom: 10px;
        /*margin-right: 5%;*/
        /*margin-left: 20px;*/
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
