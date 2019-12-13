/* istanbul ignore file */
// This is purely to easily visualize each component, no point in testing...

import React from 'react';
import { H1 } from '../../components/H1';
import { H2 } from '../../components/H2';
import { Button } from '../../components/Button';
import { Toggle } from '../../components/Toggle';

import styles from './index.css';
import { Card } from '../../components/Card';

import { modal } from '../../utils/modal';
import { RootLogger } from '../../utils/logger';
import { Actions } from '../../components/Actions';

const logger = RootLogger.extend('stylesheet');

export default function() {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className={styles.page}>
      <H1>Stylesheet</H1>
      <H2>Buttons</H2>
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
      <H2>Buttons (Rounded)</H2>
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
      <H2>Buttons (Large)</H2>
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
      <H2>Buttons (Large Rounded)</H2>
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
      <H2>Buttons (Icons)</H2>
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
      <H2>Toggle</H2>
      <div className={styles.grid}>
        <Toggle checked={checked} onClick={() => setChecked(!checked)} />
      </div>
      <H2>Card</H2>
      <div className={styles.cards}>
        <Card>This is where content goes.</Card>
        <Card header="Header">This is where content goes.</Card>
        <Card>
          <div>This is where the content goes. Really, I am not kidding. I just want to cause a line wrap.</div>
          <Card embed>This is some inner content.</Card>
        </Card>
      </div>
      <H2>Modals</H2>
      <div className={styles.grid}>
        <Button
          onClick={() => {
            modal({
              variant: 'medium',
              children: (
                <>
                  <Actions>
                    <Button theme="accent" data-close>
                      Confirm
                    </Button>
                    <Button data-cancel>Cancel</Button>
                  </Actions>
                </>
              ),
            })
              .then(() => logger('done!'))
              .catch(error => logger(error));
          }}>
          Modals
        </Button>
      </div>
    </div>
  );
}
