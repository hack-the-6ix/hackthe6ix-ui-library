<template>
  <div v-bind="{ ...$listeners, ...$attrs }">
    <label :class="$style.label" :htmlFor="name" v-if="label">
      {{ label + (required ? '*' : '') }}
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
