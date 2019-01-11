<template>
  <div class="goodDetailFooter">
    <select-rules
      ref="colorSelect"
      :price="price"
      :mainPic="mianUrl"
      @getCartNum="getCartNum"
    ></select-rules>
    <div class="carts">
      <img src="../assets/Cart@2x.png">
      <div v-if="cartNum>=1" class="cartData">
        <div class="Num" v-if="cartNum>=1&&cartNum<=99">{{cartNum}}</div>
        <div class="Num" v-else-if="cartNum>99">99+</div>
      </div>
      <div class="cartNum">购物车
        <!--<a href="javascript:void(0);" @click="add(index)">购物车</a>-->
      </div>
    </div>
    <div class="add">
      <a href="javascript:void(0);" @click="selectColor('2')">加入购物车</a>
    </div>
    <div class="purchase">
      <a href="javascript:void(0);" @click="selectColor('1')">立即购买</a>
    </div>
  </div>
</template>

<script>
import selectRules from '../components/selectRules'
export default {
  data: function () {
    return {
      cartNum: 0,
      price: 99,
      mianUrl: 'image/product/b09c9d14c1594c84868ad8330173aaa9.png'

    }
  },
  components: {
    'select-rules': selectRules
  },
  mounted: function () {

  },
  methods: {
    getCartNum (data) {
      this.cartNum = this.cartNum + data
    },
    selectColor: function (string) {
      this.whichClick = string
      this.$refs.colorSelect.showModal = true
      this.$refs.colorSelect.goodName = 'NIKE 跑鞋'
      this.$refs.colorSelect.postage = '0.00'
      this.$refs.colorSelect.getSpecifications('0911336afe654b0e96c4aabb91a7b9a1')
    }
  },
  name: 'home'
}
</script>

<style scoped>
  .goodDetailFooter {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    background: #f6f4f7;
    z-index: 1000;
    border-top: 0.0625rem /* 1/16 */ solid #ebebeb;
  }
  .carts {
    display: block;
    width: 33.33%;
    height: 3rem;
    text-align: center;
    background: white;
    float: left;
    position: relative;
    padding-top: 0.35rem;
  }
  .carts img {
    padding-top: 1px;
    width: 1.25rem;
    height: 1.125rem;
  }
  .cartData {
    height: 0.75rem;
    min-width: 0.75rem;
    border-radius: 0.375rem;
    background: red;
    color: white;
    text-align: center;
    line-height: 0.75rem;
    display: inline-block;
    position: absolute;
    left: 4.1875rem;
  }
  .Num {
    font-size: 14px;
    -webkit-transform: scale(0.8);
    /*height: 100%;*/
    /*border-radius: 50%;*/
    /*width: 100%;*/
  }
  .cartNum {
    padding-bottom: 8px;
    font-size: 0.8rem;
    color: #333333;
  }
  /*.cartNum a{*/
  /*font-size: 0.1rem;*/
  /*color:#333333;*/
  /*line-height: 22px;*/
  /*}*/
  .add a {
    text-decoration:none;
    display: block;
    width: 33.33%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    background: #3c4657;
    color: white;
    font-size: 0.75rem;
    float: left;
  }
  .purchase a {
    text-decoration:none;
    float: left;
    display: block;
    width: 33.33%;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    color: white;
    font-size:.8rem;
    background: #3fc9a5;
  }
</style>
