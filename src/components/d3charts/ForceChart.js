import React from 'react';
import d3 from 'd3';
import _ from 'underscore';

import ForceMiddle from '../d3charts/ForceMiddle';

export default class ForceChart extends React.Component {

  static defaultProps = {
    width: 500,
    height: 500
  }
  constructor (props) {
    super(props);
    this.state = { };
  }

  render () {
    var charge = -100;
    var defaultRadius = 5;
    var start = new Date();
    var time = 0;
    var ticks = 0;
    var force = d3.layout.force()
      .nodes(this.props.data[6].allNodes)
      .charge(function(d){
        return -30;
      })
      .linkDistance(30)
      .size([this.props.width, this.props.height])
      .start();

    force.on('tick', function (tick, b, c) {
        console.log('tick', force.nodes(), c);
        ticks++;
    })

    return (
      <ForceMiddle  border={this.props.border} borderWeight={this.props.borderWeight} width={this.props.width} height={this.props.height}distinctColors={this.props.distinctColors} fillColors={this.props.fillColors}
        chart={'force'} modulus={this.props.modulus} title={this.props.title}
        data={this.props.data} nodes={force.nodes} width={this.props.width} height={this.props.height}/>
    );

  }

}
