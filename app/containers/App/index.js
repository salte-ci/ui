import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Switch, Route } from 'react-router-dom';

import { auth } from '../../auth';
import { UpdateToken } from './actions';

import { Header } from '../../components/Header';

import { HomePage } from '../HomePage/Loadable';
import { StylesheetPage } from '../StylesheetPage/Loadable';

import styles from './index.css';
import { RootLogger } from '../../utils/logger';

const logger = RootLogger.extend('App');

export function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onAuth = (error, data) => {
      if (error) logger(error);
      else {
        dispatch(
          UpdateToken({
            [data.provider]: auth.provider(data.provider).idToken,
          }),
        );
      }
    };

    auth.on('login', onAuth);
    auth.on('logout', onAuth);
  }, []);

  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s - React.js Boilerplate" defaultTitle="React.js Boilerplate">
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <div className={styles.pages}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/stylesheet" component={StylesheetPage} />
        </Switch>
      </div>
    </HelmetProvider>
  );
}
