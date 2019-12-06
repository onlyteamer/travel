<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div class="dateTag">
            <van-tabs type="card" background="#FFFFFF" color="#5083ED"  title-active-color="#FFFFFF" title-inactive-color="#202020">
                <van-tab title="周日"></van-tab>
                <van-tab title="周一"></van-tab>
                <van-tab title="周二"></van-tab>
                <van-tab title="周三"></van-tab>
                <van-tab title="周四"></van-tab>
                <van-tab title="周五"></van-tab>
                <van-tab title="周六"></van-tab>
            </van-tabs>
        </div>

        <div class="placeTab">
            <van-tabs type="card"  color="#0CC893"  title-active-color="#FFFFFF" title-inactive-color="#0CC893" >
                <van-tab title="全部"></van-tab>
                <van-tab title="去北京"></van-tab>
                <van-tab title="去密云"></van-tab>
            </van-tabs>
        </div>
        <div class="content">
            <div v-for="index in 3" :key="index">
                <div class="carBar">
                    <div></div>
                    <van-divider :style="{borderColor: '#ECECEC',margin:'8px 0' }" />
                    <div>11</div>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {  Tab, Tabs,Divider,Row, Col  } from 'vant';

    export default {
        name: "carLine",
        components:{
            Title,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Divider.name]:Divider,
            [Row.name]:Row,
            [Col.name]:Col
        },
        data(){
            return{
                title:"线路：北京←→密云"
            }
        },
        methods: {
            onClickLeft(){

            },
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{
        background: #FFFFFF;
    }

    .placeTab{
        width: 90%;
        margin: 10px auto;
    }

</style>

<style>
    .van-tabs__nav--card{
        box-sizing: border-box;
        height: 30px;
         margin: 0;
        border: 1px solid #ee0a24;
        border-radius: 2px;
    }
</style>
