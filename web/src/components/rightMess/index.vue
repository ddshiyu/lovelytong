<template>
  <div>
    <item-header :title="title"></item-header>
    <div class="mess-wrapper fs-s" v-for="mess in hotMess" :key="mess.id">
      <div class="mess-item px-3 my-3" :title="mess.title">
        <a :href="mess.url" v-if='$route.path === "/"' target="_blank" rel='noopener noreferrer'>{{mess.title}}</a>
        <router-link :to='`/blog/articleDetail?id=${mess._id}`' v-else>{{mess.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import itemHeader from '@/components/ItemHeader'
export default {
  props: {
    hotMess: Array,
    title: String
  },
  components: {
    itemHeader
  },
};
</script>

<style lang='scss' scoped>
@import '@/styles/mixin.scss';
.mess-title {
  @include border(bottom, #e8e8e8, 1px);
}
.mess-wrapper {
  @include border(bottom, #e8e8e8, 1px);
  .mess-item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    a:hover {
      text-decoration: underline;
    }
  }
}

</style>