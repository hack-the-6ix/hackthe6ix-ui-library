<template>
  <div :class="$style.checkbox">
    <div
      :class="[
        { 'checkbox__container--checked': value },
        $style.checkbox__container,
      ]"
    >
      <input
        :class="$style.checkbox__form"
        type="checkbox"
        v-model="value"
        tabindex="-1"
        :name="name"
      />
      <icon
        :class="[{ 'checkbox__icon--checked': value }, $style.checkbox__icon]"
        icon="check"
      />
    </div>
    <label :class="$style.checkbox__label" :htmlFor="name">{{
      label + (required ? '*' : '')
    }}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  model: {
    prop: 'value',
    event: 'check',
  },
  props: {
    value: Boolean,
    required: Boolean,
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style src="./Checkbox.module.scss" lang="scss" module />
