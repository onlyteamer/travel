<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div style="margin-top: 46px;padding: 15px 0px;position: relative;">
        <div class="userInfo">
            <van-row>
                <van-col span="16">2019年12月04日 05:20</van-col>
                <van-col span="8" align="right">已完成</van-col>
            </van-row>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
            <van-row style="display: flex;align-items: center;font-size: 14px">
                <van-col span="24" >
                    <div style="display: flex;align-items: center">
                        <img src="../../static/images/userAvatar.png" style="height: 52px;width: 52px;margin-right: 10px">
                        <div style="width: 100%">
                            <p style="margin: 5px 0">
                                <span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img src="../../static/images/sexTag.png" style="width: 12px;height: 12px;margin-left: 5px">
                            </p>
                            <p style="margin: 5px 0;">
                                <van-row >
                                    <van-col span="12" style="display: flex;align-items: center">
                                        <img src="../../static/images/userInfo.png" style="width: 14px;height: 16px;margin-right: 5px" /><span style="font-size: 14px;color: #5E5E5E">张**</span>
                                    </van-col>
                                    <van-col span="12">
                                        <img src="./../../static/images/tel.png" style="width: 14px" /><span style="font-size: 14px;color: #5E5E5E">13884997727</span>
                                    </van-col>
                                </van-row>
                            </p>
                            <p style="margin: 5px 0">
                                <van-row >
                                    <van-col span="12">
                                        <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;margin-right: 10px">京A***99</span>
                                    </van-col>
                                    <van-col span="12" style="display: flex;align-items: center"> <img src="./../../static/images/car.png" style="width: 18px;height: 18px" /><span style="font-size: 14px;color: #5E5E5E">大众15款速腾</span></van-col>
                                </van-row>
                            </p>
                            <p style="margin: 5px 0;">
                                <van-row >
                                    <van-col span="12">
                                        <div><i class="startTag"></i>发车地点:上河湾</div>
                                    </van-col>
                                    <van-col span="12" style="display: flex;align-items: center">
                                        <div><i class="endTag"></i>目的地:安贞门</div>
                                    </van-col>
                                </van-row>
                            </p>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>
        <div style="width: 100%;height: 100%;position: absolute;top: 0;background:rgba(0, 0, 0, 0.3);"></div>
        </div>
        <div class="assess">
            <div>
                <van-rate v-model="rateVal" :size="25"   color="#FF7E00"/>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
            <div class="assessTag">

                <van-tag round type="primary" size="large" color="#0CC893" plain class="tagStyle">准时到达</van-tag>

                <van-tag round type="primary" size="large" color="#5E5E5E" plain class="tagStyle">比较健谈</van-tag>

                <van-tag round type="primary" size="large" color="#0CC893" plain class="tagStyle">付款及时</van-tag>

                <van-tag round type="primary" size="large" color="#5E5E5E" plain class="tagStyle">迟到严重</van-tag>

                <van-tag round type="primary" size="large" color="#0CC893" plain class="tagStyle">态度好有礼貌</van-tag>

                <van-tag round type="primary" size="large" color="#5E5E5E" plain class="tagStyle">车内吸烟</van-tag>

                <van-tag round type="primary" size="large" color="#0CC893" plain class="tagStyle">车内有异味</van-tag>

                <van-tag round type="primary" size="large" color="#5E5E5E" plain class="tagStyle">态度恶劣</van-tag>

                <van-tag round type="primary" size="large" color="#0CC893" plain class="tagStyle">车辆宽敞整洁</van-tag>

                <van-tag round type="primary" size="large" color="#5E5E5E" plain class="tagStyle">驾驶平稳</van-tag>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
            <van-cell-group>
                <van-field
                        v-model="message"
                        rows="4"
                        autosize
                        type="textarea"
                        placeholder="手写评价"
                />
            </van-cell-group>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false" />
            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;margin-bottom: 10px" >发布评论</van-button>
        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import { Row, Col,Divider,Button,Rate,Tag ,Field,CellGroup } from 'vant';

    export default {
        name: "carOwnerAppraise",
        components:{
            Title,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Rate.name]:Rate,
            [Tag.name]:Tag,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup
        },
        data(){
            return{
                title:"车主详情",
                rateVal:3,
                message:""
            }
        },
        methods:{
            onClickLeft(){

            }
        }
    }
</script>

<style scoped>
    .userInfo{
        width: 85%;
        margin: 0px auto;
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    .assess{
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card{
        padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }

    .assessTag{
        margin: 15px auto;
    }

    .tagStyle{
        margin: 0.4rem 0.5rem;
    }

    .startTag{
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #0CC893;
        border-radius: 50%;
        margin-right: 5px;
    }

    .endTag{
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #FF0200;
        border-radius: 50%;
        margin-right: 5px;
    }
</style>

<style>
    .van-cell{
        padding: 0;
    }
</style>
