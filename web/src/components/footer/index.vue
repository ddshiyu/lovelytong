<template>
  <div class="mt-6 bg-white">
    <div class="container phone-footer py-6 d-flex jc-between fs-xs">
      <div>
        <img height='64' src="@/assets/logo5.jpg" alt="">
        <div class="text-footer">
          <p class="mt-4 mb-1">记录生活学习日常，有机会聆听大家的声音</p>
          <p>ICP主体备案号：<a href="http://beian.miit.gov.cn/">粤ICP备20061533</a></p>
        </div>
      </div>
      <div class="text-footer mt-5 right-wrap">
        <p>如果本站可能会侵害到您的利益，请联系我们删除处理，</p>
        <p class='my-1'>邮箱ddshiyu@163.com</p>
        <p class="my-1">Copyright © 2020 还没想好名字 </p>
        <div class="wechart-wrap">
          <div class="cur wechart">
            <img width='60' src="@/assets/wechat.png" alt="">
          </div>
          <div class="wechart-img">
            <img width='120' src="@/assets/WechatIMG2.jpeg" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.right-wrap {
  position: relative;
}
.wechart-img{
  display: none;
  position: absolute;
  top: 20px;
  left: 70px;
}
.wechart-wrap:hover {
  .wechart-img {
      display: block;
    }
}
</style>