import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';
import { THEMES, GetVariable } from '../../utils/theme';

export function LoadingIndicator({
  children,
  className,
  loading,
  theme,
  ...extraProps
}) {
  const indicator = (
    <div
      {...extraProps}
      id="loading"
      className={ConcatClassNames(styles.loading, className)}
      loading={loading.toString()}
      style={{
        '--sci-loading-color': GetVariable(theme),
      }}
    >
      <div className={styles.dot} />
      <div className={styles.dot} />
      <div className={styles.dot} />
    </div>
  );

  if (children) {
    return (
      <div className={styles.loadingContainer}>
        {indicator}
        {children}
      </div>
    );
  }

  return indicator;
}

LoadingIndicator.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  loading: PropTypes.bool,
  theme: PropTypes.oneOf(THEMES),
};

LoadingIndicator.defaultProps = {
  loading: true,
  theme: 'primary',
};
