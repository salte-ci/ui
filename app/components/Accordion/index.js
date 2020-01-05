import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../Grid';

export function Accordion({ children, opened }) {
  if (!opened) return null;

  return <Grid direction="column">{children}</Grid>;
}

Accordion.propTypes = {
  children: PropTypes.node,
  opened: PropTypes.bool,
};

Accordion.defaultProps = {
  opened: false,
};
