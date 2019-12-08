<template>
    <div class="contain">
        <Title :title="title" @onClickLeft="onClickLeft"></Title>
        <div style="margin-top: 46px;text-align: center;padding: 10px;background: #FFFFFF;border-top: 1px solid #ECECEC">2019年12月01日 20:30分</div>
        <aMap
                ref="hotelMap" id="hotelContainer"
                @select="getPosition"
                @getAddress="getAddress"
                :lon="carInfo.lon"
                :lat="carInfo.lat"
                placeholder="请输入酒店地址或点击下面地图" height="450px" width="375px">
        </aMap>

        <div class="footer">
            <div style="margin-bottom: 10px;display: flex;align-items: center"><van-icon name="warning" color="#F55456"/><span style="font-weight: bold;margin-left: 5px">注意：</span></div>
            <div style="margin-bottom: 10px">1. 车主的位置仅供参考；</div>
            <div >2. 如果车主位置一直未刷新，建议电话联系车主。</div>
        </div>
    </div>
</template>

<script>
    import Title from './../../components/header'
    import aMap from './../../components/amap_point'
    import { Row, Col,Divider,Button,Rate,Tag ,Field,CellGroup,Icon } from 'vant';

    export default {
        name: "carOwnPosition",
        components:{
            Title,
            aMap,
            [Row.name]:Row,
            [Col.name]:Col,
            [Divider.name]:Divider,
            [Button.name]:Button,
            [Rate.name]:Rate,
            [Tag.name]:Tag,
            [Field.name]:Field,
            [CellGroup.name]:CellGroup,
            [Icon.name]:Icon
        },
        data(){
            return{
                title:"车主位置",
                carInfo:{
                    lat:"39.865042",
                    lon:"116.379028"
                }
            }
        },

        created(){



        },
        methods:{
            onClickLeft(){

            },
            getPosition(){

            },
            getAddress(){}
        }
    }
</script>


<style scoped>
    .footer{
        width: 88%;
        margin: 0 auto;
        padding: 15px 10px;
        background: #FFFFFF;
        font-size: 14px;
        color: #202020;
    }
</style>
