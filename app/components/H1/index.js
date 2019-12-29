import React from 'react';
import PropTypes from 'prop-types';

import { ConcatClassNames } from '../../utils/class-names';

import styles from './index.css';
import { TEXT_ALIGN } from '../../utils/prop-type-values';

export function H1({ align, children, className, ...extraProps }) {
  return (
    <h1 {...extraProps} className={ConcatClassNames(styles.h1, className)} style={{ textAlign: align }}>
      {children}
    </h1>
  );
}

H1.propTypes = {
  align: PropTypes.oneOf(TEXT_ALIGN),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
