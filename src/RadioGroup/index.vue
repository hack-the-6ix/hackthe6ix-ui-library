<template>
  <LabelContainer
    :class="$style[`color--${color}`]"
    v-bind="labelContainerProps"
  >
    <Stack
      :class="$style.container"
      :direction="direction"
      :spacing="direction === 'row' ? 'component' : 'tad'"
    >
      <div
        v-for="[value, label] in Object.entries(options)"
        :class="$style.item"
        :key="value"
      >
        <div :class="$style.container">
          <input
            v-bind="{ ...$attrs, ...formableProps }"
            v-on="$listeners"
            :checked="formValue && formValue === value"
            :class="$style.radio"
            @input="formHandler"
            :value="value"
            type="radio"
          />
          <div :class="$style.cover">
            <div :class="$style.dot" />
          </div>
        </div>
        <label :htmlFor="name" :class="$style.label">
          {{ label }}
        </label>
      </div>
    </Stack>
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import LabelContainer from '../LabelContainer';
import Stack from '../Stack';

export default {
  name: 'RadioGroup',
  components: {
    LabelContainer,
    Stack,
  },
  mixins: [LabelContainerMixin, formableMixin],
  props: {
    options: {
      type: Object | Array,
      required: true,
    },
    color: {
      type: String,
      default: 'teal',
    },
    direction: {
      type: String,
      default: 'row',
    },
  },
};
</script>

<style src="./RadioGroup.module.scss" lang="scss" module />
