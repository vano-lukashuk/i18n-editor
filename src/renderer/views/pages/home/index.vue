<template>
  <div>
    <v-btn @click.native.prevent="OpenProject">
      <v-icon>folder_open</v-icon>
      <span>Open Project</span>
    </v-btn>
    <v-btn @click.native.prevent="CreateProject">
      <v-icon>folder_open</v-icon>
      <span>Create Project</span>
    </v-btn>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";
import {mapActions} from 'vuex'

export default {
  name: "Page_Home",
  methods: {
    ...mapActions({
      loadProject: 'settings/loadProject'
    }),
    OpenProject() {
      let res = ipcRenderer.sendSync('OpenFile');
      if (res) {
        this.loadProject(res)
          .then(res => {
            this.$router.replace({name: 'Project'})
          })
      }
    },
    CreateProject() {
      this.$router.replace({name: 'Project'})
    }
  }
}
</script>
