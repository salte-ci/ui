import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { auth } from '../../auth';
import { UpdateToken } from '../../actions/auth/actions';

import { Header } from '../../components/Header';

import { HomePage } from '../HomePage/Loadable';
import { DashboardPage } from '../DashboardPage/Loadable';
import { StylesheetPage } from '../StylesheetPage/Loadable';

import styles from './index.css';
import { RootLogger } from '../../utils/logger';

const logger = RootLogger.extend('App');

export function App() {
  const dispatch = useDispatch();
  const idToken = useSelector(state => state.auth.auth0);

  useEffect(() => {
    const onAuth = (error, data) => {
      if (error) logger(error);
      else {
        dispatch(UpdateToken(data.provider, auth.provider(data.provider).idToken));
      }
    };

    auth.on('login', onAuth);
    auth.on('logout', onAuth);
  }, []);

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s - Salte CI" defaultTitle="Salte CI">
        <meta name="description" content="The simplest and most versatile build platform in existence." />
      </Helmet>
      <Header idToken={idToken} />
      <div className={styles.pages}>
        <Switch>
          <Route exact path="/" component={idToken.expired ? HomePage : DashboardPage} />
          <Route exact path="/stylesheet" component={StylesheetPage} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}
