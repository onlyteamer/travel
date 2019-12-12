<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div style="margin-top: 46px;padding: 15px 0px;position: relative;">
            <div class="userInfo">
                <van-row>
                    <van-col span="16">2019年12月04日 05:20</van-col>
                    <van-col span="8" align="right">已完成</van-col>
                </van-row>
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
                <van-row style="display: flex;align-items: center;font-size: 14px">
                    <van-col span="24">
                        <div style="display: flex;align-items: center">
                            <img src="../../static/images/userAvatar.png"
                                 style="height: 52px;width: 52px;margin-right: 10px">
                            <div style="width: 100%">
                                <p style="margin: 5px 0">
                                    <span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img
                                        src="../../static/images/sexTag.png"
                                        style="width: 12px;height: 12px;margin-left: 5px">
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
                                        <van-col span="12" style="display: flex;align-items: center">
                                            <img src="../../static/images/userInfo.png"
                                                 style="width: 14px;height: 16px;margin-right: 5px"/><span
                                                style="font-size: 14px;color: #5E5E5E">张**</span>
                                        </van-col>
                                        <van-col span="12">
                                            <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                                style="font-size: 14px;color: #5E5E5E">13884997727</span>
                                        </van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0">
                                    <van-row>
                                        <van-col span="12">
                                            <span style="color: #FFFFFF;border-radius: 2px;padding: 0px 5px;background-color: #5083ED;margin-right: 10px">京A***99</span>
                                        </van-col>
                                        <van-col span="12" style="display: flex;align-items: center"><img
                                                src="./../../static/images/car.png"
                                                style="width: 18px;height: 18px"/><span
                                                style="font-size: 14px;color: #5E5E5E">大众15款速腾</span></van-col>
                                    </van-row>
                                </p>
                                <p style="margin: 5px 0;">
                                    <van-row>
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
                <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>

                <div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">路线：</span><span>上河湾出发，李各庄，康居，果园，少年宫，万象汇，京城高速，芍药居，西坝河，东直门重点。</span>
                    </div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">座位数：</span><span>1位（23元）</span>
                    </div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">乘车人：</span><span>李国思</span></div>
                    <div style="margin-bottom: 10px"><span style="font-weight: bold">乘车人：</span><span>暂无</span></div>
                </div>
                <!--<van-row>-->
                <!--<van-col span="4" align="right">路线:</van-col>-->
                <!--<van-col span="20">上河湾出发，李各庄，康居，果园，少年宫，万象汇，京城高速，芍药居，西坝河，东直门重点。</van-col>-->
                <!--</van-row>-->
            </div>
            <div style="width: 100%;height: 100%;position: absolute;top: 0;background:rgba(0, 0, 0, 0.3);"></div>
        </div>
        <div class="assess" align="right">
            <van-button type="default" :color="isFollow == '0'?'#0CC893':'#9E9E9E'"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini" @click="followUser">
                {{isFollow=='0'?'关注':'已关注'}}
            </van-button>
            <van-button type="default" color="#0CC893"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini">黑名单
            </van-button>
            <van-button type="default" color="#0CC893"
                        style="font-size: 14px;margin-bottom: 10px;height: 28px;width: 72px;border-radius: 5px"
                        size="mini">投诉
            </van-button>
        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup} from 'vant';

    import request from '../../utils/request'

    export default {
        name: "otherOpt",
        components: {
            Title,
            [Row.name]: Row,
            [Col.name]: Col,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Rate.name]: Rate,
            [Tag.name]: Tag,
            [Field.name]: Field,
            [CellGroup.name]: CellGroup
        },
        data() {
            return {
                title: "其他操作",
                isFollow:"0"
            }
        },
        methods: {
            onClickLeft() {

            },
            followUser(){
                if(this.isFollow == '0'){
                    //关注
                    request.sendPost({
                        url:"/user/center/follow",
                        params:{
                            followerId:"1"
                        }
                    }).then(res =>{
                        if(res.data.code == '0'){
                            this.isFollow = '1'
                        }
                    })

                }else {
                    //取消关注
                    this.isFollow = '0'
                }
            }
        }
    }
</script>

<style scoped>
    .userInfo {
        width: 85%;
        margin: 0px auto;
        padding: 5px 10px;
        background: #FFFFFF;
        font-size: 14px;
    }

    /deep/ .van-cell {
        padding: 0;
    }

    .assess {
        padding: 10px 15px;
        background: #FFFFFF;
    }

    .card {
        padding: 10px;
        margin: 15px auto;
        border: 1px solid #ECECEC;
    }

    .assessTag {
        margin: 15px auto;
    }

    .tagStyle {
        margin: 0.4rem 0.5rem;
    }

    .startTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #0CC893;
        border-radius: 50%;
        margin-right: 5px;
    }

    .endTag {
        width: 10px;
        display: inline-block;
        height: 10px;
        background: #FF0200;
        border-radius: 50%;
        margin-right: 5px;
    }
</style>

