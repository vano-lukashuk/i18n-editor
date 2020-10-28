<template>
  <div class="directory-wrapper">
    <label>
      <span>Directory:</span>
      <input name="files" @change="dirChanged" type="file" webkitdirectory>
    </label>
    <label>
      <span>File:</span>
      <input name="file" @change="fileChanged" type="file">
    </label>
    <label>
      <span>Show code views:</span>
      <input name="checkbox" v-model="checkChanged" @change="$emit('ShowCodeViews', checkChanged)" type="checkbox">
    </label>

  </div>
</template>

<script>
  import path from "path";

  export default {
    name: "Settings",
    data: () => ({
      dir: null,
      file: null,
      checkChanged: true
    }),
    methods: {
      dirChanged(files) {
        let file = files.currentTarget.files[0]
        console.log(path.dirname(file.path))
      },
      fileChanged(files) {
        let file = files.currentTarget.files[0]
        console.log(file.path)
      }
    }
  }
</script>

<style lang="scss">
  .directory-wrapper {
    padding: 14px 20px;
    background-color: #cccccc;
    border-bottom: 1px solid #2d2d2d;
  }
</style>
