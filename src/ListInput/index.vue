<template>
  <LabelContainer v-bind="labelContainerProps">
    <div :class="$style.field">
      <input
        :class="[
          formError && $style[`input--error`],
          $style[`input--field`],
          $style.input,
        ]"
        :placeholder="placeholder"
        v-model="field"
        v-bind="{ ...$attrs, ...formableProps }"
      />
      <Button
        :disabled="
          disabled || field === `` || parseInt(limit) === formValue.length
        "
        :icon="{ left: `plus` }"
        @click="add"
        size="small"
        tabindex="$attrs.tabindex"
        >Add Item</Button
      >
    </div>
    <Stack
      :class="
        [...formValue, ...placeholderItems].length && $style[`items--show`]
      "
      spacing="tad"
      tabindex="$attrs.tabindex"
      wrap
    >
      <button
        v-for="(item, i) in placeholderItems"
        :class="$style.item"
        :data-index="i"
        tabindex="$attrs.tabindex"
        :key="i"
      >
        <span>{{ item }}</span>
      </button>
      <button
        v-for="(item, i) in formValue"
        :class="$style.item"
        :data-index="i"
        @click="remove"
        :key="i"
      >
        <span :class="$style.label">{{ item }}</span>
        <icon :class="$style.label_icon" name="times" />
      </button>
    </Stack>
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import LabelContainer from '../LabelContainer';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/times';
import 'vue-awesome/icons/plus';
import Button from '../Button';
import Stack from '../Stack';

export default {
  name: 'ListInput',
  components: {
    LabelContainer,
    Button,
    Stack,
    Icon,
  },
  props: {
    placeholder: String,
    limit: {
      type: Number,
      default: Infinity,
    },
    placeholderItems: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      dataValue: [],
      dataError: '',
      field: '',
    };
  },
  methods: {
    add() {
      this.formHandler({ target: { value: [this.field, ...this.formValue] } });
      this.field = '';
    },
    remove({ currentTarget }) {
      const value = [...this.formValue];
      value.splice(currentTarget.getAttribute('data-index'), 1);
      this.formHandler({ target: { value } });
    },
  },
  mixins: [formableMixin, LabelContainerMixin],
};
</script>

<style src="./ListInput.module.scss" lang="scss" module />
