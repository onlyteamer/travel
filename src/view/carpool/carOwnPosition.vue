<template>
    <div class="contain">
        <div class="amap-wrapper">
            <el-amap vid="amapDemo" :center="center">
                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
                <el-amap-text v-for="text in texts" :text="text.text" :offset="text.offset" :position="text.position" ></el-amap-text>
            </el-amap>
        </div>
        <div class="footer">
            <div style="margin-bottom: 10px;display: flex;align-items: center">
                <van-icon name="warning" color="#F55456"/>
                <span style="font-weight: bold;margin-left: 5px">注意：</span></div>
            <div style="margin-bottom: 10px">1. 车主的位置仅供参考；</div>
            <div>2. 如果车主位置一直未刷新，建议电话联系车主。</div>
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
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup, Icon, Tabbar, TabbarItem} from 'vant';

    import wx from 'weixin-js-sdk'
    import request from '../../utils/request';
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    const exampleComponents = {
        props: ['text'],
        template: `
            <div>text from parent: {{text}}</div>`
    };
    export default {
        name: "carOwnPosition",
        components: {
            Title,
            // aMap,
            [Row.name]: Row,
            [Col.name]: Col,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Rate.name]: Rate,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup,
            [Icon.name]: Icon,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                active: "",
                title: "车主位置",
                passengerPosition: {
                    lat: "39.865042",
                    lon: "116.379028"
                },
                driverPosition: {
                    lat: "39.865042",
                    lon: "116.379028"
                },
                tripId: "",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                slotStyle: {
                    padding: '2px 8px',
                    background: '#eee',
                    color: '#333',
                    border: '1px solid #aaa'
                },
                zoom: 13,
                center: [116.403912,39.894243],
                markers: [],
                texts: [],
            }
        },
        created() {
            this.tripId = this.$route.query.tripId;
        },

        mounted() {
            this.getOwnerPosition();
            this.getPosition();
        },
        methods: {
            //自身位置
            getOwnerPosition() {
                let me = this;
                request.sendGet({
                    url: "/wx/pay/signature",
                    params: {
                        url: location.href
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        var data = res.data.data;
                        wx.config({
                            beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
                            appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: parseInt(data.timestamp, 10), // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名，见附录1
                            jsApiList: ['getLocation', 'openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function () {
                            wx.checkJsApi({
                                jsApiList: [
                                    'getLocation'
                                ]
                            });
                            wx.getLocation({
                                success: function (res) {
                                    // me.passengerPosition.lat = res.latitude;
                                    // me.passengerPosition.lon = res.longitude;
                                    me.addMarker(res,'当前位置');
                                    me.center =  [ res.latitude, res.longitude];
                                },
                                fail: function (error) {
                                    this.$toast.fail("获取地理位置失败，请确保开启GPS且允许微信获取您的地理位置！");
                                }
                            });
                        });
                        wx.error(function (res) {
                            console.log(res);
                        });
                    }
                })
            },
            addMarker(position,type) {
                let text= {
                    position:[position.latitude,position.longitude],
                    text:type,
                    offset: [0, 15],
                };
                let marker = {
                    position: [position.latitude,position.longitude],
                    visible: true,
                    draggable: false,
                };
                this.markers.push(marker);
                this.texts.push(text);
            },

            //获取车主位置
            getPosition() {
                request.sendGet({
                    url: '/sharecar/pass/driver/' + this.tripId,
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.addMarker(res.data.data,'车主位置');
                    } else {
                        this.$toast.fail(res.data.msg)
                    }
                });
            },
            // getAddress(){},

        }
    }
</script>


<style scoped>
    .contain {
        width: 100%;
    }

    .footer {
        width: 88%;
        margin: 0 auto 55px;
        padding: 15px 10px;
        background: #FFFFFF;
        font-size: 14px;
        color: #202020;
    }

    .amap-wrapper {
        width: 100%;
        height: 450px;
    }
</style>
