import React, { Component } from 'react'
import { Chart } from 'react-google-charts'
import { Link } from 'react-router'


export default class Charts extends Component {


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
				<nav className="navbar navbar-default">
					<ul className="nav navbar-nav navbar-left">
						<li> <Link to="count_stops_on_routes">count stops on routes</Link> </li>
						<li> <Link to="count_routes_on_stops">count routes on stops</Link> </li>
					</ul>
				</nav>
				{this.props.children}
      </div>
    )
  }
}
