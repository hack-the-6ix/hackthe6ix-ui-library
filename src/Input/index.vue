<template>
  <LabelContainer v-bind="labelContainerProps">
    <input
      :class="[$style.input, { [$style[`input--error`]]: error }]"
      :autocomplete="autocomplete"
      :placeholder="placeholder"
      :aria-invalid="!!error"
      :disabled="disabled"
      @input="formHandler"
      :value="formValue"
      :type="type"
    />
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import LabelContainer from '../LabelContainer';

export default {
  name: 'Input',
  components: {
    LabelContainer,
  },
  props: {
    type: String,
  },
  mixins: [LabelContainerMixin, formableMixin],
};
</script>

<style lang="scss" module>
@use '../styles/variables';
@use '../styles/mixins';

.input {
  @include mixins.transition(background-color border-color);
  font-size: map-get(variables.$text, smaller);
  padding: map-get(variables.$unit, element);
  border: 2px solid var(--background-active);
  background-color: var(--background);
  border-radius: variables.$radius;
  outline: none;

  &:active:not(:disabled),
  &:focus {
    border-color: var(--teal);
  }

  &:disabled {
    background-color: var(--background-hover);
    cursor: not-allowed;
  }

  &--error {
    border-color: var(--error);
  }
}
</style>
