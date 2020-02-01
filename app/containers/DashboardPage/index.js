import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { GetOrganizationsForUser } from '../../actions/organizations';

import { H1 } from '../../components/H1';
import { Grid } from '../../components/Grid';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { ErrorState } from '../../components/ErrorState';
import { OrganizationCard } from '../../components/OrganizationCard';

export default function() {
  const dispatch = useDispatch();
  const organizations = useSelector((state) => state.organizations);
  const loading = useSelector((state) => Boolean(state.loading.organizations));
  const error = useSelector((state) => state.error.organizations);

  useEffect(() => {
    dispatch(GetOrganizationsForUser());
  }, []);

  return (
    <Grid direction="column">
      <H1 align="center">Dashboard</H1>
      <LoadingIndicator loading={loading} tid="dashboard-loading">
        <ErrorState errors={error}>
          <Grid direction="column">
            {organizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organization={organization}
              />
            ))}
          </Grid>
        </ErrorState>
      </LoadingIndicator>
    </Grid>
  );
}
