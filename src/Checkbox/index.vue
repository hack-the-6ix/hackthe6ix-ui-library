<template>
  <div :class="$style.checkbox">
    <div
      :class="[
        { 'checkbox__container--checked': value },
        $style.checkbox__container,
      ]"
    >
      <input
        :class="$style.checkbox__form"
        @click="$emit('check', !value)"
        type="checkbox"
        :value="value"
        tabindex="-1"
        :name="name"
      />
      <icon
        :class="[{ 'checkbox__icon--checked': value }, $style.checkbox__icon]"
        icon="check"
      />
    </div>
    <label :class="$style.checkbox__label" :htmlFor="name">{{
      label + (required ? '*' : '')
    }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'value',
    event: 'check',
  },
  props: {
    value: Boolean,
    required: Boolean,
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
@import '../styles/mixins';
@import '../styles/variables';
@import '../styles/colors';

.checkbox {
  @include flex;
  margin-bottom: 16px;
  font-weight: bold;

  &__label {
    color: $teal;
    margin-top: 2px;
    font-size: 0.95rem;
    font-family: $font;
  }

  &__container {
    @include transition(background-color);
    @include flex(center);
    margin-right: 10px;
    position: relative;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    border-radius: 6px;
    overflow: hidden;
    background-color: #eaeaea;
    font-size: 0.8rem;
    color: white;

    &--checked {
      background-color: $teal;
    }
  }

  &__icon {
    @include transition(opacity transform);
    transform: rotate(45deg);
    opacity: 0;

    &--checked {
      transform: rotate(0deg);
      opacity: 1;
    }
  }

  &__form {
    @include position(absolute);
    opacity: 0;
    z-index: 1;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
}
</style>
