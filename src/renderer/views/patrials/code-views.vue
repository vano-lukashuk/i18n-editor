<template>
  <div class="code-views">
    <code-views-item
      v-for="(file, key) in files"
      :key="key"
      :payload="file"
      :file-name="key"
      class="code-views-item"
    />
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import CodeViewsItem from "@/views/patrials/code-views-item";

  export default {
    name: "code-views",
    components: {CodeViewsItem},
    data: () => ({}),
    computed: {
      ...mapGetters({
        selectedKey: 'files/selectedKey',
        langKeys: 'files/keys',
      }),
      files() {
        if (!this.selectedKey) return null
        return this.langKeys[this.selectedKey].value
      }
    },
  }
</script>

<style>
  .code-views-item {
    padding-bottom: 26px;
  }
  .code-views-item p{
    word-wrap: break-word;
  }

  .code-views {
    height: calc( 100vh - 50px );
    overflow: auto;
  }
</style>
