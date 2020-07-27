<template>
  <div v-bind="$attrs" v-on="$listeners">
    <label :class="$style.label" :htmlFor="name" v-if="label || $slots.label">
      <slot name="label" v-if="$slots.label" />
      <span v-else>{{ label }}</span>
      <span v-if="required" :class="$style.label__asterisk"> *</span>
    </label>
    <p :class="$style.description" v-if="description">{{ description }}</p>
    <slot />
    <p :class="$style.error" v-if="typeof error === 'string'">{{ error }}</p>
  </div>
</template>

<script>
import labelContainerMixin from './LabelContainerMixin';

export default {
  name: 'LabelContainer',
  mixins: [labelContainerMixin],
  props: {
    name: {
      type: String,
      required: false,
    },
  },
};
</script>

<style src="./LabelContainer.module.scss" lang="scss" module />
