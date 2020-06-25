<template>
  <button
    :class="[
      $style.button,
      $style[`button--color-${color}`],
      $style[`button--variant-${variant}`],
    ]"
    :disabled="disabled"
  >
    <div :class="[$style.content, { [$style[`content--loading`]]: loading }]">
      <Icon
        v-if="icon.left"
        :name="icon.left"
        :class="[$style.icon, $style[`icon--left`]]"
      />
      <slot />
      <Icon
        v-if="icon.right"
        :name="icon.right"
        :class="[$style.icon, $style[`icon--right`]]"
      />
    </div>
    <Icon
      name="circle-notch"
      :class="[
        'fa-spin',
        $style.icon,
        $style[`icon--loading`],
        { [$style[`icon--loading-show`]]: loading },
      ]"
    />
  </button>
</template>

<script>
import { button_type } from './Button.module.scss';
import Icon from 'vue-awesome/components/Icon';
import { tags } from '../styles/colors.scss';
import 'vue-awesome/icons/circle-notch';
const variants = button_type.split(', ');
const colors = tags.split(', ');

export default {
  name: 'Button',
  components: {
    Icon,
  },
  props: {
    variant: {
      validator: (_) => variants.includes(_),
      default: variants[0],
      type: String,
    },
    color: {
      validator: (_) =>
        colors.includes(_) && !['background', 'disabled'].includes(_),
      default: colors[0],
      type: String,
    },
    disabled: Boolean,
    loading: Boolean,
    value: String,
    type: String,
    name: String,
    icon: {
      default: () => ({}),
      type: Object,
    },
  },
};
</script>

<style src="./Button.module.scss" lang="scss" module />
