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

    var data = d3.range(10).map(function(){
      return {r: Math.floor(Math.random() * 8 + 2)};
    });

    var force = d3.layout.force()
      .nodes(data)
      // .links(this.props.data[5].allLinks)
      // .nodes(this.props.data[6].allNodes)
      .charge(function(d){
        return -31;
      })
      .linkDistance(30)
      .size([this.props.width, this.props.height])
      .start();

    force.on('tick', function (tick, b, c) {
        // console.log('tick', force.nodes()[0].px, force.links()[0]);
    })

    return (
      <ForceMiddle  border={this.props.border} borderWeight={this.props.borderWeight}
        width={this.props.width} height={this.props.height}distinctColors={this.props.distinctColors} fillColors={this.props.fillColors}
        chart={'force'} modulus={this.props.modulus} title={this.props.title}
        data={this.props.data} force={force} width={this.props.width} height={this.props.height}/>
    );

  }

}
