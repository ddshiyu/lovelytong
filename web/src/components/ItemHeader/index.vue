<template>
  <div>
    <header class="py-4">
      <h3 class="ml-4">{{title}}</h3>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '标题'
    }
  }
};
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
  header {
    @include border(bottom, #e8e8e8, 1px);
  }
</style>