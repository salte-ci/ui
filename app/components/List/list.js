import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '../Grid';

import styles from './list.css';

export function List({ children, ...extraProps }) {
  return (
    <ul {...extraProps} className={styles.list}>
      <Grid {...extraProps} className={styles.list} direction="column">
        {children}
      </Grid>
    </ul>
  );
}

List.propTypes = {
  children: PropTypes.node,
};
