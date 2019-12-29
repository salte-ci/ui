import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';

export function H4({ children, className, ...extraProps }) {
  return (
    <h4 {...extraProps} className={ConcatClassNames(styles.h4, className)}>
      {children}
    </h4>
  );
}

H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
