<template>
  <li @click="SelectKey(payload.key)">
    <span v-text="payload.key"></span>
  </li>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "LangKey",
  props: {
    payload: {type: Object, default: null}
  },
  methods: {
    ...mapActions({SelectKey: 'files/selectedKey'})

  }
}
</script>
