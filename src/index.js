import React from 'react'
import ReactDOM from 'react-dom'

import ContextProvider from "./contexts"

import { main } from "../sass/main.scss"
import { favicon } from "../public/images/icon.ico"
import { resume } from "../public/static/resume.pdf"

import MainApp from "./components/MainApp"
import * as serviceWorker from "./serviceWorker"

const rootElement = document.getElementById('root')

const renderApp = Component => {
  ReactDOM.render(
    <ContextProvider>
      <Component/>
    </ContextProvider>,
    rootElement
  );
};

renderApp(MainApp)
serviceWorker.register()
