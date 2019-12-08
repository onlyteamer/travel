<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="content">
            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px;display: flex;align-items: center">
                <van-col span="6">预定座位数</van-col>
                <van-col span="18" >
                    <van-tag color="#0CC893" class="seatTag">1座</van-tag>
                    <van-tag color="#FFFFFF" text-color="#202020" style="border: 1px solid #CFCFCF" class="seatTag">2座</van-tag>
                    <van-tag color="#FFFFFF" text-color="#202020" style="border: 1px solid #CFCFCF" class="seatTag">3座</van-tag>
                    <van-tag color="#FFFFFF" text-color="#202020" style="border: 1px solid #CFCFCF" class="seatTag">4座</van-tag>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 12px 2px">
                <van-col span="6">剩余2座</van-col>
                <van-col span="14" style="color: #FF0200">每人限预定4座</van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                            placeholder="上车地点"
                            label=""
                            label-width="5px"
                            :left-icon="greenBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small" >上次行程上车地点 <van-icon name="location" color="#0CC893"/></van-button>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;display: flex;align-items: center">
                <van-col span="13">
                    <div>
                        <van-field
                                placeholder="下车地点"
                                label=""
                                label-width="5px"
                                :left-icon="redBar"
                        />
                    </div>
                </van-col>
                <van-col span="11">
                    <van-button size="small" >上次行程上车地点 <van-icon name="location" color="#FF0200"/></van-button>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="乘客人姓名"
                                label=""
                                label-width="5px"
                                left-icon="user-circle-o"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="display: flex;align-items: center;border-bottom: 1px solid #ECECEC;padding: 0px 2px 12px">
                <van-col span="15">
                    <div>
                        <van-tag color="#FFFFFF" text-color="#202020" style="border: 1px solid #CFCFCF" class="contactTag">张三</van-tag>
                        <van-tag color="#0CC893" text-color="#FFFFFF" style="border: 1px solid #CFCFCF" class="contactTag">李四</van-tag>
                        <van-tag color="#0CC893" text-color="#FFFFFF" style="border: 1px solid #CFCFCF" class="contactTag">王五</van-tag>
                    </div>
                </van-col>
                <van-col span="9" align="right">（常用联系人）</van-col>
            </van-row>


            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="大件行李——如有行李请备注"
                                label=""
                                label-width="5px"
                                left-icon="cart-circle"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 8px 0px">
                <van-col span="24">
                    <div>
                        <van-field
                                placeholder="乘客手机号"
                                label=""
                                label-width="5px"
                                left-icon="phone-circle-o"
                        />
                    </div>
                </van-col>
            </van-row>

            <van-row style="border-bottom: 1px solid #ECECEC;padding: 10px 0px;" >
                <van-col span="24">
                    <van-checkbox v-model="checked" checked-color="#07c160" shape="square">阅读并同意《免责协议和条款》和《平台支付条款></van-checkbox>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#0CC893" style="width: 100%;margin: 0 auto">预定（23元/座）</van-button>
                </van-col>
            </van-row>

            <van-row >
                <van-col span="24" style="padding: 10px 0">
                    <van-button type="default" color="#9E9E9E" style="width: 100%;margin: 0 auto">取消</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="footer">
            <div><van-icon name="warning" color="#F55456"/> 注意:</div>
            <div class="notice">
                1. 后台设置规则1；设置规则1；设置规则1； 1. 后台设置规则1设置规则1；设置规则1；； 1. 后台设置规则1；
            </div>

        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Icon,Checkbox, CheckboxGroup ,Button,Tag,Field  } from 'vant';

    import greenBar from './../../static/images/green.png'
    import redBar from './../../static/images/red.png'

    export default {
        name: "reserve",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Icon.name]:Icon,
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
                title:"预约",
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
        margin: 46px auto 0;
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

</style>
