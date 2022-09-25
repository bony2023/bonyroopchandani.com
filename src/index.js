import React from 'react'
import { createRoot } from 'react-dom/client';

import * as Sentry from '@sentry/react';

import { Config } from "./config"

import ContextProvider from "./contexts"

import { main } from "../sass/main.scss"
import { favicon } from "../public/images/icon.ico"

import MainApp from "./components/MainApp"
import * as serviceWorker from "./serviceWorker"

const renderApp = Component => {
  Sentry.init({dsn: Config.SENTRY_DSN});
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(
    <ContextProvider>
      <Component/>
    </ContextProvider>
  );
};

renderApp(MainApp)
serviceWorker.register()
