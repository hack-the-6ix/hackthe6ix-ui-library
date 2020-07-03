<template>
  <LabelContainer v-bind="labelContainerProps">
    <textarea
      v-bind="{ ...$attrs, ...formableProps }"
      :class="[$style.input, { [$style[`input--error`]]: formError }]"
      :aria-invalid="!!formError"
      :placeholder="placeholder"
      v-on="$listeners"
      @input="formHandler"
      :value="formValue"
      :rows="rows"
    />
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import LabelContainer from '../LabelContainer';

export default {
  name: 'Textarea',
  components: {
    LabelContainer,
  },
  props: {
    placeholder: String,
    rows: {
      type: Number,
      default: 4,
    },
  },
  mixins: [LabelContainerMixin, formableMixin],
};
</script>

<style src="./Textarea.module.scss" lang="scss" module />
