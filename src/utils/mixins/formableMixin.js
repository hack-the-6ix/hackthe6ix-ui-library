export default {
  inject: [
    'form_updateError',
    'form_updateData',
    'form_submitting',
    'form_errors',
    'form_data',
  ],
  data() {
    return {
      dataValue: '',
    };
  },
  props: {
    error: String | Boolean,
    autocomplete: String,
    disabled: Boolean,
    required: Boolean,
    value: undefined,
    validate: {
      default: () => {},
      type: Function,
    },
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    formValue() {
      if (this.value) {
        return this.value;
      } else if (this.form_data) {
        return this.form_data[this.name];
      } else {
        return this.dataValue;
      }
    },
  },
  methods: {
    formHandler({ target }) {
      const v = target.value;
      if (this.value) {
        this.validate(v);
        this.$emit('input', v);
      } else if (this.form_data) {
        this.form_updateError(this.name, this.validate(v));
        this.form_updateData(this.name, v);
      } else {
        this.validate(v);
        this.dataValue = v;
      }
    },
  },
};