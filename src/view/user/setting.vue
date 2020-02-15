<template>
    <div>
        <div class="content" style="margin-bottom: 55px">
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
                                <img src="../../static/images/sexTag.png"
                                     style="width: 12px;height: 12px;margin-left: 5px" v-if="userInfo.sex == '2'">
                                <img src="../../static/images/man.png" style="width: 12px;height: 12px;margin-left: 5px"
                                     v-if="userInfo.sex == '1'">
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
                    <van-field label-class="item-label" label="真实姓名" v-model="authUserInfo.realName"
                               :readonly="authUserInfo.canModify===0?true:false"></van-field>
                </div>
                <div class="item" @click="showSexList">
                    <van-field label-class="item-label" label="性别" v-model="authUserInfo.sex"
                               placeholder="请选择性别"
                               readonly ></van-field>
                </div>
                <div class="item">
                    <van-field label-class="item-label" label="手机号" v-model="authUserInfo.phone"
                               :readonly="true"></van-field>
                </div>
                <div class="item">
                    <van-field label-class="item-label" label="身份证号" v-model="authUserInfo.cardId"
                               :readonly="authUserInfo.canModify===0?true:false"></van-field>
                </div>
                <div style="font-size: 14px;color: #FF0200;line-height: 25px">
                    注：1.请填写正确身份证号，身份证号作为您出行购买商业保险的唯一证件。<br>
                    2.认证信息请认真填写，认证后需要修改信息请联管理员。
                </div>
                <!--                <div style="font-size: 16px;color: #202020;font-weight: bold;line-height: 33px">-->
                <!--                    常用站点设置-->
                <!--                </div>-->
                <!--                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">-->
                <!--                    <span style="font-size:14px;color: #0CC893;font-weight: bold">通勤巴士</span>-->
                <!--                    <div class="item-flex">-->
                <!--                        <div class="item-flex" style="flex: 0.5">-->
                <!--                            <img :src="greenDot" width="24px" height="24px">-->
                <!--                            <span>上班</span>-->
                <!--                            <van-dropdown-menu style="flex: 1">-->
                <!--                                <van-dropdown-item v-model="value3" :options="option3"/>-->
                <!--                            </van-dropdown-menu>-->
                <!--                            <van-icon name="arrow" color="#9E9E9E"/>-->
                <!--                        </div>-->
                <!--                        <div class="item-flex" style="flex: 0.5">-->
                <!--                            <img :src="redDot" width="24px" height="24px">-->
                <!--                            <span>下班</span>-->
                <!--                            <van-dropdown-menu style="flex: 1">-->
                <!--                                <van-dropdown-item v-model="value3" :options="option3"/>-->
                <!--                            </van-dropdown-menu>-->
                <!--                            <van-icon name="arrow" color="#9E9E9E"/>-->
                <!--                        </div>-->

                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">-->
                <!--                    <span style="font-size:14px;color: #0CC893;font-weight: bold">拼车</span>-->
                <!--                    <div class="item-flex">-->
                <!--                        <span>线路</span>-->
                <!--                        <van-dropdown-menu style="flex: 1">-->
                <!--                            <van-dropdown-item v-model="value3" :options="option3"/>-->
                <!--                        </van-dropdown-menu>-->
                <!--                        <van-icon name="arrow" color="#9E9E9E"/>-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div class="item">-->
                <!--                    <van-field label-class="item-label" :left-icon="greenDot" color="#0CC893" label="上车地点"-->
                <!--                               placeholder="多个地点请用逗号隔开"/>-->
                <!--                </div>-->
                <!--                <div class="item">-->
                <!--                    <van-field label-class="item-label" :left-icon="redDot" label="下车地点" placeholder="多个地点请用逗号隔开"/>-->
                <!--                </div>-->
                <van-button style="margin-top:15px;width: 100%;height:44px" @click="saveAuthUserInfo" color="#0CC893"
                            :disabled="authUserInfo.canModify===0?true:false"
                            type="default">
                    修改
                </van-button>
                <van-button @click="cancel" style="margin-top:15px;width: 100%;height:44px" color="#9E9E9E"
                            type="default">
                    取消
                </van-button>
            </div>
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

        <van-popup
                v-model="showSexPop"
                position="bottom"
                :style="{ height: '30%' }"
        >
            <van-picker
                    show-toolbar
                    title=""
                    :visible-item-count="3"
                    :columns="columns"
                    @cancel="showSexPop = false"
                    @confirm="changeSex"
            />
        </van-popup>
    </div>
