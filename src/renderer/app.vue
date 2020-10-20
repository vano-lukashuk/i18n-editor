<template>
  <div>
    <settings/>
    <div class="row">
      <!--<ul>
        <directory
          v-for="(file, key) in files"
          :key="key"
          :payload="file"
        />
      </ul>-->
      <div class="col-3">
        <ul>
          <lang-key
            class="f32"
            v-for="(langKey, key) in langKeys"
            :key="key"
            :payload="langKey"
          ></lang-key>
        </ul>
      </div>
      <div class="col-3" style="background-color: #999999">
        <lang-form/>
      </div>
      <div class="col-6" style="background-color: blueviolet">
        <code-views/>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Directory from "@/views/patrials/directory";
import LangKey from "@/views/patrials/lang-key";
import LangForm from "@/views/patrials/lang-form";
import Settings from "@/views/patrials/settings/index";
import CodeViews from './views/patrials/code-views'

export default {
  name: "app",
  components: {
    Settings,
    LangForm,
    LangKey,
    Directory,
    CodeViews
  },
  computed: {
    ...mapGetters({
      files: 'files/files',
      langKeys: 'files/keys',
    })
  },
  created() {

  },
}
</script>

<style lang="css">
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}

.row {
  display: flex;
}

.col-3 {
  width: 25%;
}

.col-6 {
  width: 50%;
}

</style>
