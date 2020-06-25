import React from 'react';
import Vue from 'vue';

// Balls to the wall do everything yourself
export default ({ config }) => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const app = new Vue({
      el: el.current,
      ...config,
    });
    return () => app.$destroy();
  });

  return React.createElement('div', { ref: el });
};
