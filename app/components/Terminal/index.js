import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Terminal({ children }) {
  return (
    <div className={styles.terminal}>
      <div className={styles.menu}>
        <div className={styles.close} />
        <div className={styles.minimize} />
        <div className={styles.zoom} />
      </div>
      <div id="content" className={styles.content}>
        {children}
      </div>
    </div>
  );
}

Terminal.propTypes = {
  children: PropTypes.node,
};
