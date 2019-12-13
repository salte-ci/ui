import React from 'react';
import PropTypes from 'prop-types';
import { ConcatClassNames } from '../../utils/class-names';

import styles from './index.css';
import { GetTheme } from '../../utils/theme';

export function Line({ className, color, theme, ...extraProps }) {
  return (
    <div
      {...extraProps}
      id="line"
      className={ConcatClassNames([styles.line, className])}
      style={{ backgroundColor: color || GetTheme(theme) }}
    />
  );
}

Line.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  theme: PropTypes.string,
};
