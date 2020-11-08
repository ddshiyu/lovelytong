<template>
  <div class="img-wrap d-flex jc-center ai-center" @click="$emit('handle-image-view')">
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String
    }
  }
}
</script>

<style lang='scss' scoped>
.img-wrap {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, .8);
  z-index: 100;
  img {
    cursor: url(../../assets/coverAdd.png), auto;
    max-height: 100%;
    max-width: 100%;
  }
}
</style>