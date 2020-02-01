<template>
    <div class="content">
        <p style="color: #202020;font-size: 16px;font-weight: bold">关于乘客违约进行赔偿的说明：</p>
        <span>1.车主未确认的订单，乘客可以随时无责取消。</span><br>
        <span>2.车主已经确认的订单，如果因乘客原因取消订单，乘客需要支付一定的赔偿给车主。</span><br>
        <p style="color: #202020;font-size: 16px;font-weight: bold">赔偿费用如下：</p>
        <span>1.距离发车时间超过60分钟，0元/位。</span><br>
        <span>2.距离发车不足60分钟，10元/位。</span><br>
        <div style="background-color: #F6F6F6;border-radius: 6px;padding: 10px;line-height: 25px;margin-top: 10px">
        <div style="display:flex;align-items: center;justify-content: flex-start">
            <i class="van-icon van-icon-warning-o van-cell__left-icon" style="color: red"/>
            <span style="margin-left: 3px">以下情况，乘客可无责取消，无需赔偿：</span>
        </div>
        1. 车主未确认订单。<br>
        2. 车主确认订单后3分钟内。<br>
        3. 距离发车超过60分钟（无论是否确认订单）。<br>
        4. 因车主迟到、取消行程、电话无法接通、等车主原因导致无法继续拼车。<br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "compensationRule"
    }
</script>

<style scoped>
    .content {
        padding: 15px;
        background-color: white;
    }
</style>