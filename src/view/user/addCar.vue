<template>
    <div>
        <div>
            <van-nav-bar title="车辆信息添加" fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="item">
                <van-field label-class="item-label" label="车牌号" placeholder="例如:A123456"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆品牌" placeholder="例如:大众"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆型号" placeholder="例如:速腾"></van-field>
            </div>
            <div class="item">
                <van-field label-class="item-label" label="车辆颜色" placeholder="例如:白色"></van-field>
            </div>
            <div class="item">
                <span class="item-label" style="margin-right: 20px">是否有商业保险</span>
                <van-radio-group v-model="radio">
                    <van-radio name="是" checked-color="#0CC893">是</van-radio>
                    <van-radio name="否" checked-color="#0CC893" style="margin-left:48px ">否</van-radio>
                </van-radio-group>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <van-uploader :max-count=1 v-model="imgURL" @after-read="uploadCallback()" >
                        <van-image round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传车辆行驶证</div>
                    </van-uploader>
                </div>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <van-uploader :max-count=1 v-model="imgURL2" @after-read="uploadCallback2()" >
                        <van-image round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传车辆正面照片</div>
                    </van-uploader>
                </div>
            </div>
            <div class="upload-item">
                <div class="upload-wrap">
                    <van-uploader :max-count=1 v-model="imgURL3" @after-read="uploadCallback3()" >
                        <van-image round width="54px" height="54px" :src="uploadIcon"/>
                        <div style="color: #9E9E9E;font-size: 14px;margin-top: 3px">上传保险单照片</div>
                    </van-uploader>
                </div>
            </div>
            <div>
                <van-checkbox style="margin-top: 20px" v-model="definition.checked" checked-color="#0CC893">
                    以上信息承诺真实有效，如果填写有虚假信息，车主承担全部责任。
                </van-checkbox>
            </div>
            <van-button @click="submit" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                添加
            </van-button>
            <van-button @click="edit" v-if="id" style="margin-top:15px;width: 100%;height:44px" color="#0CC893" type="default">
                修改
            </van-button>
            <van-button @click="del" v-if="id" style="margin-top:15px;width: 100%;height:44px" color="#9E9E9E" type="default">
                删除
            </van-button>
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, Field, Uploader, Image, RadioGroup, Radio, Checkbox} from 'vant';
    import uploadIcon from '../../static/images/upload.png';

    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [Image.name]: Image,
            [Field.name]: Field,
            [Uploader.name]: Uploader,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Checkbox.name]: Checkbox
        },
        data() {
            return {
                id:false,
                imgURL: [],
                imgURL2: [],
                imgURL3: [],
                radio: '',
                uploadIcon: uploadIcon,
                definition: {
                    checked: true
                }
            }
        },
        methods: {
            edit(){

            },
            del(){

            },
            onClickLeft() {
                this.$router.back(-1);
            },
            uploadCallback() {

            },
            uploadCallback2() {

            },
            uploadCallback3() {

            },
            submit() {

            }
        }
    }
</script>

<style scoped>
    /deep/ .van-uploader__input-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    /deep/ .van-radio-group {
        display: flex;
    }

    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

    /deep/ .van-uploader__preview-image {
        width: 100%;
        height: 110px;
    }

    /deep/ .van-checkbox {
        align-items: flex-start;
    }

    .upload-wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 110px;
        flex: 1;
        border: 1px #CFCFCF dashed;
    }

    .upload-item {
        height: 126px;
        display: flex;
        border-bottom: 1px solid #ECECEC;
        padding-top: 16px;
    }

    .content {
        background-color: white;
        padding: 0 15px;
        margin-top: 46px;
    }

    /deep/ .van-checkbox__label {
        font-size: 14px;
        color: #202020;
    }

    /deep/ .item-label {
        font-size: 14px !important;
        color: #202020 !important;
    }

    /deep/ .van-cell {
        padding-left: 0 !important;
    }

    .item {
        height: 51px;
        border-bottom: 1px solid #ECECEC;
        display: flex;
        align-items: center;
    }
</style>