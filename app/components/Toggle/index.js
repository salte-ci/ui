import React from 'react';
import PropTypes from 'prop-types';
import { config } from '../../config';
import { GetTheme } from '../../utils/theme';
import { BoxShadow, BoxShadows } from '../../utils/shadow';

import { Line } from '../Line';

import styles from './index.css';

export function Toggle({ checked, onClick, ...otherProps }) {
  const color = GetTheme(checked ? 'success' : 'accent');

  return (
    <div
      role="checkbox"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onClick}
      className={styles.toggle}
      style={{
        backgroundColor: color,
        boxShadow: BoxShadow({
          theme: 'darken',
          inset: true,
        }),
      }}
      checked={checked}
      aria-checked={Boolean(checked)}
      {...otherProps}>
      <div
        className={styles.thumbnail}
        style={{
          backgroundColor: config.colors.secondary,
          boxShadow: BoxShadows(['darken', 'secondary']),
        }}>
        <Line color={color} />
        <Line color={color} />
        <Line color={color} />
      </div>
    </div>
  );
}

Toggle.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};
