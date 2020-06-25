<script>
import { units } from '../styles/variables.scss';
import vars from './Stack.module.scss';

const direction = vars.direction.split(', ');
const justify = vars.justify.split(', ');
const align = vars.align.split(', ');
const spacing = units.split(', ');

export default {
  name: 'Stack',
  props: {
    wrap: Boolean,
    direction: {
      validator: (_) => direction.includes(_),
      default: direction[0],
      type: String,
    },
    align: {
      validator: (_) => align.includes(_),
      default: align[0],
      type: String,
    },
    justify: {
      validator: (_) => justify.includes(_),
      default: justify[0],
      type: String,
    },
    spacing: {
      validator: (_) => spacing.includes(_),
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
      this.$slots.default.map((vnode) =>
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
