var React = require('react');
var ReactDOM = require('react-dom');
import ReactRouter from "react-router";
import { Router, Route } from 'react-router';
//import routes from './components/Routes';
//import React from 'react';
//import {ReactRouter, Router, Route} from 'react-router';
//import createBrowserHistory from 'history/lib/createBrowserHistory';
import { createHistory } from 'history';

import StorePicker from './components/StorePicker';
import App from './components/App';
import NotFound from './components/NotFound';

var routes = (
  <Router history={createHistory()}>
    <Route path="/" component={StorePicker}/>
    <Route path="/store/:storeId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));
