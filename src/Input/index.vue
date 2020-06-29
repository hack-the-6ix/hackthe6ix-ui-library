<template>
  <LabelContainer v-bind="labelContainerProps">
    <input
      v-bind="{ ...$listeners, ...$attrs, ...formableProps }"
      :class="[$style.input, { [$style[`input--error`]]: formError }]"
      :placeholder="placeholder"
      :aria-invalid="!!error"
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
    placeholder: String,
    type: String,
    min: Number,
  },
  mixins: [LabelContainerMixin, formableMixin],
};
</script>

<style src="./Input.module.scss" lang="scss" module />
