<template>
  <LabelContainer v-bind="labelContainerProps">
    <div :class="$style.container">
      <select
        :class="[
          $style.field,
          $style.select,
          { [$style[`field--error`]]: error },
        ]"
        :autocomplete="autocomplete"
        :aria-invalid="!!error"
        :disabled="disabled"
        @input="formHandler"
        :value="formValue"
      >
        <option v-if="placeholder" value="" selected disabled hidden>
          {{ placeholder }}
        </option>
        <option
          v-for="[value, label] in Object.entries(options)"
          :value="value"
          :key="value"
        >
          {{ label }}
        </option>
      </select>
      <div
        :class="[
          $style.field,
          $style.display,
          { [$style[`field--error`]]: error },
          { [$style[`field--disabled`]]: disabled },
        ]"
        @click="show = true && !disabled"
      >
        {{ options[formValue] || placeholder }}
      </div>
      <Icon
        :class="[$style.arrow, { [$style[`arrow--flip`]]: show }]"
        name="angle-down"
      />
    </div>
    <ul :class="[$style.dropdown, { [$style[`dropdown--show`]]: show }]">
      <li
        :class="[
          $style.item,
          { [$style[`item--selected`]]: value === formValue },
        ]"
        v-for="[value, label] in Object.entries(options)"
        @click="() => formHandler({ target: { value } })"
        :key="value"
      >
        {{ label }}
      </li>
    </ul>
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import { speed_normal } from '../styles/variables.scss';
import LabelContainer from '../LabelContainer';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/angle-down';

export default {
  name: 'Select',
  components: {
    LabelContainer,
    Icon,
  },
  mixins: [LabelContainerMixin, formableMixin],
  data() {
    return {
      show: false,
    };
  },
  props: {
    placeholder: String,
    options: {
      type: Object | Array,
      required: true,
    },
  },
  methods: {
    windowHandler({ target }) {
      this.show = false;
    },
  },
  destroy() {
    window.clearTimeout(this.timer);
    window.removeEventListener('click', this.windowHandler);
  },
  watch: {
    show(val) {
      if (val) {
        this.timer = window.setTimeout(() => {
          window.addEventListener('click', this.windowHandler);
        }, speed_normal);
      } else {
        window.clearTimeout(this.timer);
        window.removeEventListener('click', this.windowHandler);
      }
    },
  },
};
</script>

<style src="./Select.module.scss" lang="scss" module />
