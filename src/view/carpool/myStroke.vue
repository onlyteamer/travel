<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>

    </div>
</template>

<script>
    import Title from './../../components/header'
    import {  Tab, Tabs,Divider,Row, Col,Button   } from 'vant';

    export default {
        name: "myStroke",
        components:{
            Title,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs,
            [Divider.name]:Divider,
            [Row.name]:Row,
            [Col.name]:Col,
            [Button.name]:Button
        },
        data(){
            return{
                title:"我的行程"
            }
        },
        methods: {
            onClickLeft(){
                console.log(11111);

            },
        }
    }
</script>

<style scoped>
    body{
        background: #FFFFFF;
    }

    .contain{

    }

</style>
