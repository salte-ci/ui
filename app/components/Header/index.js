import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { auth } from '../../auth';

import { Button } from '../Button';

import styles from './index.css';
import { MediaQuery } from '../MediaQuery';
import { Toggle } from '../Toggle';
import { config, environment, SetLocal } from '../../config';
import { Grid } from '../Grid';
import { Dropdown } from '../Dropdown';
import { AccountSettingsModal } from '../AccountSettingsModal';
import { LOCAL, ALPHA } from '../../config/constants';

export function Header({ idToken }) {
  const [opened, setOpened] = useState(false);

  return (
    <header className={styles.header}>
      <Grid className={styles.content} alignItems="center" flex={1}>
        <Button type={Link} to="/" theme="white" icon="logo" rounded large>
          Salte CI
        </Button>
        <div style={{ flex: 1 }} />
        {[LOCAL, ALPHA].includes(environment) && (
          <Toggle
            checked={config.local}
            onClick={() => SetLocal(!config.local)}
          />
        )}
        {idToken.expired ? (
          <Button
            id="sign-up"
            theme="accent"
            large
            onClick={() => auth.login('auth0')}
          >
            Sign Up
          </Button>
        ) : (
          <Dropdown
            alignment="right"
            toggle={
              <Button theme="white" large icon={idToken.user.picture}>
                <MediaQuery desktop>
                  <div>{idToken.user.name}</div>
                </MediaQuery>
              </Button>
            }
          >
            <Dropdown.Item
              id="account-settings"
              onClick={() => {
                setOpened(true);
              }}
            >
              Account Settings
            </Dropdown.Item>
            <Dropdown.Item id="sign-out" onClick={() => auth.logout('auth0')}>
              Sign Out
            </Dropdown.Item>
          </Dropdown>
        )}
      </Grid>
      <AccountSettingsModal
        opened={opened}
        onClose={() => setOpened(!opened)}
      />
    </header>
  );
}

Header.propTypes = {
  idToken: PropTypes.object.isRequired,
};
