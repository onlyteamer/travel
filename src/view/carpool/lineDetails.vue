<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div class="lineDetails">
            <van-row style="display: flex;align-items: center">
                <van-col span="12" >
                    <div style="display: flex;align-items: center">
                        <img src="../../static/images/userAvatar.png" style="height: 44px;width: 44px;margin-right: 10px">
                        <div>
                            <p style="font-size: 14px;margin: 5px 0"><span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px"> </p>
                            <p style="font-size: 14px;margin: 5px 0">
                                <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;">京A***99</span>
                            </p>
                        </div>
                    </div>
                </van-col>
                <van-col span="12">
                    <div style="padding: 3px 0">
                        <img src="./../../static/images/tel.png" style="width: 14px" /><span style="font-size: 14px;color: #5E5E5E">13884997727</span>
                    </div>
                    <div style="padding: 0px 5px;border-radius: 3px;border: 1px solid #CFCFCF;font-size: 14px;width: fit-content">
                        <span style="color: #CFCFCF;margin-right: 5px">好评数</span><img src="./../../static/images/xin.png" style="width: 14px"><span style="margin-left: 5px;color: #5E5E5E">231</span>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="content">

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">线路</van-col>
                <van-col span="18">北京←→密云</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">发车时间</van-col>
                <van-col span="18">2019年12月2日 06:55</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">出发地</van-col>
                <van-col span="18">上河湾</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">目的地</van-col>
                <van-col span="18">东直门</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">路线</van-col>
                <van-col span="18">上河湾出发，李哥庄，绿地，果园，少年宫，万象城</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">座位数</van-col>
                <van-col span="18">4位</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">价格</van-col>
                <van-col span="18">22元</van-col>
            </van-row>

            <van-row style="padding: 12px 2px">
                <van-col span="6">备注</van-col>
                <van-col span="18">车上不能抽烟，不能长时间打电话</van-col>
            </van-row>
        </div>

        <van-row style="position: fixed;bottom: 0;width: 100%;">
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini">分享</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini">关注</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini">电话</van-button>
            </van-col>
            <van-col span="6">
                <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;height: 34px" size="mini">预约</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Cell, CellGroup,DatetimePicker,Popup,Row, Col,Icon,Picker ,Checkbox, CheckboxGroup ,Button  } from 'vant';

    export default {
        name: "lineDetails",
        components:{
            Title,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [DatetimePicker.name]:DatetimePicker,
            [Popup.name]:Popup,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
            [Picker.name]:Picker,
            [Checkbox.name]:Checkbox,
            [CheckboxGroup.name]:CheckboxGroup,
            [Button.name]:Button
        },
        data(){
            return{
                title:"行车信息"
            }
        },
        methods:{
            onClickLeft(){

            }
        }
    }
</script>

<style scoped>
    .lineDetails{
        width: 90%;
        margin: 55px auto 15px;
        background: #FFFFFF;
        padding: 10px 5px;
    }

    .collect{
        margin-left: 20px;
    }

    .content{
        padding: 5px 15px;
        background: #FFFFFF;
        font-size: 14px;
        margin-bottom: 40px;
    }

</style>
