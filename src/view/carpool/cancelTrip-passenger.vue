<template>
    <div>
        <div>
            <van-nav-bar title="取消行程" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="radio-wrap">
                <div class="radio-wrap-title">取消行程原因：</div>
                <van-radio-group v-model="radio" class="radio-wrap-content">
                    <van-radio name="个人原因取消行程" checked-color="#07BD06">个人原因取消行程</van-radio>
                    <van-radio name="车主原因取消行程" checked-color="#07BD06">车主原因取消行程</van-radio>
                    <van-radio name="其他原因" checked-color="#07BD06">其他原因</van-radio>
                    <van-radio name="与车主协商取消行程" checked-color="#07BD06">与车主协商取消行程</van-radio>
                </van-radio-group>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                确认终止行程
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, RadioGroup, Radio} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Image.name]: Image,
        },
        data() {
            return {
                radio: ''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            submit(){

            }
        }
    }
</script>

<style scoped>
    .radio-wrap-content {
        margin-left: 33px;
        padding: 18px;
    }

    .radio-wrap-title {
        color: #FF7E00;
        font-size: 18px;
        font-weight: bold;
    }
    /deep/.van-radio{
        height: 40px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
    /deep/.van-radio__label{
        color: #202020;
        font-weight: bold;
        font-size: 16px;
    }

    .radio-wrap {
        background-color: white;
        padding: 12px;
    }

    .content {
        background-color: #F6F6F6;
        padding: 15px;
        margin-top: 46px;
    }
</style>