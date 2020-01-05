import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Card } from '../Card';
import { Grid } from '../Grid';
import { H4 } from '../H4';
import { Button } from '../Button';
import { Small } from '../Small';
import { Line } from '../Line';

export function RepositoriesCard({ organization, repositories }) {
  return (
    <Card embed>
      {repositories.map((repository, index) => (
        <React.Fragment key={repository.id}>
          <Grid direction="column" spacing={0}>
            <Grid alignItems="start">
              <H4 type={Link} to={`/${repository.key}`}>
                {repository.key}
              </H4>
              <div style={{ flex: 1 }} />
              <Button
                type="a"
                href={repository.url}
                target="_blank"
                theme={organization.provider.type}
                icon={organization.provider.type}>
                {organization.provider.name}
              </Button>
              <Button disabled>Settings</Button>
            </Grid>
            <Small>{repository.buildCount} builds</Small>
          </Grid>
          {index !== repositories.length - 1 && <Line theme="accent" />}
        </React.Fragment>
      ))}
    </Card>
  );
}

RepositoriesCard.propTypes = {
  organization: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
};
