<!-- 模态弹窗 -->
<template>
  <transition name="fade">
    <div class="self-modal" v-show='showModal' @click="cancelClick" v-bind:style="styleObj" @click.prevent.stop>
      <!--图片放大功能-->
      <div class="imgMask" v-if="showBigImg" @click.stop="showBigImg=!showBigImg">
        <div class="showImg">
          <mt-swipe :auto="0" :show-indicators="false" :continuous="false" :defaultIndex="num">
            <mt-swipe-item v-for="(item,index) in imgUrls" :key="item.id">
              <div class="testNum"  >{{index+1+'/'+imgUrls.length}}</div>
              <img :src=" $headerImg+imgUrls[index]+$bigImg" class="img"/>
            </mt-swipe-item>
          </mt-swipe>
        </div>
      </div>
      <!-- 自定义内容 -->
      <div  :class="[isIphoneX ? 'isIphoneX-career' : 'career']" @click.prevent.stop>
        <div class="selectGoods" >
          <div class="bgColse"  @click="cancelClick">
            <img class="close" src="../assets/Close@2x.png" >
          </div>
          <div class="picture" @click="bigImg(0)">

            <img class="headerImg" v-if="selectedGoods.pictures===undefined"  v-bind:src="$headerImg+mainPic+$smallImg">
            <img class="headerImg" v-else  v-bind:src="$headerImg+selectedGoods.pictures[0]+$smallImg">
          </div>
          <div class="priceAndRules" v-if="selectedGoods.pictures===undefined">
            <div class="price">¥ {{price}}</div>
            <div class="stock">库存{{stock}}件</div>
            <div class="selected">{{expressSelected}}</div>
          </div>
          <div class="priceAndRules" v-else>
            <div class="price">¥ {{selectedGoods.price}}</div>
            <div class="stock">库存{{selectedGoods.stock}}件</div>
            <div class="selected">{{expressSelected}}</div>
          </div>
        </div>
        <div class="selectGoods">
          <div class="selColor">
            <div class="selected">颜色分类</div>
            <div v-for="(item,index) in selectColors" :key="index"  class="selColor">
              <div class="colorSel"  @click="isSelectCol(index,allColors[index].color)" v-if="allColors[index].isHasColor&&!item.isSelectColor">{{allColors[index].color}}</div>
              <div class="selectedColor" v-else-if="allColors[index].isHasColor&&item.isSelectColor" >{{allColors[index].color}}</div>
              <div class="noColorRules" v-else >{{allColors[index].color}}</div>
            </div>
          </div>
          <div class="selRules">
            <div class="selected">选择尺码</div>
            <div v-for="(item,index) in selectRules" :key="index" class="selColor">
              <div class="colorRules" @click="isSelectSize(index,allRules[index].rules)" v-if="allRules[index].isHasRule&&!item.isSelectRule">{{allRules[index].rules}}</div>
              <div class="selectedColor"  v-else-if="allRules[index].isHasRule&&item.isSelectRule">{{allRules[index].rules}}</div>
              <!--<div class="noColorRules"  v-if="!allRules[index].isHasRule">{{allRules[index].rules}}</div>-->
              <div class="noColorRules" v-else >{{allRules[index].rules}}</div>
            </div>
          </div>
        </div>
        <div class="num">
          <div class="buyNum">购买数量</div>
          <div class="selNum">
            <img src="../assets/Reduce@2x.png" v-if="buyNum>1" @click="minus">
            <img src="../assets/Reduce@2x.png" v-else>
            <div class="dataNum">{{buyNum}}</div>
            <img src="../assets/Add@2x.png" @click="add">
          </div>
        </div>
        <div class="bottom"  @click="sureClick">完成</div>
        <!--<div v-else class="bottom">-->
        <!--<div></div>-->
        <!--</div>-->
      </div>
      <!--<slot></slot>-->
    </div>
  </transition>
