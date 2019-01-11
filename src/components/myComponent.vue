<template>
  <div>
    <button v-on:click="show=!show">切换
      <h1 v-show="show">全局组件的学习</h1>
    </button>
  </div>
</template>

<script>
  export default {
    name: 'ball',
    props: ['newslist'],
    data() {
      return {
        liConHeight: 50 // 两行文字的高度
      }
    },
    methods: {
      open(item, i) {
        const liCon = this.$refs.liCon[i]
        var height = liCon.offsetHeight
        if (height === this.liConHeight) { // 展开
          liCon.style.height = 'auto'
          height = liCon.offsetHeight
          liCon.style.height = this.liConHeight + 'px'
          var f = document.body.offsetHeight  // 必加
          liCon.style.height = height + 'px'
        } else { // 收缩
          liCon.style.height = this.liConHeight + 'px'
        }
        if (!item.openFlag) {
          this.newslist[i].openFlag = true
        } else {
          this.newslist[i].openFlag = false
        }
      }
    }
  }
</script>

<style scoped>
  .newslist ul li p {
    font-size: 14px;
    color: #555;
    line-height: 25px;
    height: 50px;
    overflow: hidden;
    transition: height .3s;
  }
</style>
