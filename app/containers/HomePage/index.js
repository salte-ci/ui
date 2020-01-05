import React from 'react';
import fs from 'fs';

import { H1 } from '../../components/H1';
import { H2 } from '../../components/H2';
import { Card } from '../../components/Card';
import { List, ListItem } from '../../components/List';
import { Grid } from '../../components/Grid';
import { Button } from '../../components/Button';
import { Small } from '../../components/Small';
import { Terminal } from '../../components/Terminal';
import { Highlight } from '../../components/Highlight';

/** Buffer */
const config = fs.readFileSync('app/examples/config.yaml', 'utf8');

export default function() {
  return (
    <Grid direction="column">
      <H1 align="center">Salte CI</H1>
      <H2 align="center">The simplest and most</H2>
      <H2 align="center">versatile build platform in existance.</H2>
      <Terminal>
        <Highlight language="yaml">{config}</Highlight>
      </Terminal>
      <Grid responsive>
        <Card header="Free" style={{ flex: 1, minHeight: 400 }}>
          <List style={{ flex: 1 }}>
            <ListItem icon="infinite">Unlimited private runners</ListItem>
            <ListItem icon="infinite">Unlimited public and private projects</ListItem>
            <ListItem>Community support</ListItem>
          </List>
          <Button alignSelf="center" theme="accent">
            Get Started
          </Button>
          <Small align="center">&nbsp;</Small>
        </Card>
        <Card header="Paid" style={{ flex: 1, minHeight: 400 }}>
          <Small align="center" style={{ flex: 1 }}>
            Coming soon...
          </Small>
          <Button alignSelf="center" theme="accent" disabled>
            Provide Feedback
          </Button>
          <Small align="center">This tier includes all the functionality in the free tier</Small>
        </Card>
      </Grid>
    </Grid>
  );
}
