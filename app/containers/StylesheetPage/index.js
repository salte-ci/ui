/* istanbul ignore file */
// This is purely to easily visualize each component, no point in testing...

/* Buffer */
import fs from 'fs';

import React, { useState } from 'react';

import { H1 } from '../../components/H1';
import { H2 } from '../../components/H2';
import { H3 } from '../../components/H3';
import { H4 } from '../../components/H4';
import { Small } from '../../components/Small';
import { Button } from '../../components/Button';
import { Toggle } from '../../components/Toggle';
import { Grid } from '../../components/Grid';
import { Highlight } from '../../components/Highlight';
import { Card } from '../../components/Card';
import { List, ListItem } from '../../components/List';

import styles from './index.css';

import { modal } from '../../utils/modal';
import { RootLogger } from '../../utils/logger';
import { GetTheme } from '../../utils/theme';

const logger = RootLogger.extend('stylesheet');

const config = fs.readFileSync('./app/examples/config.yaml', 'utf8');

const components = {
  Typography: () => (
    <>
      <Grid alignItems="flex-end">
        <H1>H1</H1>
        <H2>H2</H2>
        <H3>H3</H3>
        <H4>H4</H4>
      </Grid>
      <Small>Small</Small>
    </>
  ),
  Button: () => (
    <>
      <H4>Buttons</H4>
      <div className={styles.grid}>
        <Button>Primary</Button>
        <Button theme="secondary">Secondary</Button>
        <Button theme="white">White</Button>
        <Button theme="accent">Accent</Button>
        <Button theme="success">Success</Button>
        <Button theme="warning">Warning</Button>
        <Button theme="danger">Danger</Button>
        <Button theme="github">GitHub</Button>
        <Button theme="bitbucket">Bitbucket</Button>
        <Button theme="gitlab">GitLab</Button>
      </div>
      <H4>Buttons (Rounded)</H4>
      <div className={styles.grid}>
        <Button rounded>Primary</Button>
        <Button rounded theme="secondary">
          Secondary
        </Button>
        <Button rounded theme="white">
          White
        </Button>
        <Button rounded theme="accent">
          Accent
        </Button>
        <Button rounded theme="success">
          Success
        </Button>
        <Button rounded theme="warning">
          Warning
        </Button>
        <Button rounded theme="danger">
          Danger
        </Button>
        <Button rounded theme="github">
          GitHub
        </Button>
        <Button rounded theme="bitbucket">
          Bitbucket
        </Button>
        <Button rounded theme="gitlab">
          GitLab
        </Button>
      </div>
      <H4>Buttons (Large)</H4>
      <div className={styles.grid}>
        <Button large>Primary</Button>
        <Button large theme="secondary">
          Secondary
        </Button>
        <Button large theme="white">
          White
        </Button>
        <Button large theme="accent">
          Accent
        </Button>
        <Button large theme="success">
          Success
        </Button>
        <Button large theme="warning">
          Warning
        </Button>
        <Button large theme="danger">
          Danger
        </Button>
        <Button large theme="github">
          GitHub
        </Button>
        <Button large theme="bitbucket">
          Bitbucket
        </Button>
        <Button large theme="gitlab">
          GitLab
        </Button>
      </div>
      <H4>Buttons (Large Rounded)</H4>
      <div className={styles.grid}>
        <Button large rounded>
          Primary
        </Button>
        <Button large rounded theme="secondary">
          Secondary
        </Button>
        <Button large rounded theme="white">
          White
        </Button>
        <Button large rounded theme="accent">
          Accent
        </Button>
        <Button large rounded theme="success">
          Success
        </Button>
        <Button large rounded theme="warning">
          Warning
        </Button>
        <Button large rounded theme="danger">
          Danger
        </Button>
        <Button large rounded theme="github">
          GitHub
        </Button>
        <Button large rounded theme="bitbucket">
          Bitbucket
        </Button>
        <Button large rounded theme="gitlab">
          GitLab
        </Button>
      </div>
      <H4>Buttons (Icons)</H4>
      <div className={styles.grid}>
        <Button icon="logo" theme="secondary">
          Salte CI
        </Button>
        <Button icon="logo" theme="secondary" rounded>
          Salte CI
        </Button>
        <Button icon="logo" theme="secondary" large>
          Salte CI
        </Button>
        <Button icon="logo" theme="secondary" large rounded>
          Salte CI
        </Button>
      </div>
    </>
  ),
  Toggle: () => {
    const [checked, setChecked] = useState(false);

    return <Toggle checked={checked} onClick={() => setChecked(!checked)} />;
  },
  Card: () => (
    <>
      <Card>This is where content goes.</Card>
      <Card header="Header">This is where content goes.</Card>
      <Card>
        <div>This is where the content goes. Really, I am not kidding. I just want to cause a line wrap.</div>
        <Card embed>This is some inner content.</Card>
      </Card>
    </>
  ),
  Highlight: () => (
    <>
      <Small>TODO: Why isn&apos;t this the correct color scheme.. ?</Small>
      <Highlight language="yaml" style={{ borderRadius: 6, padding: 5, backgroundColor: GetTheme('primary') }}>
        {config}
      </Highlight>
    </>
  ),
  List: () => (
    <List>
      <ListItem icon="infinite">Hello</ListItem>
      <ListItem>World</ListItem>
    </List>
  ),
  Modal: () => (
    <Grid>
      <Button
        theme="secondary"
        onClick={() => {
          modal({
            variant: 'medium',
            children: (
              <Grid>
                <Button theme="accent" data-close>
                  Confirm
                </Button>
                <Button data-cancel>Cancel</Button>
              </Grid>
            ),
          })
            .then(() => logger('done!'))
            .catch(error => logger(error));
        }}>
        Open Modal
      </Button>
    </Grid>
  ),
};

export default function() {
  const searchParams = new URLSearchParams(window.location.search);
  const [componentKey, setComponentKey] = useState(searchParams.get('component'));

  const Component = components[componentKey];

  return (
    <Grid direction="column" flex={1}>
      <H1>Stylesheet</H1>
      <H2>{`<${componentKey} />`}</H2>
      <Grid alignItems="start">
        <Grid className={styles.page} direction="column" flex={1}>
          {Component && <Component>Hello World</Component>}
        </Grid>
        <Grid direction="column" className={styles.page} spacing={1}>
          {Object.keys(components).map(name => (
            <Button
              key={name}
              theme={componentKey === name ? 'accent' : 'secondary'}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('component', name);
                window.history.pushState(null, null, url.toString());
                // TODO: Update Search Param
                setComponentKey(name);
              }}>
              {name}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
