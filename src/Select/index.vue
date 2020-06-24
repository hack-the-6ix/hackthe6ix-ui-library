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
import variables from '../styles/variables.scss';
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
    options: Object || Array,
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
        }, variables.normal);
      } else {
        window.clearTimeout(this.timer);
        window.removeEventListener('click', this.windowHandler);
      }
    },
  },
};
</script>

<style lang="scss" module>
@use '../styles/variables';
@use '../styles/mixins';

.container {
  align-items: center;
  position: relative;
  display: flex;
}

.field {
  @include mixins.transition(background-color border-color);
  font-size: map-get(variables.$text, smaller);
  padding: map-get(variables.$unit, element);
  padding-right: map-get(variables.$unit, component) * 2.5;
  border: 2px solid var(--background-active);
  background-color: var(--background);
  border-radius: variables.$radius;
  cursor: pointer;

  &:hover,
  &:focus {
    border-color: var(--teal);
  }

  &:active {
    background-color: var(--background-hover);
  }

  &:disabled,
  &--disabled {
    background-color: var(--background-hover);
    cursor: not-allowed;
  }

  &--error {
    border-color: var(--error);
  }
}

.select {
  -webkit-appearance: none;
  -moz-appearance: none;
  outline: none;
  width: 100%;

  @media (hover: hover) {
    &:focus + .display {
      display: none;
    }
  }
}

.display {
  @include mixins.position(absolute);
  display: none;

  @media (hover: hover) {
    display: block;
  }
}

.arrow {
  @include mixins.transition(transform);
  @include mixins.position(absolute);
  margin-right: map-get(variables.$unit, component);

  &--flip {
    transform: rotate(180deg);
  }
}

.dropdown {
  @include mixins.transition(transform opacity max-height);
  @include mixins.scroll;

  margin: map-get(variables.$unit, element) 0 map-get(variables.$unit, element) *
    -1.5;
  font-size: map-get(variables.$text, smaller);
  border: 2px solid var(--background-active);
  background-color: var(--background);
  border-radius: variables.$radius;
  list-style-type: none;
  padding: 0;

  transform: translateY(-1rem);
  pointer-events: none;
  max-height: 0;
  opacity: 0;

  &--show {
    transform: translateY(0);
    pointer-events: all;
    max-height: 9.5rem;
    margin-bottom: 0;
    opacity: 1;
  }
}

.item {
  @include mixins.transition(background-color);
  padding: map-get(variables.$unit, element);
  cursor: pointer;

  &--selected,
  &:hover {
    background-color: var(--background-hover);
  }

  &:active {
    background-color: var(--background-active);
  }
}
</style>
