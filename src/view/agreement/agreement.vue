<template>
    <div>
        <div>
            <van-nav-bar :fixed="true" title="协议" left-arrow @click-left="onClickLeft"/>
        </div>
    </div>
</template>

<script>
    import {NavBar} from 'vant';

    export default {
        components: {
            [NavBar.name]: NavBar,
        },
        methods: {
            onClickLeft() {
                this.$router.back(-1);
            },
        }
    }
</script>

<style scoped>
    /deep/ .van-nav-bar .van-icon {
        color: #5E5E5E
    }

</style>