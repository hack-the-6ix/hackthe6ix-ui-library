import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import React from 'react';
import Vue from 'vue';

// https://github.com/egoist/vue-to-react/blob/master/src/index.js
export default ({ vue, children, ...props }) => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const id = v4();
    const app = new Vue({
      el: el.current,
      render: (h) =>
        h(vue, { props }, children && [h('span', { attrs: { id } })]),
      mounted() {
        if (children) {
          ReactDOM.render(
            React.createElement(React.Fragment, {}, children),
            document.getElementById(id),
          );
        }
      },
    });

    return () => app.$destroy();
  });

  return React.createElement('div', { ref: el });
};
