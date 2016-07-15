import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import Charts from './components/charts.js'

export default class App extends Component {
	constructor(props) {
    super(props)
    this.state = { "source": "http://127.0.0.1:5000" } 
  }

	
  render() {
    return (
			<Router history={browserHistory}>
				<Route path="/" component={Charts} />
			</Router>
    );
  }
}
