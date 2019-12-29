/* istanbul ignore file */
// This is purely to easily visualize each component, no point in testing...

import React from 'react';
import { H2 } from '../../components/H2';
import { H3 } from '../../components/H3';
import { Button } from '../../components/Button';
import { Toggle } from '../../components/Toggle';

import styles from './index.css';
import { Card } from '../../components/Card';

import { modal } from '../../utils/modal';
import { RootLogger } from '../../utils/logger';
import { Grid } from '../../components/Grid';

const logger = RootLogger.extend('stylesheet');

export default function() {
  const [checked, setChecked] = React.useState(false);

  return (
    <Grid direction="column" className={styles.page}>
      <H2>Stylesheet</H2>
      <H3>Buttons</H3>
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
      <H3>Buttons (Rounded)</H3>
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
      <H3>Buttons (Large)</H3>
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
      <H3>Buttons (Large Rounded)</H3>
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
      <H3>Buttons (Icons)</H3>
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
      <H3>Toggle</H3>
      <div className={styles.grid}>
        <Toggle checked={checked} onClick={() => setChecked(!checked)} />
      </div>
      <H3>Card</H3>
      <div className={styles.cards}>
        <Card>This is where content goes.</Card>
        <Card header="Header">This is where content goes.</Card>
        <Card>
          <div>This is where the content goes. Really, I am not kidding. I just want to cause a line wrap.</div>
          <Card embed>This is some inner content.</Card>
        </Card>
      </div>
      <H3>Modals</H3>
      <div className={styles.grid}>
        <Button
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
          Modals
        </Button>
      </div>
    </Grid>
  );
}
