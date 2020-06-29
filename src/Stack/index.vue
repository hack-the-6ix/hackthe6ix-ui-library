<script>
export default {
  name: 'Stack',
  props: {
    wrap: Boolean,
    direction: {
      default: 'row',
      type: String,
    },
    align: {
      default: 'start',
      type: String,
    },
    justify: {
      default: 'start',
      type: String,
    },
    spacing: {
      default: 'component',
      type: String,
    },
    as: {
      type: String | Object,
      default: 'div',
    },
  },
  render(h) {
    return h(
      this.as,
      {
        ...this.$attrs,
        ...this.$listeners,
        class: [
          this.$style[`container--direction-${this.direction}`],
          this.$style[`container--justify-${this.justify}`],
          this.$style[`container--spacing-${this.spacing}`],
          this.$style[`container--align-${this.align}`],
          this.$style.container,
          {
            [this.$style[`container--wrap`]]: this.wrap,
          },
        ],
      },
      this.$slots.default
        .filter((vnode) => vnode.tag)
        .map((vnode) =>
          h(
            'div',
            {
              class: [this.$style[`item--${this.spacing}`]],
            },
            [vnode],
          ),
        ),
    );
  },
};
</script>

<style src="./Stack.module.scss" lang="scss" module />
