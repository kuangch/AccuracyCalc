<template>
    <div id="app">
      <div v-show="qrcodeShow" class="qrcode">
        <vue-qrcode ref="qrcode" :options="qrcodeOpts"></vue-qrcode>
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
      <div class="header_bg"></div>

      <div class="over">
        <div class="main">
          <div class="item" @click="editPerson()">
            <div class="icon">
              <convenience-image :src-nor="bj" alignment="max-contain"></convenience-image>
            </div>
            <div class="txt">{{personName}}</div>
            <div class="right"></div>
          </div>
          <div class="item" @click="scanQrcode()">
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

      <el-dialog
          title="编辑人员"
          :visible.sync="centerDialogVisible"
          width="80%"
          center>
        <el-input v-model.trim="personName" placeholder="请输入姓名"></el-input>
        <el-input style="margin-top: 20px" v-model.trim="personId" placeholder="请输入身份证"></el-input>
        <el-input style="margin-top: 20px" v-model.trim="personPic"
                  type="textarea"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  placeholder="请输入照片（base64）"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false; changePerson()">确 定</el-button>
        </span>
      </el-dialog>

    </div>
</template>

<script>

    import qrcode from '../../components/Qrcode/App.vue';

    export default {
        name: 'app',
        components: {
          'vue-qrcode': qrcode,
        },

      mounted() {
        let _this = this;
        // 如果支持 popstate 一般移动端都支持了
        if (window.history && window.history.pushState) {
          // 往历史记录里面添加一条新的当前页面的url
          history.pushState(null, null, document.URL);
          // 给 popstate 绑定一个方法 监听页面刷新
          window.addEventListener('popstate', _this.backEvent, false);//false阻止默认事件
        }
      },

      beforeCreate() {
        function getLocalPerson() {
          let localPerson = localStorage.getItem('person');
          try {
            localPerson = JSON.parse(localPerson)
          }catch (e){
            console.log('no local person!')
          }
          return localPerson
        }

        let localPerson = getLocalPerson();
        if(localPerson && localPerson.name && localPerson.id){
          console.log('[get local] person: ' + localPerson.name);
          PERSON.name = localPerson.name;
          PERSON.id = localPerson.id;

          if(localPerson.pic && localPerson.pic.length > 200){
            PERSON.pic = localPerson.pic;
          }
        }
      },
      data() {
          let _this = this;
          return {
            close: require('../../assets/close.png'),
            back: require('../../assets/back.png'),
            more: require('../../assets/more.png'),
            bj: require('../../assets/bj.png'),

            centerDialogVisible: false,

            personName:PERSON.name,
            personId:PERSON.id,
            personPic:PERSON.pic,

            qrcodeShow: false,
            qrcodeOpts: {
              success: _this.onQrSuccess,
              decodeCb: _this.onQrDecode,
            }
          }
      },
      destroyed() {
          window.removeEventListener('popstate', this.backEvent, false);
      },
      methods: {
          scanQrcode: function (){
            this.qrcodeShow = true;
            this.$refs.qrcode.open();
          },
          onQrSuccess: function(success, reason){
            if (!success){
              alert(reason)
            }
            console.log('open qr camera ' + success)
          },
          onQrDecode: function(result){
            this.gotoMain();
            this.$refs.qrcode.close();
          },

          toggleFlash: function (){
            this.$refs.qrcode.toggleFlash()
          },

          gotoMain: function(){
            console.log("goto main page")
            location.href += "main.html"
          },
          backEvent: function (){
            let _this = this;
            if (_this.qrcodeShow){
              history.pushState(null, null, document.URL);
              _this.qrcodeShow = false;
              _this.$refs.qrcode.close();
            }else{
              history.back()
            }
          },
          editPerson: function (){
              this.centerDialogVisible = true;
          },
          changePerson: function (){
            let _this = this;
            let localPerson = {
              name: _this.personName,
              id: _this.personId,
              pic: _this.personPic
            }
            console.log('[save local] person: ' + _this.personName)
            localStorage.setItem('person', JSON.stringify(localPerson));
          }
        }
    }

</script>

<style lang="scss" scoped>
    $header_content_height: 5rem;
    $header_icon_size: 25px;
    $header_height: 40px;

    #app {
        position: relative;
        background: #f7f7f7;
        height: fit-content;
        min-height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;

        > .qrcode{
          z-index: 10000;
          position: absolute;
          width: 100%;
          height: 100vh;
        }
        > .header {
        background: $color_main;
        position: fixed;
        top: 0;
        z-index: 1000;
        padding-top: 25px;
        width: 100%;
        height: $header_height;
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
        > .header_bg{
          $size: 240vw;
          width: $size;
          height: $size;
          border-radius: 50%;
          background-color: $color_main;
          margin-left: -($size - 100vw)/2;
          margin-top: -170vw;
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
              box-shadow: 0 10px 10px -10px #ccc;
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
            margin-top: 30px;
            margin-bottom: 30px;
            text-align: center;
            font-size: 12px;
            color: #c5c5c5;
          }

        }
    }

</style>
