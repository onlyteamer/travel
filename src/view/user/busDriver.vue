<template>
    <div>
        <div>
            <van-nav-bar title="班车司机" left-arrow @click-left="onClickLeft"/>
        </div>
        <div style="background-color:white;padding:15px;position: relative">
            <div style="color: #202020;font-size: 14px;font-weight: bold">票务查询</div>
            <div style="border-bottom: 1px solid #ECECEC">
                <van-field v-model="value" label="查询日期"/>
            </div>
            <div style="display: flex;align-items:center; justify-content: flex-start; border-bottom: 1px solid #ECECEC">
                <span>巴士线路</span>
                <van-dropdown-menu style="flex: 1">
                    <van-dropdown-item v-model="value1" :options="option1"/>
                </van-dropdown-menu>
                <van-icon name="arrow" color="#9E9E9E"/>
            </div>
            <div style="height: 34px;">
                <van-button type="primary" color="#0CC893" class="item-btn">查询</van-button>
            </div>

        </div>
        <div style="margin-top: 6px;background-color: white;padding:15px;position: relative">
            <div style="color: #202020;font-size: 14px;font-weight: bold">核验车票</div>
            <div style="border-bottom: 1px solid #ECECEC">
                <van-field v-model="value2" label="车票验证码"/>
            </div>
            <div style="height: 34px;">
                <van-button type="primary" color="#0CC893" class="item-btn">验证</van-button>
            </div>
        </div>
    </div>
</template>
<!--班车司机-->
<script>
    import {NavBar, Row, Col, Field, Button, DropdownMenu, DropdownItem, Icon} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Row.name]: Row,
            [Col.name]: Col,
            [Button.name]: Button,
            [Field.name]: Field,
            [DropdownMenu.name]: DropdownMenu,
            [DropdownItem.name]: DropdownItem,
            [Icon.name]: Icon

        },
        data() {
            return {
                value: '',
                value1: '',
                value2: '',
                option1: [
                    {text: '昌坤出行3线-北京方向', value: "昌坤出行3线-北京方向"},
                    {text: '昌坤出行3线-北京方向', value: "昌坤出行3线-北京方向"},
                    {text: '昌坤出行3线-北京方向', value: "昌坤出行3线-北京方向"}
                ],
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped>
    .item-btn {
        position: absolute;
        right: 15px;
        margin-top: 10px;
        width: 95px;
        height: 34px;
        line-height: 34px
    }

    /deep/ .van-dropdown-menu__title::after {
        content: '';
        border: none;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-cell {
        padding-left: 0 !important;;
    }
</style>
