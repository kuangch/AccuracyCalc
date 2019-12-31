<template>
    <div id="app">
        <header>
            <img src="../../assets/logo.png"/>
        </header>
        <div class="main">
            <div class="content">
                <hello-world/>
            </div>
        </div>

    </div>
</template>

<script>

    const packageJson = require('../../../package')

    import HelloWorld from '../../components/HelloWorld.vue'

    export default {
        name: 'app',
        components: {
            HelloWorld
        },
        mounted: function () {
        },
        data() {
            return {
                packageJson,
            }
        },
        methods: {}
    }

</script>

<style lang="scss" scoped>
    $header_content_height: 2rem;

    #app {
        min-height: 100vh;

        header {
            height: $header_content_height * 1.5;
            background: $color_main;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            color: $color_main_txt;

            img {
                margin-left: .8vw;
                height: $header_content_height;
            }
            .app-name {
                margin-left: 1vw;
                font-size: calc(1rem + 6px);
                font-weight: bold;
            }

        }
        > .main {

        }
    }

</style>
