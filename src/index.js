import React from 'react'
import ReactDOM from 'react-dom'

import * as Sentry from '@sentry/react';

import { Config } from "./config"

import ContextProvider from "./contexts"

import { main } from "../sass/main.scss"
import { favicon } from "../public/images/icon.ico"

import MainApp from "./components/MainApp"
import * as serviceWorker from "./serviceWorker"

const rootElement = document.getElementById('root')

const renderApp = Component => {
  Sentry.init({dsn: Config.SENTRY_DSN});
  ReactDOM.render(
    <ContextProvider>
      <Component/>
    </ContextProvider>,
    rootElement
  );
};

renderApp(MainApp)
serviceWorker.register()
