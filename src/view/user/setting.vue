<template>
    <div>
        <div class="content">
            <div class="info-wrap">
                <div class="info">
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <van-image round fit="cover" width="52px" height="51px" :src="userInfo.headimgurl"/>
                        <div style="margin-left: 17px">
                            <div style="line-height:26px;color: #5E5E5E;font-size: 14px;font-weight: bold">
                                {{userInfo.nickname}}
                            </div>
                            <div style="line-height:26px;">
                                <span style="color:#5E5E5E;font-size: 14px;margin-right: 3px">性别:{{userInfo.sex===1?'男':userInfo.sex===2?'女':'未知'}}</span>
                                <img width="13px" height="13px" src="../../static/images/sexTag.png"/>
                            </div>
                            <div style="line-height:26px;">
                                <van-icon name="phone" color="#30C80C"/>
                                <span style="color:#5E5E5E;font-size: 14px">{{userInfo.phone}}</span>
                            </div>
                        </div>

                    </div>
                    <van-button @click="getCode" style="width: 66px;height:37px;line-height: 37px" color="#0CC893"
                                type="default">同步
                    </van-button>
                </div>
            </div>
            <div class="info-form">
                <div class="item" style="font-size: 16px;color: #202020;font-weight: bold">真实认证</div>
                <div class="item">
                    <van-field label-class="item-label" label="真实姓名"></van-field>
                </div>
                <div class="item">
                    <van-field label-class="item-label" label="性别"></van-field>
                </div>
                <div class="item">
                    <van-field label-class="item-label" label="手机号"></van-field>
                </div>
                <div class="item">
                    <van-field label-class="item-label" label="身份证号"></van-field>
                </div>
                <div style="font-size: 10px;color: #FF0200;line-height: 25px">
                    注：请填写正确身份证号，身份证号作为您出行购买商业保险的唯一证件。
                </div>
                <div style="font-size: 16px;color: #202020;font-weight: bold;line-height: 33px">
                    常用站点设置
                </div>
                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">
                    <span style="font-size:14px;color: #0CC893;font-weight: bold">通勤巴士</span>
                    <div class="item-flex">
                        <div class="item-flex" style="flex: 0.5">
                            <img :src="greenDot" width="24px" height="24px">
                            <span>上班</span>
                            <van-dropdown-menu style="flex: 1">
                                <van-dropdown-item v-model="value3" :options="option3"/>
                            </van-dropdown-menu>
                            <van-icon name="arrow" color="#9E9E9E"/>
                        </div>
                        <div class="item-flex" style="flex: 0.5">
                            <img :src="redDot" width="24px" height="24px">
                            <span>下班</span>
                            <van-dropdown-menu style="flex: 1">
                                <van-dropdown-item v-model="value3" :options="option3"/>
                            </van-dropdown-menu>
                            <van-icon name="arrow" color="#9E9E9E"/>
                        </div>

                    </div>
                </div>
                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">
                    <span style="font-size:14px;color: #0CC893;font-weight: bold">拼车</span>
                    <div class="item-flex">
                        <span>线路</span>
                        <van-dropdown-menu style="flex: 1">
                            <van-dropdown-item v-model="value3" :options="option3"/>
                        </van-dropdown-menu>
                        <van-icon name="arrow" color="#9E9E9E"/>
                    </div>
                </div>
                <div class="item">
                    <van-field label-class="item-label" :left-icon="greenDot" color="#0CC893" label="上车地点"
                               placeholder="多个地点请用逗号隔开"/>
                </div>
                <div class="item">
                    <van-field label-class="item-label" :left-icon="redDot" label="下车地点" placeholder="多个地点请用逗号隔开"/>
                </div>
                <van-button style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                    修改
                </van-button>
                <van-button style="margin-top:15px;width: 100%;height:44px" color="#9E9E9E" type="default">
                    取消
                </van-button>
            </div>
        </div>
    </div>
</template>
<!--我的资料-->
<script>
    import {NavBar, Field, Button, Image, DropdownMenu, DropdownItem, Icon,Toast} from 'vant';
    import greenDot from "../../static/images/dot-green.png"
    import redDot from "../../static/images/dot-red.png"
    import request from "../../utils/request";

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Image.name]: Image,
            [Icon.name]: Icon,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Toast.name]:Toast,
        },
        data() {
            return {
                userInfo: {},
                greenDot: greenDot,
                redDot: redDot,
                value3: '',
                option3: [
                    {text: '上甘岭', value: "上甘岭"},
                    {text: '里边', value: "里边"},
                ],
            }
        },
        methods: {
            getCode() {
                request.axios.get('/wx/syncauthorize')
                    .then(function (response) {
                            if (response.data.code === 0) {
                                //获取到验证URL,给微信发送请求
                                let authURL = response.data.data.url;
                                let arr1 = authURL.split("redirect_uri=");
                                let arr2 = arr1[1].split("&response_type");
                                let url = arr1[0] + "redirect_uri=" + encodeURIComponent(window.location.href) + "&response_type" + arr2[1];
                                window.location.href = url;
                            }
                        }
                    ).catch(function (error) {
                    console.log(error);
                });
            },
            getInfo(code){
                request.sendGet({
                    url: '/wx/syncwxinfo',
                    params: {
                        code:code,
                    }
                }).then(res=>{
                    if(res.data.code===0){
                        Toast(res.data.msg);
                        window.location.href = location.protocol+"//"+location.hostname + "/#/setting"
                    }else{
                        Toast(res.data.msg);
                    }
                })
            },
            initUserData() {
                request.sendGet({
                    url: '/user/center/userinfo',
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.userInfo = res.data.data;
                    } else {
                        Toast(res.data.msg);
                    }
                })
            },
        },
        created() {
            this.initUserData();
            let url = location.href;
            if (url.indexOf("code") != -1) {
                let str = url.substr(url.indexOf("?") + 1);
                let strs = str.split("&");
                let code = strs[0].split("=")[1];
                this.getInfo(code);
            }
        }
            }
</script>

<style scoped>
    /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border: none;
    }

    /deep/ .van-dropdown-menu__title::after {
        content: '';
        border: none;
    }

    .info-wrap {
        height: auto;
        padding: 13px 15px;
    }

    .info {
        background-color: white;
        min-height: 121px;
        padding: 0 10px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info-form {
        background-color: white;
        padding: 0 15px;
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height: 50px;
        height: auto;
        border-bottom: 1px solid #ECECEC;
    }

    .item-flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    /deep/ .van-field__label {
        font-size: 14px !important;
        color: #202020 !important;
    }


    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    /deep/ .van-icon__image {
        width: 24px;
        height: 24px;
    }
</style>
