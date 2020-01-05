import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { ConcatClassNames } from '../../utils/class-names';

export function H4({ children, className, type: Type, ...extraProps }) {
  return (
    <Type {...extraProps} className={ConcatClassNames(styles.h4, className)}>
      {children}
    </Type>
  );
}

H4.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.elementType,
};

H4.defaultProps = {
  type: 'h4',
};