</template>
<script>
  import {Toast} from 'mint-ui'
  var goodId
  function minSort (Arr) {
    var min
    for (var i = 0; i < Arr.length; i++) {
      for (var j = i; j < Arr.length; j++) {
        if (Arr[i].rules > Arr[j].rules) {
          min = Arr[j]
          Arr[j] = Arr[i]
          Arr[i] = min
        }
      }
    }
    return Arr
  }
  export default {
    name: 'selectRules',
    data () {
      return {
        isSelectColor: '',
        isSelectRule: '',
        selectedGoods: {},
        selectedGoodsId: '',
        imgUrls: [], // 显示图片
        showBigImg: false,
        isSelColor: false,
        showModal: false,
        stock: 300,
        allColors: [],
        selectedCartGoods: false,
        expressSelected: '选择 颜色分类 尺码',
        hasColors: [],
        hasRules: [],
        allRules: [],
        selectColors: [],
        selectRules: [],
        buyNum: 1,
        hasSelectedColor: '',
        hasSelectedSize: '',
        colorsAndRules: [],
        postage: 0, // 邮费
        goodName: '',// 商品名称,
        isIphoneX:false
      }
    },
    props: {
      styleObj: { // 用于承接样式类
        type: Object,
        default: function () {
          return {
            position: 'fixed',
            bottom: 0,
            top: 0,
            left: 0,
            width: '100%',
            background: 'rgba(113,111,111,0.5)'
          }
        }
      },
      price: Number,
      mainPic: String,
      whichBtn: String
    },
    methods: {
      // 产品参数
      getSpecifications (id) {
        console.log('已选中' + this.isSelectColor)
        goodId = id
        this.$postHttp(this.$shopUrl + '/api/product/specifications?id=' + id)
          .then((response) => {
            this.colorsAndRules = response.result
            // 重新赋值
            this.getRightData()
          })
      },
      getRightData () {
        var _this = this
        // 点击方法图片组
        this.imgUrls.push(this.mainPic)

        var allColors = []
        var allRules = []
        for (var i = 0; i < _this.colorsAndRules.length; i++) {
          allColors.push(_this.colorsAndRules[i].color)
          allRules.push(_this.colorsAndRules[i].size)
        }

        // 每个颜色对应尺寸设置是否有库存的标签
        var newAllRules = []
        for (var i = 0; i < Array.from(new Set(allRules)).length; i++) {
          var selColor = {
            'rules': Array.from(new Set(allRules))[i],
            'isHasRule': false
          }
          newAllRules.push(selColor)
        }
        console.log('这是' + JSON.stringify(newAllRules))

        for (var i = 0; i < newAllRules.length; i++) {
          for (var j = 0; j < _this.colorsAndRules.length; j++) {
            if (_this.colorsAndRules[j].size === newAllRules[i].rules && _this.colorsAndRules[j].stock > 0) {
              console.log('相同的尺寸' + newAllRules[i].rules + '库存' + _this.colorsAndRules[j].stock)
              // if (_this.colorsAndRules[j].stock > 0) {
              newAllRules[i].isHasRule = true
              break
              // }
            }
          }
        }

        _this.allRules = minSort(newAllRules)
        // 每个尺寸对应的颜色设置是否有库存标签
        var newAllColors = []
        for (var i = 0; i < Array.from(new Set(allColors)).length; i++) {
          var selRule = {
            'color': Array.from(new Set(allColors))[i],
            'isHasColor': false
          }
          newAllColors.push(selRule)
        }
        for (var i = 0; i < newAllColors.length; i++) {
          for (var j = 0; j < _this.colorsAndRules.length; j++) {
            if (_this.colorsAndRules[j].color === newAllColors[i].color) {
              if (_this.colorsAndRules[j].stock > 0) {
                newAllColors[i].isHasColor = true
                break
              }
            }
          }
        }
        _this.allColors = newAllColors

        var selColors = []
        var selRules = []
        // 获取每个颜色对应的尺寸
        for (var i = 0; i < _this.allColors.length; i++) {
          var allRules = []
          for (var j = 0; j < _this.colorsAndRules.length; j++) {
            if (_this.allColors[i].color === _this.colorsAndRules[j].color) {
              allRules.push(_this.colorsAndRules[j])
            }
          }
          var colorAndRule
          if (_this.isSelectColor != '' && _this.allColors[i].color === _this.isSelectColor) {
            colorAndRule = {
              'isSelectColor': true
            }
          } else {
            colorAndRule = {
              'isSelectColor': false
            }
          }
          var eveColor = _this.allColors[i].color
          colorAndRule[eveColor] = allRules
          selColors.push(colorAndRule)
        }

        // allColors
        for (var i = 0; i < _this.allRules.length; i++) {
          var allColors = []
          for (var j = 0; j < _this.colorsAndRules.length; j++) {
            if (_this.allRules[i].rules === _this.colorsAndRules[j].size) {
              allColors.push(_this.colorsAndRules[j])
            }
          }
          var eveRule = _this.allRules[i].rules
          var colorAndRule
          if (_this.isSelectRule != '' && _this.allRules[i].rules === _this.isSelectRule) {
            colorAndRule = {
              'isSelectRule': true
            }
          } else {
            colorAndRule = {
              'isSelectRule': false
            }
          }
          colorAndRule[eveRule] = allColors
          selRules.push(colorAndRule)
        }
        _this.selectRules = selRules
        _this.selectColors = selColors
      },

      // 确定
      sureClick () {
        if (this.isSelectColor === '') {
          Toast('请选择颜色')
          return
        }
        if (this.isSelectRule === '') {
          Toast('请选择尺码')
          return
        }
        var _this = this

        // this.showModal = false
        this.cancelClick()
        // 保存选中商品缓存
        var goodsDetail = {
          goosName: _this.goodName,
          postage: _this.postage,
          id: goodId,
          goods: _this.selectedGoods,
          nums: _this.buyNum
        }
        var goodsList = []
        if (this.whichBtn === '1') {
          goodsList.push(goodsDetail)
          localStorage.setItem('goods', JSON.stringify(goodsList))
          this.$router.push({
            path: 'confirmationOrder',
            query: {
              page: 'buy'
            }
          })
        } else if (this.whichBtn === '2') {
          goodsDetail['selectedCartGoods'] = false

          this.$emit('getCartNum', this.buyNum)
          this.addCars({item: goodsDetail, id: _this.selectedGoodsId})
        } else if (this.whichBtn === '3') {
          goodsDetail['selectedCartGoods'] = _this.selectedCartGoods
          //加入购物车
        }
        return new Promise(function (resolve) {
          resolve('sure')
        }, function (reject) {
        })
      },
      // 取消
      cancelClick () {
        console.log('取消')
        this.$emit('colseAlter')
        this.showModal = false
        return new Promise(function (resolve) {
          resolve('cancel')
        }, function (reject) {
        })
      },
      // 点击选中颜色
      isSelectCol (index, color) {
        var _this = this
        var hasRules = []
        for (var i = 0; i < _this.selectColors.length; i++) {
          if (index === i) {
            _this.selectColors[i].isSelectColor = true
            for (var key in _this.selectColors[i]) {
              if (key === color) {
                hasRules = _this.selectColors[i][key]
                _this.isSelectColor = color
              }
            }
          } else {
            _this.selectColors[i].isSelectColor = false
          }
        }
        // 所有尺寸全为空
        for (var j = 0; j < _this.allRules.length; j++) {
          _this.allRules[j].isHasRule = false
        }
        // 库存中存在的致为可选
        for (var i = 0; i < hasRules.length; i++) {
          for (var j = 0; j < _this.allRules.length; j++) {
            if (_this.allRules[j].rules === hasRules[i].size && hasRules[i].stock > 0) {
              _this.allRules[j].isHasRule = true
            }
          }
          if (_this.isSelectRule !== '') {
            if (hasRules[i].size === _this.isSelectRule) {
              _this.selectedGoods = hasRules[i]
              _this.imgUrls = hasRules[i].pictures
            }
          }
        }
        if (_this.isSelectRule === '') {
          _this.expressSelected = '请选择尺码'
        } else {
          _this.expressSelected = '已选' + ' ' + _this.isSelectColor + ' 尺码' + _this.isSelectRule
        }
      },
      // 选择尺寸
      isSelectSize (index, rule) {
        var _this = this
        var hasColors = []
        for (var i = 0; i < _this.selectRules.length; i++) {
          if (index === i) {
            _this.selectRules[i].isSelectRule = true
            for (var key in _this.selectRules[i]) {
              if (key === rule) {
                hasColors = _this.selectRules[i][key]
                _this.isSelectRule = rule
              }
            }
          } else {
            _this.selectRules[i].isSelectRule = false
          }
        }
        // 所有尺寸全为空
        for (var j = 0; j < _this.allColors.length; j++) {
          _this.allColors[j].isHasColor = false
        }
        // 库存中存在的致为可选
        for (var i = 0; i < hasColors.length; i++) {
          for (var j = 0; j < _this.allColors.length; j++) {
            if (_this.allColors[j].color === hasColors[i].color && hasColors[i].stock > 0) {
              _this.allColors[j].isHasColor = true
            }
          }

          if (_this.isSelectColor !== '') {
            if (hasColors[i].color === _this.isSelectColor) {
              _this.selectedGoods = hasColors[i]
              _this.imgUrls = hasColors[i].pictures
            }
          }
        }
        console.log(_this.isSelectColor)
        if (_this.isSelectColor === '') {
          _this.expressSelected = '请选择颜色'
        } else {
          _this.expressSelected = '已选' + ' ' + _this.isSelectColor + ' 尺码' + _this.isSelectRule
        }
      },
      // 增添数辆
      add () {
        if (this.isSelectColor === '') {
          Toast('请选择颜色')
          return
        }
        if (this.isSelectRule === '') {
          Toast('请选择尺码')
          return
        }
        if (this.buyNum < this.selectedGoods.stock) {
          this.buyNum++
        } else {
          Toast('库存不足')
        }
      },
      // 减少购买数辆
      minus () {
        this.buyNum--
      },
      // 看大图
      bigImg (index) {
        this.showBigImg = true
        this.num = index
      }
    }
  }
