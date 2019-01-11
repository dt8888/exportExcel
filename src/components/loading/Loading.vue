
  <template>
    <transition name="mint-indicator">
      <div class="mint-indicator" v-show="visible">
        <div class="mint-indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
          <div class="loader">
            <div class="loader-inner ball-spin-fade-loader">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
          <!--<spinner class="mint-indicator-spin" :type="convertedSpinnerType" :size="32"></spinner>-->
          <span class="mint-indicator-text" v-show="text">{{ text }}</span>
        </div>
        <div class="mint-indicator-mask" @touchmove.stop.prevent></div>
      </div>
    </transition>
  </template>
<script>
  export default {
    name: 'Loading',
    data(){
      return{
        visible:true,
        text:'加载中'
      }
    }
  }
</script>

<style scoped>
  .mint-indicator {
     -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
  }
  .mint-indicator-wrapper {
    top: 50%;
    left: 50%;
    position: fixed;
     -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.4);
    color: lightgray;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid lightgray;
  }
  .mint-indicator-text {
    display: block;
    color: white;
    text-align: center;
    font-size: 16px;
  }
  .mint-indicator-spin {
    display: inline-block;
    text-align: center;
  }
  .mint-indicator-mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: transparent;
  }
  .mint-indicator-enter, .mint-indicator-leave-active {
    opacity: 0;
  }
  .loader{
    width:30px;
    height: 30px;
    margin-left: 20px;
  }
  @keyframes ball-spin-fade-loader {
    50% {
      opacity: 0.3;
      -webkit-transform: scale(0.4);
      transform: scale(0.4); }

    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1); } }

  .ball-spin-fade-loader {
    position: relative; }
  .ball-spin-fade-loader > div:nth-child(1) {
    top: 10px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
    animation: ball-spin-fade-loader 1s 0s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(2) {
    top: 7.04545px;
    left: 7.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
    animation: ball-spin-fade-loader 1s 0.12s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 10px;
    -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
    animation: ball-spin-fade-loader 1s 0.24s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(4) {
    top: -7.04545px;
    left: 7.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
    animation: ball-spin-fade-loader 1s 0.36s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(5) {
    top: -10px;
    left: 0;
    -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
    animation: ball-spin-fade-loader 1s 0.48s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(6) {
    top: -7.04545px;
    left: -7.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
    animation: ball-spin-fade-loader 1s 0.6s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -10px;
    -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
    animation: ball-spin-fade-loader 1s 0.72s infinite linear; }
  .ball-spin-fade-loader > div:nth-child(8) {
    top: 7.04545px;
    left: -7.04545px;
    -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
    animation: ball-spin-fade-loader 1s 0.84s infinite linear; }
  .ball-spin-fade-loader > div {
    background-color: white;
    width: 7px;
    height: 7px;
    border-radius: 100%;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute; }
</style>
