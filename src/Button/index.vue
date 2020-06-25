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
import { button_type } from '../styles/variables.scss';
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
      validator: (_) => _.left || _.right,
      default: () => ({}),
      type: Object,
    },
  },
};
</script>

<style lang="scss" module>
@use '../styles/variables';
@use '../styles/mixins';
@use '../styles/colors';

.button {
  @include mixins.transition(background-color border-color color);
  font-size: map-get(variables.$text, smaller);
  border-radius: variables.$radius;
  border-style: solid;
  position: relative;
  border-width: 2px;
  font-weight: bold;
  overflow: hidden;
  cursor: pointer;
  outline: none;

  @each $tag in map-keys(colors.$colors) {
    @if $tag != background {
      &--color-#{'' + $tag} {
        --color-highlight-active: var(--#{$tag}-highlight-active);
        --color-highlight: var(--#{$tag}-highlight);
        --color-active: var(--#{$tag}-active);
        --color-hover: var(--#{$tag}-hover);
        --color: var(--#{$tag});
      }
    }
  }

  &--variant-solid {
    background-color: var(--color);
    border-color: var(--color);
    color: var(--background);

    &:not(:disabled) {
      &:hover,
      &:focus {
        background-color: var(--color-hover);
        border-color: var(--color-hover);
      }

      &:active {
        background-color: var(--color-active);
        border-color: var(--color-active);
      }
    }
  }

  &--variant-outline {
    background-color: transparent;
    border-color: var(--color);
    color: var(--color);

    &:not(:disabled) {
      &:hover,
      &:focus {
        background-color: var(--color);
        border-color: var(--color);
        color: var(--background);
      }

      &:active {
        background-color: var(--color-hover);
        border-color: var(--color-hover);
        color: var(--background);
      }
    }
  }

  &--variant-ghost {
    background-color: transparent;
    border-color: transparent;
    color: var(--color);

    &:not(:disabled) {
      &:hover,
      &:focus {
        background-color: var(--color-highlight);
      }

      &:active {
        background-color: var(--color-highlight-active);
      }
    }
  }

  &:disabled {
    --color: var(--disabled);
    cursor: not-allowed;
  }
}

.icon {
  width: map-get(variables.$unit, element) * 1.2;

  &--left {
    margin-right: map-get(variables.$unit, element) * 1.2;
  }

  &--right {
    margin-left: map-get(variables.$unit, element) * 1.2;
  }

  &--loading {
    @include mixins.transition(transform opacity);
    @include mixins.position(absolute);
    transform: translateY(100%);
    opacity: 0;

    &-show {
      transform: translateY(0);
      opacity: 1;
    }
  }
}

.content {
  @include mixins.transition(transform opacity);
  padding: map-get(variables.$unit, element) * 1.2;
  align-items: center;
  display: flex;
  opacity: 1;

  &--loading {
    transform: translateY(-100%);
    opacity: 0;
  }
}
</style>
