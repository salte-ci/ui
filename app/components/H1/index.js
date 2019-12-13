import React from 'react';
import PropTypes from 'prop-types';

export function H1({ children, ...extraProps }) {
  return <h1 {...extraProps}>{children}</h1>;
}

H1.propTypes = {
  children: PropTypes.node.isRequired,
};
