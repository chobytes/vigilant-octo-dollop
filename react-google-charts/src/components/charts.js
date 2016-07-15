import React, { Component } from 'react'
import { Chart } from 'react-google-charts'

import CountStopsOnRoutes from './count-stops-on-routes.js'
import CountRoutesOnStops from './count-routes-on-stops.js'

export default class Charts extends Component {
	constructor(props) {
    super(props)
    this.state = { "source": "http://127.0.0.1:5000" } 

  }


	componentDidMount() {	
    var options = {
      title: 'Age vs. Weight comparison',
      hAxis: {title: 'Age', minValue: 0, maxValue: 15},
      vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
      legend: 'none'
    };

    var rows = [
      [ 8,      12],
      [ 4,      5.5],
      [ 11,     14],
      [ 4,      5],
      [ 3,      3.5],
      [ 6.5,    7]
    ];

    var columns = [
      {
        'type': 'number',
        'label' : 'Age'
      }, 
      {
        'type' : 'number',
        'label' : 'Weight'
      }
    ];

}

  render() {
    return (
      <div>
				<h1>Foo</h1>
				<CountStopsOnRoutes source={this.state.source}/>
				<CountRoutesOnStops source={ this.state.source} />
      </div>
    )
  }
}
