export default {
  props: {
    error: String | Boolean,
    description: String,
    required: Boolean,
    label: String,
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    labelContainerProps() {
      return {
        description: this.description,
        required: this.required,
        error: this.error,
        label: this.label,
        name: this.name,
      };
    },
  },
};
