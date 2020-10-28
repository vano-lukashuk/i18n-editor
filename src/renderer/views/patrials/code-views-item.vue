<template>
  <div>
    <hr>
    <p v-text="fileName"></p>
    <p>Indexes: <span v-text="payload"></span></p>
    <codemirror
      v-model="Code"
      :options="cmOptions"
    />
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import path from 'path'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/material-darker.css'

import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/vue/vue'

export default {
  name: "code-views-item",
  props: {
    payload: {type: Array, default: null},
    fileName: {type: String, default: null},
  },
  computed: {
    ...mapGetters({files: 'files/files'}),
    Code() {
      return this.files[this.fileName].content
    },
    extname(){
      return path.extname(this.fileName);
    },
    cmOptions() {
      return {
        foldGutter: true,
        styleActiveLine: true,
        mode: this.extname === 'vue' ? 'text/x-vue' : 'text/javascript',
        theme: 'material-darker',
        lineNumbers: true,
        line: true,
        readOnly: true
        // more CodeMirror options...
      }
    }
  }
}
</script>
