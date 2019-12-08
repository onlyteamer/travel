<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

        <div class="userInfo">
            <van-row style="display: flex;align-items: center;font-size: 14px">
                <van-col span="24">
                    <div style="display: flex;align-items: center">
                        <img src="../../static/images/userAvatar.png"
                             style="height: 52px;width: 52px;margin-right: 10px">
                        <div>
                            <p style="margin: 5px 0">
                                <span style="color: #5E5E5E;font-weight: bold">加菲猫</span><img
                                    src="../../static/images/sexTag.png"
                                    style="width: 12px;height: 12px;margin-left: 5px">

                                <img src="./../../static/images/xin.png"
                                     style="width: 14px;height: 14px;margin-right: 5px;margin-left: 20px"/><span>231</span>
                                <img src="./../../static/images/unhapply.png"
                                     style="width: 14px;height: 14px;margin: 0 5px 0 20px"/> <span>3</span>
                            </p>
                            <p style="margin: 5px 0;display: flex;align-items: center">
                                <img src="../../static/images/userInfo.png"
                                     style="width: 14px;height: 16px;margin-right: 5px"/><span
                                    style="font-size: 14px;color: #5E5E5E">张**</span>
                            </p>
                            <p style="margin: 5px 0">
                                <img src="./../../static/images/tel.png" style="width: 14px"/><span
                                    style="font-size: 14px;color: #5E5E5E">13884997727</span>
                            </p>
                        </div>
                    </div>
                </van-col>
            </van-row>
        </div>

        <div class="assess">
            <div>
                <van-rate v-model="rateVal" :size="25" color="#FF7E00"/>
            </div>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
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
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <van-cell-group>
                <van-field
                        v-model="message"
                        rows="4"
                        autosize
                        type="textarea"
                        placeholder="手写评价"
                />
            </van-cell-group>
            <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" :hairline="false"/>
            <van-button type="default" color="#0CC893" style="font-size: 14px;width: 99%;margin-bottom: 10px">发布评论
            </van-button>
        </div>


    </div>
</template>

<script>
    import Title from './../../components/header'
    import {Row, Col, Divider, Button, Rate, Tag, Field, CellGroup} from 'vant';

    export default {
        name: "passengerAppraise",
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
                title: "乘客详情",
                rateVal: 3,
                message: ""
            }
        },
        methods: {
            onClickLeft() {

            }
        }
    }
</script>

<style scoped>
    /deep/ .van-cell {
        padding: 0;
    }

    .userInfo {
        width: 85%;
        margin: 55px auto 15px;
        padding: 5px 10px;
        background: #FFFFFF;
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
</style>
