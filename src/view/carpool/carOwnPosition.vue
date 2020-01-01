<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <aMap
                ref="carMap" id="hotelContainer"
                @select="getPosition"
                @getAddress="getAddress"
                :lon="carInfo.lon"
                :lat="carInfo.lat"
                :tripId="tripId"
                placeholder="请输入酒店地址或点击下面地图" height="450px" width="375px">
        </aMap>

        <div class="footer">
            <div style="margin-bottom: 10px;display: flex;align-items: center"><van-icon name="warning" color="#F55456"/><span style="font-weight: bold;margin-left: 5px">注意：</span></div>
            <div style="margin-bottom: 10px">1. 车主的位置仅供参考；</div>
            <div >2. 如果车主位置一直未刷新，建议电话联系车主。</div>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import aMap from './../../components/amap_point'
    import { Row, Col,Divider,Button,Rate,Tag ,Field,CellGroup,Icon ,Toast} from 'vant';

    import context from '../../utils/context'
    import request from '../../utils/request';


    export default {
        name: "carOwnPosition",
        components:{
            Title,
            aMap,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Rate.name]:Rate,
            [Tag.name]:Tag,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Icon.name]:Icon,
            [Toast.name]:Toast
        },
        data(){
            return{
                title:"车主位置",
                carInfo:{
                    lat:"39.865042",
                    lon:"116.379028"
                },
                tripId:""
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
                                },
                                fail: function(error) {
                                    Toast.fail("获取地理位置失败，请确保开启GPS且允许微信获取您的地理位置！");
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
            getAddress(){}
        }
    }
</script>


<style scoped>
    .footer{
        width: 88%;
        margin: 0 auto;
        padding: 15px 10px;
        background: #FFFFFF;
        font-size: 14px;
        color: #202020;
    }
</style>
