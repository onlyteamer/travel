<template>
    <div class="content" ref="content">
        <img src="../../static/images/register-Icon.png" class="register_icon"/>
        <div class="form-wrap">
            <van-field v-model="definition.phone" :border=false type="number" class="phone-input"
                       custom-style="color:#fff"
                       placeholder="手机号码">
            </van-field>
            <van-field class="code-input"
                       v-model="definition.code"
                       center
                       :border=false
                       clearable
                       placeholder="请输入短信验证码">
                <van-button slot="button" size="small"
                            @click="sendCode"
                            :disabled="!disabledCodeBtn"
                            class="submit-btn" color="#0CC893"
                            type="default">{{codeText}}
                </van-button>
            </van-field>
            <van-checkbox
                    style="margin-top: 25px"
                    v-model="definition.checked"
                    checked-color="#0CC893">我已阅读并同意 <span @click="goAgreement">《绿色出行用户协议》</span>
            </van-checkbox>
            <van-button style="margin-top:39px;width: 100%;height:44px" color="#0CC893" type="default" @click="login">
                登录
            </van-button>
        </div>
    </div>
</template>

<script>
    import {Field, Button, Checkbox, Image, Toast} from 'vant';
    import request from '../../utils/request';
    import axios from 'axios';
    import qs from 'querystring'
    import context from "../../utils/context";

    export default {
        components: {
            [Field.name]: Field,
            [Button.name]: Button,
            [Image.name]: Image,
            [Checkbox.name]: Checkbox,
            [Toast.name]: Toast,
        },
        data() {
            return {
                disabledCodeBtn: true,
                codeText: '发送验证码',
                definition: {
                    phone: '',
                    code: '',
                    checked: true
                }
            }
        },
        methods: {
            setHeight() {
                let content = document.getElementsByClassName('content')[0];
                let height = window.innerHeight;
                content.style.height = height + 'px';
            },
            checkPhone(phone) {
                if (!(/^1[3456789]\d{9}$/.test(phone))) {
                    return false;
                }
                return true;
            },
            async sendCode() {
                if (this.definition.phone && this.checkPhone(this.definition.phone)) {
                    this.countDown(60);
                    request.axios.get( "/wx/getcode?" + qs.stringify({phone: this.definition.phone}))
                        .then((res) => {

                        })
                } else {
                    Toast('请输入正确的手机号');
                }
            },

            // 倒计时方法
            countDown(time) {
                if (time === 0) {
                    this.disabledCodeBtn = true
                    this.codeText = "发送验证码"
                    return
                } else {
                    this.disabledCodeBtn = false;
                    this.codeText = '重新发送(' + time + ')'
                    time--
                }
                setTimeout(() => {
                    this.countDown(time)
                }, 1000)
            },
            // 登录
            login() {
                if (!(this.definition.phone && this.checkPhone(this.definition.phone))) {
                    Toast('请输入正确的手机号');
                    return;
                }
                if (!this.definition.code) {
                    Toast('请输入验证码');
                    return;
                }
                if (!this.definition.checked) {
                    return;
                }

                request.axios.post('/wx/bindphone', qs.stringify(
                        {
                            openid: localStorage.getItem('openid'),
                            code: this.definition.code,
                            phone: this.definition.phone,
                        })
                ).then((res) => {
                    if (res.data.code == 0) {
                        request.axios.post(
                            '/wx/login', qs.stringify({openid:localStorage.getItem('openid')})).then((res)=>{
                            if(res.data.code===0){
                                if(res.data.data.isLogin==="1"){
                                    //登陆成功
                                    localStorage.setItem("isLogin","1");
                                    this.$router.push({path:'/user'})
                                }else{
                                    this.$router.push({path:'/register'})
                                }
                            }else{
                                Toast(res.data.msg);
                            }
                        })
                    }else{
                        Toast(res.data.msg);
                    }
                })

            },
            goAgreement() {
                //协议页面
                this.$router.push({path: '/agreement', query: {name: '绿色出行用户协议'}})
            }
        },
        mounted: function () {
            this.setHeight();
        }
    }

</script>
<style scoped>

    .content {
        position: relative;
        background-image: -webkit-linear-gradient(-49deg, #5C77FE, #05CF8A);
        background-image: linear-gradient(-49deg, #5C77FE, #05CF8A);
    }

    .submit-btn {
        border: 1px solid #fff !important;
    }

    .form-wrap {
        position: absolute;
        top: 198px;
        left: 0;
        right: 0;
        bottom: 0;
        padding-left: 44px;
        padding-right: 44px;
    }

    /deep/ .van-cell:not(:last-child)::after {
        border: none;
    }

    .code-input {
        background-color: transparent;
        border-bottom: 1px solid white !important;
        color: white !important;
        background-image: url(../../static/images/code.png);
        background-size: 16px 20px;
        background-position: left;
        background-repeat: no-repeat;

    }

    /deep/ .van-field__control {
        color: #fff;
        padding-left: 12px;
    }

    /deep/ .van-checkbox__label {
        font-size: 14px;
        color: white;
    }

    /deep/ .van-field__control::placeholder {
        color: #fff;
        -webkit-text-fill-color: #fff;
    }

    .phone-input {
        background-color: transparent;
        border-bottom: 1px solid white !important;
        color: white !important;
        background-image: url(../../static/images/phone.png);
        background-size: 16px 20px;
        background-position: left;
        background-repeat: no-repeat;
    }

    .register_icon {
        display: block;
        width: 272px;
        height: 62px;
        margin: 0 auto;
        position: absolute;
        top: 81px;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>