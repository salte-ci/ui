import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function LoadingIndicator({ loading, ...extraProps }) {
  return (
    <div {...extraProps} id="loading" className={styles.loadingIndicator} loading={loading.toString()}>
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
