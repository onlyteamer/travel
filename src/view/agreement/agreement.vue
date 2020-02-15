<template>
    <div style="background-color: #fff">
            <div v-html="title" style="text-align: center;line-height: 45px;font-size: 20px;"></div>
            <div v-html="content" class="content"></div>
    </div>
</template>

<script>
    import request from '../../utils/request'

    export default {
        data() {
            return {
                content: "",
                title: ""
            }
        },
        mounted() {
            this.initData()
        },
        methods: {

            initData() {
                let id = this.$route.query.id;
                let me = this;
                request.axios.get('/common/clause/'+ id)
                    .then(function (response) {
                            if (response.data.code === 0) {
                                me.content = me.decode(response.data.data.context);
                                me.title = response.data.data.title
                            }
                        }
                    ).catch(function (error) {
                    console.log(error);
                });
            },
            decode(html) {
                var temp = document.createElement("div");
                temp.innerHTML = html;
                var output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            }
        }
    }
</script>

<style scoped>
</style>
