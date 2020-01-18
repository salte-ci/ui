import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { GetRepositoriesForOrganization } from '../../actions/repositories';
import { Card } from '../Card';
import { H2 } from '../H2';
import { H4 } from '../H4';
import { Grid } from '../Grid';
import { Button } from '../Button';

import styles from './index.css';
import { Small } from '../Small';
import { Accordion } from '../Accordion';
import { RepositoriesCard } from '../RepositoriesCard';
import { ErrorState } from '../ErrorState';

const REPOSITORIES = Symbol('REPOSITORIES');

export function OrganizationCard({ organization, ...extraProps }) {
  const dispatch = useDispatch();
  const [page, setPage] = useState(null);
  const repositories = useSelector(
    (state) => state.repositories[organization.id],
  );
  const loading = useSelector((state) =>
    Boolean(state.loading[`repositories:${organization.id}`]),
  );
  const error = useSelector(
    (state) => state.error[`repositories:${organization.id}`],
  );

  return (
    <Card
      {...extraProps}
      loading={loading}
      tid="organization-card"
      onClick={() => {
        setPage(page === REPOSITORIES ? null : REPOSITORIES);

        if (!repositories) {
          dispatch(GetRepositoriesForOrganization(organization.id));
        }
      }}
    >
      <Grid direction="row">
        <img
          alt="Organization Icon"
          className={styles.icon}
          src={organization.icon}
        />
        <Grid direction="column" flex={1} spacing={10}>
          <Grid alignItems="center">
            <H2>{organization.name}</H2>
            <H4>{organization.key}</H4>
            <div style={{ flex: 1 }} />
            <Button
              type="a"
              href={organization.url}
              target="_blank"
              theme={organization.provider.type}
              icon={organization.provider.type}
            >
              {organization.provider.name}
            </Button>
            <Button disabled>Settings</Button>
          </Grid>
          <Grid direction="column" spacing={0}>
            <Small>{organization.repositoryCount} repositories</Small>
            <Small>{organization.buildCount} builds</Small>
          </Grid>
        </Grid>
      </Grid>
      {repositories && (
        <ErrorState error={error}>
          <Accordion opened={!loading && page === REPOSITORIES}>
            <RepositoriesCard
              organization={organization}
              repositories={repositories}
            />
          </Accordion>
        </ErrorState>
      )}
    </Card>
  );
}

OrganizationCard.propTypes = {
  organization: PropTypes.object,
};
