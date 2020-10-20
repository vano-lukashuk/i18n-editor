<template>
  <div>
    <code-views-item
      v-for="(file, key) in files"
      :key="key"
      :payload="file"
      :file-name="key"
    />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CodeViewsItem from "@/views/patrials/code-views-item";

export default {
  name: "code-views",
  components: {CodeViewsItem},
  data: () => ({}),
  computed: {
    ...mapGetters({
      selectedKey: 'files/selectedKey',
      langKeys: 'files/keys',
    }),
    files() {
      if (!this.selectedKey) return null
      return this.langKeys[this.selectedKey].value
    }
  },
}
</script>
