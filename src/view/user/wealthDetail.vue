<template>
    <div>
        <div>
            <van-nav-bar title="账单明细" left-arrow @click-left="onClickLeft"/>
        </div>
        <div>
            <van-tabs v-model="active">
                <van-tab title="全部">

                </van-tab>
                <van-tab title="消费">

                </van-tab>
                <van-tab title="收益">

                </van-tab>
                <van-tab title="充值">

                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
    import {NavBar, Tab, Tabs,Row, Col, } from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
        },
        data() {
            return {
                active:1
            }
        },
        methods: {
            onClickLeft() {

            }
        }
    }
</script>

<style scoped>

</style>