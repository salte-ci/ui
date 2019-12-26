import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { auth } from '../../auth';

import { Button } from '../Button';

import { GetTheme } from '../../utils/theme';

import styles from './index.css';

export function Header({ idToken }) {
  return (
    <header className={styles.header} style={{ backgroundColor: GetTheme('primary') }}>
      <div className={styles.content}>
        <Button type={Link} to="/" theme="white" icon="logo" rounded large>
          Salte CI
        </Button>
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
            {idToken.user.name}
          </Button>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  idToken: PropTypes.object.isRequired,
};
