import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as MediaQueryUtils from '../../utils/media-query';

export const MOBILE_QUERY_ONLY = '(max-width: 599px)';

function isVisible(desktop, mobile) {
  const isMobile = MediaQueryUtils.matches(MOBILE_QUERY_ONLY);

  if (desktop && !isMobile) return true;
  if (mobile && isMobile) return true;
  return false;
}

export function MediaQuery({ desktop, mobile, children }) {
  const [visible, setVisible] = useState(isVisible(desktop, mobile));

  useEffect(() => {
    const OnQueryMatchChange = () => setVisible(isVisible(desktop, mobile));

    MediaQueryUtils.on(MOBILE_QUERY_ONLY, OnQueryMatchChange);

    return () => {
      MediaQueryUtils.off(MOBILE_QUERY_ONLY, OnQueryMatchChange);
    };
  }, []);

  useEffect(() => {
    setVisible(isVisible(desktop, mobile));
  }, [desktop, mobile]);

  if (!visible) return null;

  return children;
}

MediaQuery.propTypes = {
  desktop: PropTypes.bool,
  mobile: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
