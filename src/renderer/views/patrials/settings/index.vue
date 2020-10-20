<template>
  <div>
    <label>
      <span>Directory:</span>
      <input name="files" @change="dirChanged" type="file" webkitdirectory>
    </label>
    <label>
      <span>file:</span>
      <input name="file" @change="fileChanged" type="file">
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

<style lang="scss" src=""></style>
