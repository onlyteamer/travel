<template>
    <div>
        <div>
            <van-nav-bar title="车辆实名认证" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="img-wrap">
                <van-image width="80px" height="80px" :src="imageURL"/>
                <div style="color: #202020;font-size: 18px;margin-top: 15px">实名认证车辆要求</div>
            </div>
            <div class="info-wrap">
                <div>1. 车龄不超过10年；</div>
                <div>2.座位数不能超过7座(含7座)的客用型车型；</div>
                <div>3.车辆所有人不得为租赁公司；</div>
                <div>4.车辆指导价不低于10万的5座车型和不低于15万的7座车型；（价格以汽车之家公布的顶配车型价格为准）</div>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                继续
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Image,} from 'vant';
    import imageURL from '../../static/images/clrz.png';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Image.name]: Image,
        },
        data() {
            return {
                imageURL: imageURL
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            submit() {
                this.$router.push({path:'/addCar'});
            }
        }
    }
</script>

<style scoped>
    .img-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: white;
        height: 148px;
    }

    .content {
        background-color: #F6F6F6;
        padding: 15px;
        margin-top: 46px;
    }

    .info-wrap {
        background-color: white;
        min-height: 172px;
        height: auto;
        margin-top: 15px;
        padding: 16px 10px 0 10px;
        font-size: 14px;
        color: #202020;
    }
    .info-wrap div{
        line-height: 24px;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }
</style>