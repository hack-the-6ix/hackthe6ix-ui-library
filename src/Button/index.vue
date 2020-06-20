<template>
  <button :class="$style.button">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    disabled: Boolean,
    loading: Boolean,
    primary: Boolean,
    variant: String,
  },
};
</script>

<style lang="scss" module>
@use '../styles/fonts';

.button {
  font-family: fonts.font-family(Avenir);
  color: red;
}
</style>
