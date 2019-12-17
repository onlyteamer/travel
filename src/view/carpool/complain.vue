<template>
    <div>
        <div>
            <van-nav-bar title="取消行程" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="radio-wrap">
                <div class="radio-wrap-title">投诉对象</div>
                <van-radio-group v-model="radio" class="radio-wrap-content">
                    <van-radio name="1" checked-color="#07BD06">车主</van-radio>
                    <van-radio name="2" checked-color="#07BD06">乘客</van-radio>
                </van-radio-group>
            </div>
            <div class="reason-wrap">
                <div style="height: 44px;font-size:16px;color:#202020;line-height:44px;border-bottom: 1px solid #ECECEC">
                    请根据事实反映真实情况
                </div>
               <div style="border-bottom: 1px solid #ECECEC">
                   <van-field v-model="value" type="textarea" :autosize="true" placeholder="未及时到达" />
               </div>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                投诉
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, RadioGroup, Radio,Field } from 'vant';
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Field .name]:Field
        },
        data() {
            return {
                radio: '1',
                value:''
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
    .reason-wrap{
        background-color: white;
        padding: 0 10px 10px 10px;
        margin-top: 15px;
    }
    .radio-wrap-content {
        margin-left: 33px;
        padding: 18px;
    }

    .radio-wrap-title {
        color: #202020;
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
