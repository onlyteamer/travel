<template>
    <div class="contain">
<!--        <aMap-->
<!--                ref="carMap" id="hotelContainer"-->
<!--                @select="getPosition"-->
<!--                @getAddress="getAddress"-->
<!--                :lon="carInfo.lon"-->
<!--                :lat="carInfo.lat"-->
<!--                :tripId="tripId"-->
<!--                placeholder="请输入酒店地址或点击下面地图" height="450px">-->
<!--        </aMap>-->
<!--        <div style="text-align: center;padding: 10px;background: #FFFFFF;border-top: 1px solid #ECECEC">{{carPosition.updateTime}}</div>-->
        <div class="amap-wrapper">
            <el-amap vid="amapDemo">
<!--                <el-amap-marker vid="component-marker" :position="componentMarker.position" :content-render="componentMarker.contentRender" ></el-amap-marker>-->
<!--                <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>-->
            </el-amap>
        </div>
<!--        <div>-->
<!--            <div id="hotelContainer" :style="{'width':'100%','height':'450px'}"></div>-->
<!--        </div>-->

        <div class="footer">
            <div style="margin-bottom: 10px;display: flex;align-items: center"><van-icon name="warning" color="#F55456"/><span style="font-weight: bold;margin-left: 5px">注意：</span></div>
            <div style="margin-bottom: 10px">1. 车主的位置仅供参考；</div>
            <div >2. 如果车主位置一直未刷新，建议电话联系车主。</div>
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
    import { Row, Col,Divider,Button,Rate,Tag ,Field,CellGroup,Icon ,Tabbar,TabbarItem} from 'vant';

    import wx from 'weixin-js-sdk'
    import request from '../../utils/request';
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    const exampleComponents = {
        props: ['text'],
        template: `<div>text from  parent: {{text}}</div>`
    };
    export default {
        name: "carOwnPosition",
        components:{
            Title,
            // aMap,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Rate.name]:Rate,
            [Tag.name]:Tag,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Icon.name]:Icon,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data(){
            return{
                active:"",
                title:"车主位置",
                carInfo:{
                    lat:"39.865042",
                    lon:"116.379028"
                },
                tripId:"",
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,

                count: 1,
                slotStyle: {
                    padding: '2px 8px',
                    background: '#eee',
                    color: '#333',
                    border: '1px solid #aaa'
                },
                zoom: 14,
                center: [121.5273285, 31.21515044],
                markers: [
                    {
                        position: [121.5273285, 31.21515044],
                        events: {
                            click: () => {
                                alert('click marker');
                            },
                            dragend: (e) => {
                                console.log('---event---: dragend')
                                this.markers[0].position = [e.lnglat.lng, e.lnglat.lat];
                            }
                        },
                        visible: true,
                        draggable: false,
                        template: '<span>1</span>',
                    }
                ],
                renderMarker: {
                    position: [121.5273285, 31.21715058],
                    contentRender: (h, instance) => {
                        // if use jsx you can write in this
                        // return <div style={{background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'}} onClick={() => ...}>marker inner text</div>
                        return h(
                            'div',
                            {
                                style: {background: '#80cbc4', whiteSpace: 'nowrap', border: 'solid #ddd 1px', color: '#f00'},
                                on: {
                                    click: () => {
                                        const position = this.renderMarker.position;
                                        this.renderMarker.position = [position[0] + 0.002, position[1] - 0.002];
                                    }
                                }
                            },
                            ['marker inner text']
                        )
                    }
                },
                componentMarker: {
                    position: [121.5273285, 31.21315058],
                    contentRender: (h, instance) => h(exampleComponents,{style: {backgroundColor: '#fff'}, props: {text: 'father is here'}}, ['xxxxxxx'])
                },
                slotMarker: {
                    position: [121.5073285, 31.21715058]
                }
            }
        },
        created(){
            this.tripId = this.$route.query.tripId;
        },

        mounted(){
            this.getOwnerPosition();

        },
        methods:{

            //自身位置
            getOwnerPosition(){
                request.sendGet({
                    url:"/wx/pay/signature",
                    params:{
                        url:location.href
                    }
                }).then(res =>{
                    if(res.data.code == '0'){
                        var data = res.data.data;
                        wx.config({
                            beta: true,// 必须这么写，否则在微信插件有些jsapi会有问题
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
                            timestamp: parseInt(data.timestamp,10), // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature,// 必填，签名，见附录1
                            jsApiList: ['getLocation','openLocation'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                        });
                        wx.ready(function(){
                            var isCheck=false;
                            wx.checkJsApi({
                                jsApiList: [
                                    'getLocation'
                                ]
                            });
                            wx.getLocation({
                                success: function (res) {
                                    this.carInfo.lat = res.latitude;
                                    this.carInfo.lon = res.longitude;
                                    console.log(this.carInfo);
                                },
                                fail: function(error) {
                                    this.$toast.fail("获取地理位置失败，请确保开启GPS且允许微信获取您的地理位置！");
                                }
                            });
                        });
                        wx.error(function(res){
                            console.log(res);
                        });
                    }
                })

            },

            onClickLeft(){

            },
            getPosition(){

            },
            getAddress(){},

        }
    }
</script>


<style scoped>
    .contain{
        width: 100%;
    }
    .footer{
        width: 88%;
        margin: 0 auto 55px;
        padding: 15px 10px;
        background: #FFFFFF;
        font-size: 14px;
        color: #202020;
    }
    .amap-wrapper{
        width: 100%;
        height: 450px;
    }
</style>
