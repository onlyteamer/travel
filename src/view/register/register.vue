<template>
    <div class="content" ref="content">
        <img src="../../static/images/register-Icon.png" class="register_icon"/>
        <div class="form-wrap">
            <van-field v-model="definition.phone" type="tel" class="phone-input" custom-style="color:#fff"
                       placeholder="手机号码">
            </van-field>
            <van-field class="code-input"
                       v-model="definition.code"
                       center
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
                    checked-color="#0CC893">我已阅读并同意《绿色出行用户协议》
            </van-checkbox>
            <van-button style="margin-top:39px;width: 100%;height:44px" color="#0CC893" type="default">登录
            </van-button>
        </div>
    </div>
</template>

<script>
    import {Field, Button, Checkbox, Image} from 'vant';

    export default {
        components: {
            [Field.name]: Field,
            [Button.name]: Button,
            [Image.name]: Image,
            [Checkbox.name]: Checkbox
        },
        data() {
            return {
                disabledCodeBtn: true,
                codeText: '发送验证码',
                definition: {
                    phone: '',
                    code: '',
                    checked: ''
                }
            }
        },
        methods: {
            setHeight() {
                let content = document.getElementsByClassName('content')[0];
                let height = window.innerHeight;
                content.style.height = height + 'px';
            },
            async sendCode() {
                if (this.definition.phone) {
                    this.countDown(60)
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
                // if (this.verifyPhone()) {
                //     Toast(this.verifyPhone())
                // } else {
                //     let params = {
                //         phone: this.phone,
                //         code: this.verifycode
                //     }
                //     // 这里写登录的接口
                // }
            }
        },
        created: function () {

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