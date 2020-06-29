<template>
  <LabelContainer :class="$style.container" v-bind="labelContainerProps">
    <input
      v-bind="{ ...$listeners, ...$attrs, ...formableProps }"
      @focus="show = true && !disabled"
      :aria-invalid="!!error"
      :class="$style.input"
      v-model="input"
      ref="input"
    />
    <ul :class="[$style.dropdown, { [$style[`dropdown--show`]]: show }]">
      <li
        :class="[
          $style.item,
          { [$style[`item--selected`]]: value === formValue },
        ]"
        v-for="value in filteredList"
        :data-value="value"
        @click="handler"
        :key="value"
      >
        {{ value }}
        <Icon
          :class="[
            $style.check,
            { [$style[`check--show`]]: value === formValue },
          ]"
          name="check"
        />
      </li>
    </ul>
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import { speed_normal } from '../styles/variables.scss';
import { compareTwoStrings } from 'string-similarity';
import LabelContainer from '../LabelContainer';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/check';

export default {
  name: 'ComboBox',
  mixins: [LabelContainerMixin, formableMixin],
  components: {
    LabelContainer,
    Icon,
  },
  data() {
    return {
      filteredList: this.options.slice(0, this.limit),
      show: false,
      input: '',
    };
  },
  computed: {
    datalist() {
      return `datalist-${this.name}`;
    },
  },
  methods: {
    handler({ currentTarget }) {
      const value = currentTarget.getAttribute('data-value');
      this.formHandler({ target: { value } });
      this.input = value;
    },
    windowHandler({ target }) {
      if (target === this.$refs.input) return;
      this.show = false;
    },
  },
  mounted() {
    this._supports = {};
  },
  destroy() {
    window.clearTimeout(this.timer);
    window.removeEventListener('click', this.windowHandler);
  },
  watch: {
    input(val) {
      if (!this._supports[val]) {
        this._supports[val] = this.options
          .map((i) => [i, compareTwoStrings(val, i)])
          .sort((a, b) => b[1] - a[1])
          .slice(0, this.limit)
          .map(([i]) => i);
      }
      this.filteredList = this._supports[val];
    },
    show(val) {
      if (val) {
        this.timer = window.setTimeout(() => {
          window.addEventListener('click', this.windowHandler);
        }, speed_normal);
      } else {
        window.clearTimeout(this.timer);
        window.removeEventListener('click', this.windowHandler);
      }
    },
  },
  props: {
    placeholder: String,
    options: Array,
    limit: {
      type: Number,
      default: 5,
    },
  },
};
</script>

<style src="./ComboBox.module.scss" lang="scss" module />
