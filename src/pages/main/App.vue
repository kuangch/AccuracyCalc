<template>
    <div id="app">
      <div class="header_bg">
      </div>
      <div class="header">
        <div class="title">
          <div class="back" @click="gotoHome">
            <convenience-image :src-nor="back" alignment='max-contain'></convenience-image>
          </div>
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
          <div class="time">
            <div class="left">
              <convenience-image :src-nor="bj" alignment='max-contain'></convenience-image>
            </div>
            <div class="rt">
              <p class="day">{{realDay}}</p>
              <p class="time" style="margin-top: 5px">{{realTime}}</p>
            </div>
            <div class="right">
              <convenience-image :src-nor="sm" alignment='max-contain'></convenience-image>
            </div>
          </div>
          <div class="person">
            <convenience-image :src-nor="bg"></convenience-image>
            <div class="pic">
              <convenience-image :src-nor="personPic" alignment='max-center' radius="5px"></convenience-image>
            </div>
          </div>
          <div class="result">
            <div class="icon">
              <convenience-image :src-nor="duihao" alignment='max-contain'></convenience-image>
            </div>
            <p class="txt">未见异常</p>
            <div class="info">
              <convenience-image :src-nor="wenhao" alignment='max-contain'></convenience-image>
            </div>
          </div>
          <div class="item">
            <span class="name">姓 名:</span>
            <span class="value">{{personName}}</span>
          </div>
          <div class="item">
            <span class="name">身份证号:</span>
            <span class="value">{{personId}}</span>
          </div>
          <div class="item">
            <span class="name">查询时间:</span>
            <span class="value">{{qtime}}</span>
          </div>
          <div class="item">
            <span class="name">失效时间:</span>
            <span class="value" style="color: #e90009">{{ltime}} 24:00</span>
          </div>
        </div>
        <div class="back" @click="gotoHome()">返回首页</div>
        <div class="info">北京市大数据中心</div>
      </div>

    </div>
</template>

<script>

    export default {
        name: 'app',
        created: function () {

          function getUrlKey(queryName) {
            var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if ( r != null ){
              return decodeURI(r[2]);
            }else{
              return null;
            }
          }

          function getLocalPerson() {
            let localPerson = localStorage.getItem('person');
            try {
              localPerson = JSON.parse(localPerson)
            }catch (e){
              console.log('no local person!')
            }
            return localPerson
          }

          /**************************************时间格式化处理************************************/
          function dateFtt(fmt,date)
          { //author: meizz
            var o = {
              "M+" : date.getMonth()+1,                 //月份
              "d+" : date.getDate(),                    //日
              "h+" : date.getHours(),                   //小时
              "m+" : date.getMinutes(),                 //分
              "s+" : date.getSeconds(),                 //秒
              "q+" : Math.floor((date.getMonth()+3)/3), //季度
              "S"  : date.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
              fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
              if(new RegExp("("+ k +")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
          }

          let _this = this;
          let date = new Date();

          _this.qtime = dateFtt("MM-dd hh:mm", date);
          _this.ltime = dateFtt("MM-dd", date);
          _this.realDay = dateFtt("yyyy年MM月dd日", date);
          _this.realTime = dateFtt("hh:mm:ss", date);

          let localPerson = getLocalPerson();
          if(localPerson && localPerson.name && localPerson.id){
            console.log("[get local] person: " + localPerson.name);
            _this.personName = _this.getSerName(localPerson.name);
            _this.personId = localPerson.id;
            if(localPerson.pic && localPerson.pic.length > 200){
              _this.personPic = 'data:image/jpeg;base64,' + localPerson.pic.replace("data:image/jpeg;base64,", "");
            }else{
              _this.personPic = PERSON.pic
            }
          }

          setInterval(function (){

            let date = new Date();

            _this.realTime = dateFtt("hh:mm:ss", date);


          }, 1000);
        },
        data() {
            let _this = this;
            return {
              qtime: "11-27 09:20",
              ltime: "11-27",
              realDay: "2021年11月26日",
              realTime: "10:20:10",
              wenhao: require('../../assets/wenhao.png'),
              duihao: require('../../assets/duihao.png'),
              close: require('../../assets/close.png'),
              back: require('../../assets/back.png'),
              more: require('../../assets/more.png'),
              bj: require('../../assets/bj.png'),
              sm: require('../../assets/sm.jpeg'),
              bg: require('../../assets/bg.gif'),
              personName: _this.getSerName(PERSON.name),
              personId: PERSON.id,
              personPic: PERSON.pic,
            }
        },
        methods: {
          getSerName: (fullname) =>{
            let len = fullname.length;
            let serStr = ""
            for(let i=0; i < len-1; i++){
              serStr += "*"
            }
            return fullname.substring(0, 1) + serStr
          },

          gotoHome: () => {
            history.back();
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
            > .back{
              width: $header_icon_size;
              height: $header_icon_size;
            }
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
          left: 50%;
          top: 0;
          transform: translate(-50%, 0);

          margin-top: 80px;
          width: 90%;
          z-index: 10;

          > .main{
            position: relative;
            border-radius: 10px;
            text-align: center;
            padding-top: 12px;
            padding-bottom: 25px;
            color: white;

            font-size: 16px;
            background: white;

            > .time{
              width: 100%;
              $icon_size : 50px;
              display: flex;
              align-items: center;
              > .left{
                margin-left: $icon_size * 0.3;
                width: $icon_size * 0.8;
                height: $icon_size * 0.8;
              }
              > .rt{
                flex: 1;
                color: grey;
                font-size: 18px;
                text-align: center;
              }
              > .right{
                margin-left: auto;
                width: $icon_size;
                height: $icon_size;
              }
            }
            > .person{
              position: relative;
              margin: 15px auto;
              $size: 200px;
              width: $size;
              height: $size;

              > .pic{
                position: absolute;
                $size: 173px;
                width: $size;
                height: $size;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
              }
            }
            > .result{
              width: fit-content;
              margin: 0 auto;
              display: flex;
              align-items: center;
              > .icon{
                width: 50px;
                height: 50px;
              }
              > .txt{
                margin-left: 8px;
                display: inline-block;
                font-size: 30px;
                font-weight: bolder;
                color: #1cc709;
              }
              > .info{
                margin-left: 8px;
                display: inline-block;
                width: 25px;
                height: 25px;
              }
            }
            > .item{
              width: 100%;
              display: flex;
              margin-top: 18px;
              > .name{
                margin-left: 15px;
                letter-spacing: 2px;
                word-spacing: 30px;
                float: left;
                color: #b5b5b5;
              }
              > .value{
                margin-left: auto;
                margin-right: 15px;
                color: black;
              }
            }
          }

          > .back{
            margin-top: 20px;
            border-radius: 8px;
            text-align: center;
            padding-top: 12px;
            padding-bottom: 10px;
            color: white;
            width: 100%;
            font-size: 20px;
            background: #1292fe;
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
