<template>
  <li>
    <span v-text="payload.file"/>
    <span v-text="payload.finded.length"/>
    <ol>
      <li
        v-for="(data, i) in payload.finded"
        :key="data.full + i"
      >
        <p v-text="data.full"/>
        <p v-text="data.groups"/>
        <p v-text="data.index"/>
      </li>
    </ol>
  </li>
</template>

<script>
export default {
  name: "Directory",
  props: {
    payload: {type: Object, default: null}
  }
}
</script>

<style lang="scss" src=""></style>
