import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: (location) => {
        // console.log('The container noticed navigation in Marketing');
        
        const { pathname: nextPathname } = location;
        const { pathname: currentPathname } = history.location;

        if (currentPathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    // whenever the url changes, call onNavigate on the marketing
    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};