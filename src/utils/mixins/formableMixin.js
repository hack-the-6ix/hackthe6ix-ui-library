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
      dateError: '',
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
    formError() {
      if (this.error) {
        return this.error;
      } else if (this.form_errors) {
        return this.form_errors[this.name];
      } else {
        return this.dataError;
      }
    },
  },
  methods: {
    async formHandler({ target }) {
      const v = target.value;
      if (this.value) {
        await this.validate(v);
        this.$emit('input', v);
      } else if (this.form_data) {
        this.form_updateError(this.name, await this.validate(v));
        this.form_updateData(this.name, v);
      } else {
        this.dataError = await this.validate(v);
        this.dataValue = v;
      }
    },
  },
};
