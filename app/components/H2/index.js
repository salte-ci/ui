import React from 'react';
import PropTypes from 'prop-types';

export function H2({ children, ...extraProps }) {
  return <h2 {...extraProps}>{children}</h2>;
}

H2.propTypes = {
  children: PropTypes.node.isRequired,
};