</template>
<!--我的资料-->
<script>
    import {NavBar, Field, Button, Image, DropdownMenu, DropdownItem, Icon,Popup,Picker,Tabbar,TabbarItem} from 'vant';
    import greenDot from "../../static/images/dot-green.png"
    import redDot from "../../static/images/dot-red.png"
    import request from "../../utils/request";
    import chengK from './../../static/images/chengk.png'
    import xingC from './../../static/images/xingC.png'
    import push from './../../static/images/push.png'
    import person from './../../static/images/chengk.png'

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Image.name]: Image,
            [Icon.name]: Icon,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Popup.name]:Popup,
            [Picker.name]:Picker,
            [Tabbar.name]: Tabbar,
            [TabbarItem.name]: TabbarItem
        },
        data() {
            return {
                chengK: chengK,
                xingC: xingC,
                push: push,
                person: person,
                active:"",
                columns:[
                    {
                        text:"请选择",
                        value:"0"
                    },
                    {
                        text:"男",
                        value:"1"
                    },
                    {
                        text:"女",
                        value:"2"
                    }
                ],
                showSexPop:false,
                userInfo: {},
                authUserInfo: {
                    canModify: '',//标志位，如果返回1 是可以修改的，如果是0 ，是不可修改的。
                    cardId: '',
                    phone: '',
                    sex: '',
                    realName: '',
                },
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
            //选择性别
            showSexList(){
                if(this.authUserInfo.canModify != '0'){
                    this.showSexPop = true;
                }
            },

            changeSex(val){
                this.authUserInfo.sex = val.text;
                this.showSexPop = false;
            },

            cancel() {
                this.$router.back(-1);
            },
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
            getInfo(code) {
                request.sendGet({
                    url: '/wx/syncwxinfo',
                    params: {
                        code: code,
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.$toast.success(res.data.msg);
                        window.location.href = location.protocol + "//" + location.hostname + "/#/setting"
                    } else {
                        this.$toast.fail(res.data.msg);
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
                        this.$toast.fail(res.data.msg);
                    }
                })
            },
            initAuthUserInfo() {
                request.sendGet({
                    url: '/user/center/userauthinfo',
                    params: {}
                }).then(res => {
                    if (res.data.code === 0) {
                        this.authUserInfo = res.data.data;
                        this.authUserInfo.sex = this.decodeSex(res.data.data.sex);
                    }
                })
            },
            checkIdCard(idCard) {
                if (/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(idCard)
                    || /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(idCard)) {
                    return true;
                }
                return false;
            },
            saveAuthUserInfo() {
                if (!this.authUserInfo.realName) {
                    this.$toast.fail("请填写真实姓名");
                    return;
                }
                if (!this.authUserInfo.sex) {
                    this.$toast.fail("请填写性别");
                    return;
                }
                // if (this.authUserInfo.sex !== '男' && this.authUserInfo.sex !== '女') {
                //     this.$toast.fail("请填写男或女");
                //     return;
                // }
                if (!this.authUserInfo.cardId || !this.checkIdCard(this.authUserInfo.cardId)) {
                    this.$toast.fail("请填写正确的身份证号");
                    return;
                }
                this.authUserInfo.sex = this.encodeSex(this.authUserInfo.sex);
                request.sendPost({
                    url: '/user/center/userauth',
                    params: this.authUserInfo,

                }).then(res => {
                    if (res.data.code === 0) {
                        this.$toast.success(res.data.msg);
                        this.initAuthUserInfo();
                    } else {
                        this.$toast.fail(res.data.msg);
                        this.authUserInfo.sex = this.decodeSex(this.authUserInfo.sex);
                    }
                })
            },
            decodeSex(sex) {
                if (sex === 2) {
                    return '女';
                } else if (sex === 1) {
                    return '男';
                } else {
                    return '未知';
                }
            },
            encodeSex(sex) {
                if (sex === '女') {
                    return 2;
                } else if (sex === '男') {
                    return 1;
                } else {
                    return 0;
                }
            },
        },
        created() {
            this.initAuthUserInfo();
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
