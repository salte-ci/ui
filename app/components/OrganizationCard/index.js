import React from 'react';
import PropTypes from 'prop-types';

import { Card } from '../Card';
import { H2 } from '../H2';
import { H4 } from '../H4';
import { Grid } from '../Grid';
import { Button } from '../Button';

import styles from './index.css';
import { Small } from '../Small';

export function OrganizationCard({ organization }) {
  return (
    <Card direction="row">
      <img alt="Organization Icon" className={styles.icon} src={organization.icon} />
      <Grid direction="column" flex={1} spacing={1}>
        <Grid alignItems="center">
          <H2>{organization.name}</H2>
          <H4>{organization.key}</H4>
          <div style={{ flex: 1 }} />
          <Button
            type="a"
            href={organization.url}
            target="_blank"
            theme={organization.provider.type}
            icon={organization.provider.type}>
            {organization.provider.name}
          </Button>
          <Button disabled>Settings</Button>
        </Grid>
        <Grid direction="column" spacing={0}>
          <Small>{organization.repositoryCount} repositories</Small>
          <Small>{organization.buildCount} builds</Small>
        </Grid>
      </Grid>
    </Card>
  );
}

OrganizationCard.propTypes = {
  organization: PropTypes.object,
};
