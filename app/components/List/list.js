import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../Grid';

import styles from './list.css';

export function List({ children, ...extraProps }) {
  return (
    <Grid
      {...extraProps}
      type="ul"
      className={styles.list}
      direction="column"
      spacing={0}
    >
      {children}
    </Grid>
  );
}

List.propTypes = {
  children: PropTypes.node,
};
