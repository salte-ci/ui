import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { GetTheme } from '../../utils/theme';

export function Terminal({ children }) {
  return (
    <div className={styles.terminal}>
      <div className={styles.menu}>
        <div className={styles.close} />
        <div className={styles.minimize} />
        <div className={styles.zoom} />
      </div>
      <div
        id="content"
        className={styles.content}
        style={{ backgroundColor: GetTheme('primary'), color: GetTheme('white') }}>
        {children}
      </div>
    </div>
  );
}

Terminal.propTypes = {
  children: PropTypes.node,
};
