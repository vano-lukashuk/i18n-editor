<template>
  <div class="my-editor">
    <settings @ShowCodeViews="toggleCodeViews"/>
    <splitpanes class="default-theme custom-splitter">
      <pane min-size="20">
        <ul class="key-list">
          <lang-key
            class="f32 key-item"
            v-for="(langKey, key) in langKeys"
            :key="key"
            :payload="langKey"
          ></lang-key>
        </ul>
      </pane>
      <pane min-size="20" class="key-editor">
        <lang-form/>
      </pane>
      <pane v-if="isShowCodeViews" min-size="10" class="code">
        <code-views/>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Directory from "@/views/patrials/directory";
  import LangKey from "@/views/patrials/lang-key";
  import LangForm from "@/views/patrials/lang-form";
  import Settings from "@/views/patrials/settings/index";
  import CodeViews from './views/patrials/code-views'

  import {Splitpanes, Pane} from 'splitpanes'
  import 'splitpanes/dist/splitpanes.css'

  export default {
    name: "app",
    data: () => ({
      isShowCodeViews: true
    }),
    components: {
      Settings,
      LangForm,
      LangKey,
      Directory,
      CodeViews,
      Splitpanes,
      Pane
    },
    computed: {
      ...mapGetters({
        files: 'files/files',
        langKeys: 'files/keys',
      })
    },
    methods:{
      toggleCodeViews(e){
        this.isShowCodeViews = e
      }
    },
    created() {

    },
  }
</script>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
  }

  .my-editor {
    background-color: #cccccc;
    color: #2d2d2d;

    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
  }

  .btn {
    background: #FFFFFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .key-list {
    height: calc(100vh - 50px);
    padding-left: 5px;
    overflow: auto;
  }

  .key-item {
    padding: 4px;
    border-bottom: 1px solid #b9b9b9;
  }

  .prism-editor__textarea:focus {
    outline: none;
  }

  .key-item span {
    cursor: pointer;
  }

  .code p {
    padding-right: 12px;
    padding-left: 12px;
  }

  .key-editor {
    background-color: rgb(236 236 236);
  }

  .splitpanes.custom-splitter .splitpanes__splitter {
    background-color: #c3c3c3;
  }

</style>
