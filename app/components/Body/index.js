import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';

export function Body({ children, bold, type: Type, ...extraProps }) {
  return (
    <Type
      {...extraProps}
      tid="body"
      bold={bold.toString()}
      className={styles.body}
    >
      {children}
    </Type>
  );
}

Body.propTypes = {
  children: PropTypes.node.isRequired,
  bold: PropTypes.bool,
  type: PropTypes.elementType,
};

Body.defaultProps = {
  bold: false,
  type: 'div',
};
