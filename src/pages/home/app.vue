<template>
    <div id="app">
      <div class="header_bg">
      </div>
      <div class="header">
        <div class="title">
          <div class="jkb">北京健康宝</div>
          <div class="right">
            <div class="more">
              <convenience-image :src-nor="more" alignment='max-contain'></convenience-image>
            </div>
            <div class="divider"></div>
            <div class="close">
              <convenience-image :src-nor="close" alignment='max-contain'></convenience-image>
            </div>
          </div>
        </div>
      </div>
      <div class="over">
        <div class="main">
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="bj" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">{{personName}}</div>
            <div class="right"></div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/brxx.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">本人信息扫码登记</div>
            <div class="right"></div>
          </div>
          <div class="item" @click="gotoMain()">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/brkjm.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">本人健康码自查询</div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/lyjk.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">老幼健康码助查询</div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/trjk.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">他人健康码代查询</div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/hsym.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">核酸疫苗服务查询</div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/dfjl.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">到访人信息登记薄</div>
          </div>
          <div class="item">
            <div class="icon">
              <convenience-image :src-nor="require('../../assets/jxxz.jpg')" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">京 心 相 助</div>
          </div>
        </div>
        <div class="info">北京市大数据中心</div>
      </div>

    </div>
</template>

<script>

    export default {
        name: 'app',
        created: function () {

          function getUrlKey(name) {
            return location.href.substring(location.href.lastIndexOf('/') + 1)
          }

          let _this = this;

          let name = getUrlKey("name");
          if(PERSON[name]){
            console.log(PERSON[name]);
            _this.personName = _this.getSerName(PERSON[name].name);
          }
        },
        data() {
            let _this = this;
            return {
              close: require('../../assets/close.png'),
              back: require('../../assets/back.png'),
              more: require('../../assets/more.png'),
              bj: require('../../assets/bj.png'),
              personName:PERSON.name,
            }
        },
        methods: {
          gotoMain: ()=>{
            console.log("goto main page")
            location.href = "/JKB"
          }
        }
    }

</script>

<style lang="scss" scoped>
    $header_content_height: 5rem;
    $header_icon_size: 25px;

    #app {
        position: relative;
        background: #f7f7f7;
        min-height: 100vh;
        overflow: hidden;

        > .header_bg{
          $size: 240vw;
          width: $size;
          height: $size;
          border-radius: 50%;
          background-color: $color_main;
          margin-left: -($size - 100vw)/2;
          margin-top: -193vw;
        }
        > .header {
          position: absolute;
          top: 0;
          padding-top: 25px;
          width: 100%;
          > .title{
            padding-left: 20px;
            padding-right: 10px;
            display: flex;
            align-items: center;
            > .jkb{
              color: white;
              font-size: 20px;
            }
            > .right{
              height: auto;
              background: #00000050;
              margin-left: auto;
              border-radius: 50px;
              border: 0.5px solid #ffffff50;
              padding: 3px 10px;
              display: flex;
              align-items:center;

              > .more{
                display: inline-block;
                width: $header_icon_size;
                height: $header_icon_size;
              }
              > .divider{
                margin-left: 10px;
                margin-right: 10px;
                display: inline-block;
                background: #ffffff50;
                width: 0.5px;
                height: $header_icon_size - 8px;
              }
              > .close{
                display: inline-block;
                width: $header_icon_size;
                height: $header_icon_size;
              }
            }
          }


        }
        > .over {
          position: absolute;
          top: 0;
          margin-top: 80px;
          width: 100%;
          z-index: 10;

          > .main{
            width: 100%;
            position: relative;
            border-radius: 10px;
            text-align: center;
            > .item{
              margin-left: auto;
              margin-right: auto;
              width: 90%;
              height: 70px;
              display: flex;
              align-items: center;
              margin-top: 18px;
              background: white;
              border-radius: 10px;
              > .icon{
                $size : 40px;
                margin-left: 20px;
                float: left;
                width: $size;
                height: $size;
              }
              > .txt{
                word-spacing: 22px;
                margin-left: 20px;
                color: black;
                font-size: 20px;
              }
              > .right{
                margin-left: auto;
                margin-right: 10px;
                $size : 20px;
                width: $size;
                height: $size;
              }
            }
          }

          > .info{
            margin-top: 20px;
            text-align: center;
              height: 12px;
              color: #c5c5c5;
          }

        }
    }

</style>
