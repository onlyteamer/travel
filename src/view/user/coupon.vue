<template>
    <div style="background-color: #fff">
        <div >
            <van-coupon-list
                    v-model="code"
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
                    :disabled-coupons="disabledCoupons"
                    :show-close-button="false"
                    @change="onChange"
                    @exchange="onExchange"/>
        </div>
    </div>
</template>

<script>
    import {NavBar,CouponCell, CouponList, Tab,Field, Tabs, Row, Col, List} from 'vant';
    import request from '../../utils/request'

    const coupon = {
        available: 1,
        condition: '无使用门槛',
        reason: '',
        value: 150,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '1.5',
        unitDesc: '元'
    };

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Row.name]: Row,
            [Col.name]: Col,
            [List.name]: List,
            [Field.name]:Field,
            [CouponCell.name]:CouponCell,
            [CouponList.name]:CouponList,
        },
        data() {
            return {
                chosenCoupon: -1,
                coupons: [coupon],
                disabledCoupons: [coupon],
                code:'',
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            onClick() {

            },
            onChange(index) {
                this.chosenCoupon = index;
            },
            onExchange() {
                if(!this.code){
                    this.$toast.fail("请填写优惠券码");
                    return;
                }
                request.sendPost({
                    url:'/user/center/redeemCoupons',
                    params:{
                        couponId:this.code
                    }
                }).then(res=>{
                    if (res.data.code === 0) {
                        this.$toast.success(res.data.msg);
                    } else {
                        this.$toast.fail(res.data.msg);
                    }
                });

            }
        }
    }
</script>

<style scoped>
    /deep/.van-button--danger{
        background-color: #0CC893;
        border: none;
        color: #fff;
    }
    /deep/.van-tabs__line{
        background-color: #0CC893;
    }
    /deep/.van-tab{
        color: #202020;
    }
    /deep/.van-tab--active{
        color: #0CC893;
    }

    /deep/.van-checkbox{
     display: none;
    }
    /deep/.van-coupon-list__field{
        padding: 10px 16px;
    }
    /deep/.van-coupon{
        background-image: url(../../static/images/coupon_money.png);
        background-size:100% 100%;
        background-repeat: no-repeat;
        background-color:transparent;
        box-shadow:none;
        margin-left: 0;
        margin-right: 8px;
    }
    /deep/.van-coupon__amount{
        color: white;
        font-size: 38px;
        font-weight: bold;
    }
    /deep/.van-coupon p{
        color: white;
        font-size: 12px;
    }
    /deep/.van-coupon__head{
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
        padding-left: 10px;
    }
    /deep/.van-coupon__head p{
        margin-top: 3px;
    }
    /deep/.van-coupon__body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-bottom: 10px;
    }
    /deep/.van-coupon__name{
        font-size: 18px;
        color: #202020;
        font-weight: bold;
    }
    /deep/.van-coupon__body p{
        color: #9E9E9E !important;
        font-size: 12px !important;
    }
    /deep/.van-coupon--disabled .van-coupon__amount span{
        color: white;
    }
    /deep/.van-cell{
        border-bottom: 1px solid #ECECEC;
    }
    /deep/.van-coupon__content{
        padding: 0;
    }
</style>