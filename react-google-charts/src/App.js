import React, { Component } from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import Charts from './components/charts.js'
import CountStopsOnRoutes from './components/count-stops-on-routes.js'
import CountRoutesOnStops from './components/count-routes-on-stops.js'

export default class App extends Component {
	constructor(props) {
    super(props)
    this.state = { "source": "http://127.0.0.1:5000" } 
  }

	
  render() {
    return (
			<Router history={browserHistory}>
				<Route path="/" component={Charts}>
					<Route path="count_stops_on_routes" component={CountStopsOnRoutes} />
					<Route path="count_routes_on_stops" component={CountRoutesOnStops} />
				</Route>
			</Router>
    );
  }
}
