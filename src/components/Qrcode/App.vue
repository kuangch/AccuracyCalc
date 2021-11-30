<template>
  <div id="app">
    <div class="preview">
      <div :class="{'fullscreen': fullscreen, 'no-fullscreen': !fullscreen}" ref="wrapper">
        <qrcode-stream
            v-if="show"
            :camera="camera"
            :torch="torchActive"
            @decode="onDecode"
            @init="onInit">
        </qrcode-stream>
      </div>
      <div v-if="inited" class="qr-scanner">
        <div class="box">
          <div class="line"></div>
          <div class="angle"></div>
        </div>
        <div class="txt">扫二维码/条码/小程序码</div>
      </div>
    </div>
  </div>
</template>

<script>

// 引入
import {QrcodeStream} from 'vue-qrcode-reader';

export default {
  // 注册
  components: {QrcodeStream},

  props:{
    options:{
      type: Object,
      required: true
    }
  },

  created() {
    this.fullscreen && this.requestFullscreen();
  },

  data() {
    return {
      fullscreen: true,
      inited: false,
      show: false,
      torchActive: this.options.torch || false,
      camera: this.options.camera || 'off',
    };
  },

  methods: {
    onDecode(result) {
      console.log(result);
      let _this = this;
      if (_this.options.decodeCb && typeof _this.options.decodeCb === 'function'){
        _this.options.decodeCb(result);
      }
    },
    async onInit(promise) {
      console.log(promise)
      let _this = this;
      let initSuccess = false;
      let reason = 'SUCCESS: 打开相机成功'
      try {
        await promise;
        initSuccess = true;
        _this.inited = true;
      } catch (error) {
        if (error.name === 'NotAllowedError') {
          reason = 'ERROR: 您需要授予相机访问权限';
        } else if (error.name === 'NotFoundError') {
          reason = 'ERROR: 这个设备上没有摄像头';
        } else if (error.name === 'NotSupportedError') {
          reason = 'ERROR: 摄像头不支持';
        } else if (error.name === 'NotReadableError') {
          reason = 'ERROR: 相机被占用';
        } else if (error.name === 'OverconstrainedError') {
          reason = 'ERROR: 安装摄像头不合适';
        } else if (error.name === 'StreamApiNotSupportedError') {
          reason = 'ERROR: 此浏览器不支持流API';
        } else if (error.name === 'InsecureContextError') {
          reason = 'ERROR: 所需的安全上下文(HTTPS、本地主机)';
        } else{
          reason = 'ERROR: 未知错误';
        }

        console.log(reason);
        if (_this.options.success && typeof _this.options.success === 'function'){
          _this.options.success(initSuccess, reason)
        }
      }
    },

    open(){
      this.show = true;
      this.camera = 'auto'
    },
    close(){
      this.inited = false;
      this.show = false;
      this.camera = 'off'
    },
    // 打开手电筒
    toggleFlash() {
        switch (this.torchActive) {
            case true:
                this.torchActive = false
                break
            case false:
                this.torchActive = true
                break
        }
        return this.torchActive
    },
    // 相机反转
    switchCamera() {
        switch (this.camera) {
            case 'front':
                this.camera = 'rear'
                console.log(this.camera)
                break
            case 'rear':
                this.camera = 'front'
                console.log(this.camera)
                break
        }
      return this.camera
    },

    requestFullscreen(){
      const elem = this.$refs.wrapper
      if(!elem){
        return
      }

      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
  },
};
</script>
<style lang="scss" scoped>

#app {
  width: 100%;
  height: 100vh;
}

.preview{
  > .no-fullscreen{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  > .fullscreen{
     position: fixed;
     top: 0;
     bottom: 0;
     left: 0;
     right: 0;
   }

  .qr-scanner {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    background-color: #1110;

    .box {
      width: 213px;
      height: 213px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      border: 0.1rem solid rgba(0, 255, 51, 0.2);
    }

    .line {
      height: calc(100% - 2px);
      width: 100%;
      background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
      border-bottom: 1px solid #00ff33;
      transform: translateY(-100%);
      animation: radar-beam 2s infinite alternate;
      animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
      animation-delay: 1.4s;
    }

    .txt {
      width: 100%;
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      text-align: center;
      color: #f9f9f9;
      margin: 0 auto;
      position: absolute;
      top: 70%;
      left: 0;
    }

    .box:after,
    .box:before,
    .angle:after,
    .angle:before {
      content: '';
      display: block;
      position: absolute;
      width: 3vw;
      height: 3vw;

      border: 0.2rem solid transparent;
    }

    .box:after,
    .box:before {
      top: 0;
      border-top-color: #00ff33;
    }

    .angle:after,
    .angle:before {
      bottom: 0;
      border-bottom-color: #00ff33;
    }

    .box:before,
    .angle:before {
      left: 0;
      border-left-color: #00ff33;
    }

    .box:after,
    .angle:after {
      right: 0;
      border-right-color: #00ff33;
    }
  }
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
</style>