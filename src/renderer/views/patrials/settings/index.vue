<template>
  <div class="directory-wrapper">
    <v-btn @click.native.prevent="CloseProject">
      <v-icon>close</v-icon>
      <span>Close Project</span>
    </v-btn>
    <v-btn @click.native.prevent="SaveProject">
      <v-icon>save</v-icon>
      <span>Save Project</span>
    </v-btn>
    <v-btn @click.native.prevent="SaveAsProject">
      <v-icon>save</v-icon>
      <span>Save As Project</span>
    </v-btn>
    <v-btn @click.native.prevent="SelectSourceRoot">
      <v-icon>folder_open</v-icon>
      <span>Select Source Root</span>
    </v-btn>
    <v-btn @click.native.prevent="SelectLanguagesSourceRoot">
      <v-icon>folder_open</v-icon>
      <span>Select Languages Source Root</span>
    </v-btn>
    <label>
      <span>Show code views:</span>
      <input name="checkbox" v-model="checkChanged" @change="$emit('ShowCodeViews', checkChanged)" type="checkbox">
    </label>

    <div>
      <div>
        <span>Project: </span>
        <span v-text="projectPath"/>
      </div>
      <div>
        <span>Source Root: </span>
        <span v-text="sourceRoot"/>
      </div>
      <div>
        <span>Languages Source Root: </span>
        <span v-text="languagesSourceRoot"/>
      </div>
      <div>
        <span>Languages: </span>
        <span v-text="languages"/>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from 'electron';
import {mapGetters, mapActions} from 'vuex'


export default {
  name: "Settings",
  data: () => ({
    dir: null,
    file: null,
    checkChanged: true
  }),
  computed: {
    ...mapGetters('settings', ['projectPath', 'sourceRoot', 'languagesSourceRoot']),
    ...mapGetters('files', ['languages']),
  },
  methods: {
    ...mapActions('settings', ['saveProject', 'selectedSourceRoot', 'selectedLanguagesSourceRoot']),
    ...mapActions(['reset']),
    CloseProject() {
      this.reset();
      this.$router.replace({name: 'Home'})
    },
    SaveProject() {
      let file = this.projectPath;
      if (!file)
        file = ipcRenderer.sendSync('SaveFile');
      if (file) {
        this.saveProject(file);
      }
    },
    SaveAsProject(){
      let file =  ipcRenderer.sendSync('SaveFile');
      if (file) {
        this.saveProject(file);
      }
    },
    SelectSourceRoot() {
      let file = ipcRenderer.sendSync('OpenDirectory');
      if (file) {
        this.selectedSourceRoot(file);
      }
    },
    SelectLanguagesSourceRoot() {
      let file = ipcRenderer.sendSync('OpenDirectory');
      if (file) {
        this.selectedLanguagesSourceRoot(file);
      }
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
