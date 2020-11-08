<template>
  <div class="mt-6">
    <div class="container">
      <div class="bg-white tool-item p-5 cur" @click="$router.push('/tools/markdown')">
        <i class="iconfont icon-markdown mr-5"></i> markdown转html
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.tool-item {
  width: 30%;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: transform .5s;
  &:hover {
    transform: translateY(-10px);
  }
}
</style>