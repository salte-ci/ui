import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Actions({ children }) {
  return <div className={styles.actions}>{children}</div>;
}

Actions.propTypes = {
  children: PropTypes.node,
};
