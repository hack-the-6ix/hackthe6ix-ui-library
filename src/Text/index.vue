<template>
  <component
    :is="tag"
    :class="[
      transform && $style[`text--transform-${transform}`],
      color && $style[`text--color-${color}`],
      align && $style[`text--align-${align}`],
      $style[`text--type-${type}`],
    ]"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'Text',
  props: {
    transform: String,
    color: String,
    align: String,
    type: String,
    as: String,
  },
  computed: {
    tag() {
      return this.$style[this.type] || this.as || 'span';
    },
  },
};
</script>

<style src="./Text.module.scss" lang="scss" module />
