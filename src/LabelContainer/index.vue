<template>
  <div>
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

<style lang="scss" module>
@use '../styles/variables';
@use '../styles/mixins';

.label {
  margin-bottom: map-get(variables.$unit, tad);
  color: var(--teal);
  font-weight: bold;
  display: block;
}

.description {
  margin-top: map-get(variables.$unit, tad) * -1;
  font-size: map-get(variables.$text, smaller);
  margin-bottom: map-get(variables.$unit, tad);
}

.error {
  font-size: map-get(variables.$text, smaller);
  margin-top: map-get(variables.$unit, tad);
  color: var(--error);
  margin-bottom: 0;
}
</style>
