import React from 'react';
import Vue from 'vue';

// https://github.com/egoist/vue-to-react/blob/master/src/index.js
export default ({ vue, children, ...props }) => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const app = new Vue({
      el: el.current,
      render: (h) => h(vue, { props }, children),
    });

    return () => app.$destroy();
  });

  return React.createElement('div', { ref: el });
};
