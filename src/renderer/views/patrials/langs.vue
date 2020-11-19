<template>
  <div>
    <ul class="key-list">
      <lang-key
        class="f32 key-item"
        v-for="(langKey) in Keys"
        :key="langKey.key"
        :class="{active: langKey.key === selectedKey}"
        :payload="langKey"
      ></lang-key>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import LangKey from "@/views/patrials/lang-key";

export default {
  name: "langs",
  components: {
    LangKey,
  },
  computed: {
    ...mapGetters('files', ['keys', 'files', 'selectedKey']),
    Keys(){
      let res = Object.values(this.keys)
      res = res.sort((a, b) => {
        return a.key > b.key ? 1 : -1
      })
      return res;
    }
  },
}
</script>

<style lang="scss">
$key_hover_bc: #b9b9b9;

.key-list {
  height: calc(100vh - 50px);
  padding-left: 5px;
  overflow: auto;
}

.key-item {
  padding: 4px;
  border-bottom: 1px solid #b9b9b9;
  cursor: pointer;

  &:hover {
    background: $key_hover_bc;
  }

  &:active {
    background: darken($key_hover_bc, 8%);
  }
  &.active {
    background: darken($key_hover_bc, 20%);
  }
}
</style>