</script>
<style scoped>
  .self-modal{
    z-index: 3006;
  }
  .isIphoneX-career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
    padding-bottom: 34px;
  }
  .career{
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    position: fixed;
    width: 100%;
    bottom: 0px;
    background: white !important;
  }
  .selectGoods{
    margin: 1rem;
    padding-bottom: 10px;
    border-bottom:1px solid #ebebeb ;
    text-align: left;
  }
  .bgColse{
    margin-top: -1rem;
    margin-right: -1rem;
    height: 4rem;
    text-align: center;
    align-items: center;
    width: 4rem;
    float: right;
  }
  .close{
    margin-top: 1rem;
    margin-right: -0.5rem;
    width: .59375rem;
    height: .5925rem;

  }
  .picture{
    width: 5.3125rem;
    height: 5.3125rem;
    display: inline-block;
  }
  .headerImg{
    width: 5.3125rem;
    height: 5.3125rem;

  }
  .imgMask{
    position: absolute;
    height: 100%;
    width:100%;
    top:0px;
    left:0;
    z-index: 100;
    background:rgba(0,0,0,1);
  }
  .testNum{
    position: absolute;
    width: 100%;
    padding-top: 2rem;
    color: white;
    text-align: center;
    font-size: .875rem;
    font-weight: bold;
  }
  .showImg{
    height: 100%;
    width: 100%;
    position: absolute;
    align-items: center;
    left: 0px;
    top:0;
  }
  .img{
    object-fit: scale-down;
    height: auto;
    width: 100%;
  }
  .priceAndRules{
    text-align: left;
    display: inline-block;
  }
  .price{
    color: #3fc9a5;
    font-size:.875rem;
  }
  .stock{
    color: #999999;
    font-size: .75rem;
  }
  .selected{
    color: #333333;
    font-size:.875rem;
  }
  .selColor .selected{
    padding-top: 5px;
  }
  .selRules .selected{
    padding-top: 10px;
  }
  .selColor{
    display:inline-block;
  }
  .colorSel{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #333333;
    background: white;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .selectedColor{
    margin: .3125rem;
    border-radius:1.5625rem;
    color: white;
    background: #3fc9a5;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .colorRules{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #333333;
    background: white;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .noColorRules{
    margin: .3125rem;
    border:1px solid #d6d6d6;
    border-radius:1.5625rem;
    color: #c4c4c4;
    background:#f8f8f8 ;
    font-size:.75rem;
    height: 2.1875rem;
    width: 4.3125rem;
    text-align: center;
    line-height: 2.1875rem;
    display: inline-block;
  }
  .num{
    text-align: left;
    height: 3.125rem;
    padding: 0px 15px;
    display: flex;
    justify-content: space-between;
  }
  .selNum{
    margin-top: .3125rem;
    height: 2.5rem;
  }
  .num img{
    padding-top: 0px;
    width: 1.375rem;
    height: 1.375rem;
    float: left;
  }
  .dataNum{
    margin-top: 0px;
    padding: 0px 10px;
    display: inline-block;
    color: #3fc9a5;
    height: 1.375rem;
    line-height: 1.375rem;
    font-size: .875rem;
    float: left;
  }

  .buyNum{
    line-height: 2.5rem;
    display: inline-block;
  }
  /*.isIphoneX-bottom{*/
  /*position: absolute;*/
  /*width: 100%;*/
  /*font-size: 1rem;*/
  /*text-align: center;*/
  /*color: white;*/
  /*background: #3fc9a5;*/
  /*line-height: 3.5875rem;*/
  /*height: 4.5875rem;*/
  /*bottom: 0px;*/
  /*}*/
  .bottom{
    width: 100%;
    font-size: 1rem;
    text-align: center;
    color: white;
    background: #3fc9a5;
    line-height:2.5rem;
    height: 2.5rem;
  }
</style>

