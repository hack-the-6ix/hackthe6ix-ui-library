<template>
  <div :class="$style.container">
    <div :class="[$style.cover, $style[`color--${color}`]]">
      <input
        v-bind="{ ...$attrs, ...formableProps }"
        v-on="$listeners"
        :class="$style.input"
        :checked="formValue"
        @input="handler"
        :value="!formValue"
        type="checkbox"
      />
      <div :class="$style.box">
        <Icon name="check" :class="$style.check" />
      </div>
    </div>
    <label :htmlFor="name" :class="$style.label">
      {{ label + (required ? '*' : '') }}
    </label>
  </div>
</template>

<script>
import formableMixin from '../utils/mixins/formableMixin';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/check';
import Stack from '../Stack';

export default {
  name: 'Checkbox',
  components: {
    Stack,
    Icon,
  },
  mixins: [formableMixin],
  data() {
    return {
      dataValue: false,
    };
  },
  props: {
    label: String,
    color: {
      type: String,
      default: 'teal',
    },
  },
  methods: {
    handler(el) {
      this.formHandler({
        target: {
          value: el.target.value === 'true',
        },
      });
    },
  },
};
</script>

<style src="./Checkbox.module.scss" lang="scss" module />
