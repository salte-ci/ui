import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.css';
import { H2 } from '../H2';
import { Grid } from '../Grid';

export function ErrorState({ children, error }) {
  if (error) {
    return (
      <Grid id="error" direction="column" className={styles.error}>
        <H2 id="header">{error.header || 'Internal Server Error'}</H2>
        <div id="message">{error.message || 'Internal Server Error'}</div>
      </Grid>
    );
  }

  return children;
}

ErrorState.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.instanceOf(Error),
};
