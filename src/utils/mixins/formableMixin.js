export default ({
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
    autocomplete: String,
    placeholder: String,
    disabled: Boolean,
    value: undefined,
    validate: {
      default: () => {},
      type: Function,
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
        this.$emit('input', v);
      } else if (this.form_data) {
        this.form_updateError(this.name, this.validate(v));
        this.form_updateData(this.name, v);
      } else {
        this.dataValue = v;
      }
    },
  },
});
