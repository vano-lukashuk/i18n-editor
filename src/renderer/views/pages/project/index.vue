<template>
  <div class="my-editor">
    <settings @ShowCodeViews="toggleCodeViews"/>
    <splitpanes class="custom-splitter" style="height: calc(100% - 50px)">
      <pane min-size="20">
        <langs/>
      </pane>
      <pane min-size="20">
        <lang-form/>
      </pane>
      <pane v-if="isShowCodeViews" min-size="20">
        <code-views/>
      </pane>
    </splitpanes>
  </div>
</template>

<script>
import Langs from "@/views/patrials/langs";
import Settings from "@/views/patrials/settings/index";
import LangForm from "@/views/patrials/lang-form";
import Directory from "@/views/patrials/directory";
import CodeViews from "@/views/patrials/code-views";

export default {
  name: "index",
  components: {
    Langs,
    Settings,
    LangForm,
    Directory,
    CodeViews
  },
  data: () => ({
    isShowCodeViews: true
  }),

  methods: {
    toggleCodeViews(e) {
      this.isShowCodeViews = e
    }
  },
  created() {

  },
}
</script>

<style lang="scss">
.my-editor {
  background-color: #cccccc;
  color: #2d2d2d;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}

.splitpanes.custom-splitter {
  .splitpanes__splitter {
    background-color: #c3c3c3;
  }

  &.splitpanes--vertical {
    .splitpanes__splitter {
      width: 5px;
    }

    &.splitpanes--dragging,
    .splitpanes__splitter {
      cursor: col-resize;
    }
  }

  &.splitpanes--horizontal {
    .splitpanes__splitter {
      height: 10px;
    }

    &.splitpanes--dragging,
    .splitpanes__splitter {
      cursor: row-resize;
    }
  }
}
</style>
