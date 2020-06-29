<template>
  <button
    :class="[
      $style.button,
      $style[`button--color-${color}`],
      $style[`button--variant-${variant}`],
    ]"
    v-bind="{ ...$listeners, ...$attrs, ...buttonProps }"
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
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/circle-notch';

export default {
  name: 'Button',
  components: {
    Icon,
  },
  computed: {
    buttonProps() {
      const { loading, variant, color, icon, ...props } = this.$props;
      return props;
    },
  },
  props: {
    variant: {
      default: 'solid',
      type: String,
    },
    color: {
      default: 'teal',
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
