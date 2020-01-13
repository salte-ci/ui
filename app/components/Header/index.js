import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { auth } from '../../auth';

import { Button } from '../Button';

import styles from './index.css';
import { MediaQuery } from '../MediaQuery';
import { Toggle } from '../Toggle';
import { config, environment, UpdateLocal } from '../../config';
import { Grid } from '../Grid';

export function Header({ idToken }) {
  return (
    <header className={styles.header}>
      <Grid className={styles.content} alignItems="center" flex={1}>
        <Button type={Link} to="/" theme="white" icon="logo" rounded large>
          Salte CI
        </Button>
        <div style={{ flex: 1 }} />
        {environment === 'alpha' && <Toggle checked={config.local} onClick={() => UpdateLocal(!config.local)} />}
        {idToken.expired ? (
          <Button id="sign-up" theme="accent" large onClick={() => auth.login('auth0')}>
            Sign Up
          </Button>
        ) : (
          <Button
            id="sign-out"
            theme="secondary"
            large
            icon={idToken.user.picture}
            onClick={() => auth.logout('auth0')}>
            <MediaQuery desktop>
              <div>{idToken.user.name}</div>
            </MediaQuery>
          </Button>
        )}
      </Grid>
    </header>
  );
}

Header.propTypes = {
  idToken: PropTypes.object.isRequired,
};
