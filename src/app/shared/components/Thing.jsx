'use strict';

import React from 'react';

import PieChart from './d3charts/PieChart.jsx';

class Thing extends React.Component {

  static defaultProps = {
    width: 100,
    height: 100
  }
  constructor (props) {
    super(props);
    this.state = { };
  }


  render () {
    var pies = [
      {data: [2, 4, 5, 4, 7]},
      {data: [3, 2, 9, 1, 8]},
      {data: [3, 4, 0, 7, 8]},
      {data: [3, 5, 5, 0, 4]},
      {data: [3, 8, 3, 2, 3]}
    ];
    var pieCharts = [];
    for (var i = 0; i < pies.length; i++) {
      pieCharts.push(<PieChart width={400} height={400} data={pies[i].data}/>);
    }
    return (
      <div style={{'text-align': 'center'}}>
        {pieCharts}
      </div>

    );

  }

}

export default Thing;
