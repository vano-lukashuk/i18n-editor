<template>
  <div class="lang-wrapper" v-if="selectedKey">
    <div class="lang-key">
      <span>Key: </span>
      <b><span v-text="selectedKey"></span></b>
      <hr>
    </div>
    <div v-for="lang in langs">
      <label class="lang">
        <span class="lang-name" v-text="lang"></span>
        <input class="lang-translate" v-model.lazy="data[selectedKey][lang]">
      </label>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "lang-form",
    data: () => ({
      data: {}
    }),
    computed: {
      ...mapGetters({
        selectedKey: 'files/selectedKey',
        langs: 'files/langs'
      })
    },
    watch: {
      selectedKey() {
        this.data[this.selectedKey] = this.data[this.selectedKey] || {}
      }
    }
  }
</script>

<style scoped>
  .lang-wrapper {
    padding: 10px 12px;
  }

  .lang-key {
    font-size: 16px;
    padding-bottom: 10px;
  }

  .lang {
    display: flex;
    align-items: center;
    margin-bottom: 6px;

  }

  .lang .lang-name {
    min-width: 30px;
  }

  .lang .lang-translate {
    height: 26px;
    opacity: 0.4;
    border: 1px solid #263238;
    box-sizing: border-box;
    border-radius: 6px;
  }
</style>
