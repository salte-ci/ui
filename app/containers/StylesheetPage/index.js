/* istanbul ignore file */
// This is purely to easily visualize each component, no point in testing...

/* Buffer */
import fs from 'fs';

import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { H1 } from '../../components/H1';
import { H2 } from '../../components/H2';
import { H3 } from '../../components/H3';
import { H4 } from '../../components/H4';
import { Small } from '../../components/Small';
import { Button } from '../../components/Button';
import { Dropdown } from '../../components/Dropdown';
import { Toggle } from '../../components/Toggle';
import { Grid } from '../../components/Grid';
import { Highlight } from '../../components/Highlight';
import { Card } from '../../components/Card';
import { List, ListItem } from '../../components/List';

import styles from './index.css';

import { modal } from '../../utils/modal';
import { RootLogger } from '../../utils/logger';
import { GetVariable, THEMES } from '../../utils/theme';
import { Accordion } from '../../components/Accordion';

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
        {THEMES.map((theme) => (
          <Button key={theme} theme={theme}>
            {theme}
          </Button>
        ))}
      </div>
      <H4>Buttons (Rounded)</H4>
      <div className={styles.grid}>
        {THEMES.map((theme) => (
          <Button key={theme} rounded theme={theme}>
            {theme}
          </Button>
        ))}
      </div>
      <H4>Buttons (Large)</H4>
      <div className={styles.grid}>
        {THEMES.map((theme) => (
          <Button key={theme} large theme={theme}>
            {theme}
          </Button>
        ))}
      </div>
      <H4>Buttons (Large Rounded)</H4>
      <div className={styles.grid}>
        {THEMES.map((theme) => (
          <Button key={theme} large rounded theme={theme}>
            {theme}
          </Button>
        ))}
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
  Dropdown: () => (
    <Grid>
      <Dropdown toggle="Left">
        <Dropdown.Item type={Link} to="/stylesheet?component=Dropdown">
          Link
        </Dropdown.Item>
        <Dropdown.Item>Basic Item</Dropdown.Item>
      </Dropdown>
      <Dropdown alignment="center" toggle="Center">
        <Dropdown.Item type={Link} to="/stylesheet?component=Dropdown">
          Link
        </Dropdown.Item>
        <Dropdown.Item>Basic Item</Dropdown.Item>
      </Dropdown>
      <Dropdown alignment="right" toggle="Right">
        <Dropdown.Item type={Link} to="/stylesheet?component=Dropdown">
          Link
        </Dropdown.Item>
        <Dropdown.Item>Basic Item</Dropdown.Item>
      </Dropdown>
    </Grid>
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
        <div>
          This is where the content goes. Really, I am not kidding. I just want
          to cause a line wrap.
        </div>
        <Card embed>This is some inner content.</Card>
      </Card>
    </>
  ),
  Highlight: () => (
    <>
      <Small>TODO: Why isn&apos;t this the correct color scheme.. ?</Small>
      <Highlight
        language="yaml"
        style={{
          borderRadius: 6,
          padding: 5,
          backgroundColor: GetVariable('primary'),
        }}
      >
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
            component: () => (
              <Grid>
                <Button theme="accent" data-close>
                  Confirm
                </Button>
                <Button data-cancel>Cancel</Button>
              </Grid>
            ),
          }).then((response) => {
            if (response.canceled) {
              logger(response.reason);
            } else {
              logger('done!');
            }
          });
        }}
      >
        Open Modal
      </Button>
    </Grid>
  ),
  Accordion: () => {
    const [opened, setOpened] = useState(false);

    return (
      <Grid direction="column">
        <Grid>
          <Button
            theme={opened ? 'accent' : 'secondary'}
            onClick={() => setOpened(!opened)}
          >
            {opened ? 'Close' : 'Open'} Accordion
          </Button>
        </Grid>
        <Accordion opened={opened}>Accordion Content</Accordion>
      </Grid>
    );
  },
};

export default function() {
  const searchParams = new URLSearchParams(window.location.search);
  const [componentKey, setComponentKey] = useState(
    searchParams.get('component'),
  );

  const Component = components[componentKey];

  return (
    <Grid direction="column" flex={1}>
      <H1>Stylesheet</H1>
      <H2>{`<${componentKey} />`}</H2>
      <Grid alignItems="start">
        <Grid className={styles.page} direction="column" flex={1}>
          {Component ? (
            <Component>Hello World</Component>
          ) : (
            <Small>Please select a component.</Small>
          )}
        </Grid>
        <Grid direction="column" className={styles.page} spacing={10}>
          {Object.keys(components).map((name) => (
            <Button
              key={name}
              theme={componentKey === name ? 'accent' : 'secondary'}
              onClick={() => {
                const url = new URL(window.location.href);
                url.searchParams.set('component', name);
                window.history.pushState(null, null, url.toString());
                // TODO: Update Search Param
                setComponentKey(name);
              }}
            >
              {name}
            </Button>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
