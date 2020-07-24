<template>
  <MountingPortal mountTo="body" append>
    <div
      v-if="show || show_"
      :class="[$style.container, show && show_ && $style[`container--show`]]"
    >
      <div
        :class="[
          $style.modal,
          show && show_ && $style[`modal--show`],
          className,
        ]"
      >
        <div :class="$style.header">
          <TextComponent
            type="heading3"
            color="teal"
            :class="$style.label"
            v-if="label"
          >
            {{ label }}
          </TextComponent>
          <button @click="$emit(`modal`, false)" :class="$style.button">
            <Icon :class="$style.icon" name="times" />
          </button>
        </div>
        <div :class="$style.body" v-if="$slots.default">
          <slot />
        </div>
      </div>
    </div>
  </MountingPortal>
</template>

<script>
import Icon from 'vue-awesome/components/Icon';
import { MountingPortal } from 'portal-vue';
import TextComponent from '../Text';
import 'vue-awesome/icons/times';

export default {
  name: 'Modal',
  model: {
    prop: 'show',
    event: 'modal',
  },
  components: {
    MountingPortal,
    TextComponent,
    Icon,
  },
  data() {
    return {
      show_: this.show,
    };
  },
  props: {
    className: String | Array | Object,
    label: String,
    show: Boolean,
  },
  beforeDestroy() {
    window.clearTimeout(this.timer);
  },
  watch: {
    show(v) {
      window.clearTimeout(this.timer);
      this.$nextTick(() => {
        this.timer = window.setTimeout(() => {
          this.show_ = v;
        }, 50 + (v ? 0 : parseInt(this.$style.speed)));
      });
    },
  },
};
</script>

<style src="./Modal.module.scss" lang="scss" module />
