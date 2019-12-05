<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">


        </div>
        <div class="footer">
            <div><van-icon name="warning" color="#F55456"/> 注意:</div>
            <div class="notice">
                1. 后台设置规则1；设置规则1；设置规则1； 1. 后台设置规则1设置规则1；设置规则1；； 1. 后台设置规则1；
            </div>
        </div>

        <div class="bottomBar">
            <van-row>
                <van-col span="12">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto;border: none;border-radius: unset">取消</van-button>
                </van-col>
                <van-col span="12">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto;border: none;border-radius: unset">同意</van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Cell, CellGroup,DatetimePicker,Popup,Row, Col,Icon,Picker ,Checkbox, CheckboxGroup ,Button,Tag,Field  } from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'

    export default {
        name: "declare",
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
            [Button.name]:Button,
            [Tag.name]:Tag,
            [Field.name]:Field
        },
        data(){
            return{
                redBar:redBar,
                greenBar:greenBar,
                checked:true,
                title:"车辆预约",
                stroke:{
                    startDate:"2019年12月2日 06:55",
                    point:"北京",
                    route:"上河湾出发，李哥庄，绿地，果园，少年宫，万象城",
                    seatCount:3,
                    price:23,
                    carInfo:"大众速腾（京A***356）",
                    remark:"车上不能抽烟，不能长时间打电话"
                }
            }
        },
        methods:{
            onClickLeft(){

            }
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{
        background: #FFFFFF;
        font-size: 14px;
    }

    .contain .content{
        border-top: 1px solid #ECECEC;
        width: 90%;
        margin: 0 auto;
        color: #202020;
    }

    .contain .content .valStyle{
        color: #9E9E9E;
        font-size: 14px;
    }

    .seatTag{
        width: 30px;
        height: 20px;
        font-size: 16px;
        margin-left: 5px;
        justify-content: center;
    }

    .contactTag{
        width: 30px;
        height: 20px;
        font-size: 14px;
        margin-right: 5px;
        justify-content: center;
    }

    .van-cell{
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;
        padding: 10px 0px;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
    }

    .footer{
        width: 90%;
        margin: 0 auto;
        padding: 5px 0;
    }

    .footer .notice{
        margin-top: 6px;
        line-height: 24px;
    }

    .bottomBar{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
</style>
