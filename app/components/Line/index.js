import React from 'react';
import PropTypes from 'prop-types';
import { ConcatClassNames } from '../../utils/class-names';

import styles from './index.css';
import { GetVariable } from '../../utils/theme';

export function Line({ className, theme, ...extraProps }) {
  return (
    <div
      {...extraProps}
      id="line"
      className={ConcatClassNames(styles.line, className)}
      style={{
        '--sci-line-color': GetVariable(theme),
      }}
    />
  );
}

Line.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.string,
};
