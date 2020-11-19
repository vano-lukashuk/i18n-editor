<template>
  <div
    :class="[Color, Size, Block]"
    class="b-badge"
  >
    <slot></slot>
  </div>
</template>

<script>
  let BaseClass = "b-badge--";
  let BadgeSize = {
    ExtraSmall: BaseClass + 'xs',
    Small: BaseClass + 'sm',
    Medium: "",
    Large: BaseClass + 'lg',
    ExtraLarge: BaseClass + 'xlg'

  };
  let BlockClass = BaseClass + "block";
  let BadgeColor = {
    Blue: BaseClass + 'blue',
    Green: BaseClass + 'green',
    Red: BaseClass + 'red',
    Yellow: BaseClass + 'yellow',
    Purple: BaseClass + 'purple',
    Viking: BaseClass + 'viking',
    Gray: '',
  };

  export default {
    props: {
      size: {
        type: String,
        default: 'Medium',
        validator(value) {
          return BadgeSize[value] !== undefined;
        },
      },
      color: {
        type: String,
        default: 'Gray',
        validator(value) {
          return BadgeColor[value] !== undefined;
        },
      },
      block: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      Size() {
        return BadgeSize[this.size];
      },
      Color() {
        return BadgeColor[this.color];
      },
      /**
       * @return {string}
       */
      Block() {
        return this.block ? BlockClass : "";
      },
    },
  };
</script>

<style lang="scss">
.b-badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  line-height: 20px;
  margin: 2px 0;
  //padding: 5px;
  border-radius: 10px;
  background-color: transparent;
  cursor: default;
  color: white;
  font-size: 9px;
  font-weight: normal;
  text-align: center;

  .icon {
    margin-right: 3px;
  }
  /* Display */
  &--block {
    display: block;
  }
  /* Sizes */
  &--xs {
    min-width: 12px;
    height: 12px;
    border-radius: 6px;
    line-height: 12px;
    padding: 0 4px;
  }

  &--sm {
    min-width: 16px;
    height: 16px;
    border-radius: 8px;
    line-height: 16px;
    padding: 0 6px;
  }

  &--lg {
    min-width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 16px;
  }

  &--xlg {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 700;
  }
  /* Colors */
  &--red {
    background-color: red;
  }

  &--blue {
    background-color: blue;
  }

  &--green {
    background-color: green;
  }

  &--yellow {
    background-color: yellow;
  }
  &--purple {
    background-color: purple;
  }
}

</style>
