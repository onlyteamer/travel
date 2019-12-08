<template>
    <div>
        <div>
            <van-nav-bar title="取消行程" :fixed="true" left-arrow @click-left="onClickLeft"/>
        </div>
        <div class="content">
        </div>
    </div>
</template>

<script>
    import {NavBar, Button, RadioGroup, Radio} from 'vant';
    export default {
        components: {
            [NavBar.name]: NavBar,
            [Button.name]: Button,
            [RadioGroup.name]: RadioGroup,
            [Radio.name]: Radio,
            [Image.name]: Image,
        },
        data() {
            return {
                radio: ''
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
            submit(){

            }
        }
    }
</script>

<style scoped>

</style>