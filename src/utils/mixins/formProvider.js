import Vue from 'vue';

// Used by components with a form
// Q: (I can't/ It's weird to) use this because I have multiple forms
// A: Not this mixins problem, your component is probably too complex

export default (initState = {}) => ({
  data() {
    return {
      form_data: { ...initState },
      form_submitting: false,
      form_dirty: false,
      form_errors: {},
    };
  },
  computed: {
    has_errors() {
      return !!Object.keys(this.form_errors).length;
    },
  },
  methods: {
    reset() {
      this.form_data = { ...initState };
      this.form_dirty = false;
      this.form_errors = {};
    },
    onSubmit(action, reset = true) {
      return async () => {
        this.form_submitting = true;
        await action(this.form_data);
        this.form_submitting = false;
        if (reset) this.reset();
      };
    },
    updateData(name, data) {
      Vue.set(this.form_data, name, data);
      this.form_dirty = true;
    },
    updateError(name, error) {
      Vue.set(this.form_errors, name, error);
    },
  },
  provide() {
    return {
      form_updateError: this.updateError,
      form_updateData: this.updateData,
      form_submitting: this.form_submitting,
      form_errors: this.form_errors,
      form_data: this.form_data,
    };
  },
});
