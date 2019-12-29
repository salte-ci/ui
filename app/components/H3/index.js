import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';

export function H3({ children, className, ...extraProps }) {
  return (
    <h3 {...extraProps} className={ConcatClassNames(styles.h3, className)}>
      {children}
    </h3>
  );
}

H3.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
