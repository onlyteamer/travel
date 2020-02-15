<template>
    <div id="app">
        <router-view/>
        <!--<remote-css href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"></remote-css>-->
        <remote-js src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></remote-js>
        <!--<remote-js src="https://cache.amap.com/lbs/static/addToolbar.js"></remote-js>-->
        <!--    <remote-js src="https://res.wx.qq.com/open/js/jweixin-1.4.0.js"></remote-js>-->
    </div>
</template>

<script>
    import request from "./utils/request";
    import wx from 'weixin-js-sdk'

    export default {
        components: {
            'remote-css': {
                render(createElement) {
                    return createElement('link', {attrs: {rel: 'stylesheet', href: this.href}});
                },
                props: {
                    href: {type: String, required: true},
                },
            },
            'remote-js': {
                render(createElement) {
                    return createElement('script', {attrs: {type: 'text/javascript', src: this.src}});
                },
                props: {
                    src: {type: String, required: true},
                },
            }
        },
        data() {
            return {
                globalPosition: {
                    lat: "",
                    lon: ""
                },
            };
        },
        methods: {
            getWxConfig() {
                if (localStorage.getItem('openid') && localStorage.getItem("isLogin") === '1') {
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
                        }
                    })
                }
            },
            //自身位置
            updateDriverPosition(tripId) {
                if (localStorage.getItem('openid') && localStorage.getItem("isLogin") === '1') {
                    let me = this;
                    wx.ready(function () {
                        wx.checkJsApi({
                            jsApiList: [
                                'getLocation'
                            ]
                        });
                        wx.getLocation({
                            success: function (res) {
                                request.sendPost({
                                    url: '/sharecar/trip/uplocation/' + tripId,
                                    params: {
                                        latitude: res.latitude,
                                        longitude: res.longitude,
                                    }
                                });
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

            },
        },
        created() {
            this.getWxConfig();
            // this.timer = setInterval(this.getDriverPosition, 2 * 60 * 1000);
        },
        beforeDestroy() {
            // clearInterval(this.timer);
        }
    }
</script>

<style>
    @import '../common.css';

    body {
        font-size: 16px;
        background-color: #f8f8f8;
        -webkit-font-smoothing: antialiased;
    }

    /*修改vant输入框字体大小为16px用来解决ios点击输入框页面放大的问题*/
    .van-field__control {
        font-size: 16px;
    }
</style>
