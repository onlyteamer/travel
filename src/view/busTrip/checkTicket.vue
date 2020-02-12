<template>
    <div class="contain">
        <!--<Title :title="title" @onClickLeft="onClickLeft"></Title>-->

        <van-swipe :autoplay="3000" style="height: 200px;margin-top: 0px">
            <van-swipe-item v-for="(image, index) in images" :key="index">
                <!--<img :src="image" width="100px" height="100px"/>-->
                <div @click="linkCarouselDetail(image.id)" style="width: 100%;height: 100%">
                    <van-image
                            width="100%"
                            height="100%"
                            fit="fill"
                            :src=image.imageUrl
                    />
                </div>
<!--                <div :style="{width: '100%',height: '100%',backgroundSize:'cover',backgroundImage:'url('+image.imageUrl+')'}" @click="linkCarouselDetail(image.id)"></div>-->
            </van-swipe-item>
        </van-swipe>

        <div class="notice">
            <div>
                <van-notice-bar
                        @click="showNotice"
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
            <canvas id="title" height="130" :width="titleWidth" style=""></canvas>
            <!--            恭喜发财-->
            <!--            <span v-for="(item,index) in charList" :key="index">{{item}}</span>-->
        </div>


        <div style="padding: 15px;">
            <div class="lineInfo">
                <van-row style="margin: 0 0 10px">
                    <van-col span="6" style="font-weight: bold">线路：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.linename}}</van-col>
                </van-row>

                <van-row style="margin: 10px 0">
                    <van-col span="6" style="font-weight: bold">方向：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.startname}} → {{ticketInfo.endname}}
                    </van-col>
                </van-row>
                <van-row style="margin: 10px 0">
                    <van-col span="6" style="font-weight: bold">票号：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.ticketid}}</van-col>
                </van-row>
                <van-row style="margin: 10px 0;display: flex;align-items: center;">
                    <van-col span="6" style="font-weight: bold">验证码：</van-col>
                    <van-col span="18">11{{ticketInfo.checkcode}}</van-col>
                </van-row>
                <van-row style="margin: 10px 0 0">
                    <van-col span="6" style="font-weight: bold">手机号：</van-col>
                    <van-col span="18" style="color: #202020">{{ticketInfo.userphone}}</van-col>
                </van-row>
            </div>
        </div>

        <div style="padding: 15px;background-color: white;margin-bottom: 50px">
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
                                                                           height="13px"><span class="place"
                                                                                               style="margin-left: 7px;margin-right: 13px">{{ticketInfo.starttime}}</span>
                            </div>
                            <div style="margin-left: 10px"><img :src="placeUp" width="13px" height="13px"><span
                                    class="place" style="margin-left: 7px;">{{ticketInfo.startname}}</span>
                            </div>
                        </div>
                        <div style="display: flex;height:35px;line-height: 35px">
                            <div style="margin-left: 45px;width: 25%"><img :src="redTime" width="13px"
                                                                           height="13px"><span class="place"
                                                                                               style="margin-left: 7px;margin-right: 13px">{{ticketInfo.endtime}}</span>
                            </div>
                            <div style="margin-left: 10px"><img :src="placeDown" width="13px" height="13px"><span
                                    class="place" style="margin-left: 7px;">{{ticketInfo.endname}}</span>
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
                            <img :src="lineUp" style="position: absolute;top: 0px;width: 20px;height: 23px"
                                 v-if="index == '0'">
                            <img :src="lineDown" style="position: absolute;top: 0px;width: 20px;height: 23px"
                                 v-if="index == (listSize-1)">
                            <div class="station-item">
                                <div class="name"><span style="margin-left: 5px">{{item.stationname}}</span></div>
                                <div :style="{borderTop:'1px dashed #cacaca',height: '1px',flex:'1',margin: '0 5px'}"></div>
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

        <div class="footer">
            <van-tabbar v-model="active" active-color="rgb(12, 200, 147)" inactive-color="#FFFFFF"
                        style="background:#5083ED ">
                <van-tabbar-item :icon="car" to="/busIndex">预定巴士</van-tabbar-item>
                <van-tabbar-item :icon="scan" to="/ticketList">乘车验票</van-tabbar-item>
                <van-tabbar-item :icon="user" to="/user">个人中心</van-tabbar-item>
            </van-tabbar>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Tag, Divider, Swipe, SwipeItem, NoticeBar, List, Dialog, Tabbar, TabbarItem} from 'vant'
    import laba from './../../static/images/laba.png'
    import down from '../../static/images/busTrip/down.png'
    import blueTime from './../../static/images/busTrip/blue_time.png'
    import redTime from './../../static/images/busTrip/red_time.png'

    import lineDown from './../../static/images/busTrip/lineDown.png'
    import lineUp from './../../static/images/busTrip/lineUp.png'
    import placeDown from './../../static/images/busTrip/placeDown.png'
    import placeUp from './../../static/images/busTrip/placeUp.png'

    import downTag from '../../static/images/busTrip/down-tag.png'
    import upTag from '../../static/images/busTrip/up-tag.png'

    import request from '../../utils/request'
    import moment from 'moment'

    import car from './../../static/images/busTrip/car.png'
    import scan from './../../static/images/busTrip/scan.png'
    import user from './../../static/images/busTrip/user.png'

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
            [Dialog.name]: Dialog,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem,
        },
        data() {
            return {
                titleWidth: 0,
                active: "",
                lineDown: lineDown,
                lineUp: lineUp,
                placeDown: placeDown,
                placeUp: placeUp,
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
                images: [],
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
                user: user,
                car: car,
                scan: scan,
                notice2:''
            }
        },

        mounted() {

            this.initNotice();
            this.initData();
            this.initAdvList();

        },

        methods: {
            showNotice(){
                let notice = this.notice2;
                Dialog.alert({
                    title: '通知',
                    confirmButtonText:'关闭',
                    confirmButtonColor:'#0CC893',
                    message: notice
                }).then(() => {
                    // on close
                });
            },
            //轮播详情
            linkCarouselDetail(val){
                this.$router.push({path: '/carouselDetail', query: {id: val}})
            },

            doDraw(color) {
                //  获取canvas
                var canvas = document.getElementById("title");
                //  可以理解为一个画笔，可画路径、矩形、文字、图像
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = color;
                ctx.font = "70px '微软雅黑' ";
                ctx.textAlign = "center";

                //shadowBlur:模式级数
                // ctx.shadowBlur = 10;
                // ctx.shadowOffsetX = 5;
                // ctx.shadowOffsetY = 5;
                // ctx.shadowColor = "#6B6B6B";
                //fillText("要添加的文字",x0坐标，y0坐标)
                let word = this.charList;
                let width = this.titleWidth / word.length;
                for (let i = 0; i < word.length; i++) {
                    ctx.fillText(word[i], i * width + width / 2, 90);
                }

            },
            initAdvList() {
                //1-拼车 2-班车 3-班车验票
                let positionId = 3;
                request.sendGet({
                    url: "/common/advertlist/" + positionId,
                    params: {}
                }).then(res => {
                    if (res.data.code == '0') {
                        this.images = res.data.data;
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
                            this.notice += " ★ " + e.title + ' ★ ' + e.context + " ";
                            this.notice2 += "<p> ★" + e.title + ' ★ </p><p>' + e.context + "</p>";
                        });
                    }
                })

            },

            onClickLeft() {
                this.$router.back(-1);
            },

            //验票
            checkTicket() {
                // let endTime =  new Date(this.ticketInfo.date);
                // let startTime = new Date();
                // let days = moment(endTime).diff(moment(startTime), 'days');
                // if(days == '0'){
                //     Dialog.confirm({
                //         title: '验票',
                //         message:  '验票后不可退票,确认进行验票么？'
                //     }).then(() => {
                //         // 确定
                //         request.sendPost({
                //             url: "/bus/driverChecking",
                //             params: {
                //                 isdriver: 0,
                //                 checkcode: this.ticketInfo.checkcode
                //             }
                //         }).then(res => {
                //             if (res.data.code == '0') {
                //                 this.$toast.success("验票成功")
                //             } else {
                //                 this.$toast.fail(res.data.msg)
                //             }
                //         })
                //     }).catch(res =>{
                //
                //     })
                // }
            },

            onLoad() {

            },
            initData() {
                let id = this.id;
                let me = this;
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
                            this.doDraw();
                        }
                        if (this.ticketInfo.showcode) {
                            let size = this.ticketInfo.showcode.length;
                            for (let i = 0; i < size; i++) {
                                this.charList.push(this.ticketInfo.showcode.charAt(i));
                            }
                        }
                        this.queryLineDetailsList(this.ticketInfo.busid);
                        if (me.timer) {
                            clearInterval(me.timer);
                        }
                          me.timer = setInterval(()=>{
                           let color = me.randomHexColor();
                           // setTimeout(function() {
                           me.doDraw(color);
                        },600);

                    }
                })
            },
             randomHexColor() {	//随机生成十六进制颜色
        return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
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
        }
        ,
        created() {
            this.titleWidth = window.innerWidth * 0.88;
            this.id = this.$route.query.id;
        },
        destroyed(){
            clearInterval(this.timer);
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
        font-size: 24px;
        font-weight: bold;
        padding: 10px;
        border-radius: 5px;
    }

    /*@keyframes blink {*/
    /*    33% {*/
    /*        color: #41B3FF;*/
    /*    }*/
    /*    33% {*/
    /*        color: #50EDE2;*/
    /*    }*/
    /*    33% {*/
    /*        color: #0CC893;*/
    /*    }*/
    /*}*/

    /*#showTitleBox span:nth-child(1) {*/
    /*    animation: blink 2s steps(1, start) 0.33s infinite;*/
    /*}*/

    /*#showTitleBox span:nth-child(2) {*/
    /*    animation: blink 2s steps(1, start) 0.66s infinite;*/
    /*}*/

    /*#showTitleBox span:nth-child(3) {*/
    /*    animation: blink 2s steps(1, start) 0.33s infinite;*/
    /*}*/

    /*#showTitleBox span:nth-child(4) {*/
    /*    animation: blink 2s steps(1, start) 0.66s infinite;*/
    /*}*/

    .btnStyle {
        /*text-align: center;*/
        /*font-size: 70px;*/
        height: 130px;
        color: #FFFFFF;
        font-weight: 900;
        width: 88%;
        margin: 0 auto;
        /*background-image: linear-gradient(135deg, #41B3FF, #50EDE2, #0CC893);*/
        background-image: linear-gradient(135deg, #ee0a24, #ed7e50, #ee0a24);
        /*letter-spacing:10px;*/
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

    .footer {
        width: 100%;
    }

</style>
