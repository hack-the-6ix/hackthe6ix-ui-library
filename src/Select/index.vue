<template>
  <LabelContainer v-bind="labelContainerProps">
    <div :class="$style.container">
      <select
        :class="[
          $style.input,
          $style.select,
          { [$style[`input--error`]]: error },
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
          $style.input,
          $style.display,
          { [$style[`input--error`]]: error },
          { [$style[`input--disabled`]]: disabled },
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
        <Icon
          :class="[
            $style.check,
            { [$style[`check--show`]]: value === formValue },
          ]"
          name="check"
        />
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
import 'vue-awesome/icons/check';

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
