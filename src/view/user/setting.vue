<template>
    <div>
        <van-nav-bar title="我的资料" :fixed="true" left-arrow @click-left="onClickLeft"/>
        <div class="content">
            <div class="info-wrap">
                <div class="info">
                    <div style="display: flex;align-items: center;justify-content: space-between;">
                        <van-image round fit="cover" width="52px" height="51px"
                                   src="https://img.yzcdn.cn/vant/cat.jpeg"/>
                        <div style="margin-left: 17px">
                            <div style="line-height:26px;color: #5E5E5E;font-size: 14px;font-weight: bold">加菲猫</div>
                            <div style="line-height:26px;">
                                <span style="color:#5E5E5E;font-size: 14px;margin-right: 3px">性别:女</span>
                                <img width="13px" height="13px" src="../../static/images/sexTag.png"/>
                            </div>
                            <div style="line-height:26px;">
                                <van-icon name="phone" color="#30C80C"/>
                                <span style="color:#5E5E5E;font-size: 14px">18545896523</span>
                            </div>
                        </div>

                    </div>
                    <van-button @click="syncInfo" style="width: 66px;height:37px;line-height: 37px" color="#0CC893"
                                type="default">同步
                    </van-button>
                </div>
            </div>
            <div class="info-form">
                <div class="item" style="font-size: 16px;color: #202020;font-weight: bold">真实认证</div>
                <div class="item">
                    <van-field label-class="item-label" label="乘车人姓名"></van-field>
                </div>
                <div class="item">
                    <span>班车线路</span>
                    <van-dropdown-menu style="flex: 1">
                        <van-dropdown-item v-model="value2" :options="option2"/>
                    </van-dropdown-menu>
                    <van-icon name="arrow" color="#9E9E9E"/>
                </div>
                <div style="font-size: 10px;color: #FF0200;line-height: 25px">
                    注：请填写正确身份证号，身份证号作为您出行购买商业保险的唯一证件。
                </div>
                <div style="font-size: 16px;color: #202020;font-weight: bold;line-height: 33px">
                    常用站点设置
                </div>
                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">
                    <span style="font-size:14px;color: #0CC893;font-weight: bold">通勤班车</span>
                    <div class="item-flex">
                        <div class="item-flex" style="flex: 0.5">
                            <img :src="greenDot" width="24px" height="24px">
                            <span>上班</span>
                            <van-dropdown-menu style="flex: 1">
                                <van-dropdown-item v-model="value3" :options="option3"/>
                            </van-dropdown-menu>
                            <van-icon name="arrow" color="#9E9E9E"/>
                        </div>
                        <div class="item-flex" style="flex: 0.5">
                            <img :src="redDot" width="24px" height="24px">
                            <span>下班</span>
                            <van-dropdown-menu style="flex: 1">
                                <van-dropdown-item v-model="value3" :options="option3"/>
                            </van-dropdown-menu>
                            <van-icon name="arrow" color="#9E9E9E"/>
                        </div>

                    </div>
                </div>
                <div style="height: 72px;padding-top: 10px;border-bottom: 1px solid #ECECEC;">
                    <span style="font-size:14px;color: #0CC893;font-weight: bold">拼车</span>
                    <div class="item-flex">
                        <span>线路</span>
                        <van-dropdown-menu style="flex: 1">
                            <van-dropdown-item v-model="value3" :options="option3"/>
                        </van-dropdown-menu>
                        <van-icon name="arrow" color="#9E9E9E"/>
                    </div>
                </div>
                <div class="item">
                    <van-field label-class="item-label" :left-icon="greenDot" color="#0CC893" label="上车地点" placeholder="多个地点请用逗号隔开"/>
                </div>
                <div class="item">
                    <van-field label-class="item-label" :left-icon="redDot" label="下车地点" placeholder="多个地点请用逗号隔开"/>
                </div>
                <van-button style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                    修改
                </van-button>
                <van-button style="margin-top:15px;width: 100%;height:44px" color="#9E9E9E" type="default">
                    取消
                </van-button>
            </div>
        </div>
    </div>
</template>
<!--我的资料-->
<script>
    import {NavBar, Field, Button, Image, DropdownMenu, DropdownItem, Icon} from 'vant';
    import greenDot from "../../static/images/dot-green.png"
    import redDot from "../../static/images/dot-red.png"

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Image.name]: Image,
            [Icon.name]: Icon,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
        },
        data() {
            return {
                greenDot: greenDot,
                redDot: redDot,
                value1: '',
                option1: [
                    {text: '男', value: "男"},
                    {text: '女', value: "女"},
                ],
                value2: '',
                option2: [
                    {text: '龙云港', value: "龙云港"},
                    {text: '阿拉啦', value: "阿拉啦"},
                ],
                value3: '',
                option3: [
                    {text: '上甘岭', value: "上甘岭"},
                    {text: '里边', value: "里边"},
                ],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            syncInfo() {

            }
        }
    }
</script>

<style scoped>
    /deep/ .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
        border: none;
    }

    /deep/ .van-dropdown-menu__title::after {
        content: '';
        border: none;
    }

    .info-wrap {
        height: auto;
        padding: 13px 15px;
    }

    .info {
        background-color: white;
        min-height: 121px;
        padding: 0 10px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .info-form {
        background-color: white;
        padding: 0 15px;
    }

    .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        min-height: 50px;
        height: auto;
        border-bottom: 1px solid #ECECEC;
    }

    .item-flex {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .content {
        margin-top: 46px;
    }

    /deep/ .van-field__label {
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    /deep/ .van-icon__image {
        width: 24px;
        height: 24px;
    }
</style>