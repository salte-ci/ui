import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { auth } from '../../auth';

import { Button } from '../Button';

import { GetTheme } from '../../utils/theme';

import styles from './index.css';

export function Header() {
  const idToken = useSelector(state => state.auth.idTokens.auth0);

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
