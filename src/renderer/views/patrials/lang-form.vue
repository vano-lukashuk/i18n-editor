<template>
  <div v-if="selectedKey">
    <div v-text="selectedKey"></div>
    <div>
      <div  v-for="lang in langs">
        <label>
          <span v-text="lang"></span>
          <input v-model.lazy="data[selectedKey][lang]">
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "lang-form",
  data: () => ({
    data: {

    }
  }),
  computed: {
    ...mapGetters({
      selectedKey: 'files/selectedKey',
      langs: 'files/langs'
    })
  },
  watch:{
    selectedKey(){
      this.data[this.selectedKey] = this.data[this.selectedKey] || {}
    }
  }
}
</script>
