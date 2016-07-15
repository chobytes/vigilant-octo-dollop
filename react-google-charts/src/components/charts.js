import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router'

import CountStopsOnRoutes from './count-stops-on-routes.js'
import CountRoutesOnStops from './count-routes-on-stops.js'
import RidershipPerRoute from './ridership-per-route.js'
import RidershipPerStop from './ridership-per-stop.js'


export default class Charts extends Component {
	constructor(props) {
		super(props)

		this.state = { source: "http://127.0.0.1:5000"
								 , standardQueries: [] }
	}

  render() {
    return (
      <div>
				<CountStopsOnRoutes source={ this.state.source } />

				<hr/ >

				<CountRoutesOnStops source={ this.state.source } />

				<hr />

				<RidershipPerRoute source={ this.state.source } />

				<hr />

				<RidershipPerStop source={ this.state.source } />
      </div>
    )
  }
}
