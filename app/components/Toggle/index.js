import React from 'react';
import PropTypes from 'prop-types';
import { GetVariable } from '../../utils/theme';

import { Line } from '../Line';

import styles from './index.css';

export function Toggle({ checked, onClick, ...extraProps }) {
  const theme = checked ? 'success' : 'accent';

  return (
    <div
      {...extraProps}
      role="checkbox"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={styles.toggle}
      style={{
        '--sci-toggle-color': GetVariable(theme),
      }}
      checked={checked}
      aria-checked={Boolean(checked)}
    >
      <div className={styles.thumbnail}>
        <Line theme={theme} />
        <Line theme={theme} />
        <Line theme={theme} />
      </div>
    </div>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};
