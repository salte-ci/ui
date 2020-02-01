import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { H2 } from '../H2';
import { Body } from '../Body';
import { Grid } from '../Grid';
import { Button } from '../Button';
import { Line } from '../Line';
import { List, ListItem } from '../List';

import { GetProviders } from '../../actions/providers';
import { GetLinks } from '../../actions/links';
import { Modal } from '../Modal';
import { LoadingIndicator } from '../LoadingIndicator';
import { LinkButton } from '../LinkButton';
import { ErrorState } from '../ErrorState';

export function AccountSettingsModal({ opened, onClose, ...extraProps }) {
  const dispatch = useDispatch();
  const loading = useSelector(
    (state) => state.loading.providers || state.loading.links,
  );
  const providers = useSelector((state) => state.providers);
  const links = useSelector((state) => state.links);
  const errors = useSelector((state) => [
    state.error.providers,
    state.error.links,
  ]);

  useEffect(() => {
    if (opened) {
      dispatch(GetProviders());
      dispatch(GetLinks());
    }
  }, [opened]);

  return (
    <Modal {...extraProps} opened={opened} onClose={onClose}>
      <Grid direction="column">
        <H2>Link Services</H2>
        <Body>
          This allows us to determine who you are on a variety of services.
          <br />
          Enabling us to automatically grant you access to projects.
        </Body>
        <Grid spacing={10} responsive>
          <ErrorState errors={errors}>
            <LoadingIndicator loading={loading}>
              {providers.map((provider) => (
                <LinkButton
                  key={provider.id}
                  tid={provider.id}
                  provider={provider}
                  link={links.find((link) => link.provider_id === provider.id)}
                />
              ))}
            </LoadingIndicator>
          </ErrorState>
        </Grid>
        <Line theme="accent" />
        <H2>Delete your Account</H2>
        <Grid direction="column" spacing={10}>
          <Body>
            Deleting your account{' '}
            <Body bold type="span">
              WILL
            </Body>{' '}
            do the following:
          </Body>
          <List>
            <ListItem>Disconnects your Salte account from Salte CI.</ListItem>
            <ListItem>
              Delete any repositories associated with your personal account.
            </ListItem>
          </List>
          <Body>
            Deleting your account{' '}
            <Body bold type="span">
              WILL NOT
            </Body>{' '}
            do the following:
          </Body>
          <List>
            <ListItem>Delete your global Salte account.</ListItem>
            <ListItem>Delete any audit tracking information.</ListItem>
          </List>
        </Grid>
        <Grid>
          <Button theme="accent" disabled>
            Delete Account
          </Button>
        </Grid>
      </Grid>
    </Modal>
  );
}

AccountSettingsModal.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
