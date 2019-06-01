import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';

import thunk from 'redux-thunk'

import actions from "./redux/actions"

import {main} from "../sass/main.scss"
import {favicon} from "../public/images/icon.ico"
import {resume} from "../public/static/resume.pdf"

import MainApp from "./MainApp"

const rootElement = document.getElementById('root')

const store = createStore(combineReducers(reducers), compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
))

const renderApp = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    rootElement
  );
};

renderApp(MainApp)
