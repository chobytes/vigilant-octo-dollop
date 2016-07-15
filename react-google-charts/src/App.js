import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import Charts from './components/charts.js'

export default class App extends Component {
  render() {
    return (
			<Router history={browserHistory}>
			</Router>
    );
  }
}
