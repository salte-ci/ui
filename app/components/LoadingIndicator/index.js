import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function LoadingIndicator({ loading, ...extraProps }) {
  if (!loading) return null;

  return (
    <div {...extraProps} className={styles.loadingIndicator}>
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );
}

LoadingIndicator.propTypes = {
  loading: PropTypes.bool,
};

LoadingIndicator.defaultProps = {
  loading: true,
};
