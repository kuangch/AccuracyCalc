<template>
    <div v-if="isShow" @click="hide">
        <p>离线模式</p>
    </div>
</template>

<script>

    export default {
        name: 'OfflineInfo',
        data(){
            return{
                isShow: !navigator.onLine
            }
        },

        mounted(){
            let _this = this
            _this.$onlineCb = function () {
                _this.hide();
            }
            _this.$offlineCb = function () {
                _this.show();
            }
            window.addEventListener("online",_this.$onlineCb)
            window.addEventListener("offline",_this.$offlineCb)
        },

        beforeDestroy(){
            let _this = this
            window.removeEventListener("online", _this.$onlineCb)
            window.removeEventListener("offline", _this.$offlineCb)
        },

        methods:{

            show(){
               this.isShow = true
            },
            hide(){
                this.isShow = false
            }
        }
    }

</script>

<style scoped lang="scss">
    div{
        cursor: pointer;
        right: 0;
        position: absolute;
        color: white;
        background: #ebc85c;
        padding: 3px 10px 5px 10px;
    }
</style>