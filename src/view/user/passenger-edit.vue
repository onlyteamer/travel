<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" title="乘车人编辑" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" label="乘车人姓名"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="身份证号码" ></van-field>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    同意：因信息填写错误导致出现意外无法理赔由用户自己承担损失；未成年赔付上限依据保监会同意。同意《保险条款》
                </van-checkbox>
            </div>
            <van-button @click="submit" style="margin-top:15px;margin-bottom:17px;width: 100%;height:44px" color="#0CC893" type="default">
                保存
            </van-button>
        </div>
    </div>
</template>
<!--乘车人编辑页-->
<script>
    import {NavBar, Field, Button, Checkbox} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Button.name]: Button,
            [Checkbox.name]: Checkbox
        },
        data(){
            return{
                definition:{
                    checked:''
                }
            }
        },
        methods: {
            submit(){

            },
            onClickLeft() {
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped>
    /deep/ .van-field__label {
        font-weight: bold !important;
        font-size: 14px !important;
        color: #202020 !important;
    }
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    .content {
        background-color: white;
        padding: 15px  15px 0 15px;
        margin-top: 46px;
    }

    .item {
        height: 46px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
    }

    /deep/ .van-checkbox__label {
        font-size: 14px;
        color: #202020;
        line-height: 26px;
    }

    /deep/ .item-label {
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    /deep/ .van-checkbox {
        align-items: flex-start;
    }
</style>