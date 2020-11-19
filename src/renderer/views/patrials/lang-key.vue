<template>
  <li @click="SelectKey(payload.key)">
    <span v-text="payload.key"></span>
    <badge
      v-if="!payload.value"
      color="Yellow"
    />

    <badge
      v-for="language in languages"
      :key="language"
      v-if="!languagesData[language][payload.key]"
      color="Red"
      v-text="language"
    />
    <badge
      v-if="isFull"
      color="Green"
    />
  </li>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "LangKey",
  props: {
    payload: { type: Object, default: null }
  },
  computed: {
    ...mapGetters('files', ['languages', 'languagesData']),
    isFull () {
      return this.languages.every(lang => !!this.languagesData[lang][this.payload.key])
    }
  },
  methods: {
    ...mapActions({ SelectKey: 'files/selectedKey' })
  }
}
</script>
