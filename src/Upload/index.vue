<template>
  <LabelContainer v-bind="labelContainerProps">
    <div :class="[$style.container, $style[color]]">
      <input
        v-bind="{ ...$attrs, ...formableProps }"
        v-on="$listeners"
        :class="$style.input"
        @change="onUpload"
        :accept="accept"
        type="file"
      />
      <div :class="[$style.content, formError && $style[`content--error`]]">
        <Icon :class="$style.icon" name="file-upload" />
        <p v-if="fileName" :class="$style.label">{{ fileName }}</p>
        <p v-else>
          Drop your file here, or <span :class="$style.highlight">browse</span>
        </p>
      </div>
    </div>
  </LabelContainer>
</template>

<script>
import LabelContainerMixin from '../LabelContainer/LabelContainerMixin';
import formableMixin from '../utils/mixins/formableMixin';
import LabelContainer from '../LabelContainer';
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/file-upload';
import Stack from '../Stack';

export default {
  name: 'Upload',
  mixins: [LabelContainerMixin, formableMixin],
  props: {
    accept: String,
    color: {
      type: String,
      default: 'teal',
    },
  },
  computed: {
    fileName() {
      return this.formValue && this.formValue.name;
    },
  },
  components: {
    LabelContainer,
    Stack,
    Icon,
  },
  methods: {
    onUpload({ currentTarget }) {
      this.formHandler({ target: { value: currentTarget.files[0] } });
    },
  },
};
</script>

<style src="./Upload.module.scss" lang="scss" module />
